import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMaintanceRequestDto } from './dto/create-maintance-request.dto';
import { UpdateMaintanceRequestDto } from './dto/update-maintance-request.dto';
import { IUser } from 'src/interfaces/User';
import { PrismaService } from 'src/prisma.service';
import { EmailService } from '../email.service';
import { IMaintenceRequest } from 'src/interfaces/MaintenceRequest';
import axios, { AxiosInstance } from 'axios';

@Injectable()
export class MaintanceRequestService {
  private api: AxiosInstance;

  constructor(
    private readonly db: PrismaService,
    private readonly mail: EmailService,
  ) {
    this.api = axios.create({
      baseURL: process.env.ZAPI_URI,
      headers: { 'Client-Token': process.env.ZAPI_TOKEN },
    });
  }

  wppMessageTemplate(req: IMaintenceRequest): string {
    return (
      '*Frota CAP : Manutenção de Veículos*\n\n' +
      `${req.status === 1 ? '*✴️ Seu chamado está sendo agendado✴️*\n\n' : req.status === 2 ? '*⛔ Encaminhar Veículo para oficina ⛔*\n\n' : req.status === 3 ? '*⚠️ Veículo chegou na oficina ⚠️*\n\n' : req.status === 4 ? '*📥 Orçamento enviado para aprovação📥*\n\n' : req.status === 5 ? '*🛠️ Veículo em manutenção 🛠️*\n\n' : req.status === 6 ? '*✅ Veículo Pronto para Retirada ✅*\n\n' : req.status === 7 && '*🆗Veículo Retirado🆗*\n\n'}` +
      `${req.status === 1 ? `Estamos agendando seu chamado numero:${req.id}, na oficina!` : req.status === 2 ? `O Veículo deverá ser encaminhado para oficina no dia ${req.deadlineToDeviler}.` : req.status === 3 ? 'O Veículo Chegou na Oficina.' : req.status === 4 ? 'Aguardando aprovação do orçamento.' : req.status === 5 ? `Orçamento aprovado, veículo está em manutenção com prazo de entrega até ${req.deadlineToForward}.` : req.status === 6 ? 'O veículo está pronto para retirada.' : req.status === 7 && `O veículo foi retirado por ${req.checkoutBy} as ${new Date(req.checkoutAt).toLocaleString('pt-BR')}`}`
    );
  }

  async create(
    createMaintanceRequestDto: CreateMaintanceRequestDto,
    user: IUser,
  ) {
    if (!user.requester) {
      throw new BadRequestException(
        'Você não possui permissão para realizar essa solicitação, fale com o suporte!',
      );
    }

    const vehicle = await this.db.vehicle.findUnique({
      where: { plate: createMaintanceRequestDto.plate },
    });

    if (!vehicle) {
      throw new BadRequestException({
        vehicle: `Veiculo para placa: ${createMaintanceRequestDto.plate}, não encontrado!`,
      });
    }

    const request = await this.db.maintenceRequest.create({
      data: {
        ...createMaintanceRequestDto,
        ownerOfReqId: user.id,
      },
      include: {
        budgets: true,
        Vehicle: true,
        ownerOfReq: true,
      },
    });

    await this.mail.send(request.ownerOfReq.email, request);

    await this.api
      .post('/send-text', {
        phone: `55${request.ownerOfReq.phone}`,
        message: `*Frota CAP : Manutenção de Veículos*\n\n*🆕 Seu chamado Nº ${request.id} foi recebido 🆕*\n\nIremos agendar seu chamado na Oficina`,
      })
      .catch((err) => console.log(err.message));

    return `Solicitação numero: ${request.id}, criada com sucesso!`;
  }

  async findAll(user: IUser) {
    if (!user.frotas && !user.workshop && !user.admin) {
      throw new BadRequestException(
        'Usuário não possui permissão para acessar todas solicitação de manutenção!',
      );
    }

    const requests = await this.db.maintenceRequest.findMany({
      include: {
        budgets: true,
        ownerOfReq: true,
        Vehicle: true,
      },
    });

    return { requests };
  }

  async findOne(id: number, user: IUser) {
    const request = await this.db.maintenceRequest.findUnique({
      where: {
        id,
      },
      include: {
        budgets: true,
        ownerOfReq: true,
        Vehicle: true,
      },
    });

    if (!request) {
      throw new BadRequestException(
        `Não foi possivel encontrar a solicitação ID: ${id}, no banco de dados!`,
      );
    }

    if (request.ownerOfReqId !== user.id && !user.frotas && !user.workshop) {
      throw new BadRequestException(
        'Solicitação encontrada, porem você não tem permissão de vizualizar-la',
      );
    }

    return { request };
  }

  async findByUser(user: IUser) {
    const requests = await this.db.maintenceRequest.findMany({
      where: { ownerOfReqId: user.id },
      include: {
        budgets: true,
        ownerOfReq: true,
        Vehicle: true,
      },
    });

    return { requests };
  }

  async findByWorkshop(user: IUser) {
    const requests = await this.db.maintenceRequest.findMany({
      where: { workShopId: user.id },
      include: {
        budgets: true,
        ownerOfReq: true,
        Vehicle: true,
      },
    });

    return { requests };
  }

  basicValidations(
    request: IMaintenceRequest,
    updatedCredentials: UpdateMaintanceRequestDto,
    user: IUser,
  ) {
    if (
      updatedCredentials.status < 0 ||
      updatedCredentials.status < request.status ||
      updatedCredentials.status > request.status + 1
    ) {
      throw new BadRequestException(
        'Não é possivel continuar com essa requisição pois você está tentando burlar o status da solicitação!',
      );
    }
    if (
      (!user.frotas && updatedCredentials.status === 1) ||
      (!user.frotas && updatedCredentials.status === 2) ||
      !user.frotas
    ) {
      throw new BadRequestException(
        'Você não tem autorização para realizar essa requisição!',
      );
    }

    if (
      (!user.workshop && updatedCredentials.status === 3) ||
      (!user.workshop && updatedCredentials.status === 4) ||
      (!user.workshop && updatedCredentials.status === 5) ||
      (!user.workshop && updatedCredentials.status === 6) ||
      (!user.workshop && updatedCredentials.status === 7)
    ) {
      throw new BadRequestException(
        'Você não tem autorização para realizar essa requisição!',
      );
    }
  }

  async update(
    id: number,
    updateMaintanceRequestDto: UpdateMaintanceRequestDto,
    user: IUser,
  ) {
    const requestFromDb = await this.db.maintenceRequest.findUnique({
      where: { id },
      include: {
        budgets: true,
        ownerOfReq: true,
        Vehicle: true,
      },
    });

    this.basicValidations(requestFromDb, updateMaintanceRequestDto, user);

    if (updateMaintanceRequestDto.status === 1) {
      const res = await this.db.maintenceRequest.update({
        where: {
          id,
        },
        data: {
          status: updateMaintanceRequestDto.status,
          atendedBy: user.name,
          atendedAt: new Date(Date.now()),
        },
        include: {
          budgets: true,
          ownerOfReq: true,
          Vehicle: true,
        },
      });
      await this.mail.send(res.ownerOfReq.email, res);
      await this.api.post('/send-text', {
        phone: `55${res.ownerOfReq.phone}`,
        message: this.wppMessageTemplate(res),
      });
    }

    if (updateMaintanceRequestDto.status === 2) {
      if (!updateMaintanceRequestDto.workShopId) {
        throw new BadRequestException('ID da oficina deve ser informado!');
      }
      if (!updateMaintanceRequestDto.deadlineToDeliver) {
        throw new BadRequestException(
          'Data para entrega do veiculo é obrigatoria!',
        );
      }

      const dateNow = Date.now();

      const spendedTime =
        (dateNow - new Date(requestFromDb.atendedAt).getTime()) /
        (1000 * 60 * 60);

      const res = await this.db.maintenceRequest.update({
        where: {
          id,
        },
        data: {
          ...updateMaintanceRequestDto,
          atendedBy: user.name,
          scheduledAt: new Date(dateNow),
          timeToSchedule: spendedTime,
        },
        include: {
          budgets: true,
          ownerOfReq: true,
          Vehicle: true,
        },
      });
      await this.mail.send(res.ownerOfReq.email, res);
      await this.api.post('/send-text', {
        phone: `55${res.ownerOfReq.phone}`,
        message: this.wppMessageTemplate(res),
      });
    }

    if (updateMaintanceRequestDto.status === 3) {
      const res = await this.db.maintenceRequest.update({
        where: {
          id,
        },
        data: {
          ...updateMaintanceRequestDto,
          delivered: true,
          deliveredAt: new Date(),
        },
        include: {
          budgets: true,
          ownerOfReq: true,
          Vehicle: true,
        },
      });

      await this.mail.send(res.ownerOfReq.email, res);
      await this.api.post('/send-text', {
        phone: `55${res.ownerOfReq.phone}`,
        message: this.wppMessageTemplate(res),
      });
    }
    if (updateMaintanceRequestDto.status === 4) {
      const res = await this.db.maintenceRequest.update({
        where: {
          id,
        },
        data: {
          ...updateMaintanceRequestDto,
        },
        include: {
          budgets: true,
          ownerOfReq: true,
          Vehicle: true,
        },
      });
      await this.mail.send(res.ownerOfReq.email, res);
      await this.api.post('/send-text', {
        phone: `55${res.ownerOfReq.phone}`,
        message: this.wppMessageTemplate(res),
      });
    }
    if (updateMaintanceRequestDto.status === 5) {
      if (!updateMaintanceRequestDto.deadlineToForward) {
        throw new BadRequestException(
          'Data do prazo de entrega é obrigatorio para avançar.',
        );
      }

      const res = await this.db.maintenceRequest.update({
        where: {
          id,
        },
        data: {
          ...updateMaintanceRequestDto,
          serviceStartAt: new Date(Date.now()),
        },
        include: {
          budgets: true,
          ownerOfReq: true,
          Vehicle: true,
        },
      });

      await this.mail.send(res.ownerOfReq.email, res);
      await this.api.post('/send-text', {
        phone: `55${res.ownerOfReq.phone}`,
        message: this.wppMessageTemplate(res),
      });
    }
    if (updateMaintanceRequestDto.status === 6) {
      const { serviceStartAt } = requestFromDb;

      const endDate = Date.now();

      const spendedTime =
        (endDate - new Date(serviceStartAt).getTime()) / (1000 * 60 * 60);

      const res = await this.db.maintenceRequest.update({
        where: {
          id,
        },
        data: {
          ...updateMaintanceRequestDto,
          serviceTime: spendedTime,
          serviceEndAt: new Date(endDate),
        },
        include: {
          budgets: true,
          ownerOfReq: true,
          Vehicle: true,
        },
      });

      await this.mail.send(res.ownerOfReq.email, res);
      await this.api.post('/send-text', {
        phone: `55${res.ownerOfReq.phone}`,
        message: this.wppMessageTemplate(res),
      });
    }
    if (updateMaintanceRequestDto.status === 7) {
      if (!updateMaintanceRequestDto.checkoutBy) {
        throw new BadRequestException(
          'Informar quem retirou o veiculo é obrigatorio!',
        );
      }

      const res = await this.db.maintenceRequest.update({
        where: {
          id,
        },
        data: {
          ...updateMaintanceRequestDto,
          checkoutAt: new Date(),
        },
        include: {
          budgets: true,
          ownerOfReq: true,
          Vehicle: true,
        },
      });

      await this.mail.send(res.ownerOfReq.email, res);
      await this.api.post('/send-text', {
        phone: `55${res.ownerOfReq.phone}`,
        message: this.wppMessageTemplate(res),
      });
    }

    return `Solicitação de manutenção ${id}, atualizada com sucesso!`;
  }

  async remove(id: number, user: IUser) {
    if (user.admin) {
      throw new BadRequestException(
        'Você não tem permissão para realizar está requisição!',
      );
    }

    const requestFromDb = await this.db.maintenceRequest.findUnique({
      where: { id },
    });

    if (!requestFromDb) {
      throw new BadRequestException(
        `Não foi possivel encontrar solicitação com a id ${id}, informada!`,
      );
    }

    const deletedRequest = await this.db.maintenceRequest.delete({
      where: { id },
    });

    return `Solicitação ID: ${deletedRequest.id}, deletada com sucesso!`;
  }
}
