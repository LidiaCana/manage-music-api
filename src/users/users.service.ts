import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';

// This should be a real class/interface representing a user entity
export type user = any;

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<user> {
    const createUser = new this.userModel(createUserDto);
    return createUser.save();
  }

  async findOne(id: string): Promise<User> {
    return this.userModel.findOne({ spotify_id: id }).exec();
  }

  async update(id: string, postData: CreateUserDto): Promise<User> {
    return this.userModel.findOneAndUpdate({ spotify_id: id, postData }).exec();
  }
}
