import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AppleAuthGuard extends AuthGuard('apple') {
  async canActivate(context: ExecutionContext) {
    const activate = await super.canActivate(context);
    const request = context.switchToHttp().getRequest();

    // If using session-based auth, initialize login session
    await super.logIn(request);

    return activate as boolean;
  }
}
