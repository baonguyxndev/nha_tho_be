import { Test, TestingModule } from '@nestjs/testing';
import { NewImagesController } from './new-images.controller';
import { NewImagesService } from '@/servers/new-images.server/new-images.service';

describe('NewImagesController', () => {
  let controller: NewImagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NewImagesController],
      providers: [NewImagesService],
    }).compile();

    controller = module.get<NewImagesController>(NewImagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
