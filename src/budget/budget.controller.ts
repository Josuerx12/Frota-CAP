import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { BudgetService } from './budget.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('budget')
export class BudgetController {
  constructor(private readonly budgetService: BudgetService) {}

  @Post()
  @UseInterceptors(FileInterceptor('budget'))
  create(@UploadedFile() file: Express.Multer.File) {
    return this.budgetService.create(file);
  }

  @Get()
  findAll() {
    return this.budgetService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.budgetService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('budget'))
  update(@Param('id') id: string, @UploadedFile() file: Express.Multer.File) {
    return this.budgetService.update(+id, file);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.budgetService.remove(+id);
  }
}
