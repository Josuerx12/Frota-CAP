import { IUser } from './User';
import { IWorkshop } from './Workshop';

export interface IDecodedToken {
  user?: IUser;
  workshop?: IWorkshop;
}
