import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-apple';
import { UserData } from '../user.data';
import { EnvironmentConfigService } from 'src/infrastructure/config/environment-config/environment-config.service';
import { ConfigService } from '@nestjs/config';

const configSerivce = new EnvironmentConfigService(new ConfigService());

@Injectable()
export class AppleStrategy extends PassportStrategy(Strategy, 'apple') {
  constructor() {
    super({
      clientID: configSerivce.getAppleClientId(),
      teamID: configSerivce.getAppleTeamId(),
      keyID: configSerivce.getAppleKeyId(),
      privateKeyString: configSerivce.getApplePrivateKey(), // Ensure proper formatting
      callbackURL: configSerivce.getAppleClientCallBackUrl(),
      scope: ['email', 'name'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    decodedIdToken: any,
    profile: any,
  ) {
    const user = {
      appleId: decodedIdToken.sub,
      email: decodedIdToken.email || null,
      name: profile?.name || null,
      accessToken,
    };

    new UserData(user);
    return {
      user,
    };
  }
}
