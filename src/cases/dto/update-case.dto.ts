import { PartialType } from '@nestjs/mapped-types';
import { CreateCaseDto } from './create-case.dto';
import { IsNotEmpty } from 'class-validator';
import { Status } from '@prisma/client';

export class UpdateCaseDto extends PartialType(CreateCaseDto) {
    response: string;
    respondedAt: Date;
    dateTest: Date;
    status: Status
    vrResponse: string;
}
