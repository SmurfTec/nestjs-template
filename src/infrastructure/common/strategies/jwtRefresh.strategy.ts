import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { EnvironmentConfigService } from '../../config/environment-config/environment-config.service';
// import { UsecasesProxyModule } from '../../usecases-proxy/usecases-proxy.module';
// import { UseCaseProxy } from '../../usecases-proxy/usecases-proxy';
// import { LoginUseCases } from '../../../usecases/auth/login.usecases';
import { TokenPayload } from '../../../domain/models/auth';
// import { LoggerService } from '../../logger/logger.service';
// import { ExceptionsService } from '../../exceptions/exceptions.service';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token',
) {
  // constructor(
  //   private readonly configService: EnvironmentConfigService,
  //   private readonly loginUsecaseProxy: LoginUseCases, // private readonly logger: LoggerService, // private readonly exceptionService: ExceptionsService,
  // ) {
  //   super({
  //     jwtFromRequest: ExtractJwt.fromExtractors([
  //       (request: Request) => {
  //         return request?.headers?.refresh as string;
  //       },
  //     ]),
  //     secretOrKey: configService.getJwtRefreshSecret(),
  //     passReqToCallback: true,
  //   });
  // }
  // async validate(request: Request, payload: TokenPayload) {
  //   const refreshToken = request.cookies?.Refresh;
  //   const user = this.loginUsecaseProxy.getUserIfRefreshTokenMatches(
  //     refreshToken,
  //     payload.email,
  //   );
  //   if (!user) {
  //     // this.logger.warn('JwtStrategy', `User not found or hash not correct`);
  //     // this.exceptionService.UnauthorizedException({ message: 'User not found or hash not correct' });
  //     throw new UnauthorizedException('User Not Found');
  //   }
  //   return user;
  // }
}
