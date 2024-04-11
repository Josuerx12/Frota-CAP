import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { MaintanceRequestService } from './maintance-request.service';
import { CreateMaintanceRequestDto } from './dto/create-maintance-request.dto';
import { UpdateMaintanceRequestDto } from './dto/update-maintance-request.dto';
import { Request } from 'express';

@Controller('maintance-request')
export class MaintanceRequestController {
  constructor(
    private readonly maintanceRequestService: MaintanceRequestService,
  ) {}

  @Post()
  create(
    @Body() createMaintanceRequestDto: CreateMaintanceRequestDto,
    @Req() req: Request,
  ) {
    return this.maintanceRequestService.create(
      createMaintanceRequestDto,
      req.user,
    );
  }

  @Get()
  findAll(@Req() req: Request) {
    return this.maintanceRequestService.findAll(req.user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: Request) {
    return this.maintanceRequestService.findOne(+id, req.user);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMaintanceRequestDto: UpdateMaintanceRequestDto,
    @Req() req: Request,
  ) {
    return this.maintanceRequestService.update(
      +id,
      updateMaintanceRequestDto,
      req.user,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: Request) {
    return this.maintanceRequestService.remove(+id, req.user);
  }
}
