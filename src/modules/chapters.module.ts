import { ChaptersController } from '@/controllers/chapters.controller/chapters.controller';
import { Chapter, ChapterSchema } from '@/schemas/chapter.schema';
import { ChaptersService } from '@/servers/chapters.server/chapters.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [MongooseModule.forFeature([{ name: Chapter.name, schema: ChapterSchema }])],
  controllers: [ChaptersController],
  providers: [ChaptersService],
})
export class ChaptersModule { }
