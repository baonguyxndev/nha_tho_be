import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BibleVersionsModule } from '@/modules/bible-version/module/bible-versions.module';
import { BooksModule } from '@/modules/book/module/books.module';
import { CategoriesModule } from '@/modules/category/module/categories.module';
import { ChaptersModule } from '@/modules/chapter/module/chapters.module';
import { MinistryYearsModule } from '@/modules/ministry-year/module/ministry-years.module';
import { NewImagesModule } from '@/modules/news-image/module/new-images.module';
import { NewsModule } from '@/modules/news/module/news.module';
import { VersesModule } from '@/modules/verse/module/verses.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminModule } from '@/modules/admin/module/admin.module';
import { AuthModule } from '@/auth/module/auth.module';


@Module({
  imports: [
    CategoriesModule,
    AdminModule,
    BibleVersionsModule,
    BooksModule,
    CategoriesModule,
    ChaptersModule,
    MinistryYearsModule,
    NewsModule,
    NewImagesModule,
    VersesModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configServer: ConfigService) => ({
        uri: configServer.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService]
    }),
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
