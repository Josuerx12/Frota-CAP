import { Injectable } from '@nestjs/common';
import { CreateMaintanceRequestDto } from './dto/create-maintance-request.dto';
import { UpdateMaintanceRequestDto } from './dto/update-maintance-request.dto';
import { IUser } from 'src/interfaces/User';

@Injectable()
export class MaintanceRequestService {
  create(createMaintanceRequestDto: CreateMaintanceRequestDto, user: IUser) {
    return 'This action adds a new maintanceRequest';
  }

  findAll(user: IUser) {
    return `This action returns all maintanceRequest`;
  }

  findOne(id: number, user: IUser) {
    return `This action returns a #${id} maintanceRequest`;
  }

  findByUser(id: number, user: IUser) {
    return `This action returns a #${id} maintanceRequest`;
  }

  update(
    id: number,
    updateMaintanceRequestDto: UpdateMaintanceRequestDto,
    user: IUser,
  ) {
    return `This action updates a #${id} maintanceRequest`;
  }

  remove(id: number, user: IUser) {
    return `This action removes a #${id} maintanceRequest`;
  }
}
