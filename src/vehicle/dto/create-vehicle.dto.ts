import { IsInt, IsString } from 'class-validator';
import { Vehicle } from '../entities/vehicle.entity';

export class CreateVehicleDto extends Vehicle {
  @IsString({ message: 'Placa do veiculo é obrigatoria!' })
  plate: string;
  @IsInt({ message: 'Id do provedor dever ser um numero inteiro!' })
  providerId: number;
}
