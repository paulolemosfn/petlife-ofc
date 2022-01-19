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
import { InactivateOwnersUseCase } from './inactivate.owners.useCase';
import { OwnersResponseDTO } from '../../dtos/owners.response.dto';

@ApiTags('Owners')
@CustomApiBadRequestResponse()
@ApiInternalServerErrorResponse({
  description: 'Sorry we are experiencing technical problems',
})
@Controller('owners')
export class InactivateOwnersController {
  constructor(private inactivateOwnersUseCase: InactivateOwnersUseCase) {}

  @Post('inactivation/:id')
  @ApiOperation({ summary: 'Inativa um funcionário' })
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
    await this.inactivateOwnersUseCase.execute(id, defaultHeaders);
  }
}
