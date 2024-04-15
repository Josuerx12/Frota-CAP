import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMaintanceRequestDto } from './dto/create-maintance-request.dto';
import { UpdateMaintanceRequestDto } from './dto/update-maintance-request.dto';
import { IUser } from 'src/interfaces/User';
import { PrismaService } from 'src/prisma.service';
import { EmailService } from 'src/email.service';
import { IMaintenceRequest } from 'src/interfaces/MaintenceRequest';

@Injectable()
export class MaintanceRequestService {
  constructor(
    private readonly db: PrismaService,
    private readonly mail: EmailService,
  ) {}

  async create(
    createMaintanceRequestDto: CreateMaintanceRequestDto,
    user: IUser,
  ) {
    if (!user.position.includes('requester')) {
      throw new BadRequestException(
        'Você não possui permissão para realizar essa solicitação, fale com o suporte!',
      );
    }

    const request = await this.db.maintenceRequest.create({
      data: {
        ...createMaintanceRequestDto,
      },
      include: {
        budgets: true,
        Vehicle: true,
        ownerOfReq: true,
      },
    });

    this.mail.send(request.ownerOfReq.email, request);

    return `Solicitação numero: ${request.id}, criada com sucesso!`;
  }

  async findAll(user: IUser) {
    console.log(user);
    if (
      !user.position.includes('frotas') &&
      !user.position.includes('oficina')
    ) {
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

    if (
      request.ownerOfReqId !== user.id &&
      !user.position.includes('frotas') &&
      !user.position.includes('oficina')
    ) {
      throw new BadRequestException(
        'Solicitação encontrada, porem você não tem permissão de vizualizar-la',
      );
    }

    return { request };
  }

  async findByUser(id: number, user: IUser) {
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
      (!user.position.includes('frotas') && updatedCredentials.status === 1) ||
      (!user.position.includes('frotas') && updatedCredentials.status === 2) ||
      !user.position.includes('frotas')
    ) {
      throw new BadRequestException(
        'Você não tem autorização para realizar essa requisição!',
      );
    }

    if (
      (user.position.includes('oficina') && updatedCredentials.status === 3) ||
      (user.position.includes('oficina') && updatedCredentials.status === 4) ||
      (user.position.includes('oficina') && updatedCredentials.status === 5) ||
      (user.position.includes('oficina') && updatedCredentials.status === 6) ||
      (user.position.includes('oficina') && updatedCredentials.status === 7)
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
          ...updateMaintanceRequestDto,
          atendedBy: user.name,
          atendedAt: new Date(),
        },
        include: {
          budgets: true,
          ownerOfReq: true,
          Vehicle: true,
        },
      });
      this.mail.send(res.ownerOfReq.email, res);
    }

    if (updateMaintanceRequestDto.status === 2) {
      if (!updateMaintanceRequestDto.workShopId) {
        throw new BadRequestException('ID da oficina deve ser informado!');
      }
      if (!updateMaintanceRequestDto.deadlineToDeviler) {
        throw new BadRequestException(
          'Data para entrega do veiculo é obrigatoria!',
        );
      }

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
        },
        include: {
          budgets: true,
          ownerOfReq: true,
          Vehicle: true,
        },
      });

      await this.mail.send(res.ownerOfReq.email, res);
    }
    if (updateMaintanceRequestDto.status === 6) {
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
    }

    return `This action updates a #${id} maintanceRequest`;
  }

  async remove(id: number, user: IUser) {
    if (user.position.includes('admin')) {
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
