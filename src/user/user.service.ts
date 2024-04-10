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

  async create(createUserDto: CreateUserDto) {
    const allUsers = await this.db.user.findMany();

    if (allUsers.find((user) => user.email === createUserDto.email)) {
      throw new BadRequestException(
        'E-mail já cadastrado no banco de dados!!',
        {
          cause: new Error(),
          description: 'email',
        },
      );
    }

    if (allUsers.find((user) => user.phone === createUserDto.phone)) {
      throw new BadRequestException(
        'Telefone já cadastrado no banco de dados!!',
        {
          cause: new Error(),
          description: 'email',
        },
      );
    }

    if (createUserDto.password !== createUserDto.confirmPassword) {
      throw new BadRequestException('Senhas não conferem!', {
        cause: new Error(),
        description: 'confirmPassword',
      });
    }

    const salt = await genSalt(10);
    const passwordHash = await hash(createUserDto.password, salt);

    const user = await this.db.user.create({
      data: {
        id: v4(),
        email: createUserDto.email,
        name: createUserDto.name,
        phone: createUserDto.phone,
        password: passwordHash,
      },
    });

    return `Usuário ${user.name}, criado com sucesso!`;
  }

  async findAll() {
    const users = await this.db.user.findMany({
      select: {
        password: false,
      },
    });

    return users;
  }

  async findOne(id: string) {
    const user = await this.db.user.findUnique({
      where: {
        id: id,
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

    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: string, user?: IUser) {
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

    if (user.id !== id || !user.position.includes('admin')) {
      throw new BadRequestException(
        'Você não possui permissão para realizar esta requisição!',
        { cause: new Error(), description: 'authorization' },
      );
    }

    const deletedUser = await this.db.user.delete({ where: { id: id } });
    return `Usuário ${deletedUser.name}, deletado com sucesso!`;
  }
}
