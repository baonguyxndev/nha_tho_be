import { Test, TestingModule } from '@nestjs/testing';
import { NewsImagesService } from '../service/new-images.service';
import { NewsImagesController } from './new-images.controller';

describe('NewImagesController', () => {
  let controller: NewsImagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NewsImagesController],
      providers: [NewsImagesService],
    }).compile();

    controller = module.get<NewsImagesController>(NewsImagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
