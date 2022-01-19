import { PaginateResponseProperties } from '../interfaces';

export interface GetAllPagedResponseInterface<T>
  extends PaginateResponseProperties {
  data: T[];
}
