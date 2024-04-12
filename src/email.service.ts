import { Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import { compile } from 'handlebars';
import { readFileSync } from 'fs';
import { IMaintenceRequest } from './interfaces/MaintenceRequest';

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    this.transporter = createTransport({
      host: 'smtp-mail.outlook.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAIL,
        pass: process.env.MAILPASS,
      },
    });
  }

  async sendMessage(to: string, request: IMaintenceRequest) {
    try {
      const html = compile(
        readFileSync('src/mail-templates/email.hbs', 'utf8'),
      )(request);
      await this.transporter({
        from: process.env.MAIL,
        cc: process.env.FROTAMAIL,
        to,
        html,
      });
    } catch (error) {
      console.error('Erro ao enviar o e-mail:', error);
    }
  }
}
