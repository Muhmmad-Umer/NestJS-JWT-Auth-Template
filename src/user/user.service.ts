import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './entities/user.schema';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUserById(userId: string): Promise<User> {
    return this.userRepository.findOne({ _id: userId });
  }

  async getUsers(): Promise<User[]> {
    return this.userRepository.find({});
  }

  async createUser(
    username: string,
    email: string,
    pass: string,
    age?: number,
  ): Promise<User> {
    return this.userRepository.create({
      username,
      email,
      hashedPassword: pass,
      age: age,
    });
  }

  async updateUser(userId: string, userUpdates: UpdateUserDto): Promise<User> {
    return this.userRepository.findOneAndUpdate({ _id: userId }, userUpdates);
  }

  async deleteUser(userId: string): Promise<User> {
    return this.userRepository.findOneAndDelete({ _id: userId });
  }
}
