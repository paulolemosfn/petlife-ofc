import { Controller, Post, HttpCode, Param } from '@nestjs/common';
import {
  ApiTags,
  ApiInternalServerErrorResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { IdRequestDTO } from '../../../../common/dtos/id-request.dto';
import { CustomApiResponseWrapper } from '../../../../system/decorators/swagger/api-response-wrapper.decorator';
import { CustomApiBadRequestResponse } from '../../../../system/decorators/swagger/apibadrequest.decorator';
import { UserHeadersRequest } from '../../../../system/headers/paramDecorators/UserRequest';
import { DefaultHeadersInterface } from '../../../../common/interfaces/default-headers.interface';
import { OwnersResponseDTO } from '../../dtos/owners.response.dto';
import { ActivateOwnersUseCase } from './activate.owners.useCase';

@ApiTags('Owners')
@CustomApiBadRequestResponse()
@ApiInternalServerErrorResponse({
  description: 'Sorry we are experiencing technical problems',
})
@Controller('owners')
export class ActivateOwnersController {
  constructor(private activateOwnersUseCase: ActivateOwnersUseCase) {}

  @Post('activation/:id')
  @ApiOperation({ summary: 'Ativa um dono' })
  @HttpCode(204)
  @CustomApiResponseWrapper({
    status: 204,
    description: 'The record has been successfully stored',
    type: OwnersResponseDTO,
  })
  async handle(
    @Param() { id }: IdRequestDTO,
    @UserHeadersRequest() defaultHeaders: DefaultHeadersInterface,
  ): Promise<void> {
    await this.activateOwnersUseCase.execute(id, defaultHeaders);
  }
}
