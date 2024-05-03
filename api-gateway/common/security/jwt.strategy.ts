import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AppService } from '../../src/app.service';
import { JWTPayload } from './jwt.payload';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private appService: AppService,
    configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      //   ignoreExpiration: false,
      secretOrKey: configService.get<string>('SECRET_KEY'),
    });
  }

  async validate(): Promise<Boolean> {
    const validatetoken = await this.appService.validateToken({
      token: ExtractJwt.fromAuthHeaderAsBearerToken().toString(),
    });
    if (!validatetoken.success) {
      throw new UnauthorizedException();
    }
    return true;
  }
}
