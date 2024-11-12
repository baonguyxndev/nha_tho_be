import { NewsImagesController } from '@/controllers/new-images.controller/new-images.controller';
import { NewsImage, NewImageSchema } from '@/schemas/new-image.schema';
import { NewsImagesService } from '@/servers/new-images.server/new-images.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [MongooseModule.forFeature([{ name: NewsImage.name, schema: NewImageSchema }])],
  controllers: [NewsImagesController],
  providers: [NewsImagesService],
})
export class NewImagesModule { }
