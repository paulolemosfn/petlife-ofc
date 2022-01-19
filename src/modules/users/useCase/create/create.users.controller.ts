import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUsersDTO } from './create.users.dto';
import { CreateUsersUseCase } from './create.users.useCase';
import { CustomApiBadRequestResponse } from '../../../../system/decorators/swagger/apibadrequest.decorator';
import { CustomApiResponseWrapper } from '../../../../system/decorators/swagger/api-response-wrapper.decorator';
import { UsersEntity } from '../../entities/users.entity';
import { UsersResponseDTO } from '../../dtos/users.response.dto';

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
  async handle(@Body() createUsersDTO: CreateUsersDTO): Promise<UsersEntity> {
    return await this.createUsersUseCase.execute(createUsersDTO);
  }
}
