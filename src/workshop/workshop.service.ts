import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateWorkshopDto } from './dto/create-workshop.dto';
import { UpdateWorkshopDto } from './dto/update-workshop.dto';
import { PrismaService } from 'src/prisma.service';
import { genSalt, hash } from 'bcryptjs';
import { IUser } from 'src/interfaces/User';

@Injectable()
export class WorkshopService {
  constructor(private readonly db: PrismaService) {}

  adminGuard(user: IUser) {
    if (!user.admin) {
      throw new BadRequestException(
        'Você não tem permissão para executar essa requisição.',
      );
    }
  }

  async create(createWorkshopDto: CreateWorkshopDto, user: IUser) {
    const { email, name, password, address } = createWorkshopDto;

    this.adminGuard(user);

    const salt = await genSalt(10);
    const passHash = await hash(password, salt);

    const ws = await this.db.workshop.create({
      data: {
        email: email,
        name: name,
        password: passHash,
        Address: {
          create: {
            ...address,
          },
        },
      },
    });
    return `Nova oficina id: ${ws.id} - nome: ${ws.name} adicionada, `;
  }

  async findAll() {
    const workshops = await this.db.workshop.findMany({
      select: {
        Address: true,
        createdAt: true,
        email: true,
        id: true,
        MaintenceRequest: true,
        name: true,
        password: false,
        updatedAt: true,
      },
    });
    return { workshops };
  }

  async findOne(id: number) {
    const workshop = await this.db.workshop.findUnique({
      where: { id },
      select: {
        Address: true,
        createdAt: true,
        email: true,
        id: true,
        MaintenceRequest: true,
        name: true,
        password: false,
        updatedAt: true,
      },
    });

    return { workshop };
  }

  async update(id: number, updateWorkshopDto: UpdateWorkshopDto, user: IUser) {
    this.adminGuard(user);

    const wsExists = await this.db.workshop.findUnique({ where: { id } });
    if (!wsExists) {
      throw new BadRequestException(
        'Nenhuma oficina encontrada para id informada.',
      );
    }

    let passHash;
    const { password } = updateWorkshopDto;

    if (password) {
      const salt = await genSalt(10);
      passHash = await hash(password, salt);
    }

    const ws = await this.db.workshop.update({
      where: {
        id,
      },
      data: {
        ...updateWorkshopDto,
        password: passHash,
        Address: {
          update: {
            ...updateWorkshopDto.address,
          },
        },
      },
    });

    return `Oficina id: ${ws.id} - nome: ${ws.name}, editada com sucesso.`;
  }

  async remove(id: number, user: IUser) {
    this.adminGuard(user);

    const wsExists = await this.db.workshop.findUnique({ where: { id } });
    if (!wsExists) {
      throw new BadRequestException(
        'Nenhuma oficina encontrada para id informada.',
      );
    }

    const ws = await this.db.workshop.delete({
      where: {
        id,
      },
    });

    return `Oficina id: ${ws.id}, deletada com sucesso!`;
  }
}
