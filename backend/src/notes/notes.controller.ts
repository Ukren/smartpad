import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import type { Request } from 'express';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('notes')
@UseGuards(JwtAuthGuard)
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  private userId(req: Request): string {
    return (req.user as { id: string }).id;
  }

  // NOTE: pinned and deleted must come BEFORE :id
  @Get('pinned')
  findPinned(@Req() req: Request) {
    return this.notesService.findPinned(this.userId(req));
  }

  @Get('deleted')
  findDeleted(@Req() req: Request) {
    return this.notesService.findDeleted(this.userId(req));
  }

  @Get()
  findAll(@Req() req: Request, @Query('search') search?: string) {
    return this.notesService.findAll(this.userId(req), search);
  }

  @Get(':id')
  findOne(@Req() req: Request, @Param('id') id: string) {
    return this.notesService.findOne(this.userId(req), id);
  }

  @Post()
  create(@Req() req: Request, @Body() dto: CreateNoteDto) {
    return this.notesService.create(this.userId(req), dto);
  }

  @Patch(':id')
  update(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() dto: UpdateNoteDto,
  ) {
    return this.notesService.update(this.userId(req), id, dto);
  }

  @Delete(':id')
  remove(@Req() req: Request, @Param('id') id: string) {
    return this.notesService.remove(this.userId(req), id);
  }
}
