export interface RoleDTO {
  name: string;
}

export enum Roles {
  SUPER_ADMIN = 'SUPERADMIN',
  ADMIN = 'ADMIN',
  CUSTOMER = 'CUSTOMER',
  OPERATOR = 'OPERATOR',
}