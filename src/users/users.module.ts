import { Injectable, Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from 'src/auth/auth.service';
import { CurrentUserInterceptor } from './interceptors/current-user-interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core/constants';
@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    CurrentUserInterceptor,
    PrismaService,
    AuthService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CurrentUserInterceptor,
    },
  ],
})
export class UsersModule {}
