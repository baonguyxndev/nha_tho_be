import { ChaptersController } from '@/modules/chapter/controller/chapters.controller';
import { Chapter, ChapterSchema } from '@/modules/chapter/schema/chapter.schema';
import { ChaptersService } from '@/modules/chapter/service/chapters.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [MongooseModule.forFeature([{ name: Chapter.name, schema: ChapterSchema }])],
  controllers: [ChaptersController],
  providers: [ChaptersService],
})
export class ChaptersModule { }
