import { Injectable } from '@nestjs/common';
import { CreateCampusDto } from './dto/create-campus.dto';
import { UpdateCampusDto } from './dto/update-campus.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CampusService {
  constructor(private _prisma:PrismaService){}
  create(createCampusDto: CreateCampusDto) {
    return 'This action adds a new campus';
  }

  findAll() {
    return this._prisma.campus.findMany(
      
    );
  }

  findOne(id: number) {
    return `This action returns a #${id} campus`;
  }

  update(id: number, updateCampusDto: UpdateCampusDto) {
    return `This action updates a #${id} campus`;
  }

  remove(id: number) {
    return `This action removes a #${id} campus`;
  }
}
