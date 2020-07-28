export interface IUser {
  role_id: number;
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  tel: string;
  is_confirm_email: number;
  is_confirm_tel: number;
  created_at: string;
  updated_at: string;
  permissions: Array<any>
  password: string;
}
