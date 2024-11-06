import { Test, TestingModule } from '@nestjs/testing';
import { MinistryYearsController } from './ministry-years.controller';
import { MinistryYearsService } from './ministry-years.service';

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
