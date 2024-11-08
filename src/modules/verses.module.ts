import { VersesController } from '@/controllers/verses.controller/verses.controller';
import { Verse, VerseSchema } from '@/schemas/verse.schema';
import { VersesService } from '@/servers/verses.server/verses.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [MongooseModule.forFeature([{ name: Verse.name, schema: VerseSchema }])],
  controllers: [VersesController],
  providers: [VersesService],
})
export class VersesModule { }
