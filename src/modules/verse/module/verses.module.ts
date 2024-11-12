import { VersesController } from '@/modules/verse/controller/verses.controller';
import { Verse, VerseSchema } from '@/modules/verse/schema/verse.schema';
import { VersesService } from '@/modules/verse/service/verses.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [MongooseModule.forFeature([{ name: Verse.name, schema: VerseSchema }])],
  controllers: [VersesController],
  providers: [VersesService],
})
export class VersesModule { }
