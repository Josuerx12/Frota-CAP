import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { PrismaService } from 'src/prisma.service';
import { IUser } from 'src/interfaces/User';

@Injectable()
export class VehicleService {
  constructor(private readonly db: PrismaService) {}

  async create(createVehicleDto: CreateVehicleDto, user: IUser) {
    if (!user.admin) {
      throw new BadRequestException(
        'Você não possui permissão para realizar esta requisição!',
        { cause: new Error(), description: 'authorization' },
      );
    }

    const plateRegex = /^[a-zA-Z]{3}[0-9][A-Za-z0-9][0-9]{2}$/;

    if (!plateRegex.test(createVehicleDto.plate)) {
      throw new BadRequestException({
        plate: 'Placa deve ser uma placa valida!',
      });
    }

    const vehicle = await this.db.vehicle.create({
      data: {
        ...createVehicleDto,
      },
    });

    return `Veiculo placa: ${vehicle.name}, adicionado com sucesso!`;
  }

  async findAll(user: IUser) {
    if (!user.admin) {
      throw new BadRequestException(
        'Você não possui permissão para realizar esta requisição!',
        { cause: new Error(), description: 'authorization' },
      );
    }

    const vehicles = await this.db.vehicle.findMany({
      include: {
        provider: true,
      },
    });

    return { vehicles };
  }

  async findOne(id: number) {
    const vehicle = await this.db.vehicle.findUnique({
      where: { id },
    });

    if (!vehicle) {
      throw new BadRequestException(
        'Nenhum veiculo encontrado para id informada!',
      );
    }

    return { vehicle };
  }

  async update(id: number, updateVehicleDto: UpdateVehicleDto, user: IUser) {
    if (!user.admin) {
      throw new BadRequestException(
        'Você não possui permissão para realizar esta requisição!',
        { cause: new Error(), description: 'authorization' },
      );
    }

    const vehiclesFromDb = await this.db.vehicle.findMany();

    const vehicleExists = await this.db.vehicle.findUnique({
      where: { id },
    });

    if (!vehicleExists) {
      throw new BadRequestException(
        'Nenhum veiculo encontrado para id informada!',
      );
    }

    if (vehiclesFromDb.find((v) => v.plate === updateVehicleDto.plate)) {
      throw new BadRequestException({ plate: 'Placa informada já em uso!' });
    }

    const plateRegex = /^[a-zA-Z]{3}[0-9][A-Za-z0-9][0-9]{2}$/;

    if (updateVehicleDto.plate && !plateRegex.test(updateVehicleDto.plate)) {
      throw new BadRequestException({
        plate: 'Placa deve ser uma placa valida!',
      });
    }

    const vehicleEdited = await this.db.vehicle.update({
      where: { id },
      data: {
        ...updateVehicleDto,
      },
    });

    return `Veiculo ${vehicleEdited.name}, editado com sucesso!`;
  }

  async remove(id: number, user: IUser) {
    if (!user.admin) {
      throw new BadRequestException(
        'Você não possui permissão para realizar esta requisição!',
        { cause: new Error(), description: 'authorization' },
      );
    }
    const vehiclesFromDb = await this.db.vehicle.findUnique({
      where: { id },
    });

    if (!vehiclesFromDb) {
      throw new BadRequestException(
        'Nenhum veiculo encontrado para id informada!',
      );
    }

    const vehicleDeleted = await this.db.vehicle.delete({
      where: {
        id,
      },
    });

    return `Veiculo ${vehicleDeleted.name}|${vehicleDeleted.plate}, removido com sucesso!`;
  }
}
