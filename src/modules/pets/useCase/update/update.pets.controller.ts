import { DefaultHeadersInterface } from './../../../../common/interfaces/default-headers.interface';
import { Body, Controller, Param, Put } from '@nestjs/common';
import { UserHeadersRequest } from '../../../../system/headers/paramDecorators/UserRequest';
import { UpdatePetsDTO } from './update.pets.dto';
import { PetsEntity } from '../../entities/pets.entity';
import { UpdatePetsUseCase } from './update.pets.useCase';
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
import { PetsResponseDTO } from '../../dtos/pets.response.dto';

@ApiTags('Pets')
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
@Controller('pets')
export class UpdatePetsController {
  constructor(private updatePetsUseCase: UpdatePetsUseCase) {}

  @Put(':id')
  @ApiOperation({ summary: 'Atualiza um pet' })
  @ApiCreatedResponse({
    description: 'The Record has been successfully stored',
    type: PetsResponseDTO,
  })
  public async handle(
    @Param() { id }: IdRequestDTO,
    @Body() data: UpdatePetsDTO,
    @UserHeadersRequest() defaultHeaders: DefaultHeadersInterface,
  ): Promise<PetsEntity> {
    return await this.updatePetsUseCase.execute(id, data, defaultHeaders);
  }
}
