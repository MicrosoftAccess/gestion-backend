import { IsNotEmpty } from "class-validator";

export class CreateCaseDto {
    @IsNotEmpty()
    title: string;
    @IsNotEmpty()
    nrc: number;
    @IsNotEmpty()
    campus: string;
    @IsNotEmpty()
    description: string;
    userId: number;
}
