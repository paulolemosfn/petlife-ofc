import { Controller, Body, Put, Param } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { DefaultHeadersInterface } from 'src/common/interfaces/default-headers.interface';
import { UserHeadersRequest } from '../../../../system/headers/paramDecorators/UserRequest';
import { IdRequestDTO } from '../../../../common/dtos/id-request.dto';
import { CustomApiResponseWrapper } from '../../../../system/decorators/swagger/api-response-wrapper.decorator';
import { CustomApiBadRequestResponse } from '../../../../system/decorators/swagger/apibadrequest.decorator';
import { UsersResponseDTO } from '../../dtos/users.response.dto';
import { UsersEntity } from '../../entities/users.entity';
import { UpdateUsersDTO } from '../update/update.users.dto';
import { UpdateUsersUseCase } from '../update/update.users.useCase';

@ApiTags('Users')
@ApiBadRequestResponse({
  description: 'Bad Request',
})
@CustomApiBadRequestResponse()
@ApiInternalServerErrorResponse({
  description: 'Sorry we are experiencing technical problems',
})
@Controller('users')
export class UpdateUsersController {
  constructor(private updateUsersUseCase: UpdateUsersUseCase) {}

  @Put(':id')
  @ApiOperation({ summary: 'Atualiza um usuario' })
  @CustomApiResponseWrapper({
    status: 200,
    description: 'The record has been successfully updated',
    type: UsersResponseDTO,
  })
  async handle(
    @Param() { id }: IdRequestDTO,
    @Body() updateUsersDTO: UpdateUsersDTO,
    @UserHeadersRequest() defaultHeaders: DefaultHeadersInterface,
  ): Promise<UsersEntity> {
    return await this.updateUsersUseCase.execute(
      id,
      updateUsersDTO,
      defaultHeaders,
    );
  }
}
