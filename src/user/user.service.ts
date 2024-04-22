import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import { genSalt, hash } from 'bcryptjs';
import { v4 } from 'uuid';
import { IUser } from 'src/interfaces/User';
@Injectable()
export class UserService {
  constructor(private db: PrismaService) {}

  async create(createUserDto: CreateUserDto, userAuthenticated: IUser) {
    if (!userAuthenticated.admin) {
      throw new BadRequestException(
        'Você não possui autorização para acessar essa rota!',
      );
    }

    const allUsers = await this.db.user.findMany();

    if (allUsers.find((user) => user.email === createUserDto.email)) {
      throw new BadRequestException({
        email: 'E-mail já cadastrado no banco de dados!!',
      });
    }

    if (allUsers.find((user) => user.phone === createUserDto.phone)) {
      throw new BadRequestException({
        phone: 'Telefone já cadastrado no banco de dados!!',
      });
    }

    if (createUserDto.password !== createUserDto.confirmPassword) {
      throw new BadRequestException({
        confirmPassword: 'Senhas não conferem!',
      });
    }

    const salt = await genSalt(10);
    const passwordHash = await hash(createUserDto.password, salt);

    const user = await this.db.user.create({
      data: {
        id: v4(),
        email: createUserDto.email,
        name: createUserDto.name,
        phone: createUserDto.phone
          ?.replace('(', '')
          ?.replace(')', '')
          ?.replace('-', '')
          ?.replace(' ', ''),
        password: passwordHash,
        ...createUserDto,
      },
    });

    return `Usuário ${user.name}, criado com sucesso!`;
  }

  async findAll(userAuthenticated: IUser) {
    if (!userAuthenticated.admin) {
      throw new BadRequestException(
        'Você não possui autorização para acessar essa rota!',
      );
    }
    const users = await this.db.user.findMany({
      select: {
        email: true,
        password: false,
        id: true,
        name: true,
        phone: true,
        MaintenceRequest: false,
        createdAt: true,
        updatedAt: true,
        admin: true,
        frotas: true,
        requester: true,
        workshop: true,
      },
      orderBy: {
        name: 'asc',
      },
    });

    return { users };
  }

  async findOne(id: string) {
    const user = await this.db.user.findUnique({
      where: {
        id: id,
      },
      select: {
        email: true,
        password: false,
        id: true,
        name: true,
        phone: true,
        MaintenceRequest: true,
        createdAt: true,
        updatedAt: true,
        admin: true,
        frotas: true,
        requester: true,
        workshop: true,
      },
    });

    if (!user) {
      throw new BadRequestException(
        'Nenhum usuário encontrado no banco de dados para id informada!',
        {
          cause: new Error(),
          description: 'buscar-usuario',
        },
      );
    }

    return { user };
  }

  async findWorkshops() {
    const usersWithWorkshops = await this.db.user.findMany({
      where: {
        workshop: true,
      },
    });
    return { workshops: usersWithWorkshops };
  }

  async profile(user: IUser) {
    const userDetails = await this.db.user.findUnique({
      where: {
        id: user.id,
      },
      select: {
        email: true,
        password: false,
        id: true,
        name: true,
        phone: true,
        MaintenceRequest: false,
        createdAt: true,
        updatedAt: true,
        admin: true,
        frotas: true,
        requester: true,
        workshop: true,
      },
    });

    return { user: userDetails };
  }

  async update(id: string, updateUserDto: UpdateUserDto, user: IUser) {
    const userFromDb = await this.db.user.findUnique({
      where: { id },
    });
    if (!userFromDb) {
      throw new BadRequestException(
        'Nenhum usuário encontrado no banco de dados para id informada!',
        {
          cause: new Error(),
          description: 'buscar-usuario',
        },
      );
    }
    if (user.id !== id && !user.admin) {
      throw new BadRequestException(
        'Você não possui permissão para realizar esta requisição!',
        { cause: new Error(), description: 'authorization' },
      );
    }

    if (
      (updateUserDto.admin ||
        updateUserDto.frotas ||
        updateUserDto.workshop ||
        updateUserDto.requester) &&
      !user.admin
    ) {
      throw new BadRequestException({
        auth: 'Você não tem permissão para adicionar cargos ao usuário!',
      });
    }

    await this.db.user.update({
      where: {
        id,
      },
      data: {
        ...updateUserDto,
      },
    });

    return `This action updates a #${id} user`;
  }

  async remove(id: string, user: IUser) {
    const userFromDb = await this.db.user.findUnique({ where: { id: id } });

    if (!userFromDb) {
      throw new BadRequestException(
        'Nenhum usuário encontrado no banco de dados para id informada!',
        {
          cause: new Error(),
          description: 'buscar-usuario',
        },
      );
    }

    if (user.id !== id && !user.admin) {
      throw new BadRequestException(
        'Você não possui permissão para realizar esta requisição!',
        { cause: new Error(), description: 'authorization' },
      );
    }

    const deletedUser = await this.db.user.delete({ where: { id: id } });
    return `Usuário ${deletedUser.name}, deletado com sucesso!`;
  }
}
