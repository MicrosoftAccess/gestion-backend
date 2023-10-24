import { Module } from '@nestjs/common';
import { NrcService } from './nrc.service';
import { NrcController } from './nrc.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [NrcController],
  providers: [NrcService, PrismaService],
})
export class NrcModule {}
