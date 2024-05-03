import { Controller } from '@nestjs/common';
import { AuthenticationService } from './services/authentication.service';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/loginResponse.dto';
import { SignupDto } from './dto/signup.dto';
import { MessagePattern } from '@nestjs/microservices';
@Controller()
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @MessagePattern({ cmd: 'get_all_users' })
  findAll() {
    return this.authenticationService.findAll();
  }

  @MessagePattern({ cmd: 'login' })
  login(request: LoginDto): Promise<LoginResponseDto> {
    return this.authenticationService.login(request);
  }

  @MessagePattern({ cmd: 'signup' })
  signup( request: SignupDto) {
    return this.authenticationService.signup(request);
  }

  @MessagePattern({ cmd: 'validate_token' })
  validateToken( request: { token: string }) {
    return this.authenticationService.validateToken(request.token);
  }
}
