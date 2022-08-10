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
import { PetsResponseDTO } from '../../dtos/pets.response.dto';
import { PetsEntity } from '../../entities/pets.entity';
import { CreatePetsDTO } from './create.pets.dto';
import { CreatePetsUseCase } from './create.pets.useCase';

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
export class CreatePetsController {
  constructor(private createPetsUseCase: CreatePetsUseCase) {}

  @Post()
  @ApiOperation({ summary: 'Cria um novo pet' })
  @ApiCreatedResponse({
    description: 'The Record has been successfully stored',
    type: PetsResponseDTO,
  })
  public async handle(
    @Body() createPetsData: CreatePetsDTO,
    @UserHeadersRequest() defaultHeaders: DefaultHeadersInterface,
  ): Promise<PetsEntity> {
    return this.createPetsUseCase.execute(createPetsData, defaultHeaders);
  }
}
