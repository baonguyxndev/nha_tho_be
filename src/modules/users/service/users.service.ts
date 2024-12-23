import { hashPasswordHelper } from '@/helpers/util';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';
import mongoose, { Model } from 'mongoose';
import aqp from 'api-query-params';
import { CreateAuthDto } from '@/auth/dto/create-auth.dto';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';
import { MailerService } from '@nestjs-modules/mailer';
import { CodeAuthDto } from '@/auth/dto/code-auth-dto';
import { ChangePasswordAuthDto } from '@/auth/dto/change-password-dto';


@Injectable()
export class UsersService {

  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly mailerService: MailerService
  ) { }

  isEmailExist = async (email: string) => {
    const user = await this.userModel.exists({ email });
    if (user) return true;
    return false;
  }

  async create(createUserDto: CreateUserDto) {
    const { email, password, name, phone, address, image } = createUserDto;
    //check email
    const isExis = await this.isEmailExist(email);
    if (isExis) {
      throw new BadRequestException(`email của bạn đã được đăng kí. Vui lòng sử dụng email khác!!!`)
    }

    //hash Password
    const hashPassword = await hashPasswordHelper(password);
    const user = await this.userModel.create({
      email, password: hashPassword, name, phone, address, image
    })
    return {
      _id: user._id
    }
  }

  async findAll(query: string, current: number, pageSize: number) {

    const { filter, sort } = aqp(query);

    if (filter.current)
      delete filter.current;
    if (filter.pageSize)
      delete filter.pageSize;

    if (!current)
      current = 1;
    if (!pageSize)
      pageSize = 10;

    const totalItems = (await this.userModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / pageSize);
    const skip = (current - 1) * (pageSize);

    const results = await this.userModel
      .find(filter)
      .limit(pageSize)
      .skip(skip)
      .select("-password") // don't get password 
      .sort(sort as any);

    return {
      meta: {
        current: current, // trang hiện tại 
        pageSize: pageSize, // số lượng phần tử đã lấy
        pages: totalPages, // tổng số lượng trang với điều kiện query
        total: totalItems // tổng số phần tử 
      },
      results // kết quả query
    };
  }

  findOne(id: string) {
    return `This action returns a #${id} user`;
  }

  async findByEmail(email: string) {
    return await this.userModel.findOne({ email });
  }

  async update(updateUserDto: UpdateUserDto) {
    return await this.userModel.updateOne(
      { _id: updateUserDto.id }, { ...updateUserDto });
  }

  async remove(_id: string) {
    //check id
    if (mongoose.isValidObjectId(_id)) {
      //detele
      return this.userModel.deleteOne({ _id })
    }
    else {
      throw new BadRequestException("id không đúng định dạng mongodb")
    }
  }

  async handleRegister(registerDto: CreateAuthDto) {
    const { email, password, name } = registerDto;
    //check email
    const isExis = await this.isEmailExist(email);
    if (isExis) {
      throw new BadRequestException(`email của bạn đã được đăng kí. Vui lòng sử dụng email khác!!!`)
    }

    //hash Password
    const hashPassword = await hashPasswordHelper(password);
    const codeId = uuidv4();
    const user = await this.userModel.create({
      email, password: hashPassword, name,
      isActive: false,
      codeId: codeId,
      codeExpired: dayjs().add(5, 'minutes')
    })

    //send email
    this.mailerService.sendMail({
      to: user.email, // list of receivers
      subject: 'Xác thực email ✔', // Subject line
      template: "register",
      context: {
        name: user.name ?? user.email,
        activationCode: codeId
      }
    })

    //trả phản hồi
    return {
      _id: user._id
    }
  }

  async handleActive(data: CodeAuthDto) {
    const user = await this.userModel.findOne({
      _id: data._id,
      codeId: data.code
    })
    if (!user) {
      throw new BadRequestException("Mã kích hoạt sai hoặc đã hết hạn !!!")
    }

    //check expire code
    const isBeforeCheck = dayjs().isBefore(user.codeExpired);
    if (isBeforeCheck) {
      //valid => update isActive -> true
      await this.userModel.updateOne({ _id: data._id }, {
        isActive: true
      })
      return { isBeforeCheck }
    }
    else {
      throw new BadRequestException("Mã kích hoạt đã hết hạn")
    }
  }

  async retryActive(email: string) {
    const user = await this.userModel.findOne({ email })
    if (!user) {
      throw new BadRequestException("Email không trùng khớp với tài khoản của bạn")
    }
    if (user.isActive) {
      throw new BadRequestException("Tài khoản đã được kích hoạt hãy đăng nhập")
    }
    const codeId = uuidv4();
    //update user ở database
    await user.updateOne({
      codeId: codeId,
      codeExpired: dayjs().add(5, 'minutes')
    })
    //send email
    this.mailerService.sendMail({
      to: user.email, // list of receivers
      subject: 'Xác thực email ✔', // Subject line
      template: "register",
      context: {
        name: user.name ?? user.email,
        activationCode: codeId
      }
    })
    return { _id: user._id }
  }
  async changePassword(data: ChangePasswordAuthDto) {

    //check newPass confirmNewPass
    if (data.newPassword != data.confirmNewPassword) {
      throw new BadRequestException("Mật khẩu mới và xác nhận mật khẩu mới không giống nhau")
    }

    //check user
    const user = await this.userModel.findOne({ email: data.email })
    if (!user) {
      throw new BadRequestException("Tài khoản không tồn tại")
    }

    //check expire code
    const isBeforeCheck = dayjs().isBefore(user.codeExpired);
    if (isBeforeCheck) {
      //valid => update isActive -> true
      const hashNewPassword = await hashPasswordHelper(data.newPassword)
      await user.updateOne({ password: hashNewPassword })
      return { isBeforeCheck }
    }
    else {
      throw new BadRequestException("Mã kích hoạt đã hết hạn")
    }
  }

  async forgotPassword(email: string) {
    //kiem tra user
    const user = await this.userModel.findOne({ email })
    if (!user) {
      throw new BadRequestException("Tài khoản không tồn tại")
    }

    const codeId = uuidv4();
    //update user ở database
    await user.updateOne({
      codeId: codeId,
      codeExpired: dayjs().add(5, 'minutes')
    })
    //send email
    this.mailerService.sendMail({
      to: user.email, // list of receivers
      subject: 'Change your password ✔', // Subject line
      template: "register",
      context: {
        name: user.name ?? user.email,
        activationCode: codeId
      }
    })
    return { _id: user._id, email: user.email }
  }
} 
