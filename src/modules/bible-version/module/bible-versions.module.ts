import { BibleVersionsController } from '@/modules/bible-version/controller/bible-versions.controller';
import { BibleVersion, BibleVersionSchema } from '@/modules/bible-version/schema/bible-version.schema';
import { BibleVersionsService } from '@/modules/bible-version/service/bible-versions.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: BibleVersion.name, schema: BibleVersionSchema }])],
  controllers: [BibleVersionsController],
  providers: [BibleVersionsService],
})
export class BibleVersionsModule { }
