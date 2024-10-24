// import { NotificationsUseCases } from './../../../usecases/notification/notifications.usecases';
// import { AuthorizationUseCases } from 'src/usecases/auth/authorization.usecases';
// import { MailService } from 'src/infrastructure/services/emails/email.service';
// import { BcryptService } from './../../services/bcrypt/bcrypt.service';
// import { UserData } from 'src/infrastructure/common/user.data';

// import {
//   BadRequestException,
//   Body,
//   Controller,
//   Get,
//   HttpException,
//   HttpStatus,
//   Param,
//   ParseIntPipe,
//   Patch,
//   Post,
//   Put,
//   Req,
//   Request,
//   UnauthorizedException,
//   UseGuards,
//   Response,
//   Next,
//   ForbiddenException,
// } from '@nestjs/common';
// import {
//   ApiBearerAuth,
//   ApiBody,
//   ApiExtraModels,
//   ApiOperation,
//   ApiResponse,
//   ApiTags,
// } from '@nestjs/swagger';

// import {
//   AuthConfirmPhoneDto,
//   AuthConfirmSignUpDto,
//   AuthGoogleDto,
//   AuthLoginDto,
//   AuthSignUpDto,
//   ForgotPasswordDto,
//   ResendCodeDto,
//   ResetPasswordDto,
//   SetPasswordDto,
//   UpdatePasswordDto,
//   ValidatePasswordDto,
// } from './dtos/auth.dto';
// import { IsAuthPresenter } from './auth.presenter';

// import JwtRefreshGuard from '../../common/guards/jwtRefresh.guard';
// import { JwtAuthGuard } from '../../common/guards/jwtAuth.guard';
// import { LoginGuard } from '../../common/guards/login.guard';

// import { LoginUseCases } from '../../../usecases/auth/login.usecases';
// import { IsAuthenticatedUseCases } from '../../../usecases/auth/is-authenticated.usecases';
// import { LogoutUseCases } from '../../../usecases/auth/logout.usecases';

// import { ApiResponseType } from '../../common/swagger/response.decorator';
// import { UserUseCases } from 'src/usecases/user/user.usecases';
// import { ProfilesUseCases } from 'src/usecases/profile/profile.usecases';
// import { catchAsync } from 'src/utils/catch-async';

// @Controller('auth')
// @ApiTags('auth')
// @ApiResponse({
//   status: 401,
//   description: 'No authorization token was found',
// })
// @ApiResponse({ status: 500, description: 'Internal error' })
// @ApiExtraModels(IsAuthPresenter)
// export class AuthController {
//   constructor(
//     private readonly loginUsecaseProxy: LoginUseCases,
//     private readonly logoutUsecaseProxy: LogoutUseCases,
//     private readonly isAuthUsecaseProxy: IsAuthenticatedUseCases,
//     private readonly userUseCases: UserUseCases,
//     private readonly profileUseCases: ProfilesUseCases,
//     private readonly bcryptService: BcryptService,
//     private emailService: MailService,
//     private authorizationUseCases: AuthorizationUseCases,
//     private notificationsUseCases: NotificationsUseCases,
//   ) {}

//   @Post('login')
//   @UseGuards(LoginGuard)
//   @ApiBearerAuth()
//   @ApiBody({ type: AuthLoginDto })
//   @ApiOperation({ description: 'login' })
//   async login(
//     @Body() auth: AuthLoginDto,
//     @Request() req,
//     @Response() res,
//     @Next() next,
//   ) {
//     return await catchAsync(async (req: any, res, next) => {
//       let user = req.user?.user || req.user;

//       if (user.is_banned) {
//         throw new ForbiddenException('You are banned from the platform');
//       }
//       const accessTokenCookie =
//         await this.loginUsecaseProxy.getCookieWithJwtToken(auth.email);

//       const refreshTokenCookie =
//         await this.loginUsecaseProxy.getCookieWithJwtRefreshToken(auth.email);

//       const authCheckCookie = this.loginUsecaseProxy.getCookieForAuthCheck();

//       return res.json({
//         user,
//         authentication: accessTokenCookie,
//         refresh: refreshTokenCookie,
//       });
//     })(req, res, next);
//   }

//   @Post('google-login')
//   @ApiBearerAuth()
//   @ApiBody({ type: AuthGoogleDto })
//   @ApiOperation({ description: 'google-login' })
//   async googleLogin(
//     @Body() auth: AuthGoogleDto,
//     @Request() req,
//     @Response() res,
//     @Next() next,
//   ) {
//     return await catchAsync(async (req, res, next) => {
//       let user = await this.userUseCases.checkUser(auth.email);

//       if (!user) {
//         user = await this.userUseCases.createUser({
//           email: auth.email,
//           password: `${Math.random() * 131312}`,
//           is_social_login: true,
//           is_active: true,
//         });
//       } else {
//         if (!user.is_social_login) {
//           throw new UnauthorizedException('Please login with your password');
//         }
//       }
//       const accessTokenCookie =
//         await this.loginUsecaseProxy.getCookieWithJwtToken(user.email);

//       const refreshTokenCookie =
//         await this.loginUsecaseProxy.getCookieWithJwtRefreshToken(user.email);

//       const authCheckCookie = this.loginUsecaseProxy.getCookieForAuthCheck();

//       return res.json({
//         user: user,
//         authentication: accessTokenCookie,
//         refresh: refreshTokenCookie,
//       });
//     })(req, res, next);
//   }

//   @Post('signup')
//   @ApiBearerAuth()
//   @ApiBody({ type: AuthSignUpDto })
//   @ApiOperation({ description: 'sign up' })
//   async SignUp(
//     @Body() auth: AuthSignUpDto,
//     @Request() req,
//     @Response() res,
//     @Next() next,
//   ) {
//     return await catchAsync(async (req, res, next) => {
//       try {
//         // Step 1: Create the user during signup
//         const user = await this.userUseCases.createUser({
//           ...auth,
//         });

//         if (user) {
//           return res.json({
//             status: 'success',
//             message: 'Otp is Sent to your email ,please verify your email ',
//           });
//         } else {
//           throw new HttpException(
//             'Could not create new user',
//             HttpStatus.BAD_REQUEST,
//           );
//         }
//       } catch (e) {
//         throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
//       }
//     })(req, res, next);
//   }
//   @Post('confirm-signup')
//   @ApiBearerAuth()
//   @ApiBody({ type: AuthConfirmSignUpDto })
//   @ApiOperation({ description: 'confirm sign up' })
//   async ConfirmUserSignUp(
//     @Body() user: AuthConfirmSignUpDto,
//     @Request() req,
//     @Response() res,
//     @Next() next,
//   ) {
//     return await catchAsync(async (req, res, next) => {
//       const User = await this.userUseCases.createUserOnConfirmation(
//         user.code,
//         user.email,
//       );
//       if (User) {
//         // const accessTokenCookie =
//         //   await this.loginUsecaseProxy.getCookieWithJwtToken(user.email);
//         // const refreshTokenCookie =
//         //   await this.loginUsecaseProxy.getCookieWithJwtRefreshToken(user.email);
//         // req.res.setHeader('Set-Cookie', [
//         //   accessTokenCookie,
//         //   refreshTokenCookie,
//         // ]);

//         // * Give user auth_role or "user" role
//         await this.authorizationUseCases.createUserRoles(User.id, {
//           roles: ['user'],
//         });

//         return res.json({
//           User,
//         });
//       } else {
//         throw new HttpException(
//           'Could not create new user',
//           HttpStatus.BAD_REQUEST,
//         );
//       }
//     })(req, res, next);
//   }
//   @Post('resend-code-email')
//   @ApiBearerAuth()
//   @ApiBody({ type: ResendCodeDto })
//   @ApiOperation({ description: 'sign up' })
//   async ResendCode(
//     @Body() auth: ResendCodeDto,
//     @Request() req,
//     @Response() res,
//     @Next() next,
//   ) {
//     return await catchAsync(async (req, res, next) => {
//       const code = await this.userUseCases.resendCodeEmail(auth.email);
//       if (code) {
//         return res.json({
//           status: 'success',
//           message: 'Email sent with code for confirmation',
//         });
//       } else {
//         throw new HttpException(
//           'Could not create new user',
//           HttpStatus.BAD_REQUEST,
//         );
//       }
//     })(req, res, next);
//   }

//   @Post('send-phone-otp')
//   @ApiBearerAuth()
//   @ApiBody({ type: AuthConfirmPhoneDto })
//   @ApiOperation({ description: 'confirm sign up' })
//   async ConfirmUserPhone(
//     @Body() data: AuthConfirmPhoneDto,
//     @Request() req,
//     @Response() res,
//     @Next() next,
//   ) {
//     return await catchAsync(async (req, res, next) => {
//       const otp = await this.userUseCases.sendPhoneCode(data.phone, data.email);
//       if (otp) {
//         return res.json({
//           status: 'success',
//           otp: otp,
//           message: 'Otp sent successfully',
//         });
//       } else {
//         throw new HttpException('Could sent Otp', HttpStatus.BAD_REQUEST);
//       }
//     })(req, res, next);
//   }

//   @Post('confirm-phone-otp')
//   @ApiBearerAuth()
//   @ApiBody({ type: AuthConfirmSignUpDto })
//   @ApiOperation({ description: 'confirm sign up' })
//   async ConfirmPhoneSignUp(
//     @Body() user: AuthConfirmSignUpDto,
//     @Request() req,
//     @Response() res,
//     @Next() next,
//   ) {
//     return await catchAsync(async (req, res, next) => {
//       const User = await this.userUseCases.createPhoneConfirmation(
//         user.code,
//         user.email,
//       );
//       if (user) {
//         return res.json({
//           User,
//         });
//       } else {
//         throw new HttpException('Could not Verify Otp', HttpStatus.BAD_REQUEST);
//       }
//     })(req, res, next);
//   }

//   // @Post('resend-code-phone')
//   // @ApiBearerAuth()
//   // @ApiBody({ type: ResendCodeDto })
//   // @ApiOperation({ description: 'sign up' })
//   // async ResendCodePhone(
//   //   @Body() auth: ResendCodeDto,
//   //   @Request() req,
//   //   @Response() res,
//   //   @Next() next,
//   // ) {
//   //   return await catchAsync(async (req, res, next) => {
//   //     const code = await this.userUseCases.resendCodeEmail(auth.email);
//   //     if (code) {
//   //       return res.json({
//   //         status: 'success',
//   //         message: 'Email sent with code for confirmation',
//   //       });
//   //     } else {
//   //       throw new HttpException(
//   //         'Could not create new user',
//   //         HttpStatus.BAD_REQUEST,
//   //       );
//   //     }
//   //   })(req, res, next);
//   // }

//   @Post('logout')
//   @UseGuards(JwtAuthGuard)
//   @ApiOperation({ description: 'logout' })
//   async logout(@Request() request: any) {
//     const cookie = await this.logoutUsecaseProxy.execute();
//     request.res.setHeader('Set-Cookie', cookie);
//     const loggedInUser = await this.userUseCases.getUser(
//       UserData.getUserData().id,
//       true,
//     );

//     return 'Logout successful';
//   }

//   // @Post('google')
//   // // @UseGuards(GoogleAuthGuard)
//   // @ApiOperation({ description: 'google' })
//   // async signInWithgoogle(@Body('credentialToken') credentialToken: string) {
//   //   return await this.loginUsecaseProxy.signInWithGoogle(credentialToken);
//   // }

//   @Get('is_authenticated')
//   @ApiBearerAuth()
//   @UseGuards(JwtAuthGuard)
//   @ApiOperation({ description: 'is_authenticated' })
//   @ApiResponseType(IsAuthPresenter, false)
//   async isAuthenticated(@Req() request: any) {
//     const user = await this.isAuthUsecaseProxy.execute(request.user.email);
//     const response = new IsAuthPresenter();
//     response.email = user.email;
//     return response;
//   }

//   @Post('is_authenticated')
//   @ApiBearerAuth()
//   @UseGuards(JwtAuthGuard)
//   @ApiOperation({ description: 'is_authenticated' })
//   @ApiResponseType(IsAuthPresenter, false)
//   async isAuthenticatedRequest(@Req() request: any) {
//     const user = await this.isAuthUsecaseProxy.execute(request.user.email);
//     const response = new IsAuthPresenter();
//     response.email = user.email;
//     return response;
//   }

//   @Post('forgot-password')
//   @ApiOperation({ description: 'forgot-password' })
//   async forgotPassword(
//     @Body() forgotDto: ForgotPasswordDto,
//     @Request() req,
//     @Response() res,
//     @Next() next,
//   ) {
//     return await catchAsync(async (req, res, next) => {
//       let str = await this.userUseCases.forgotPassword(forgotDto.email);
//       return res.json({
//         message: str,
//       });
//     })(req, res, next);
//   }
//   @Put('set-password/:code')
//   async setPassword(
//     @Param('code', ParseIntPipe) code: number,
//     @Body() body: SetPasswordDto,
//     @Request() req,
//     @Response() res,
//     @Next() next,
//   ) {
//     return await catchAsync(async (req, res, next) => {
//       const result = await this.userUseCases.setUsersPassword(
//         code,
//         body.password,
//       );
//       if (result) {
//         return res.json({
//           status: 'success',
//           message: 'Password Updated successfully',
//         });
//       } else {
//         throw new HttpException(
//           'Could not Set Password. Please try again',
//           HttpStatus.BAD_REQUEST,
//         );
//       }
//     })(req, res, next);
//   }

//   @Patch('reset-password/:code')
//   async resetPassword(
//     @Body() body: ResetPasswordDto,
//     @Param('code') code: string,
//     @Request() req,
//     @Response() res,
//     @Next() next,
//   ) {
//     return await catchAsync(async (req, res, next) => {
//       const userEmail = await this.userUseCases.getUserEmailByCode(code);

//       // Get user by email
//       const user = await this.userUseCases.getUserByEmail(userEmail);

//       // * Update the password
//       const updatedUser = await this.userUseCases.updateUser(user.id, {
//         password: body.password,
//       });

//       return res.json(updatedUser);
//     })(req, res, next);
//   }

//   @UseGuards(JwtAuthGuard)
//   @Patch('update-password')
//   async updatePassword(
//     @Body() user: UpdatePasswordDto,
//     @Request() req,
//     @Response() res,
//     @Next() next,
//   ) {
//     return await catchAsync(async (req, res, next) => {
//       // * Get the logged in user
//       const loggedInUser = await this.userUseCases.getUser(
//         UserData.getUserData().id,
//         true,
//       );

//       console.log('loggedInUser :>> ', loggedInUser);
//       const match = await this.bcryptService.compare(
//         user.currentPassword,
//         loggedInUser.password,
//       );

//       if (!match) throw new UnauthorizedException('Invalid password match');

//       // * Update the password
//       const updatedUser = await this.userUseCases.updateUser(loggedInUser.id, {
//         password: user.newPassword,
//       });

//       return res.json(updatedUser);
//     })(req, res, next);
//   }

//   @UseGuards(JwtAuthGuard)
//   @Post('validate-password')
//   async validatePassword(
//     @Body() body: ValidatePasswordDto,
//     @Request() req,
//     @Response() res,
//     @Next() next,
//   ) {
//     return await catchAsync(async (req, res, next) => {
//       const loggedInUser = await this.userUseCases.getUser(
//         UserData.getUserData().id,
//         true,
//       );

//       const isPasswordValid = await this.bcryptService.compare(
//         body.password,
//         loggedInUser.password,
//       );

//       if (!isPasswordValid) throw new UnauthorizedException('Invalid password');

//       return res.json({ isPasswordValid });
//     })(req, res, next);
//   }

//   @Put('validate-code/:code')
//   async validateCode(
//     @Param('code') code: string,
//     @Request() req,
//     @Response() res,
//     @Next() next,
//   ) {
//     return await catchAsync(async (req, res, next) => {
//       const str = await this.userUseCases.validateCode(code);
//       res.json(str);
//     })(req, res, next);
//   }

//   randomIntFromInterval(min, max) {
//     // min and max included
//     return Math.floor(Math.random() * (max - min + 1) + min);
//   }

//   // @Post('email-2fa')
//   // @UseGuards(JwtAuthGuard)
//   // async sendEmail2FA(@Request() req, @Response() res, @Next() next) {
//   //   return await catchAsync(async (req, res, next) => {
//   //     const loggedInUser = await this.userUseCases.getUser(
//   //       UserData.getUserData().id,
//   //       true,
//   //     );

//   //     // * Send email 2FA
//   //     const code = this.randomIntFromInterval(1000, 9999);

//   //     // * Save the code in the database
//   //     await this.userUseCases.updateUser(loggedInUser.id, {
//   //       code_2fa: code,
//   //     });

//   //     const email2FA = await this.emailService.sendEmail2FA(
//   //       loggedInUser.email,
//   //       code,
//   //     );

//   //     if (!email2FA) {
//   //       throw new HttpException('Could not send email', HttpStatus.BAD_REQUEST);
//   //     }

//   //     return res.json({
//   //       status: 'success',
//   //       message: 'Email sent with code for confirmation',
//   //     });
//   //     // return this.userUseCases.sendEmail2FA(loggedInUser.email, body.email);
//   //   })(req, res, next);
//   // }

//   // @Get('email-2fa/:code')
//   // @UseGuards(JwtAuthGuard)
//   // async getEmail2FA(
//   //   @Param('code', ParseIntPipe) code: number,
//   //   @Request() req,
//   //   @Response() res,
//   //   @Next() next,
//   // ) {
//   //   return await catchAsync(async (req, res, next) => {
//   //     const loggedInUser = await this.userUseCases.getUser(
//   //       UserData.getUserData().id,
//   //       true,
//   //     );

//   //     // * Check if the code is valid
//   //     if (code != loggedInUser.code_2fa)
//   //       throw new HttpException('Invalid code', HttpStatus.BAD_REQUEST);

//   //     // * Update the user
//   //     await this.userUseCases.updateUser(loggedInUser.id, {
//   //       code_2fa: null,
//   //     });

//   //     return res.json({
//   //       status: 'success',
//   //       message: '2FA confirmed',
//   //     });

//   //     // return this.userUseCases.sendEmail2FA(loggedInUser.email, body.email);
//   //   })(req, res, next);
//   // }

//   @Get('refresh')
//   @UseGuards(JwtRefreshGuard)
//   @ApiBearerAuth()
//   async refresh(@Req() request: any) {
//     const accessTokenCookie =
//       await this.loginUsecaseProxy.getCookieWithJwtToken(request.user.email);
//     request.res.setHeader('Set-Cookie', accessTokenCookie);
//     return 'Refresh successful';
//   }
// }
