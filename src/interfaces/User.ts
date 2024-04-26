import { IMaintenceRequest } from './MaintenceRequest';

interface IUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  MaintenceRequest?: IMaintenceRequest[];
  requester?: boolean;
  admin?: boolean;
  frotas?: boolean;
}

export { IUser };
