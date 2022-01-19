import { Controller, Get, Query } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { GetAllPagedResponseInterface } from '../../../../common/interfaces/response/getAll.paged.response.interface';
import { CustomApiResponseGetAllWrapper } from '../../../../system/decorators/swagger/api-response-get-all-wrapper.decorator';
import { CustomApiBadRequestResponse } from '../../../../system/decorators/swagger/apibadrequest.decorator';
import { OwnersResponseDTO } from '../../dtos/owners.response.dto';
import { OwnersEntity } from '../../entities/owners.entity';
import { GetAllOwnersDTO } from './getAll.owners.dto';
import { GetAllOwnersUseCase } from './getAll.owners.useCase';

@ApiTags('Owners')
@CustomApiBadRequestResponse()
@ApiInternalServerErrorResponse({
  description: 'Sorry we are experiencing technical problems',
})
@Controller('owners')
export class GetAllOwnersController {
  constructor(private getAllOwnersUseCase: GetAllOwnersUseCase) {}

  @Get()
  @ApiOperation({ summary: 'Lista todos os donos' })
  @CustomApiResponseGetAllWrapper({
    status: 200,
    description: 'Owners found',
    type: OwnersResponseDTO,
  })
  async handle(
    @Query() query: GetAllOwnersDTO,
  ): Promise<OwnersEntity[] | GetAllPagedResponseInterface<OwnersEntity>> {
    return this.getAllOwnersUseCase.execute(query);
  }
}
