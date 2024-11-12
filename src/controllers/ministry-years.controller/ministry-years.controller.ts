import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CreateMinistryYearDto } from '@/dtoes/ministry-years.dto/create-ministry-year.dto';
import { UpdateMinistryYearDto } from '@/dtoes/ministry-years.dto/update-ministry-year.dto';
import { MinistryYearsService } from '@/servers/ministry-years.server/ministry-years.service';

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

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMinistryYearDto: UpdateMinistryYearDto) {
    return this.ministryYearsService.update(+id, updateMinistryYearDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ministryYearsService.remove(+id);
  }
}
