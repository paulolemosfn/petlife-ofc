import { DefaultHeadersInterface } from './../../../../common/interfaces/default-headers.interface';
import { Body, Controller, Param, Put } from '@nestjs/common';
import { UserHeadersRequest } from '../../../../system/headers/paramDecorators/UserRequest';
import { UpdateOwnersDTO } from './update.owners.dto';
import { OwnersEntity } from '../../entities/owners.entity';
import { UpdateOwnersUseCase } from './update.owners.useCase';
import {
  ApiTags,
  ApiHeader,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { IdRequestDTO } from '../../../../common/dtos/id-request.dto';
import { CustomApiBadRequestResponse } from '../../../../system/decorators/swagger/apibadrequest.decorator';
import { OwnersResponseDataDTO } from '../../dtos/owners.response.data.dto';

@ApiTags('Owners')
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
@Controller('owners')
export class UpdateOwnersController {
  constructor(private updateOwnersUseCase: UpdateOwnersUseCase) {}

  @Put(':id')
  @ApiOperation({ summary: 'Atualiza um dono' })
  @ApiCreatedResponse({
    description: 'The Record has been successfully stored',
    type: OwnersResponseDataDTO,
  })
  public async handle(
    @Param() { id }: IdRequestDTO,
    @Body() data: UpdateOwnersDTO,
    @UserHeadersRequest() defaultHeaders: DefaultHeadersInterface,
  ): Promise<OwnersEntity> {
    return await this.updateOwnersUseCase.execute(id, data, defaultHeaders);
  }
}
