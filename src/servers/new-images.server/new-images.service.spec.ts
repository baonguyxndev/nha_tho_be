import { Test, TestingModule } from '@nestjs/testing';
import { NewImagesService } from './new-images.service';

describe('NewImagesService', () => {
  let service: NewImagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NewImagesService],
    }).compile();

    service = module.get<NewImagesService>(NewImagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
