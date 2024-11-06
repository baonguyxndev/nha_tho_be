import { CategoriesController } from '@/controllers/categories.controller/categories.controller';
import { Category, CategorySchema } from '@/schemas/categories.schema/category.schema';
import { CategoriesService } from '@/servers/categories.server/categories.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [MongooseModule.forFeature([{ name: Category.name, schema: CategorySchema }])],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule { }
