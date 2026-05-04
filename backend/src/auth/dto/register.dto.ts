import { IsEmail, IsString, MinLength, MaxLength } from 'class-validator';

export class RegisterDto {
  @IsString()
  @MinLength(2)
  @MaxLength(80)
  declare name: string;

  @IsEmail()
  declare email: string;

  @IsString()
  @MinLength(6)
  declare password: string;
}
