import { BaseEntityInterface } from '../../../common/interfaces/base-entity.interface';

export const buildUserCreate = <T>(data: T): T & BaseEntityInterface => {
  return {
    ...data,
    active: true,
  };
};

export const buildUserUpdate = <T>(
  data: T,
  id: string,
): T & BaseEntityInterface => {
  const build = {
    ...data,
    id,
  };

  return build;
};

export const buildUserInactivation = (id: string): BaseEntityInterface => {
  return {
    id,
    active: false,
    inactivation_date: new Date(),
  };
};

export const buildUserActivation = (id: string): BaseEntityInterface => {
  return {
    id,
    active: true,
    inactivation_date: null,
  };
};
