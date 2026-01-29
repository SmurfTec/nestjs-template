import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
// import { UsecasesProxyModule } from '../../usecases-proxy/usecases-proxy.module';
// import { UseCaseProxy } from '../../usecases-proxy/usecases-proxy';
import { LoginUseCases } from '../../../usecases/auth/login.usecases';
import { EnvironmentConfigService } from '../../../infrastructure/config/environment-config/environment-config.service';
import { UserData } from '../user.data';
import { UserUseCases } from 'src/usecases/user/users.usecases';
import { HttpStatusCode } from 'axios';
import { CustomClsService } from 'src/infrastructure/services/cls/cls.module';
import { UserRoleUseCases } from 'src/usecases/user-role/user-roles.usecases';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  requestObj: Request;
  token: string;
  constructor(
    private readonly loginUsecase: LoginUseCases,
    private readonly userUseCases: UserUseCases,
    private readonly userRoleUseCases: UserRoleUseCases,
    private readonly cls: CustomClsService,
    private readonly configService: EnvironmentConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          this.requestObj = request;
          this.token = request.headers.authorization
            ? request.headers.authorization.split(' ')[1]
            : undefined;

          if (this.token) return this.token;
          else return request?.cookies?.Authentication;
        },
      ]),

      secretOrKey: configService.getJwtSecret(),
    });
  }

  async validate(payload: any) {
    let user = await this.loginUsecase.validateUserForJWTStragtegy(
      payload.email,
    );

    const roles = (
      await this.userRoleUseCases.getUserRolesByUserId(user.id)
    ).map((role) => role['roleIdData'].name);

    if (!user) {
      // this.logger.warn('JwtStrategy', `User not found`);
      // this.exceptionService.UnauthorizedException({ message: 'User not found' });
      throw new UnauthorizedException('User Not Found');
    }
    // console.log("permissions", await this.permissionUsecase.getUserPermissions(user.id));
    new UserData({ ...user, roles });
    this.cls.set('user', user);

    return { ...user };
  }
}
