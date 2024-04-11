import { Test, TestingModule } from '@nestjs/testing';
import { MaintanceRequestService } from './maintance-request.service';

describe('MaintanceRequestService', () => {
  let service: MaintanceRequestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MaintanceRequestService],
    }).compile();

    service = module.get<MaintanceRequestService>(MaintanceRequestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
