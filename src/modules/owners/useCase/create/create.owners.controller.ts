import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiHeader,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { DefaultHeadersInterface } from '../../../../common/interfaces/default-headers.interface';
import { CustomApiBadRequestResponse } from '../../../../system/decorators/swagger/apibadrequest.decorator';
import { UserHeadersRequest } from '../../../../system/headers/paramDecorators/UserRequest';
import { OwnersResponseDataDTO } from '../../dtos/owners.response.data.dto';
import { CreateOwnersDTO } from './create.owners.dto';
import { CreateOwnersUseCase } from './create.owners.useCase';
import { CreateOwnerResponseDTO } from './dtos/response/create-owner.response.dto';

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
export class CreateOwnersController {
  constructor(private createOwnersUseCase: CreateOwnersUseCase) {}

  @Post()
  @ApiOperation({ summary: 'Cria um novo dono' })
  @ApiCreatedResponse({
    description: 'The Record has been successfully stored',
    type: OwnersResponseDataDTO,
  })
  public async handle(
    @Body() createOwnersData: CreateOwnersDTO,
    @UserHeadersRequest() defaultHeaders: DefaultHeadersInterface,
  ): Promise<CreateOwnerResponseDTO> {
    const result = await this.createOwnersUseCase.execute(
      createOwnersData,
      defaultHeaders,
    );

    return new CreateOwnerResponseDTO(result);
  }
}
