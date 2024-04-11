import { Test, TestingModule } from '@nestjs/testing';
import { MaintanceRequestController } from './maintance-request.controller';
import { MaintanceRequestService } from './maintance-request.service';

describe('MaintanceRequestController', () => {
  let controller: MaintanceRequestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MaintanceRequestController],
      providers: [MaintanceRequestService],
    }).compile();

    controller = module.get<MaintanceRequestController>(MaintanceRequestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
