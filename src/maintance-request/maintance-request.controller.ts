import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MaintanceRequestService } from './maintance-request.service';
import { CreateMaintanceRequestDto } from './dto/create-maintance-request.dto';
import { UpdateMaintanceRequestDto } from './dto/update-maintance-request.dto';

@Controller('maintance-request')
export class MaintanceRequestController {
  constructor(private readonly maintanceRequestService: MaintanceRequestService) {}

  @Post()
  create(@Body() createMaintanceRequestDto: CreateMaintanceRequestDto) {
    return this.maintanceRequestService.create(createMaintanceRequestDto);
  }

  @Get()
  findAll() {
    return this.maintanceRequestService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.maintanceRequestService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMaintanceRequestDto: UpdateMaintanceRequestDto) {
    return this.maintanceRequestService.update(+id, updateMaintanceRequestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.maintanceRequestService.remove(+id);
  }
}
