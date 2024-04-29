import { Injectable } from '@nestjs/common';

@Injectable()
export class BudgetService {
  create(file: Express.Multer.File) {
    console.log(file);
    return 'This action adds a new budget';
  }

  findAll() {
    return `This action returns all budget`;
  }

  findOne(id: number) {
    return `This action returns a #${id} budget`;
  }

  update(id: number, file: Express.Multer.File) {
    console.log(file);
    return `This action updates a #${id} budget`;
  }

  remove(id: number) {
    return `This action removes a #${id} budget`;
  }
}
