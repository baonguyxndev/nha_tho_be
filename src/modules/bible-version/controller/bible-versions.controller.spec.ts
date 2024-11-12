import { Test, TestingModule } from '@nestjs/testing';
import { BibleVersionsService } from '@/modules/bible-version/service/bible-versions.service';
import { BibleVersionsController } from './bible-versions.controller';

describe('BibleVersionsController', () => {
  let controller: BibleVersionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BibleVersionsController],
      providers: [BibleVersionsService],
    }).compile();

    controller = module.get<BibleVersionsController>(BibleVersionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
