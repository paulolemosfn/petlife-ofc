import { BaseEntityInterface } from '../interfaces/base-entity.interface';
import { DefaultHeadersInterface } from '../interfaces/default-headers.interface';

export const buildCreateWithUser = <T>(
  data: T,
  headers: DefaultHeadersInterface,
): T & BaseEntityInterface => {
  return {
    ...data,
    created_by_name: headers.username,
    created_by_email: headers.useremail,
    updated_by_name: headers.username,
    updated_by_email: headers.useremail,
    active: true,
  };
};

export const buildUpdateWithUser = <T>(
  data: T,
  id: string,
  headers: DefaultHeadersInterface,
): T & BaseEntityInterface => {
  const build = {
    ...data,
    id,
    updated_by_name: headers.username,
    updated_by_email: headers.useremail,
  };

  return build;
};

export const buildInactivationWithUser = (
  id: string,
  headers: DefaultHeadersInterface,
): BaseEntityInterface => {
  return {
    id,
    active: false,
    inactivation_date: new Date(),
    updated_by_name: headers.username,
    updated_by_email: headers.useremail,
  };
};

export const buildActivationWithUser = (
  id: string,
  headers: DefaultHeadersInterface,
): BaseEntityInterface => {
  return {
    id,
    active: true,
    inactivation_date: null,
    updated_by_name: headers.username,
    updated_by_email: headers.useremail,
  };
};
