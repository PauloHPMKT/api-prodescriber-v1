import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { IsPublic } from '../modules/auth/decorators/is-public.decorator';
import { UserEntity } from '../modules/users/domain/entities/User';
import { CurrentUser } from '../modules/auth/decorators/currentuser.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @IsPublic()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('me')
  getMe(@CurrentUser() user: UserEntity) {
    return user;
  }
}
