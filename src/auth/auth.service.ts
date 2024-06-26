import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginCredetialsDto } from './dto/login-credentials.dto';
import { PrismaService } from 'src/prisma.service';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(private readonly db: PrismaService) {}

  async login(credentials: LoginCredetialsDto) {
    const userFromDB = await this.db.user.findUnique({
      where: { email: credentials.email },
    });

    if (!userFromDB) {
      throw new BadRequestException({
        email: 'Nenhum localizado para o email informado! Solicite seu acesso!',
      });
    }

    const verifiedUser = await compare(
      credentials.password,
      userFromDB.password,
    );

    if (!verifiedUser) {
      throw new BadRequestException({
        password: 'Senha incorreta, corrija e tente novamente!',
      });
    }

    const user = await this.db.user.findUnique({
      where: { id: userFromDB.id },
      select: {
        email: true,
        password: false,
        id: true,
        name: true,
        phone: true,
        MaintenceRequest: false,
        createdAt: false,
        updatedAt: false,
      },
    });

    const token = sign({ user }, process.env.SECRET);

    return { token };
  }
  async loginWorkshop(credentials: LoginCredetialsDto) {
    const workshopFromDb = await this.db.workshop.findUnique({
      where: { email: credentials.email },
    });

    if (!workshopFromDb) {
      throw new BadRequestException({
        email: 'Nenhum localizado para o email informado! Solicite seu acesso!',
      });
    }

    const verifiedWorkshop = await compare(
      credentials.password,
      workshopFromDb.password,
    );

    if (!verifiedWorkshop) {
      throw new BadRequestException({
        password: 'Senha incorreta, corrija e tente novamente!',
      });
    }

    const workshop = await this.db.workshop.findUnique({
      where: { id: workshopFromDb.id },
      select: {
        email: true,
        password: false,
        id: true,
        name: true,
        Address: true,
        MaintenceRequest: false,
        createdAt: false,
        updatedAt: false,
      },
    });

    const token = sign({ workshop }, process.env.SECRET);

    return { token };
  }
}
