import { NewImagesController } from '@/controllers/new-images.controller/new-images.controller';
import { NewImage, NewImageSchema } from '@/schemas/new-images.schema/new-image.schema';
import { NewImagesService } from '@/servers/new-images.server/new-images.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [MongooseModule.forFeature([{ name: NewImage.name, schema: NewImageSchema }])],
  controllers: [NewImagesController],
  providers: [NewImagesService],
})
export class NewImagesModule { }
