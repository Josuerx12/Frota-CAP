import { Injectable } from '@nestjs/common';
import { CreateWorkshopDto } from './dto/create-workshop.dto';
import { UpdateWorkshopDto } from './dto/update-workshop.dto';
import { PrismaService } from 'src/prisma.service';
import { genSalt, hash } from 'bcryptjs';

@Injectable()
export class WorkshopService {
  constructor(private readonly db: PrismaService) {}
  async create(createWorkshopDto: CreateWorkshopDto) {
    const { email, name, password, address } = createWorkshopDto;

    const salt = await genSalt(10);
    const passHash = await hash(password, salt);

    this.db.workshop.create({
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
    return 'This action adds a new workshop';
  }

  findAll() {
    return `This action returns all workshop`;
  }

  findOne(id: number) {
    return `This action returns a #${id} workshop`;
  }

  update(id: number, updateWorkshopDto: UpdateWorkshopDto) {
    console.log(updateWorkshopDto);
    return `This action updates a #${id} workshop`;
  }

  remove(id: number) {
    return `This action removes a #${id} workshop`;
  }
}
