import { MinistryYearsController } from '@/controllers/ministry-years.controller/ministry-years.controller';
import { MinistryYear, MinistryYearSchema } from '@/schemas/ministry-year.schema';
import { MinistryYearsService } from '@/servers/ministry-years.server/ministry-years.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [MongooseModule.forFeature([{ name: MinistryYear.name, schema: MinistryYearSchema }])],
  controllers: [MinistryYearsController],
  providers: [MinistryYearsService],
})
export class MinistryYearsModule { }
