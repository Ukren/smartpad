import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import type { Request } from 'express';
import { TagsService } from './tags.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('tags')
@UseGuards(JwtAuthGuard)
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  private userId(req: Request): string {
    return (req.user as { id: string }).id;
  }

  @Get()
  findAll(@Req() req: Request) {
    return this.tagsService.findAll(this.userId(req));
  }

  @Get(':name/notes')
  findNotesByTag(@Req() req: Request, @Param('name') name: string) {
    return this.tagsService.findNotesByTag(this.userId(req), name);
  }
}
