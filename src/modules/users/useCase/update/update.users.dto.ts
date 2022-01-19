import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { Match } from '../../../../common/utils/match.decorator';

export class UpdateUsersDTO {
  @ApiPropertyOptional({
    description: 'name',
    example: 'Name',
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({
    description: 'email',
    example: 'test@petlife.com',
  })
  @IsOptional()
  @IsEmail()
  @IsString()
  email?: string;

  @ApiPropertyOptional({
    description: 'password',
    example: '12345678',
  })
  @MinLength(8)
  @MaxLength(16)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  @IsOptional()
  @IsString()
  password?: string;

  @MinLength(8)
  @MaxLength(16)
  @Match('password')
  @ValidateIf((data) => data.password)
  @IsString()
  @IsOptional()
  confirmPassword?: string;
}
