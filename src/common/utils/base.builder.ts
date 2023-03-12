import BaseEntity from '../entities/base-entity';
import { FakerUtils } from './faker';

export class BuilderBase<B, T> {
  protected builder: any;
  protected instance: any;
  constructor() {
    this.builder = {};
    this.instance = this;
  }

  withId(id?: string): B {
    this.builder.id = id ? id : FakerUtils.faker().datatype.uuid();
    return this.instance;
  }
  withTenantId(tenantId?: string): B {
    this.builder.tenantid = tenantId
      ? tenantId
      : FakerUtils.faker().datatype.uuid();
    return this.instance;
  }

  withCreateAt(createdAt?: Date): B {
    this.builder.created_at = createdAt ? createdAt : new Date();
    return this.instance;
  }

  withDeletedAt(deletedAt?: Date | null): B {
    this.builder.deleted_at = deletedAt || new Date();
    return this.instance;
  }

  withUpdatedAt(updatedAt?: Date): B {
    this.builder.updated_at = updatedAt || new Date();
    return this.instance;
  }

  WithInactivationDate(inactivation_date?: Date | null): B {
    this.builder.inactivation_date = inactivation_date || new Date();
    return this.instance;
  }

  withActive(active = true): B {
    this.builder.active = active;
    return this.instance;
  }

  withCreatedByName(created_by_name?: string): B {
    this.builder.created_by_name =
      created_by_name || FakerUtils.faker().name.firstName();
    return this.instance;
  }

  withCreatedByEmail(created_by_email?: string): B {
    this.builder.created_by_email =
      created_by_email || FakerUtils.faker().internet.email();
    return this.instance;
  }

  withUpdatedByName(updated_by_name?: string): B {
    this.builder.updated_by_name =
      updated_by_name || FakerUtils.faker().name.firstName();
    return this.instance;
  }

  withUpdatedByEmail(updated_by_email?: string): B {
    this.builder.updated_by_email =
      updated_by_email || FakerUtils.faker().internet.email();
    return this.instance;
  }

  build(): T & BaseEntity {
    return this.builder;
  }
}
