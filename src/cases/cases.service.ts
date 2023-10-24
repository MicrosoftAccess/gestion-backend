import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Case, ICaseForm, newCase } from './entities/case.entity';
import { CreateCaseDto } from './dto/create-case.dto';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { IToken } from 'src/interfaces/users.interfaces';
import { UpdateCaseDto } from './dto/update-case.dto';
import { time } from 'console';
@Injectable()
export class CasesService {
  constructor(
    private _prisma: PrismaService,
    private _authService: AuthService,
    private _jwtService: JwtService,
  ) {}
  async create(
    createCaseDto: ICaseForm,
    filename: string,
  ): Promise<any | null> {
    const test = this._authService.getCurrentToken();
    const token = this._jwtService.decode(test.split(' ')[1]);
    return await this._prisma.case.create({
      data: {
        title: createCaseDto.title,
        campus: {
          connect: {
            id: createCaseDto.campus,
          },
        },
        description: createCaseDto.description,
        files: filename,
        student: {
          connect: {
            id: token.sub,
          },
        },
        professor: {
          connect: {
            id: createCaseDto.nrc.professorId,
          },
        },
        nrc: {
          connect: {
            id: createCaseDto.nrc.id,
          },
        },
      },
      include: {
        campus: true,
        student: {
          select: {
            name: true,
            surname: true,
            id: true,
            role: true,
            rut: true,
          },
        },
        professor: true,
      },
    });
  }

  async findAll(): Promise<newCase[] | null> {
    const test = this._authService.getCurrentToken();
    const token: IToken = this._jwtService.decode(test.split(' ')[1]) as IToken;

    const currentUser = await this._prisma.user.findFirst({
      where: { id: token.sub },
    });

    console.log(token);
    let condition = {};
    if (currentUser.role === 'PROFESSOR') {
      condition = {
        professorId: token.sub,
        OR: [{ status: 'SOLVED' }, { status: 'APPROVED' }],
      };
    } else if (currentUser.role === 'STUDENT') {
      condition = {
        studentId: token.sub,
      };
    } else {
      condition = {
        OR: [{ status: 'SOLVED' }, { status: 'APPROVED' },{ status: 'UNSOLVED' },{ status: 'REJECTED' }]
      };
    }

    return await this._prisma.case.findMany({
      where: condition,
      orderBy: {
        id: 'desc',
      },
      include: {
        campus: true,
        nrc: true,
      },
    });
  }

  async findOne(id: number) {
    return await this._prisma.case.findFirst({
      where: { id: id },
      include: {
        professor: {
          select: {
            name: true,
            surname: true,
          },
        },
        student: {
          select: {
            name: true,
            surname: true,
            rut: true,
          },
        },
        VR: {
          select: {
            name: true,
            surname: true,
            rut: true,
          },
        },
      },
    });
  }

  async update(id: number, updateCaseDto: UpdateCaseDto) {
    const test = this._authService.getCurrentToken();
    const token: IToken = this._jwtService.decode(test.split(' ')[1]) as IToken;
    let data = {};
    if (token.role == 'PROFESSOR') {
      data = {
        response: updateCaseDto.response,
        status: 'SOLVED',
        respondedAt: new Date(),
        dateTest: updateCaseDto.dateTest,
        professor: {
          connect: {
            id: token.sub,
          },
        },
      };
    } else {
      data = {
        vrResponse: updateCaseDto.vrResponse,
        status: updateCaseDto.status,
        respondedAt: new Date(),
        VR: {
          connect: {
            id: token.sub,
          },
        },
      };
    }
    return await this._prisma.case.update({
      data,
      where: {
        id: id,
      },
    });
  }

  // async updateAsVr(id:number,updateCaseDto: UpdateCaseDto){
  //   const test = this._authService.getCurrentToken();
  //   const token: IToken = this._jwtService.decode(test.split(' ')[1]) as IToken;
  //   return await this._prisma.case.update({
  //     data:{
  //       status: updateCaseDto.status,
  //       vrResponse: updateCaseDto.vrResponse
  //     },
  //     where:{
  //       id:id
  //     }
  //   })
  // }

  remove(id: number) {
    return `This action removes a #${id} case`;
  }
}
