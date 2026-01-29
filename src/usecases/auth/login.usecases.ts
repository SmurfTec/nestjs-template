import { ClsService } from 'nestjs-cls';
import { IJwtServicePayload } from '../../domain/adapters/jwt.interface';
import { JwtTokenService } from 'src/infrastructure/services/jwt/jwt.service';
import { UserRepository } from 'src/infrastructure/repository/users.repository';
import { BadRequestException, Injectable } from '@nestjs/common';
import { EnvironmentConfigService } from 'src/infrastructure/config/environment-config/environment-config.service';
import { BcryptService } from 'src/infrastructure/services/bcrypt/bcrypt.service';
import { UserData } from 'src/infrastructure/common/user.data';
import { UserRoleUseCases } from '../user-role/user-roles.usecases';
import { UserRoles } from 'src/infrastructure/entities/user-roles.entity';
import { TwoFactorAuthUseCases } from '../settings/two-factor-auth.usecases';
import { UserUseCases } from '../user/users.usecases';

@Injectable()
export class LoginUseCases {
  constructor(
    private readonly jwtTokenService: JwtTokenService,
    private readonly jwtConfig: EnvironmentConfigService,
    private readonly userRepository: UserRepository,
    private readonly bcryptService: BcryptService,
    private readonly cls: ClsService,
    private readonly userRoleUseCases: UserRoleUseCases,
    private readonly twoFactorAuthUseCases: TwoFactorAuthUseCases,
    private readonly userUseCases: UserUseCases,
  ) {}

  async validateUserForLocalStragtegy(email: string, pass: string, twoFactorToken?: string) {
    const user = await this.userRepository.getUserByEmail(email);
    if (!user) {
      return null;
    }
    const match = await this.bcryptService.compare(pass, user.password);
    if (user && match) {
      if (user.status != 'ACTIVE' || !user.is_active) {
        await this.userUseCases.resendOtp(email);
        throw new BadRequestException("Account not activated, check your email to verify your email address.")
      }

      // Check if 2FA is enabled
      const twoFactorStatus = await this.twoFactorAuthUseCases.getTwoFactorAuthStatus(user.id);
      
      if (twoFactorStatus.is_enabled) {
        // 2FA is enabled, check if token is provided
        if (!twoFactorToken) {
          return { requiresTwoFactor: true, ...user };
        }

        // Verify the 2FA token
        const isValid = await this.twoFactorAuthUseCases.verifyTokenForLogin(
          user.id,
          twoFactorToken,
        );

        if (!isValid) {
          throw new Error('Invalid two-factor authentication code');
        }
      }

      await this.updateLoginTime(user.email);
      const { password, ...result } = user;
      // Get user roles
      const userRoles: UserRoles[] =
        await this.userRoleUseCases.getUserRolesByUserId(user.id);
      const roles = userRoles.map((userRole) => userRole.roleIdData);

      return {
        ...result,
        roles: roles,
      };
    }
    return null;
  }

  async getJwtToken(email: string) {
    // this.logger.log('LoginUseCases execute', `The user ${email} have been logged.`);
    const user = this.cls.get('user');
    const payload: IJwtServicePayload = {
      email,
      userId: user?.id,
    };
    const secret = this.jwtConfig.getJwtSecret();
    const expiresIn = this.jwtConfig.getJwtExpirationTime() + 's';
    const token = this.jwtTokenService.createToken(payload, secret, expiresIn);
    return token;
  }

  async getJwtRefreshToken(email: string) {
    // this.logger.log('LoginUseCases execute', `The user ${email} have been logged.`);
    const user = this.cls.get('user');
    const payload: IJwtServicePayload = {
      email,
      userId: user.id,
    };
    const secret = this.jwtConfig.getJwtRefreshSecret();
    const expiresIn = this.jwtConfig.getJwtRefreshExpirationTime() + 's';
    const token = this.jwtTokenService.createToken(payload, secret, expiresIn);
    
    // store the token in the database
    await this.userRepository.updateRefreshToken(email, token);
    return token;
  }

  async getWithJwtTokenWithNoExpiry(email: string) {
    // this.logger.log('LoginUseCases execute', `The user ${email} have been logged.`);
    const user = this.cls.get('user');
    const payload: IJwtServicePayload = {
      email,
      userId: user.id,
    };
    const secret = this.jwtConfig.getJwtSecret();

    return this.jwtTokenService.createTokenWithNoExpiry(payload, secret);
  }

  getCookieForAuthCheck(headers) {
    if ('origin' in headers) {
      const domain = this.extractDomainFromOrigin(headers.origin);
      return `AuthCheck=true; Path=/; SameSite=Strict; Domain=${domain}; Max-Age=${this.jwtConfig.getJwtRefreshExpirationTime()}`;
    }
    return `AuthCheck=true; Path=/; SameSite=Strict; Max-Age=${this.jwtConfig.getJwtRefreshExpirationTime()}`;
  }

  async validateUserForJWTStragtegy(email: string) {
    const user = await this.userRepository.getUserByEmail(email);
    if (!user) {
      return null;
    }

    // Get user roles
    const userRoles: UserRoles[] =
      await this.userRoleUseCases.getUserRolesByUserId(user.id);
    const roles = userRoles.map((userRole) => userRole.roleIdData);

    return {
      ...user,
      roles: roles,
    };
  }

  async updateLoginTime(email: string) {
    await this.userRepository.updateLastLogin(email);
  }

  async buildUserContext(email: string) {
    const user = await this.userRepository.getUserByEmail(email);
    if (!user) {
      return null;
    }

    const { password, ...result } = user;

    const userRoles: UserRoles[] =
      await this.userRoleUseCases.getUserRolesByUserId(user.id);
    const roles = userRoles.map((userRole) => userRole.roleIdData);

    return {
      ...result,
      roles,
    };
  }

  async setCurrentRefreshToken(refreshToken: string, email: string) {
    const currentHashedRefreshToken =
      await this.bcryptService.hash(refreshToken);
    await this.userRepository.updateRefreshToken(
      email,
      currentHashedRefreshToken,
    );
  }

  async getUserIfRefreshTokenMatches(refreshToken: string, email: string) {
    if (!refreshToken) {
      return null;
    }

    const user = await this.userRepository.getUserByEmail(email);
    if (!user || !user.hashRefreshToken) {
      return null;
    }

    const isRefreshTokenMatching = await this.bcryptService.compare(
      refreshToken,
      user.hashRefreshToken,
    );

    if (!isRefreshTokenMatching) {
      return null;
    }

    return {
      ...user,
    };
  }

  extractDomainFromOrigin(url) {
    const parsedURL = new URL(url);
    const hostname = parsedURL.hostname;
    if (this.ValidateIPaddress(hostname)) {
      return hostname;
    }
    const parts = hostname.split('.');
    if (parts.length > 2) {
      return parts.slice(-parts.length + 1).join('.');
    }
    return hostname;
  }
  ValidateIPaddress(ipaddress) {
    if (
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
        ipaddress,
      )
    ) {
      return true;
    }
    return false;
  }

  async updatePassword(password, newPassword) {
    const userId = +UserData.getUserData().id;
    const user = await this.userRepository.getUser(userId);

    if (!user) {
      return 'User does not exist!';
    }

    if (!(await this.bcryptService.compare(password, user.password))) {
      return 'Current password do not match!';
    }

    const updatedPassword = await this.bcryptService.hash(newPassword);
    await this.userRepository.updateUser(userId, { password: updatedPassword });
    return 'Password updated!';
  }
}
