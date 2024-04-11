import { Prisma } from '@prisma/client';

export class User implements Prisma.UserUncheckedCreateInput {
  id: string;
  email: string;
  phone: string;
  name: string;
  position?: string[] | Prisma.UserCreatepositionInput;
  password: string;
  MaintenceRequest?: Prisma.MaintenceRequestUncheckedCreateNestedManyWithoutOwnerOfReqInput;
}
