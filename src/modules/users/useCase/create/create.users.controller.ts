import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CustomApiResponseWrapper } from '../../../../system/decorators/swagger/api-response-wrapper.decorator';
import { CustomApiBadRequestResponse } from '../../../../system/decorators/swagger/apibadrequest.decorator';
import { UsersResponseDTO } from '../../dtos/users.response.dto';
import { CreateUsersUseCase } from './create.users.useCase';
import { CreateUsersRequestDTO } from './dtos/request/create.users.request.dto';
import { CreateUsersResponseDTO } from './dtos/response/create.users.response.dto';

@ApiTags('Users')
@ApiBadRequestResponse({
  description: 'Bad Request',
})
@CustomApiBadRequestResponse()
@ApiInternalServerErrorResponse({
  description: 'Sorry we are experiencing technical problems',
})
@Controller('users')
export class CreateUsersController {
  constructor(private createUsersUseCase: CreateUsersUseCase) {}
  @Post()
  @ApiOperation({ summary: 'Cria um novo usuario' })
  @CustomApiResponseWrapper({
    status: 201,
    description: 'The record has been successfully stored',
    type: UsersResponseDTO,
  })
  async handle(
    @Body() createUsersDTO: CreateUsersRequestDTO,
  ): Promise<CreateUsersResponseDTO> {
    const res = await this.createUsersUseCase.execute(createUsersDTO);

    return new CreateUsersResponseDTO(res);
  }
}
