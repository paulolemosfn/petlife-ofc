import { Controller, Get, Param } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { DefaultHeadersInterface } from '../../../../common/interfaces/default-headers.interface';
import { UserHeadersRequest } from '../../../../system/headers/paramDecorators/UserRequest';
import { IdRequestDTO } from '../../../../common/dtos/id-request.dto';
import { CustomApiResponseWrapper } from '../../../../system/decorators/swagger/api-response-wrapper.decorator';
import { CustomApiBadRequestResponse } from '../../../../system/decorators/swagger/apibadrequest.decorator';
import { OwnersResponseDTO } from '../../dtos/owners.response.dto';
import { OwnersEntity } from '../../entities/owners.entity';
import { GetOwnerByIdUseCase } from './getById.owners.useCase';

@ApiTags('Owners')
@CustomApiBadRequestResponse()
@ApiInternalServerErrorResponse({
  description: 'Sorry we are experiencing technical problems',
})
@Controller('owners')
export class GetOwnerByIdController {
  constructor(private getOwnersByIdUseCase: GetOwnerByIdUseCase) {}

  @Get(':id')
  @ApiOperation({ summary: 'Lista um dono pelo id' })
  @CustomApiResponseWrapper({
    status: 200,
    description: 'The record has been successfully returned',
    type: OwnersResponseDTO,
  })
  @ApiNotFoundResponse({ description: 'Owner not found' })
  public async handle(
    @Param() { id }: IdRequestDTO,
    @UserHeadersRequest() defaultHeaders: DefaultHeadersInterface,
  ): Promise<OwnersEntity> {
    return this.getOwnersByIdUseCase.execute(id, defaultHeaders);
  }
}
