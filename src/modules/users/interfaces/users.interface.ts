import { RequestGetAllInterface } from '../../../common/interfaces/interfaces';

export interface UsersRequestGetAllInterface extends RequestGetAllInterface {
  name?: string;
  email?: string;
}

export interface UsersResponseInterface {
  name: string;
  email: string;
  password: string;
  created_by_name: string;
  created_by_email: string;
  updated_by_name: string;
  updated_by_email: string;
  active: boolean;
  inactivation_date: string;
  created_at: string;
  updated_at: string;
  id: string;
}
