import { Module } from '@nestjs/common';
import { MaintanceRequestService } from './maintance-request.service';
import { MaintanceRequestController } from './maintance-request.controller';

@Module({
  controllers: [MaintanceRequestController],
  providers: [MaintanceRequestService],
})
export class MaintanceRequestModule {}
