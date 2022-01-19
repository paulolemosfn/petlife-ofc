import { IntersectionType, PartialType } from '@nestjs/swagger';
import { FindAllQueryDto } from '../../../../common/dtos/findall-query.dto';
import { UsersResponseDTO } from '../../dtos/users.response.dto';

export class GetAllUsersDTO extends PartialType(
  IntersectionType(UsersResponseDTO, FindAllQueryDto),
) {}
