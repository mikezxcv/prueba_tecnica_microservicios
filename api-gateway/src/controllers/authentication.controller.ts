import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
} from '@nestjs/common';
import { AppService } from '../app.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard as CustomAuthGuard } from 'common/security/auth.guard';

import {
  LoginDto,
  SignupDto,
  ValidateTokenDto,
} from 'src/dto/authentication.dto';
@ApiTags('Authentication Service')
@Controller('/authentication')
export class AuthenticationController {
  constructor(private readonly appService: AppService) {}

  @Post('/login')
  login(@Body() loginDto: LoginDto) {
    return this.appService.login(loginDto);
  }

  @Post('/signup')
  signup(@Body() signupDto: SignupDto) {
    return this.appService.signup(signupDto);
  }

  @ApiBearerAuth()
  @UseGuards(CustomAuthGuard)
  @Post('/validate')
  validateToken(@Body() validateTokenDto: ValidateTokenDto) {
    return this.appService.validateToken(validateTokenDto);
  }

  @ApiBearerAuth()
  @UseGuards(CustomAuthGuard)
  @Get('/users')
  findAllUsers() {
    return this.appService.findAllUsers();
  }
}

