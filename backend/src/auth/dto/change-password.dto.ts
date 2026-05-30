import { IsString, MinLength } from 'class-validator'

export class ChangePasswordDto {
  @IsString()
  declare currentPassword: string

  @IsString()
  @MinLength(6)
  declare newPassword: string
}
