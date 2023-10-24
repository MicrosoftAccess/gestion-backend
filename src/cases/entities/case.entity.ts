import { Case as CaseModel, Status, User, Campus, NRC } from '@prisma/client';

export interface Case extends CaseModel {
  id: number;
  createdAt: Date;
  title: string;
  nrc: number;
  description: string;
  files: string;
  status: Status;
  campus: Campus;
  campusId: number;
  student: User;
  studentId: number;
  professor: User;
  professorId: number;
}

export interface newCase {
  id: number;
  createdAt: Date;
  title: string;
  description: string;
  files: string;
  status: Status;
  //   campus: Campus;
  nrc: NRC;
  campusId: number;
  studentId: number;
}

export interface INewCaseInfo {
  form: ICaseForm;
  file: File;
}

export interface ICaseForm {
  title: string;
  campus: number;
  description: string;
  professorId: number;
  nrc: NRC;
}
