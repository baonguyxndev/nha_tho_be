import { CategoriesController } from '@/modules/category/controller/categories.controller';
import { Category, CategorySchema } from '@/modules/category/schema/category.schema';
import { CategoriesService } from '@/modules/category/service/categories.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [MongooseModule.forFeature([{ name: Category.name, schema: CategorySchema }])],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule { }
