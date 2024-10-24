import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
// import { UsecasesProxyModule } from '../../usecases-proxy/usecases-proxy.module';
// import { UseCaseProxy } from '../../usecases-proxy/usecases-proxy';
import { LoginUseCases } from '../../../usecases/auth/login.usecases';
// import { LoggerService } from '../../logger/logger.service';
// import { ExceptionsService } from '../../exceptions/exceptions.service';
import { TokenPayload } from '../../../domain/models/auth';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  // constructor(private readonly loginUsecaseProxy: LoginUseCases) {
  //   super({
  //     usernameField: 'email',
  //     passwordField: 'password',
  //   });
  // }
  // async validate(email: string, password: string) {
  //   if (!email || !password) {
  //     // this.logger.warn('LocalStrategy', `email or password is missing, BadRequestException`);
  //     // this.exceptionService.UnauthorizedException();
  //     throw new UnauthorizedException('User Not Found');
  //   }
  //   const user = await this.loginUsecaseProxy.validateUserForLocalStragtegy(
  //     email,
  //     password,
  //   );
  //   if (!user) {
  //     //   this.logger.warn('LocalStrategy', `Invalid email or password`);
  //     //   this.exceptionService.UnauthorizedException({ message: 'Invalid email or password.' });
  //     throw new UnauthorizedException('Invalid email or password');
  //   }
  //   //@todo:
  //   return { user: { ...user } };
  // }
}
