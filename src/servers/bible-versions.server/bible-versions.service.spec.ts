import { Test, TestingModule } from '@nestjs/testing';
import { BibleVersionsService } from './bible-versions.service';

describe('BibleVersionsService', () => {
  let service: BibleVersionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BibleVersionsService],
    }).compile();

    service = module.get<BibleVersionsService>(BibleVersionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
