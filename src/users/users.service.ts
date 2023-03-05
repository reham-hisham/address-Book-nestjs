import { Injectable } from '@nestjs/common';
import { userDto } from './dto/user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async createUser(user: userDto) {
    const newUser = await this.prisma.user.create({
      data: {
        email: user.email,
        password: user.password,
      },
    });
    return newUser;
  }
  async getALLUsers() {
    const users = await this.prisma.user.findMany();
    return users;
  }
  async findOne(email: string) {
    return await this.prisma.user.findFirst({ where: { email: email } });
  }
}
