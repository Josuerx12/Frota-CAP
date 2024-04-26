/* eslint-disable @typescript-eslint/no-namespace */
import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Response, Request, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { IDecodedToken } from 'src/interfaces/DecodedToken';
import { IUser } from 'src/interfaces/User';
import { IWorkshop } from 'src/interfaces/Workshop';
import { PrismaService } from 'src/prisma.service';

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
      workshop?: IWorkshop;
    }
  }
}

@Injectable()
export class AuthGuardMiddleware implements NestMiddleware {
  constructor(private readonly db: PrismaService) {}
  use(req: Request, res: Response, next: NextFunction) {
    const headerToken = req.headers.authorization;

    if (!headerToken) {
      throw new BadRequestException(
        'Nenhum token informado! Autentique-se para acessar está rota',
        {
          cause: new Error(),
          description: 'token-invalido',
        },
      );
    }

    const token = headerToken.split(' ')[1];

    if (token) {
      verify(
        token,
        process.env.SECRET,
        async (err, decodedToken: IDecodedToken) => {
          if (err) {
            console.log(err);
            throw new BadRequestException(
              { token: 'Token invalido' },
              { cause: new Error(), description: 'token-invalido' },
            );
          } else {
            if (decodedToken.user) {
              const user = await this.db.user.findUnique({
                where: { id: decodedToken.user.id },
                select: {
                  email: true,
                  password: false,
                  id: true,
                  name: true,
                  phone: true,
                  MaintenceRequest: false,
                  admin: true,
                  frotas: true,
                  requester: true,
                  createdAt: true,
                  updatedAt: true,
                },
              });
              req.user = user;
              next();
            }
            if (decodedToken.workshop) {
              const workshop = await this.db.workshop.findUnique({
                where: {
                  id: decodedToken.workshop.id,
                },
                select: {
                  name: true,
                  id: true,
                  Address: true,
                  email: true,
                  createdAt: true,
                  updatedAt: true,
                  MaintenceRequest: true,
                },
              });

              req.workshop = workshop;

              next();
            }
          }
        },
      );
    }
  }
}
