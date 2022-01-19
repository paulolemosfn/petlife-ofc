export interface BaseEntityInterface {
  id?: string;
  active?: boolean;
  inactivation_date?: Date;
  created_by_name?: string;
  created_by_email?: string;
  updated_by_name?: string;
  updated_by_email?: string;
  created_at?: Date;
  updated_at?: Date;
}
