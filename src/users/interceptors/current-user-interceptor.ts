import {
  UseInterceptors,
  NestInterceptor,
  CallHandler,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Console } from 'console';

import { UsersService } from '../users.service';
@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private userservices: UsersService) {}
  async intercept(context: ExecutionContext, handler: CallHandler) {
    const req = context.switchToHttp().getRequest();
   

    const { useremail } = req.session || {};
    if (useremail) {
      const user = await this.userservices.findOne(useremail);
      req.currentUser = user
     return handler.handle()
    }     
    return handler.handle()

  }
}
 