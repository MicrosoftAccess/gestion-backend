import {
  Controller,
  Get,
  Param,
  Res,
  StreamableFile,
  UseInterceptors,
} from '@nestjs/common';
import { DownloadService } from './download.service';
import { Response } from 'express';
import { Observable, of } from 'rxjs';
import { join } from 'path';
import { createReadStream } from 'fs';

@Controller('download')
export class DownloadController {
  constructor(private readonly downloadService: DownloadService) {}

  // @Get('buffer')
  // buffer(@Res() response: Response) {
  //   const file = this.downloadService.imageBuffer();
  //   response.send(file);
  // }

  @Get(':filename')
  getFile(@Param('filename') filename, @Res({ passthrough: true }) res: Response): StreamableFile {
    const file = createReadStream(join(process.cwd(), `uploads/${filename}`));
    return new StreamableFile(file);
  }

  @Get('streamable')
  streamable(@Res({ passthrough: true }) response: Response) {
    const file = createReadStream(join(process.cwd(), 'uploads/file_1697494827557.pdf'));
    return new StreamableFile(file);
  }
  @Get('buffer')
 buffer(@Res() response: Response) {
  const file = this.downloadService.imageBuffer();
  response.contentType('image/pdf');
  response.attachment();
  // provide a filename
  // response.attachment('uploads/file_1697478157607.pdf');
  response.send('uploads/'+file);
}
  // @Get(':filename')
  // getPDFFile(@Param('filename') filename,@Res() res): Observable<Object>{
  //   return of(res.sendFile(join(process.cwd(), 'uploads/'+ filename)))
  // }

}
