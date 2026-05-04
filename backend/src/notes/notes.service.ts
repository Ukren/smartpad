import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@Injectable()
export class NotesService {
  constructor(private readonly prisma: PrismaService) {}

  private readonly noteInclude = {
    noteTags: { include: { tag: true } },
  };

  private mapNote(note: any) {
    const { noteTags, ...rest } = note;
    return { ...rest, tags: noteTags.map((nt: any) => nt.tag) };
  }

  async findAll(userId: string, search?: string) {
    const notes = await this.prisma.note.findMany({
      where: {
        userId,
        isDeleted: false,
        ...(search && {
          OR: [
            { title: { contains: search, mode: 'insensitive' } },
            { content: { contains: search, mode: 'insensitive' } },
          ],
        }),
      },
      include: this.noteInclude,
      orderBy: [{ isPinned: 'desc' }, { updatedAt: 'desc' }],
    });
    return notes.map(this.mapNote);
  }

  async findPinned(userId: string) {
    const notes = await this.prisma.note.findMany({
      where: { userId, isPinned: true, isDeleted: false },
      include: this.noteInclude,
      orderBy: { updatedAt: 'desc' },
    });
    return notes.map(this.mapNote);
  }

  async findDeleted(userId: string) {
    const notes = await this.prisma.note.findMany({
      where: { userId, isDeleted: true },
      include: this.noteInclude,
      orderBy: { updatedAt: 'desc' },
    });
    return notes.map(this.mapNote);
  }

  async findOne(userId: string, id: string) {
    const note = await this.prisma.note.findFirst({
      where: { id, userId },
      include: this.noteInclude,
    });
    if (!note) throw new NotFoundException('Note not found');
    return this.mapNote(note);
  }

  async create(userId: string, dto: CreateNoteDto) {
    const tagRecords = await this.upsertTags(dto.tags ?? []);

    const note = await this.prisma.note.create({
      data: {
        title: dto.title,
        content: dto.content ?? '',
        userId,
        noteTags: {
          create: tagRecords.map((tag) => ({ tagId: tag.id })),
        },
      },
      include: this.noteInclude,
    });
    return this.mapNote(note);
  }

  async update(userId: string, id: string, dto: UpdateNoteDto) {
    await this.findOne(userId, id); // throws if not found

    const tagRecords =
      dto.tags !== undefined ? await this.upsertTags(dto.tags) : undefined;

    const note = await this.prisma.note.update({
      where: { id },
      data: {
        ...(dto.title !== undefined && { title: dto.title }),
        ...(dto.content !== undefined && { content: dto.content }),
        ...(dto.isPinned !== undefined && { isPinned: dto.isPinned }),
        ...(dto.isDeleted !== undefined && { isDeleted: dto.isDeleted }),
        ...(tagRecords !== undefined && {
          noteTags: {
            deleteMany: {},
            create: tagRecords.map((tag) => ({ tagId: tag.id })),
          },
        }),
      },
      include: this.noteInclude,
    });
    return this.mapNote(note);
  }

  async remove(userId: string, id: string) {
    await this.findOne(userId, id); // throws if not found
    await this.prisma.note.delete({ where: { id } });
  }

  private async upsertTags(tagNames: string[]) {
    return Promise.all(
      tagNames.map((name) =>
        this.prisma.tag.upsert({
          where: { name },
          create: { name },
          update: {},
        }),
      ),
    );
  }
}
