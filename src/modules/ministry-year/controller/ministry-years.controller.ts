import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CreateMinistryYearDto } from '@/modules/ministry-year/dto/create-ministry-year.dto';
import { UpdateMinistryYearDto } from '@/modules/ministry-year/dto/update-ministry-year.dto';
import { MinistryYearsService } from '@/modules/ministry-year/service/ministry-years.service';

@Controller('ministryYears')
export class MinistryYearsController {
  constructor(private readonly ministryYearsService: MinistryYearsService) { }

  @Post()
  create(@Body() createMinistryYearDto: CreateMinistryYearDto) {
    return this.ministryYearsService.create(createMinistryYearDto);
  }

  @Get()
  async findAll(@Query() query: string,
    @Query("current") current: string,
    @Query("pageSize") pageSize: string
  ) {
    return this.ministryYearsService.findAll(query, +current, +pageSize);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ministryYearsService.findOne(+id);
  }

  @Patch()
  update(@Body() updateMinistryYearDto: UpdateMinistryYearDto) {
    return this.ministryYearsService.update(updateMinistryYearDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ministryYearsService.remove(id);
  }
}
