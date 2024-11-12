import { Test, TestingModule } from '@nestjs/testing';
import { MinistryYearsService } from './ministry-years.service';

describe('MinistryYearsService', () => {
  let service: MinistryYearsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MinistryYearsService],
    }).compile();

    service = module.get<MinistryYearsService>(MinistryYearsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
