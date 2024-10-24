import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
// import { UsecasesProxyModule } from '../../usecases-proxy/usecases-proxy.module';
// import { UseCaseProxy } from '../../usecases-proxy/usecases-proxy';
// import { LoginUseCases } from '../../../usecases/auth/login.usecases';
import { EnvironmentConfigService } from '../../../infrastructure/config/environment-config/environment-config.service';
import { UserData } from '../user.data';
// import { PermissionsUseCases } from 'src/usecases/auth/permission.usecases';
// import { ExceptionsService } from '../../exceptions/exceptions.service';
// import { LoggerService } from '../../logger/logger.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  // constructor(
  //   private readonly loginUsecase: LoginUseCases,
  //   private readonly permissionUsecase: PermissionsUseCases,
  //   private readonly configService: EnvironmentConfigService, // private readonly logger: LoggerService, // private readonly exceptionService: ExceptionsService,
  // ) {
  //   super({
  //     jwtFromRequest: ExtractJwt.fromExtractors([
  //       (request: Request) => {
  //         return request?.headers?.authentication as string;
  //       },
  //     ]),
  //     secretOrKey: configService.getJwtSecret(),
  //   });
  // }
  // async validate(payload: any) {
  //   let user = await this.loginUsecase.validateUserForJWTStragtegy(
  //     payload.email,
  //   );
  //   if (!user) {
  //     // this.logger.warn('JwtStrategy', `User not found`);
  //     // this.exceptionService.UnauthorizedException({ message: 'User not found' });
  //     throw new UnauthorizedException('User Not Found');
  //   }
  //   // * get Stripe account
  //   // let is_stripe_account = false;
  //   const { permissions, roles } =
  //     await this.permissionUsecase.getUserPermissionsAndRoles(user.id);
  //   // console.log("permissions", await this.permissionUsecase.getUserPermissions(user.id));
  //   new UserData({ ...user, permissions, roles });
  //   return user;
  // }
}
