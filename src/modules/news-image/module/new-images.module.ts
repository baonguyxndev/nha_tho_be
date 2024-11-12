import { NewsImagesController } from '@/modules/news-image/controller/new-images.controller';
import { NewsImage, NewImageSchema } from '@/modules/news-image/schema/new-image.schema';
import { NewsImagesService } from '@/modules/news-image/service/new-images.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [MongooseModule.forFeature([{ name: NewsImage.name, schema: NewImageSchema }])],
  controllers: [NewsImagesController],
  providers: [NewsImagesService],
})
export class NewImagesModule { }
