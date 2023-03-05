import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from 'src/users/users.service';
import { PrismaService } from 'src/prisma/prisma.service';
@Module({
  providers: [AuthService , UsersService , PrismaService],
  controllers: [AuthController]
})
export class AuthModule {}
