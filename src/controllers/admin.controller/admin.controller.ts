import { CreateAdminDto } from '@/dtoes/admin.dto/create-admin.dto';
import { UpdateAdminDto } from '@/dtoes/admin.dto/update-admin.dto';
import { AdminService } from '@/servers/admin.server/admin.service';
import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { query } from 'express';


@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) { }

  @Post()
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @Get()
  async findAll(@Query() query: string,
    @Query("current") current: string,
    @Query("pageSize") pageSize: string
  ) {
    return this.adminService.findAll(query, current, pageSize);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
}
