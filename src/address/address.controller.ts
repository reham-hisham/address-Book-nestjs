import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Session,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { userDto } from 'src/users/dto';
import { AddressService } from './address.service';
import { addressDto } from './dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Address')
@Controller('address')
export class AddressController {
  constructor(
    private addressService: AddressService,
    private authservice: AuthService,
  ) {}
  @UseGuards(AuthGuard)
  @Post('add')
  async signin(@Body() body: addressDto, @Session() session: any) {
    const address = await this.addressService.createAddress(body, session.id);
    return address;
  }
  @UseGuards(AuthGuard)
  @Get('myAddresses')
  async get(@Session() session: any) {
    const address = await this.addressService.getALLAddress(session.id);
    return address;
  }
  @UseGuards(AuthGuard)
  @Post('GetoneAddress')
  async getOne(@Body() body: addressDto, @Session() session: any) {
    const address = await this.addressService.findOne(body, session.id);
    return address;
  }
  @Delete('delete/:id' )
  async deleteOne(@Param('id') id: string, @Session() session: any) {
    const address = await this.addressService.deleteOne(id, session.id);
    return "DELETED";
  }
}
