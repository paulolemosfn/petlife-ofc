import { Controller, Get, Query } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { GetAllPagedResponseInterface } from '../../../../common/interfaces/response/getAll.paged.response.interface';
import { CustomApiResponseGetAllWrapper } from '../../../../system/decorators/swagger/api-response-get-all-wrapper.decorator';
import { CustomApiBadRequestResponse } from '../../../../system/decorators/swagger/apibadrequest.decorator';
import { UsersResponseDTO } from '../../dtos/users.response.dto';
import { UsersEntity } from '../../entities/users.entity';
import { GetAllUsersDTO } from './getAll.users.dto';
import { GetAllUsersUseCase } from './getAll.users.useCase';

@ApiTags('Users')
@CustomApiBadRequestResponse()
@ApiInternalServerErrorResponse({
  description: 'Sorry we are experiencing technical problems',
})
@Controller('users')
export class GetAllUsersController {
  constructor(private getAllUsersUseCase: GetAllUsersUseCase) {}

  @Get()
  @ApiOperation({ summary: 'Lista todos os usuarios' })
  @CustomApiResponseGetAllWrapper({
    status: 200,
    description: 'Users found',
    type: UsersResponseDTO,
  })
  async handle(
    @Query() query: GetAllUsersDTO,
  ): Promise<UsersEntity[] | GetAllPagedResponseInterface<UsersEntity>> {
    return this.getAllUsersUseCase.execute(query);
  }
}
