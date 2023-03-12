import { BuilderBase } from '../../../../common/utils/base.builder';
import { FakerUtils } from '../../../../common/utils/faker';
import { OwnersEntity } from '../../entities/owners.entity';
import OwnersInterface from '../../interfaces/owners-response.interface';

export class MockBuilderOwner extends BuilderBase<
  MockBuilderOwner,
  OwnersEntity
> {
  protected builder: any;
  protected instance: any;

  withOwnerName(owner_name?: string): MockBuilderOwner {
    this.builder.owner_name = owner_name || FakerUtils.faker().name.fullName();

    return this;
  }

  withPetId(pet_id?: string): MockBuilderOwner {
    this.builder.pet_id = pet_id || FakerUtils.faker().datatype.uuid();

    return this;
  }

  withUserId(user_id?: string): MockBuilderOwner {
    this.builder.user_id = user_id || FakerUtils.faker().datatype.uuid();
    return this;
  }

  buildAll(): OwnersInterface {
    return this.withOwnerName().withPetId().withUserId().build();
  }
}
