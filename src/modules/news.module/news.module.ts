import { NewsController } from '@/controllers/news.controller/news.controller';
import { News, NewsSchema } from '@/schemas/news.schema/news.schema';
import { NewsService } from '@/servers/news.server/news.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [MongooseModule.forFeature([{ name: News.name, schema: NewsSchema }])],
  controllers: [NewsController],
  providers: [NewsService],
})
export class NewsModule { }
