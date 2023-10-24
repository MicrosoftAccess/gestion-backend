import { NRC, User } from "@prisma/client";
import { IsNotEmpty } from "class-validator";

export class CreateCaseDto {
    @IsNotEmpty()
    title: string;
    @IsNotEmpty()
    nrc: number
    @IsNotEmpty()
    campus: number;
    @IsNotEmpty()
    description: string;
    studentId: number;
    professorId: number;
}
