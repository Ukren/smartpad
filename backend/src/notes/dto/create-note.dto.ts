import {
  IsArray,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateNoteDto {
  @IsString()
  @MinLength(1)
  @MaxLength(200)
  declare title: string;

  @IsString()
  @IsOptional()
  declare content?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  declare tags?: string[];
}
