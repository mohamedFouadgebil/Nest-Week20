import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from 'src/common/guard/auth.guard';
import { LoggingInterceptor } from 'src/common/interceptor/logger.interceptor';
import { ResponseInterceptor } from 'src/common/interceptor/response.interceptor';

@UseInterceptors(LoggingInterceptor, ResponseInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  signup(@Body() body: any) {
    return this.authService.signup(body);
  }

  @Post('/resend-otp')
  async resendOtp(@Body() resendOtp: any) {
    return await this.authService.resendOtp(resendOtp);
  }

  @Post('/confirm-email')
  async confirmEmail(@Body() confirmEmail: any) {
    return await this.authService.confirmEmail(confirmEmail);
  }

  @Post('/login')
  async login(@Body() login: any) {
    return await this.authService.login(login);
  }

  @Get('/profile')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  async getProfile(@Req() req: any) {
    return await this.authService.getProfile(req);
  }
}
