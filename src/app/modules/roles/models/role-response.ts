import { Role } from "./role";

export interface RoleResponse {
  data: Array<Role>;
  count: number;
  skip: number;
  take: number;
}
