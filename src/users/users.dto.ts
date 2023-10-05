import { IsNotEmpty } from "class-validator";

export class LoginUsersDto {
    @IsNotEmpty()
    email:string
    @IsNotEmpty()
    password: string
}