import { Test, TestingModule } from '@nestjs/testing';
import { CancersService } from './cancers.service';

describe('CancersService', () => {
  let service: CancersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CancersService],
    }).compile();

    service = module.get<CancersService>(CancersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
