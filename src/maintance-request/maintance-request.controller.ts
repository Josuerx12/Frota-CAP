import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { MaintanceRequestService } from './maintance-request.service';
import { CreateMaintanceRequestDto } from './dto/create-maintance-request.dto';
import { UpdateMaintanceRequestDto } from './dto/update-maintance-request.dto';
import { Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';

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
    return this.maintanceRequestService.findAll(req.user, req.workshop);
  }
  @Get('/user')
  findByUser(@Req() req: Request) {
    return this.maintanceRequestService.findByUser(req.user);
  }
  @Get('/ws')
  findByWorkshop(@Req() req: Request) {
    return this.maintanceRequestService.findByWorkshop(req.workshop);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: Request) {
    return this.maintanceRequestService.findOne(+id, req.user, req.workshop);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('budget'))
  update(
    @Param('id') id: string,
    @Body() updateMaintanceRequestDto: UpdateMaintanceRequestDto,
    @Req() req: Request,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.maintanceRequestService.update(
      +id,
      updateMaintanceRequestDto,
      req.user,
      req.workshop,
      file,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: Request) {
    return this.maintanceRequestService.remove(+id, req.user);
  }
}
