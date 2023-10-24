import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { CasesService } from './cases.service';
import { CreateCaseDto } from './dto/create-case.dto';
import { UpdateCaseDto } from './dto/update-case.dto';
import { Case, ICaseForm } from './entities/case.entity';
import { AuthService } from 'src/auth/auth.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('cases')
export class CasesController {
  constructor(
    private readonly casesService: CasesService,
    private readonly _authService: AuthService,
  ) {}

  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: function (req, file, cb) {
          cb(null, file.originalname.slice(0, -4) + '_' + Date.now() + '.pdf');
        },
      }),
    }),
  )
  
  @Post()
  create(
    @Body() createCaseDto: any,
    @Headers() headers: any,
    @UploadedFile() file,
  ) {
    this._authService.token$.next(headers.authorization);
    return this.casesService.create(JSON.parse(createCaseDto.form) as ICaseForm, file.filename);
  }

  @Get()
  findAll(@Headers() headers: any) {
    console.log(headers.authorization);
    this._authService.token$.next(headers.authorization);
    return this.casesService.findAll();
  }
  

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.casesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCaseDto: UpdateCaseDto,@Headers() headers: any,) {
    this._authService.token$.next(headers.authorization);
    return this.casesService.update(+id, updateCaseDto);
  }
  // @Patch('vrCase/:id')
  // updateAsVr(@Param('id') id: string, @Body() updateCaseDto: UpdateCaseDto,@Headers() headers: any,) {
  //   this._authService.token$.next(headers.authorization);
  //   return this.casesService.updateAsVr(+id, updateCaseDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.casesService.remove(+id);
  }
}
