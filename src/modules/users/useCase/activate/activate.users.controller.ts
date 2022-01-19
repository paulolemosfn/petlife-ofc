import { Controller, Post, HttpCode, Param } from '@nestjs/common';
import {
  ApiTags,
  ApiInternalServerErrorResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { IdRequestDTO } from '../../../../common/dtos/id-request.dto';
import { CustomApiResponseWrapper } from '../../../../system/decorators/swagger/api-response-wrapper.decorator';
import { CustomApiBadRequestResponse } from '../../../../system/decorators/swagger/apibadrequest.decorator';
import { UsersResponseDTO } from '../../dtos/users.response.dto';
import { UserHeadersRequest } from '../../../../system/headers/paramDecorators/UserRequest';
import { DefaultHeadersInterface } from '../../../../common/interfaces/default-headers.interface';
import { ActivateUsersUseCase } from './activate.users.useCase';

@ApiTags('Users')
@CustomApiBadRequestResponse()
@ApiInternalServerErrorResponse({
  description: 'Sorry we are experiencing technical problems',
})
@Controller('users')
export class ActivateUsersController {
  constructor(private activateUsersUseCase: ActivateUsersUseCase) {}

  @Post('activation/:id')
  @ApiOperation({ summary: 'Ativa um funcionário' })
  @HttpCode(204)
  @CustomApiResponseWrapper({
    status: 204,
    description: 'The record has been successfully stored',
    type: UsersResponseDTO,
  })
  async handle(
    @Param() { id }: IdRequestDTO,
    @UserHeadersRequest() defaultHeaders: DefaultHeadersInterface,
  ): Promise<void> {
    await this.activateUsersUseCase.execute(id, defaultHeaders);
  }
}
