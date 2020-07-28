import { Permission } from "src/app/core/permission/permission";

export interface Role {
  id: number;
  name: string;
  permissions: Array<Permission>;
  created_at: string;
  updated_at: string;
}
