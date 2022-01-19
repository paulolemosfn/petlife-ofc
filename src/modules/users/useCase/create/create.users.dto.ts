import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';
import { Match } from '../../../../common/utils/match.decorator';

export class CreateUsersDTO {
  @ApiProperty({
    description: 'name',
    example: 'Name',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'email',
    example: 'test@petlife.com',
  })
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;

  @ApiProperty({
    description: 'password',
    example: '12345678',
  })
  @MinLength(8)
  @MaxLength(16)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  @IsNotEmpty()
  @IsString()
  password: string;

  @MinLength(8)
  @MaxLength(16)
  @Match('password')
  @IsNotEmpty()
  @IsString()
  confirmPassword?: string;
}
