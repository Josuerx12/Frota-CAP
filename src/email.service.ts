import { Injectable } from '@nestjs/common';
import { Transporter, createTransport } from 'nodemailer';
import { IMaintenceRequest } from './interfaces/MaintenceRequest';
import { sendMessage as sendMailTemplate } from './mail-templates/email';

@Injectable()
export class EmailService {
  private transporter: Transporter;

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

  async send(to: string, request: IMaintenceRequest) {
    try {
      await this.transporter.sendMail({
        from: process.env.MAIL,
        cc: process.env.FROTAMAIL,
        subject:
          request.status === 0
            ? `Nova Solicitação Nº ${request.id} - FROTAS CAP`
            : `Atualização Sobre a Solicitação Nº ${request.id} - FROTAS CAP`,
        to,
        html: sendMailTemplate(request),
      });
    } catch (error) {
      console.error('Erro ao enviar o e-mail:', error);
    }
  }
}
