import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsOptional } from 'class-validator';
import { CreateNoteDto } from './create-note.dto';

export class UpdateNoteDto extends PartialType(CreateNoteDto) {
  @IsBoolean()
  @IsOptional()
  declare isPinned?: boolean;

  @IsBoolean()
  @IsOptional()
  declare isDeleted?: boolean;
}
