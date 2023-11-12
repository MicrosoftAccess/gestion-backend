import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Header,
  StreamableFile,
} from '@nestjs/common';
import { ReportService } from './report.service';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { Response } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('report')
export class ReportController {
  constructor(
    private readonly reportService: ReportService,
    private _excelService: ReportService,
    private _prisma: PrismaService,
  ) {}

  @Post()
  create(@Body() createReportDto: CreateReportDto) {
    return this.reportService.create(createReportDto);
  }

  @Post('/generate/excel')
  async downloadPDF(@Res({ passthrough: true }) res: Response, @Body() queryInfo:any) {
    res.header('Content-disposition', `attachment; filename=${'Reporte Gestión Certificados' + new Date().toISOString()}.xlsx`);
    res.type('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    let result = await this._excelService.generateExcel(queryInfo);
    return new StreamableFile(result);
    // res.download(`${result}`)
    // return this._excelService.generateExcel()
  }

  @Get()
  findAll() {
    return this.reportService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reportService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReportDto: UpdateReportDto) {
    return this.reportService.update(+id, updateReportDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reportService.remove(+id);
  }
}
