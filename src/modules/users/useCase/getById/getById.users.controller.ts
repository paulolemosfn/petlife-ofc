import { DefaultHeadersInterface } from './../../../../common/interfaces/default-headers.interface';
import { Controller, Get, Param } from '@nestjs/common';
import {
  ApiHeader,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UserHeadersRequest } from '../../../../system/headers/paramDecorators/UserRequest';
import { IdRequestDTO } from '../../../../common/dtos/id-request.dto';
import { CustomApiResponseWrapper } from '../../../../system/decorators/swagger/api-response-wrapper.decorator';
import { CustomApiBadRequestResponse } from '../../../../system/decorators/swagger/apibadrequest.decorator';
import { UsersResponseDTO } from '../../dtos/users.response.dto';
import { UsersEntity } from '../../entities/users.entity';
import { GetUsersByIdUseCase } from './getById.users.useCase';

@ApiTags('Users')
@ApiHeader({
  name: 'token',
  required: true,
})
@ApiHeader({
  name: 'x-api-key',
  required: true,
})
@CustomApiBadRequestResponse()
@ApiInternalServerErrorResponse({
  description: 'Sorry we are experiencing technical problems',
})
@Controller('users')
export class GetUsersByIdController {
  constructor(private getUsersByIdUseCase: GetUsersByIdUseCase) {}

  @Get(':id')
  @ApiOperation({ summary: 'Lista um usuario pelo id' })
  @CustomApiResponseWrapper({
    status: 200,
    description: 'The record has been successfully returned',
    type: UsersResponseDTO,
  })
  @ApiNotFoundResponse({ description: 'Users not found' })
  public async handle(
    @Param() { id }: IdRequestDTO,
    @UserHeadersRequest() defaultHeaders: DefaultHeadersInterface,
  ): Promise<UsersEntity> {
    return this.getUsersByIdUseCase.execute(id, defaultHeaders);
  }
}
