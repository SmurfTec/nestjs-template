import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { EnvironmentConfigService } from 'src/infrastructure/config/environment-config/environment-config.service';
import { UserData } from '../user.data';

const configSerivce = new EnvironmentConfigService(new ConfigService());

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: configSerivce.getGoogleClientId(),
      clientSecret: configSerivce.getGoogleClientId(),
      callbackURL: configSerivce.getGoogleCallBackUrl(),
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const user = {
      googleId: profile.id,
      email: profile.emails[0].value,
      name: profile.displayName,
      picture: profile.photos[0].value,
      accessToken,
    };
    new UserData(user);
    return {
      user,
    };
  }
}
