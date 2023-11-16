import { Prisma } from '@prisma/client';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import * as excelJs from 'excelJs'
import * as fs from 'fs'
import * as xlsx from 'xlsx'
import * as tmp from 'tmp'
import { PrismaService } from 'src/prisma/prisma.service';
import { querys } from 'src/utils/querys';


@Injectable()
export class ReportService {

  constructor(private _prisma:PrismaService){}

  create(createReportDto: CreateReportDto) {
    return 'This action adds a new report';
  }

  async generateExcel(queryInfo:any){
    

    let val = querys[queryInfo.query](queryInfo)
    console.log(queryInfo)
    let data:any = await this._prisma.$queryRawUnsafe(val)

    // if (!data) return false

   const newData = data.reduce((rv, x) => {
    (rv[x[`${queryInfo.reduce}`]] = rv[x[`${queryInfo.reduce}`]] || []).push(x);
    return rv;
  }, {});
  
    let row = []
    let reportData = [];
   Object.keys(newData).forEach(professor =>{
    row.push(newData[professor])
  })


  for (const i in newData){
    const newCount = {};
    for (const j of newData[i]){
      newCount['NOMBRE'] = `${j.name ?? 'Reporte General'} ${j.surname ??  ''} `;
      switch (j.status) {
        case 'APPROVED':
          newCount['APROBADO'] = j.count;
          break;
        case 'UNSOLVED':
          newCount['NO RESUELTO'] = j.count;
          break;
        case 'SOLVED':
          newCount['RESUELTO'] = j.count;
          break;
        case 'REJECTED':
          newCount['RECHAZADO'] = j.count; 
          break;
      }
      
      
    }
    !('APROBADO' in newCount) && (newCount['APROBADO'] = 0);
    !('NO RESUELTO' in newCount) && (newCount['NO RESUELTO'] = 0);
    !('RESUELTO' in newCount) && (newCount['RESUELTO'] = 0);
    !('RECHAZADO' in newCount) && (newCount['RECHAZADO'] = 0);
    reportData.push(newCount);
    // newCount['NOMBRE'] ? 
  }
   

    const worksheet = xlsx.utils.json_to_sheet(reportData);
    const workbook = {
      Sheets: { data: worksheet },
      SheetNames: ['data']
    };
    const excelBuffer: any = xlsx.write(workbook, {
      bookType: 'xlsx',
      type: 'buffer',
    });
    
    return excelBuffer;
    
  
    
  }

  findAll() {
    return `This action returns all report`;
  }

  async findOne(id: number) {

    

    return `This action returns a #${id} report`;
  }

  update(id: number, updateReportDto: UpdateReportDto) {
    return `This action updates a #${id} report`;
  }

  remove(id: number) {
    return `This action removes a #${id} report`;
  }
}
