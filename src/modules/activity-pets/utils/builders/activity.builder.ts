import { BuilderBase } from '../../../../common/utils/base.builder';
import { FakerUtils } from '../../../../common/utils/faker';
import { ActivityEntity } from '../../entities/activity.entity';
import { ActivityEnum } from '../enums/activity';

export class MockBuilderActivity extends BuilderBase<
  MockBuilderActivity,
  ActivityEntity
> {
  protected builder: any;
  protected instance: any;

  withCreatedBy(name?: string): MockBuilderActivity {
    this.builder.name = name || FakerUtils.faker().name.fullName();

    return this;
  }

  withActivity(activity?: ActivityEnum): MockBuilderActivity {
    const activities: ActivityEnum[] = [
      ActivityEnum.FOOD,
      ActivityEnum.PHYSIOLOGICAL_NEEDS,
      ActivityEnum.STROLL,
      ActivityEnum.WATER,
    ];

    const randomActivity =
      activities[Math.floor(Math.random() * activities.length)];

    this.builder.activity = activity || randomActivity;

    return this;
  }

  withActivityDate(activity_date?: string): MockBuilderActivity {
    this.builder.activity_date =
      activity_date || FakerUtils.faker().date.recent().toString();

    return this;
  }

  withPetId(pet_id?: string): MockBuilderActivity {
    this.builder.pet_id = pet_id || FakerUtils.faker().datatype.uuid();

    return this;
  }

  withOwnerId(owner_id?: string): MockBuilderActivity {
    this.builder.owner_id = owner_id || FakerUtils.faker().datatype.uuid();

    return this;
  }

  withUserId(user_id?: string): MockBuilderActivity {
    this.builder.user_id = user_id || FakerUtils.faker().datatype.uuid();
    return this;
  }

  buildAll(): ActivityEntity {
    return this.withCreatedBy()
      .withActivity()
      .withActivityDate()
      .withOwnerId()
      .withPetId()
      .withUserId()
      .build();
  }
}
