import { Module } from '@nestjs/common';
import { MaintanceRequestService } from './maintance-request.service';
import { MaintanceRequestController } from './maintance-request.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [MaintanceRequestController],
  providers: [MaintanceRequestService, PrismaService],
})
export class MaintanceRequestModule {}
