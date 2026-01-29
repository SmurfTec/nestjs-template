import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { UserUseCases } from 'src/usecases/user/users.usecases';
import { LoginUseCases } from 'src/usecases/auth/login.usecases';
import { UserData } from '../user.data';
import { CustomClsService } from 'src/infrastructure/services/cls/cls.module';

@Injectable()
export class VerifyUserStrategy extends PassportStrategy(Strategy, 'verify-user') {
  constructor(
    private readonly userUseCases: UserUseCases,
    private readonly loginUsecaseProxy: LoginUseCases,
    private readonly cls: CustomClsService,
  ) {
    super({
      usernameField: 'token',
      passwordField: 'token',
      passReqToCallback: true,
    });
  }

  async validate(req: Request, token: string) {
    if (!token) {
      throw new UnauthorizedException('Invalid token');
    }

    const verificationResult = await this.userUseCases.verifyUser(token);
    if (!verificationResult || verificationResult.status !== 'Activated') {
      throw new UnauthorizedException('Invalid token');
    }

    const user = await this.loginUsecaseProxy.buildUserContext(
      verificationResult.email,
    );

    if (!user) {
      throw new UnauthorizedException('User Not Found');
    }

    new UserData(user);
    this.cls.set('user', user);

    return { user };
  }
}

