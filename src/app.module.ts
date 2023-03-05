import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CurrentUserInterceptor } from './users/interceptors/current-user-interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { AddressModule } from './address/address.module';

@Module({
  imports: [UsersModule, AuthModule,  AddressModule],
  providers: [],
})
export class AppModule {}
