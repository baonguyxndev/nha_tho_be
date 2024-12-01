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
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { JwtAuthGuard } from '@/middleware/passport/jwt-auth.guard';
import { UsersModule } from '@/modules/users/module/users.module';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailerModule } from '@nestjs-modules/mailer';
import { TransformInterceptor } from '@/core/transform.interceptor';
import { MulterModule } from '@nestjs/platform-express'; // Import MulterModule

@Module({
  imports: [
    CategoriesModule,
    UsersModule,
    BibleVersionsModule,
    BooksModule,
    ChaptersModule,
    MinistryYearsModule,
    NewsModule,
    VersesModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configServer: ConfigService) => ({
        uri: configServer.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          auth: {
            user: configService.get<string>('MAIL_USER'),
            pass: configService.get<string>('MAIL_PASSWORD'),
          },
        },
        defaults: {
          from: '"Giáo Xứ Tân Trang" <no-reply@giaoxutantrang@gmail.com>',
        },
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
    MulterModule.register({ dest: './uploads' }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
})
export class AppModule { }
