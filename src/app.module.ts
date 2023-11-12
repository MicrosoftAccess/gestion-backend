import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CasesModule } from './cases/cases.module';
import { DownloadModule } from './download/download.module';
import { NrcModule } from './nrc/nrc.module';
import { ReportModule } from './report/report.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { CampusModule } from './campus/campus.module';


@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UsersModule,
    CasesModule,
    DownloadModule,
    NrcModule,
    ReportModule,
    MailerModule.forRoot({
      transport:{
        host:'smtp.gmail.com',
        auth:{
          user:'gestioncasosmailer@gmail.com',
          pass: process.env.PASSWORD_APLICATION_GMAIL
        }
      }
    }),
    CampusModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
