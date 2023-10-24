import { Injectable } from '@nestjs/common';
import { CreateNrcDto } from './dto/create-nrc.dto';
import { UpdateNrcDto } from './dto/update-nrc.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NrcService {
  constructor(private _prisma: PrismaService){}
  create(createNrcDto: CreateNrcDto) {
    return 'This action adds a new nrc ';
  }

  async findAll() {

    return await this._prisma.nRC.findMany({

    })
  }

  async findOne(id: number) {
    return await this._prisma.nRC.findMany({
      where:{
        campusId:id
      }
    });
  }

  update(id: number, updateNrcDto: UpdateNrcDto) {
    return `This action updates a #${id} nrc`;
  }

  remove(id: number) {
    return `This action removes a #${id} nrc`;
  }
}
