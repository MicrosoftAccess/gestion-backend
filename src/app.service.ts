import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer/dist';
import Handlebars from 'handlebars';
@Injectable()
export class AppService {
  constructor(private readonly _mailerService: MailerService){}
  getHello(): string {
    return 'Hello World!';
  }

  sendEmail():void {
    this._mailerService.sendMail({
      to:'jpretamalesv@gmail.com',
      from:'gestioncasosmailer@gmail.com',
      subject:'mailer test',
      text:'prueba',
      html:'<div clasname="bg-white"> prueba</div>'
    })}
  
}
