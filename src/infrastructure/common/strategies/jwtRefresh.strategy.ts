import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { EnvironmentConfigService } from '../../config/environment-config/environment-config.service';
import { LoginUseCases } from '../../../usecases/auth/login.usecases';
import { TokenPayload } from '../../../domain/models/auth';
import { UserData } from '../user.data';
import { UserUseCases } from 'src/usecases/user/users.usecases';
import { CustomClsService } from 'src/infrastructure/services/cls/cls.module';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token',
) {
  constructor(
    configService: EnvironmentConfigService,
    private readonly userUseCases: UserUseCases,
    private readonly cls: CustomClsService,
    private readonly loginUsecaseProxy: LoginUseCases, // private readonly logger: LoggerService, // private readonly exceptionService: ExceptionsService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => this.getRefreshTokenFromRequest(request),
      ]),
      secretOrKey: configService.getJwtRefreshSecret(),
      passReqToCallback: true,
    });
  }

  async validate(request: Request, payload: TokenPayload) {
    const refreshToken = this.getRefreshTokenFromRequest(request);
    const user = await this.loginUsecaseProxy.getUserIfRefreshTokenMatches(
      refreshToken,
      payload.email,
    );
    if (!user) {
      // this.logger.warn('JwtStrategy', `User not found or hash not correct`);
      // this.exceptionService.UnauthorizedException({ message: 'User not found or hash not correct' });
      throw new UnauthorizedException('User Not Found');
    }

    new UserData(user);
    this.cls.set('user', user);

    return user;
  }

  private getRefreshTokenFromRequest(request: Request): string | undefined {
    const cookieToken = request?.cookies?.Refresh;
    const headerToken = request?.headers?.['x-refresh-token'];
    const normalizedHeaderToken = Array.isArray(headerToken)
      ? headerToken[0]
      : headerToken;

    if (normalizedHeaderToken && typeof normalizedHeaderToken === 'string') {
      return normalizedHeaderToken;
    }

    return cookieToken;
  }
}
