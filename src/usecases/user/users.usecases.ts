import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import {
  UserModel,
  UpdateUserModel,
  UserWithProfileModel,
} from '../../domain/models/users';
import { UserRepository } from '../../infrastructure/repository/users.repository';
import { randomUUID } from 'crypto';
import { BcryptService } from 'src/infrastructure/services/bcrypt/bcrypt.service';
import { CacheService } from 'src/infrastructure/common/caching/cache.service';
import { MailService } from 'src/infrastructure/emails/email.service';
import {
  generateOTP,
  generateRandomPrimaryKey,
} from 'src/infrastructure/util/utility-functions';
import { ProfileUseCases } from '../profile/profiles.usecases';
import { CacheEnums } from 'src/infrastructure/common/enums/cache.enums';
import { RoleRepository } from '../../infrastructure/repository/roles.repository';
import { UserRoleRepository } from '../../infrastructure/repository/user-roles.repository';

@Injectable()
export class UserUseCases {
  constructor(
    private readonly profileUsecases: ProfileUseCases,
    private readonly userRepository: UserRepository,
    private readonly bcryptService: BcryptService,
    private cacheService: CacheService,
    private mailService: MailService,
  ) {}

  async createUser(userModel: UserModel) {
    return await this.userRepository.createUser(userModel);
  }

  async getUser(id: number) {
    const data = await this.userRepository.getUser(id);
    if (!data) {
      throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
    }
    return { data };
  }

  async socialSignIn(user: any) {
    const email = user.email;
    const existsingUser = await this.userRepository.getUserByEmail(email);

    if (existsingUser) {
      return existsingUser;
    }

    const profile = await this.profileUsecases.createProfile({
      name: user.name,
    });

    const createdUser = await this.userRepository.createUser({
      email: email.toLowerCase(),
      password: '',
      status: 'ACTIVE',
      is_active: true,
      profile_id: profile.id,
    });

    return createdUser;
  }

  async signUpUser(userData: UserWithProfileModel) {
    const existingUser = await this.userRepository.getUserByEmail(
      userData.email,
    );

    if (existingUser) {
      throw new BadRequestException('User Already Exists!');
    }

    const email = userData.email;
    const profile = await this.profileUsecases.createProfile({
      name: userData.name,
      mobile: userData.mobile,
    });

    delete userData.name;
    delete userData.mobile;

    userData.password = await this.bcryptService.hash(userData.password);

    const user = await this.userRepository.createUser({
      email: email.toLowerCase(),
      password: userData.password,
      status: 'PENDING',
      is_active: false,
      profile_id: profile.id,
    });
    const code = generateOTP();
    this.cacheService.set(code, email.toLowerCase());

    this.mailService.sendSetupConfirmationEmail(email.toLowerCase(), code);

    return { user, code };
  }

  async verifyUser(code: string) {
    const email: any = await this.cacheService.get(code);

    if (!email) {
      throw new BadRequestException('Invalid OTP!');
    }
    
    const user = await this.userRepository.getUserByEmail(email);
    
    if (!user) {
      throw new BadRequestException();
    }

    await this.userRepository.updateUser(user.id, {
      is_active: true,
      status: 'ACTIVE'
    });
    
    return {
      status: 'Activated', 
      email: user.email
    };
  }

  async getTokenFromCode(code: string) {
    const email: any = await this.cacheService.get(code);
    
    if (!email) {
      throw new BadRequestException('Invalid OTP!');
    }
    
    const token = randomUUID();

    await this.cacheService.set(token, email, 60 * 60 * 1000);
    
    return { token };
  }

  async resendOtp(email: string) {
    const code = generateOTP();
    this.cacheService.set(code, email.toLowerCase());

    this.mailService.sendSetupConfirmationEmail(email.toLowerCase(), code);

    return;
  }

  async forgotPassword(email: string) {
    const activeUser = await this.userRepository.getActiveUserByEmail(
      email.toLowerCase(),
    );
    if (!activeUser) {
      throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
    }
    // const token = randomUUID();
    const code = generateOTP();
    // this.forgotPasswordNotificationPublisher.addNotifications({
    //   name: activeUser.name,
    //   email,
    //   token,
    // });

    this.cacheService.set(code, email.toLowerCase());
    // await this.cacheService.set(token, email, 60 * 60 * 1000);
    // const fileData = readFileSync(
    //   path.join(
    //     __dirname,
    //     '../../infrastructure/emails/templates/forgot-password.hbs',
    //   ),
    // ).toString();
    // await this.notificationLogUseCases.createNotificationLog({
    //   type: NotificationTypes.EMAIL,
    //   subject: 'forgot password',
    //   contact: activeUser.email,
    //   table: 'users',
    //   table_col: 'id',
    //   table_val: user[0]['id'],
    //   message_body: fileData,
    // });

    // this.mailService.forgotPasswordEmail(
    //   activeUser['profile']['name'],
    //   email,
    //   token,
    // );

    this.mailService.sendSetupConfirmationEmail(email.toLowerCase(), code);

    return { message: 'Email sent with code to authorized email address' };
  }

  async setUserPassword(token: string, password: string) {
    const userEmail: any = await this.cacheService.get(token);
    if (!userEmail) {
      throw new HttpException('token expired', HttpStatus.BAD_REQUEST);
    }
    const user = await this.userRepository.getUserByEmail(userEmail);
    if (user) {
      const updatedUser = await this.updateUser(user.id, {
        password: await this.bcryptService.hash(password),
      });
      if (updatedUser) {
        await this.cacheService.delete(token);
        await this.cacheService.delete(CacheEnums.INCORRECT_LOGIN + user.email);
        return 'password updated';
      } else {
        return 'password update failed';
      }
    }
  }

  async initiateEmailUpdate(email: string) {
    const activeUser = await this.userRepository.getActiveUserByEmail(
      email.toLowerCase(),
    );
    if (!activeUser) {
      throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
    }

    const code = generateOTP();
    // Store OTP with email as key for verification
    this.cacheService.set(code, email.toLowerCase());

    // Send verification email to the current email
    this.mailService.sendEmailUpdateVerificationEmail(
      email.toLowerCase(),
      code,
    );

    return { message: 'Verification code sent to current email', code };
  }

  async verifyEmailUpdate(otp: string, newEmail: string) {
    // Get the email associated with this OTP
    const currentEmail: any = await this.cacheService.get(otp);
    if (!currentEmail) {
      throw new HttpException('OTP expired or invalid', HttpStatus.BAD_REQUEST);
    }

    // Check if the new email is already in use
    const existingUser = await this.userRepository.getUserByEmail(
      newEmail.toLowerCase(),
    );
    if (existingUser) {
      throw new HttpException(
        'New email is already in use',
        HttpStatus.BAD_REQUEST,
      );
    }

    // Get the user by current email
    const user = await this.userRepository.getUserByEmail(currentEmail);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    // Update the user's email
    const updatedUser = await this.updateUser(user.id, {
      email: newEmail.toLowerCase(),
    });

    if (updatedUser) {
      // Clear the OTP from cache
      await this.cacheService.delete(otp);
      return 'Email updated successfully';
    } else {
      throw new HttpException(
        'Email update failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getUsers() {
    return await this.userRepository.getUsers();
  }

  async updateUser(id: number, userUpdateModel: UpdateUserModel) {
    return await this.userRepository.updateUser(id, userUpdateModel);
  }

  async deleteUser(id: number) {
    return await this.userRepository.deleteUser(id);
  }
}
