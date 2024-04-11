import { Injectable } from '@nestjs/common';
import { CreateMaintanceRequestDto } from './dto/create-maintance-request.dto';
import { UpdateMaintanceRequestDto } from './dto/update-maintance-request.dto';

@Injectable()
export class MaintanceRequestService {
  create(createMaintanceRequestDto: CreateMaintanceRequestDto) {
    return 'This action adds a new maintanceRequest';
  }

  findAll() {
    return `This action returns all maintanceRequest`;
  }

  findOne(id: number) {
    return `This action returns a #${id} maintanceRequest`;
  }

  update(id: number, updateMaintanceRequestDto: UpdateMaintanceRequestDto) {
    return `This action updates a #${id} maintanceRequest`;
  }

  remove(id: number) {
    return `This action removes a #${id} maintanceRequest`;
  }
}
