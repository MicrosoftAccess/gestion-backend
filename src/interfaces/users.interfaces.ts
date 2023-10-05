import { User as UserModel, Role } from '@prisma/client';

export interface User extends UserModel {
  id: number;
  name: string;
  password: string;
  surname: string;
  email: string;
  rut: string;
  role: Role;
}
