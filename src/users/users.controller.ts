/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller } from '@nestjs/common';
import { Body, Get, Post, Session, UseGuards } from '@nestjs/common/decorators';
import { UsersService } from './users.service';
import { userDto } from './dto';
import { serialize } from 'src/interceptors/serialize.interceptore';
import { AuthService } from 'src/auth/auth.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Users')
@Controller('users')
@serialize(userDto)
export class UsersController {
  constructor(
    private userServices: UsersService,
    private authservice: AuthService,
  ) {}
  @Post('signin')
  async signin(@Body() body: userDto, @Session() session: any) {
    const user = await this.authservice.signin(body.email, body.password);

    session.useremail = user.email;
    session.id = user.id;
    return "Welcome ^^";
  }
  @UseGuards(AuthGuard)
  @Post('signout')
  signout(@Session() session: any) {
    session.useremail = null;
    return 'see u later ^^'
  }
  @Post('signup')
  async signUp(@Body() user: userDto) {
     await this.authservice.signup(user.email, user.password);
    return `welcome u can login`;
  }
}

