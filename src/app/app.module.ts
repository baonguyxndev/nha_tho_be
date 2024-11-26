import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BibleVersionsModule } from '@/modules/bible-version/module/bible-versions.module';
import { BooksModule } from '@/modules/book/module/books.module';
import { CategoriesModule } from '@/modules/category/module/categories.module';
import { ChaptersModule } from '@/modules/chapter/module/chapters.module';
import { MinistryYearsModule } from '@/modules/ministry-year/module/ministry-years.module';
import { NewsModule } from '@/modules/news/module/news.module';
import { VersesModule } from '@/modules/verse/module/verses.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '@/auth/module/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '@/middleware/passport/jwt-auth.guard';
import { UsersModule } from '@/modules/users/module/users.module';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailerModule } from '@nestjs-modules/mailer';



@Module({
  imports: [
    CategoriesModule,
    UsersModule,
    BibleVersionsModule,
    BooksModule,
    CategoriesModule,
    ChaptersModule,
    MinistryYearsModule,
    NewsModule,
    VersesModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    //mongo
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configServer: ConfigService) => ({
        uri: configServer.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService]
    }),
    //mailer
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: 'smtp.gmail.com',
          port: 465, // 465 SSL(Bảo mật)/secure: true hoặc 587 TLS(Không bảo mật)/secure: false
          secure: true,
          // ignoreTLS: true,
          auth: {
            user: configService.get<string>('MAIL_USER'),
            pass: configService.get<string>('MAIL_PASSWORD'),
          },
        },
        defaults: {
          from: '"Giáo Xứ Tân Trang" <no-reply@giaoxutantrang@gmail.com>',
        },
        // preview: true,
        template: {
          dir: process.cwd() + '/src/mail/templates/',
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    }
  ],
})
export class AppModule { }
