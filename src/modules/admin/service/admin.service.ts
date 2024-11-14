import { CreateAdminDto } from '@/modules/admin/dto/create-admin.dto';
import { UpdateAdminDto } from '@/modules/admin/dto/update-admin.dto';
import { hashPasswordHelper } from '@/helpers/util';
import { Admin } from '@/modules/admin/schema/admin.schema';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import aqp from 'api-query-params';
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';



@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name) private adminModule: Model<Admin>,
  ) { }

  isEmailExist = async (email: string) => {
    const admin = await this.adminModule.exists({ email })
    if (admin)
      return true
    return false
  }

  async create(createAdminDto: CreateAdminDto) {
    const { name, email, password, phone, address, image } = createAdminDto;

    //kiểm tra email có tồn tại hay kh
    const isExist = await this.isEmailExist(email)
    if (isExist)
      throw new BadRequestException(`email "${email}" đã tồn tại`)


    //hash password
    const hashPassword = await hashPasswordHelper(password)
    const admin = await this.adminModule.create({
      name, email, password: hashPassword, phone, address, image
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

  async findByEmail(email: string) {
    return await this.adminModule.findOne({ email })
  }

  async update(updateAdminDto: UpdateAdminDto) {

    return await this.adminModule.updateOne(
      { _id: updateAdminDto._id }, { ...updateAdminDto })
  }

  remove(_id: string) {

    //check id
    if (mongoose.isValidObjectId(_id)) {
      //delete
      return this.adminModule.deleteOne({ _id })
    } else {
      throw new BadRequestException("Id không đúng định dạng mongodb")
    }
  }

  async handleRegister(registerDto: CreateAdminDto) {
    const { email, password, name } = registerDto;
    //check email
    const isExis = await this.isEmailExist(email);
    if (isExis) {
      throw new BadRequestException(`email của bạn đã được đăng kí. Vui lòng sử dụng email khác!!!`)
    }

    //hash Password
    const hashPassword = await hashPasswordHelper(password);
    const codeId = uuidv4();
    const admin = await this.adminModule.create({
      email, password: hashPassword, name,
      isActive: false,
      codeId: codeId,
      codeExpired: dayjs().add(5, 'minutes')
    })
    //trả phản hồi
    return {
      _id: admin._id
    }
  }

}


