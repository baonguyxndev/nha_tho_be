import { AdminController } from '@/controllers/admin.controller/admin.controller';
import { Admin, AdminSchema } from '@/schemas/admin.schema/admin.schema';
import { AdminService } from '@/servers/admin.server/admin.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }])],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule { }
