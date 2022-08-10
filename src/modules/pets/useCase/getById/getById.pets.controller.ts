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
import { PetsResponseDTO } from '../../dtos/pets.response.dto';
import { PetsEntity } from '../../entities/pets.entity';
import { GetPetByIdUseCase } from './getById.pets.useCase';

@ApiTags('Pets')
@CustomApiBadRequestResponse()
@ApiInternalServerErrorResponse({
  description: 'Sorry we are experiencing technical problems',
})
@Controller('pets')
export class GetPetByIdController {
  constructor(private getPetsByIdUseCase: GetPetByIdUseCase) {}

  @Get(':id')
  @ApiOperation({ summary: 'Lista um pet pelo id' })
  @CustomApiResponseWrapper({
    status: 200,
    description: 'The record has been successfully returned',
    type: PetsResponseDTO,
  })
  @ApiNotFoundResponse({ description: 'Pet not found' })
  public async handle(
    @Param() { id }: IdRequestDTO,
    @UserHeadersRequest() defaultHeaders: DefaultHeadersInterface,
  ): Promise<PetsEntity> {
    return this.getPetsByIdUseCase.execute(id, defaultHeaders);
  }
}
