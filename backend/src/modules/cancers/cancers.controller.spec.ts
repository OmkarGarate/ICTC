import { Test, TestingModule } from '@nestjs/testing';
import { CancersController } from './cancers.controller';
import { CancersService } from './cancers.service';

describe('CancersController', () => {
  let controller: CancersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CancersController],
      providers: [CancersService],
    }).compile();

    controller = module.get<CancersController>(CancersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
