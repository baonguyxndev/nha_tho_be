import { Test, TestingModule } from '@nestjs/testing';
import { BibleVersionsController } from './bible-versions.controller';
import { BibleVersionsService } from '@/servers/bible-versions.server/bible-versions.service';

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
