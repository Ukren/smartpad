import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TagsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(userId: string) {
    // Return unique tags that appear on at least one of this user's notes
    const noteTags = await this.prisma.noteTag.findMany({
      where: { note: { userId } },
      include: { tag: true },
      distinct: ['tagId'],
    });
    return noteTags.map((nt) => nt.tag);
  }

  async findNotesByTag(userId: string, tagName: string) {
    const notes = await this.prisma.note.findMany({
      where: {
        userId,
        isDeleted: false,
        noteTags: { some: { tag: { name: tagName } } },
      },
      include: { noteTags: { include: { tag: true } } },
      orderBy: { updatedAt: 'desc' },
    });
    return notes.map((note) => {
      const { noteTags, ...rest } = note;
      return { ...rest, tags: noteTags.map((nt) => nt.tag) };
    });
  }
}
