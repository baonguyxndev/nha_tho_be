import { AdminController } from '@/modules/admin/controller/admin.controller';
import { Admin, AdminSchema } from '@/modules/admin/schema/admin.schema';
import { AdminService } from '@/modules/admin/service/admin.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }])],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule { }
