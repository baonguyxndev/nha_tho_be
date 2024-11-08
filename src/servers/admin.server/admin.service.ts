import { IsEmail } from 'class-validator';
import { CreateAdminDto } from '@/dtoes/admin.dto/create-admin.dto';
import { UpdateAdminDto } from '@/dtoes/admin.dto/update-admin.dto';
import { hashPasswordHelper } from '@/helpers/util';
import { Admin } from '@/schemas/admin.schema';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import e from 'express';
import aqp from 'api-query-params';


@Injectable()
export class AdminService {
  constructor(@InjectModel(Admin.name) private adminModule: Model<Admin>) { }

  isEmailExist = async (email: string) => {
    const admin = await this.adminModule.exists({ email })
    if (admin)
      return true
    return false
  }

  async create(createAdminDto: CreateAdminDto) {
    const { name, email, password } = createAdminDto;

    //kiểm tra email có tồn tại hay kh
    const isExist = await this.isEmailExist(email)
    if (isExist)
      throw new BadRequestException(`email "${email}" đã tồn tại`)


    //hash password
    const hashPassword = await hashPasswordHelper(password)
    const admin = await this.adminModule.create({
      name, email, password: hashPassword
    })
    return {
      _id: admin._id
    }
  }

  async findAll(query: string, current: number, pageSize: number) {
    const { filter, sort } = aqp(query)

    if (filter.current)
      delete filter.current;
    if (filter.pageSize)
      delete filter.pageSize;

    if (!current)
      current = 1;
    if (!pageSize)
      pageSize = 10;

    const totalItems = (await this.adminModule.find(filter)).length;
    const totalPages = Math.ceil(totalItems / pageSize);
    const skip = (+current - 1) * (+pageSize);

    const results = await this.adminModule
      .find(filter)
      .limit(pageSize)
      .skip(skip)
      .select("-password") // không hiển thị mật khẩu của ng dùng lên respone
      .sort(sort as any);

    return { results, totalPages };
  }

  findOne(id: number) {
    return `This action returns a #${id} admin`;
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return `This action updates a #${id} admin`;
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }
}
