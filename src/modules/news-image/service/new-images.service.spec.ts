import { Test, TestingModule } from '@nestjs/testing';
import { NewsImagesService } from './new-images.service';

describe('NewImagesService', () => {
  let service: NewsImagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NewsImagesService],
    }).compile();

    service = module.get<NewsImagesService>(NewsImagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
