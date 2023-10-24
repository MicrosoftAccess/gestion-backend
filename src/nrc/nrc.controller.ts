import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NrcService } from './nrc.service';
import { CreateNrcDto } from './dto/create-nrc.dto';
import { UpdateNrcDto } from './dto/update-nrc.dto';

@Controller('nrc')
export class NrcController {
  constructor(private readonly nrcService: NrcService) {}

  @Post()
  create(@Body() createNrcDto: CreateNrcDto) {
    return this.nrcService.create(createNrcDto);
  }

  @Get()
  findAll() {
    return this.nrcService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.nrcService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNrcDto: UpdateNrcDto) {
    return this.nrcService.update(+id, updateNrcDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.nrcService.remove(+id);
  }
}
