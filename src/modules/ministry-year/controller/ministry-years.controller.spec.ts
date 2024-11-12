import { Test, TestingModule } from '@nestjs/testing';
import { MinistryYearsService } from '@/modules/ministry-year/service/ministry-years.service';
import { MinistryYearsController } from './ministry-years.controller';

describe('MinistryYearsController', () => {
  let controller: MinistryYearsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MinistryYearsController],
      providers: [MinistryYearsService],
    }).compile();

    controller = module.get<MinistryYearsController>(MinistryYearsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
