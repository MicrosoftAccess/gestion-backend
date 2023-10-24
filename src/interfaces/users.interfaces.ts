import { User as UserModel, Role, Case } from '@prisma/client';

export interface User extends UserModel {
  id: number;
  name: string;
  password: string;
  surname: string;
  email: string;
  rut: string;
  role: Role;
  nrc: number[],
  CaseStudent: Case[],
  CaseProfessor: Case[]

}


export interface IToken {
  sub: number,
  email: string,
  role: Role,
  nrc: number[],
  name:string,
  surname: string
}