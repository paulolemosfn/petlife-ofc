import { BuilderBase } from '../../../../common/utils/base.builder';
import { FakerUtils } from '../../../../common/utils/faker';
import { UsersEntity } from '../../entities/users.entity';
import { UsersResponseInterface } from '../../interfaces/users.interface';

export class MockBuilderUser extends BuilderBase<MockBuilderUser, UsersEntity> {
  protected builder: any;
  protected instance: any;

  withName(name?: string): MockBuilderUser {
    this.builder.name = name || FakerUtils.faker().name.fullName();

    return this;
  }

  withEmail(email?: string): MockBuilderUser {
    this.builder.email = email || FakerUtils.faker().internet.email();

    return this;
  }

  withPassword(password?: string): MockBuilderUser {
    this.builder.password = password || FakerUtils.faker().internet.password();
    return this;
  }

  buildAll(): UsersResponseInterface {
    return this.withName().withEmail().withPassword().build();
  }
}
