import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginUseCases } from '../../../usecases/auth/login.usecases';
import { UserUseCases } from 'src/usecases/user/users.usecases';
import { statusEnums } from '../enums/status.enums';
import { UserData } from '../user.data';
import { CustomClsService } from 'src/infrastructure/services/cls/cls.module';
import { Request } from 'express';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userUseCases: UserUseCases,
    private readonly loginUsecaseProxy: LoginUseCases,
    private readonly cls: CustomClsService,
  ) {
    super({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    });
  }

  async validate(req: Request, email: string, password: string) {
    if (!email || !password) {
      throw new UnauthorizedException('User Not Found');
    }

    // Get 2FA token from request body
    const twoFactorToken = req.body?.twoFactorToken;

    const user = await this.loginUsecaseProxy.validateUserForLocalStragtegy(
      email,
      password,
      twoFactorToken,
    );

    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }

    // Check if 2FA is required
    if (user.requiresTwoFactor) {
      throw new UnauthorizedException('Two-factor authentication required');
    }

    if (user.status === statusEnums.LOCKED) {
      throw new UnauthorizedException(
        'Your account has been locked due to too many attempts of incorrect password. Please contact administrator.',
      );
    }

    new UserData(user);
    this.cls.set('user', user);
    return {
      user,
    };
  }
}
