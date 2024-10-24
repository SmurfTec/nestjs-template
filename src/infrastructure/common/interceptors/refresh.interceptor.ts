import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
// import { LoginUseCases } from 'src/usecases/auth/login.usecases';

@Injectable()
export class RefreshInterceptor<T>
  extends PassportStrategy(Strategy, 'jwt-refresh-token')
  implements NestInterceptor<T, any>
{
  constructor() // private readonly loginUsecaseProxy: LoginUseCases
  {
    super();
  }
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const httpContext = context.switchToHttp();
    // const request = httpContext.getRequest();
    // if (
    //   request?.cookies &&
    //   !request.cookies?.Authentication &&
    //   request.cookies?.Refresh
    // ) {
    //   const accessTokenCookie =
    //     await this.loginUsecaseProxy.getCookieWithJwtToken(
    //       request.user.username,
    //     );
    //   request.res.setHeader('Set-Cookie', accessTokenCookie);
    // }

    return next.handle().pipe(map((data) => data));
  }
}
