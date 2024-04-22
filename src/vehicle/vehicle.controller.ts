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
import { VehicleService } from './vehicle.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { Request } from 'express';

@Controller('vehicle')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Post()
  create(@Body() createVehicleDto: CreateVehicleDto, @Req() req: Request) {
    return this.vehicleService.create(createVehicleDto, req.user);
  }

  @Get()
  findAll(@Req() req: Request) {
    return this.vehicleService.findAll(req.user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vehicleService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateVehicleDto: UpdateVehicleDto,
    @Req() req: Request,
  ) {
    return this.vehicleService.update(+id, updateVehicleDto, req.user);
  }

  @Delete(':plate')
  remove(@Param('plate') plate: string, @Req() req: Request) {
    return this.vehicleService.remove(plate, req.user);
  }
}
