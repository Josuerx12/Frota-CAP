import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { PrismaService } from 'src/prisma.service';
import { IUser } from 'src/interfaces/User';

@Injectable()
export class ProviderService {
  constructor(private readonly db: PrismaService) {}

  async create(credentials: CreateProviderDto, user: IUser) {
    if (!user.position.includes('admin')) {
      throw new BadRequestException(
        'Você não possui permissão para realizar esta requisição!',
        { cause: new Error(), description: 'authorization' },
      );
    }

    const providers = await this.db.provider.findMany();

    if (providers.find((p) => p.name === credentials.name)) {
      throw new BadRequestException({
        name: 'Nome do prevedor já cadastrado no banco de dados!!',
      });
    }

    const provider = await this.db.provider.create({
      data: { ...credentials },
    });

    return `Provedor ${provider.name}, criado com sucesso!`;
  }

  async findAll() {
    const providers = await this.db.provider.findMany({
      include: {
        Vehicle: true,
      },
    });
    return { providers };
  }

  async findOne(id: number) {
    const provider = await this.db.provider.findUnique({
      where: { id },
      include: {
        Vehicle: true,
      },
    });
    return { provider };
  }

  async update(id: number, updateProviderDto: UpdateProviderDto, user: IUser) {
    if (!user.position.includes('admin')) {
      throw new BadRequestException(
        'Você não possui permissão para realizar esta requisição!',
        { cause: new Error(), description: 'authorization' },
      );
    }

    const provider = await this.db.provider.findUnique({ where: { id } });

    if (!provider) {
      throw new BadRequestException(
        'Nenhum provedor encontrado no banco de dados para id informada!',
        {
          cause: new Error(),
          description: 'buscar-provedor',
        },
      );
    }

    const providerUpdated = await this.db.provider.update({
      where: { id },
      data: { ...updateProviderDto },
    });

    return `Provedor ${providerUpdated.name}, atualizado com sucesso!`;
  }

  async remove(id: number, user: IUser) {
    if (!user.position.includes('admin')) {
      throw new BadRequestException(
        'Você não possui permissão para realizar esta requisição!',
        { cause: new Error(), description: 'authorization' },
      );
    }

    const providerFromDb = await this.db.provider.findUnique({ where: { id } });

    if (!providerFromDb) {
      throw new BadRequestException(
        'Nenhum usuário encontrado no banco de dados para id informada!',
        {
          cause: new Error(),
          description: 'buscar-provider',
        },
      );
    }

    await this.db.provider.delete({ where: { id } });

    return `Provedor ${providerFromDb.id}, deletado com sucesso!`;
  }
}
