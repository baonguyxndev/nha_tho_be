import { BibleVersionsController } from '@/controllers/bible-versions.controller/bible-versions.controller';
import { BibleVersion, BibleVersionSchema } from '@/schemas/bible-versions.schema/bible-version.schema';
import { BibleVersionsService } from '@/servers/bible-versions.server/bible-versions.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: BibleVersion.name, schema: BibleVersionSchema }])],
  controllers: [BibleVersionsController],
  providers: [BibleVersionsService],
})
export class BibleVersionsModule { }
