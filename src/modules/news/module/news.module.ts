import { NewsController } from '@/modules/news/controller/news.controller';
import { News, NewsSchema } from '@/modules/news/schema/news.schema';
import { NewsService } from '@/modules/news/service/news.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [MongooseModule.forFeature([{ name: News.name, schema: NewsSchema }])],
  controllers: [NewsController],
  providers: [NewsService],
})
export class NewsModule { }
