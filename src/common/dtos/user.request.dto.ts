import { IsNotEmpty } from 'class-validator';

export class UserRequestDTO {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  useremail: string;

  @IsNotEmpty()
  user_id: string;
}
