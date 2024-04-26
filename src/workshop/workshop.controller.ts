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
import { WorkshopService } from './workshop.service';
import { CreateWorkshopDto } from './dto/create-workshop.dto';
import { UpdateWorkshopDto } from './dto/update-workshop.dto';
import { Request } from 'express';

@Controller('workshop')
export class WorkshopController {
  constructor(private readonly workshopService: WorkshopService) {}

  @Post()
  create(@Body() createWorkshopDto: CreateWorkshopDto, @Req() req: Request) {
    return this.workshopService.create(createWorkshopDto, req.user);
  }

  @Get()
  findAll() {
    return this.workshopService.findAll();
  }

  @Get('/detail')
  loggedWorkshopDetails(@Req() req: Request) {
    return this.workshopService.loggedWorkshopDetails(req.workshop);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workshopService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateWorkshopDto: UpdateWorkshopDto,
    @Req() req: Request,
  ) {
    return this.workshopService.update(+id, updateWorkshopDto, req.user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: Request) {
    return this.workshopService.remove(+id, req.user);
  }
}
