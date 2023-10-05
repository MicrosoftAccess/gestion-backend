import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Case, newCase } from './entities/case.entity';
import { CreateCaseDto } from './dto/create-case.dto';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class CasesService {
  constructor(private _prisma: PrismaService,private _authService:AuthService,private _jwtService: JwtService) {}
  async create(createCaseDto: CreateCaseDto, filename: string): Promise<Case | null> {
    console.log("🚀 ~ file: cases.service.ts:11 ~ CasesService ~ create ~ filename:", filename)

    const test =  this._authService.getCurrentToken()
    const token = this._jwtService.decode(test.split(' ')[1])
    return await this._prisma.case.create({
      data: {
        title: createCaseDto.title,
        nrc: createCaseDto.nrc,
        campus: createCaseDto.campus,
        description: createCaseDto.description,
        files: filename,
        user: {
          connect: {
              id: token.sub,         
          },
        },
      },
      include: {
        user: true,
      },
    })
    
  }

  async findAll(): Promise<newCase[] | null> {
    console.log('---------------')
    const test = this._authService.getCurrentToken()
    const token = this._jwtService.decode(test.split(' ')[1])
    return await this._prisma.case.findMany({
      where:{userId:token.sub}

    });
  }

  findOne(id: number) {
    return `This action returns a #${id} case`;
  }

  update(id: number) {
    return `This action updates a #${id} case`;
  }

  remove(id: number) {
    return `This action removes a #${id} case`;
  }
}
