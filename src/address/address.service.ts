import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { addressDto } from './dto';
import { Session } from 'inspector';

@Injectable()
export class AddressService {
  constructor(private prisma: PrismaService) {}
  async createAddress(address: addressDto, userId: string) {
    const newAddress = await this.prisma.address.create({
      data: {
        address: address.address,
        userId: userId,
      },
    });

    return newAddress;
  }
  async getALLAddress(userId: string) {
    const users = await this.prisma.address.findMany({
      where: { userId: userId },
    });
    return users;
  }
  async findOne(name: addressDto, userId: string) {
    return await this.prisma.address.findFirst({
      where: { address: name.address, userId: userId },
    });
  }
}
