import { MaintenceRequest } from './MaintenceRequest';

interface IUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string[];
  MaintenceRequest: MaintenceRequest[];
}

export { IUser };
