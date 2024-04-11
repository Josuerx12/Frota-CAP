import { IsInt, IsString, Length } from 'class-validator';
import { Vehicle } from '../entities/vehicle.entity';

export class CreateVehicleDto extends Vehicle {
  @IsString({ message: 'Nome do veiculo é obrigatorio!' })
  name: string;
  @IsString({ message: 'Placa do veiculo é obrigatoria!' })
  @Length(7, 7, {
    message: 'Placa deve conter 7 caracteres, sendo 4 letras e 3 numeros!',
  })
  plate: string;
  @IsInt({ message: 'Id do provedor dever ser um numero inteiro!' })
  providerId: number;
}
