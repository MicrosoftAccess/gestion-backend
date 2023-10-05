import {Case as CaseModel, Status, User} from '@prisma/client';

export interface Case extends CaseModel {
    id:number;
    createdAt: Date;
    title: string;
    nrc: number;
    description: string;
    files: string;
    status: Status;
    campus: string;
    user: User;
    userId: number;
}


export interface newCase {
    id:number;
    createdAt: Date;
    title: string;
    nrc: number;
    description: string;
    files: string;
    status: Status;
    campus: string;
    userId: number;
}
