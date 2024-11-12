import { MinistryYearsController } from '@/modules/ministry-year/controller/ministry-years.controller';
import { MinistryYear, MinistryYearSchema } from '@/modules/ministry-year/schema/ministry-year.schema';
import { MinistryYearsService } from '@/modules/ministry-year/service/ministry-years.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [MongooseModule.forFeature([{ name: MinistryYear.name, schema: MinistryYearSchema }])],
  controllers: [MinistryYearsController],
  providers: [MinistryYearsService],
})
export class MinistryYearsModule { }
