import { IsString, Length } from 'class-validator';
import { Provider } from '../entities/provider.entity';

export class CreateProviderDto extends Provider {
  @IsString({ message: 'Nome deve ser uma linha de letras!' })
  @Length(3, 100, { message: 'Nome deve conter de 3 a 100 caracteres!' })
  name: string;
}
