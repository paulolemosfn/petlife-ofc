import { RequestGetAllInterface } from '../interfaces/interfaces';
export declare const formatPaginateDataToResponse: <T, Q>(
  queryParams: Q & RequestGetAllInterface,
  dataDB: {
    data: T[];
    count: number;
  },
) => {
  data: T[];
  count: number;
  limit: number;
  page: number;
  totalPages: number;
};
export declare const getTotalPages: (count: number, limit: number) => number;
export declare const buildSortParams: <T>(
  data: T & RequestGetAllInterface,
) => Record<string, string> & {
  sortParam: string;
  sortOrder: string;
};
export declare const getSortParam: (sortParam?: string | undefined) => string;
export declare const getSortOrder: (
  sortParam: string,
  sortOrder?: string | undefined,
) => string;
export declare const getPaginationParams: <T>(
  queryParams: T & RequestGetAllInterface,
) => {
  take: number;
  skip: number;
};
export declare const getTake: (size?: string | undefined) => number;
export declare const getSkip: (
  take: number,
  page?: string | undefined,
) => number;
