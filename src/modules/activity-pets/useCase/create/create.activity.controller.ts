import { Controller, Post, Body } from '@nestjs/common';
import {
  ApiTags,
  ApiHeader,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { DefaultHeadersInterface } from '../../../../common/interfaces/default-headers.interface';
import { CustomApiBadRequestResponse } from '../../../../system/decorators/swagger/apibadrequest.decorator';
import { UserHeadersRequest } from '../../../../system/headers/paramDecorators/UserRequest';
import { ActivityResponseDTO } from '../../dtos/activity.response.dto';
import { ActivityEntity } from '../../entities/activity.entity';
import { CreateActivityDTO } from './create.activity.dto';
import { CreateActivityUseCase } from './create.activity.useCase';

@ApiTags('Activity')
@ApiHeader({
  name: 'useremail',
  required: true,
})
@ApiHeader({
  name: 'username',
  required: true,
})
@ApiHeader({
  name: 'user_id',
  required: true,
})
@ApiBadRequestResponse({
  description: 'Bad Request',
})
@CustomApiBadRequestResponse()
@ApiInternalServerErrorResponse({
  description: 'Sorry we are experiencing technical problems',
})
@Controller('activity')
export class CreateActivityController {
  constructor(private createActivityUseCase: CreateActivityUseCase) {}

  @Post()
  @ApiOperation({ summary: 'Cria uma nova atividade' })
  @ApiCreatedResponse({
    description: 'The Record has been successfully stored',
    type: ActivityResponseDTO,
  })
  public async handle(
    @Body() createActivityData: CreateActivityDTO,
    @UserHeadersRequest() defaultHeaders: DefaultHeadersInterface,
  ): Promise<ActivityEntity> {
    return this.createActivityUseCase.execute(
      createActivityData,
      defaultHeaders,
    );
  }
}
