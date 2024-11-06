import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './modules/admin.module/admin.module';
import { BibleVersionsModule } from './modules/bible-versions.module/bible-versions.module';
import { BooksModule } from './modules/books.module/books.module';
import { CategoriesModule } from './modules/categories.module/categories.module';
import { ChaptersModule } from './modules/chapters.module/chapters.module';
import { MinistryYearsModule } from './modules/ministry-years.module/ministry-years.module';
import { NewImagesModule } from './modules/new-images.module/new-images.module';
import { NewsModule } from './modules/news.module/news.module';
import { VersesModule } from './modules/verses.module/verses.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';


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
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
