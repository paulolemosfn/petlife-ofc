import { formatPaginateDataToResponse } from './paginate';
import {
  OptionsTypeOrmGetAllWithoutPagination,
  OptionsTypeOrmGetAllWithPagination,
  PaginateResponseProperties,
  RequestGetAllInterface,
  UserRequestInterface,
} from '../interfaces/interfaces';
declare const formatParamsToTypeOrmOptionsWithoutPaginate: <T>(
  queryParams: T & RequestGetAllInterface,
  inactive?: boolean,
) => OptionsTypeOrmGetAllWithoutPagination;
declare const formatParamsToTypeOrmOptionsWithPaginate: <T>(
  queryParams: T & RequestGetAllInterface,
  inactive?: boolean,
) => OptionsTypeOrmGetAllWithPagination;
export {
  formatParamsToTypeOrmOptionsWithoutPaginate,
  formatParamsToTypeOrmOptionsWithPaginate,
  formatPaginateDataToResponse,
  RequestGetAllInterface,
  OptionsTypeOrmGetAllWithPagination,
  OptionsTypeOrmGetAllWithoutPagination,
  PaginateResponseProperties,
  UserRequestInterface,
};
