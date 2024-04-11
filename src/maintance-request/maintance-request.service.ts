import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMaintanceRequestDto } from './dto/create-maintance-request.dto';
import { UpdateMaintanceRequestDto } from './dto/update-maintance-request.dto';
import { IUser } from 'src/interfaces/User';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class MaintanceRequestService {
  constructor(private readonly db: PrismaService) {}

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
    });

    return `Solicitação numero: ${request.id}, criada com sucesso!`;
  }

  async findAll(user: IUser) {
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

  update(
    id: number,
    updateMaintanceRequestDto: UpdateMaintanceRequestDto,
    user: IUser,
  ) {
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
