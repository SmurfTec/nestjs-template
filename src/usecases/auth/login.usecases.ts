import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import jwt_decode from 'jwt-decode';
import axios from 'axios';

@Injectable()
export class LoginUseCases {
  // constructor(
  //   // private readonly logger: ILogger,
  //   private readonly jwtTokenService: JwtTokenService,
  //   private readonly jwtConfig: EnvironmentConfigService,
  //   // private readonly userRepository: UserRepository,
  //   // private readonly profileUsecases: ProfilesUseCases,
  //   private readonly bcryptService: BcryptService,
  // ) {}
  // async getCookieWithJwtToken(email: string) {
  //   const payload: IJwtServicePayload = { email };
  //   const secret = this.jwtConfig.getJwtSecret();
  //   const expiresIn = this.jwtConfig.getJwtExpirationTime() + 's';
  //   const token = this.jwtTokenService.createToken(payload, secret, expiresIn);
  //   return token;
  //   // return `Authentication=${token}; SameSite=None;  Secure=true; HttpOnly; Path=/; Max-Age=${this.jwtConfig.getJwtExpirationTime()}`;
  // }
  // async getCookieWithJwtRefreshToken(email: string) {
  //   const payload: IJwtServicePayload = { email };
  //   const secret = this.jwtConfig.getJwtRefreshSecret();
  //   const expiresIn = this.jwtConfig.getJwtRefreshExpirationTime() + 's';
  //   const token = this.jwtTokenService.createToken(payload, secret, expiresIn);
  //   await this.setCurrentRefreshToken(token, email);
  //   //set cookie
  //   return token;
  //   // const cookie = `Refresh=${token}; SameSite=None; Secure=true; HttpOnly; Path=/; Max-Age=${this.jwtConfig.getJwtRefreshExpirationTime()}`;
  //   // return cookie;
  // }
  // getCookieForAuthCheck() {
  //   const cookie = `AuthCheck=true; SameSite=None;  Secure=true; Path=/; Max-Age=${this.jwtConfig.getJwtRefreshExpirationTime()}`;
  //   return cookie;
  // }
  // async validateUserForLocalStragtegy(email: string, pass: string) {
  //   const user = await this.userRepository.getActiveUserByEmail(email);
  //   if (!user) {
  //     return null;
  //   }
  //   const match = await this.bcryptService.compare(pass, user.password);
  //   if (user && match) {
  //     await this.updateLoginTime(user.email);
  //     const { password, ...result } = user;
  //     return result;
  //   }
  //   return null;
  // }
  // async validateEmailForLocalStragtegy(email: string) {
  //   const user = await this.userRepository.getActiveUserByEmail(email);
  //   if (!user) {
  //     return null;
  //   }
  //   return user;
  // }
  // async validateUserForJWTStragtegy(email: string) {
  //   const verifEmail = await this.userRepository.getActiveUserByEmail(email);
  //   if (!verifEmail) {
  //     return null;
  //   }
  //   const user = await this.userRepository.getActiveUserByEmail(email);
  //   if (!user) {
  //     return null;
  //   }
  //   return user;
  // }
  // async updateLoginTime(email: string) {
  //   await this.userRepository.updateLastLogin(email);
  // }
  // async setCurrentRefreshToken(refreshToken: string, email: string) {
  //   const currentHashedRefreshToken = await this.bcryptService.hash(
  //     refreshToken,
  //   );
  //   await this.userRepository.updateRefreshToken(
  //     email,
  //     currentHashedRefreshToken,
  //   );
  // }
  // async getUserIfRefreshTokenMatches(refreshToken: string, email: string) {
  //   const user = await this.userRepository.getActiveUserByEmail(email);
  //   if (!user) {
  //     return null;
  //   }
  //   const isRefreshTokenMatching = await this.bcryptService.compare(
  //     refreshToken,
  //     user.hashRefreshToken,
  //   );
  //   if (isRefreshTokenMatching) {
  //     return user;
  //   }
  //   return null;
  // }
  // async signInWithGoogle(credentialToken: string) {
  //   try {
  //     const user: any = jwt_decode(credentialToken);
  //     const checkUser = await this.userRepository.getUserByEmail(user.email);
  //     if (checkUser) {
  //       return { data: checkUser };
  //     }
  //     const createdUser = await this.userRepository.createUser({
  //       email: user.email,
  //       password: '',
  //     });
  //     const completedUser = await this.profileUsecases.createProfileGoogle(
  //       {
  //         phone: '',
  //       },
  //       user.email,
  //       createdUser.id,
  //     );
  //     return { data: completedUser };
  //   } catch (error) {
  //     throw new HttpException('Invalid Google SignIn', HttpStatus.UNAUTHORIZED);
  //   }
  // }
}
