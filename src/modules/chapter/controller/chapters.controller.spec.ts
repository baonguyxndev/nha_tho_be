import { Test, TestingModule } from '@nestjs/testing';
import { ChaptersService } from '@/modules/chapter/service/chapters.service';
import { ChaptersController } from './chapters.controller';

describe('ChaptersController', () => {
  let controller: ChaptersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChaptersController],
      providers: [ChaptersService],
    }).compile();

    controller = module.get<ChaptersController>(ChaptersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
