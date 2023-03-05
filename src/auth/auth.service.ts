import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { BadRequestException } from '@nestjs/common/exceptions';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
const scrypt = promisify(_scrypt);
@Injectable()
export class AuthService {
  constructor(
    private userservice: UsersService,
    private prisma: PrismaService,
  ) {}

  async signup(email: string, password: string) {
    const users = await this.prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (users) {
      throw new BadRequestException('user already in use ');
    }

    // gen salt
    const salt = randomBytes(8).toString('hex');
    // 16 car or numbers

    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const result = salt + '.' + hash.toString('hex');
    const user = await this.userservice.createUser({
      email: email,
      password: result,
      id: '',
    });
    return user;
  }

  async signin(email: string, password: string) {

    
    const user = await this.userservice.findOne(email);
    if (!user) {
      throw new BadRequestException('wrong email');
    }
    const [salt, Storedhash] = user.password.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    if (Storedhash === hash.toString('hex')) {
      return user;
    } else {
      throw new BadRequestException('bad password');
    }
  }
}
