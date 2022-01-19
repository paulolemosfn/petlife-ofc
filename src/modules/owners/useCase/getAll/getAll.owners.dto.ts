import { IntersectionType, PartialType } from '@nestjs/swagger';
import { FindAllQueryDto } from '../../../../common/dtos/findall-query.dto';
import { OwnersResponseDTO } from '../../dtos/owners.response.dto';

export class GetAllOwnersDTO extends PartialType(
  IntersectionType(OwnersResponseDTO, FindAllQueryDto),
) {}
