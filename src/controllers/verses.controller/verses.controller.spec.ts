import { Test, TestingModule } from '@nestjs/testing';
import { VersesController } from './verses.controller';
import { VersesService } from './verses.service';

describe('VersesController', () => {
  let controller: VersesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VersesController],
      providers: [VersesService],
    }).compile();

    controller = module.get<VersesController>(VersesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
