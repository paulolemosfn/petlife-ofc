import { RelationalEntity } from '../../entities/metadata/RelationalEntity';

export class BaseModelBuilder<T, U> {
  protected model: T & RelationalEntity;

  constructor() {
    this.model = {} as T & RelationalEntity;
  }

  public withActive(active: boolean): BaseModelBuilder<T, U> {
    this.model.active = active;
    return this;
  }

  public withInactivationDate(
    inactivationDate: Date | null,
  ): BaseModelBuilder<T, U> {
    this.model.inactivation_date = <any>inactivationDate;
    return this;
  }

  public withCreatedAt(created_at: Date): BaseModelBuilder<T, U> {
    this.model.created_at = created_at;
    return this;
  }

  public withUpdatedAt(updated_at: Date): BaseModelBuilder<T, U> {
    this.model.updated_at = updated_at;
    return this;
  }

  public withCreatedByName(createdByName: string): BaseModelBuilder<T, U> {
    this.model.created_by_name = createdByName;
    return this;
  }

  public withCreatedByEmail(createdByEmail: string): BaseModelBuilder<T, U> {
    this.model.created_by_email = createdByEmail;
    return this;
  }

  public withUpdatedByName(updatedByName: string): BaseModelBuilder<T, U> {
    this.model.updated_by_name = updatedByName;
    return this;
  }

  public withUpdatedByEmail(updatedByEmail: string): BaseModelBuilder<T, U> {
    this.model.updated_by_email = updatedByEmail;
    return this;
  }

  public build(): T & RelationalEntity {
    return this.model;
  }
}
