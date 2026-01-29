import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../../infrastructure/common/guards/jwtAuth.guard';
import { ProfileUseCases } from '../../../usecases/profile/profiles.usecases';
import { CreateProfileDto, UpdateProfileDto } from './profiles.dto';
import { UserData } from 'src/infrastructure/common/user.data';

@Controller('/profiles')
@UseGuards(JwtAuthGuard)
export class ProfileController {
  constructor(private readonly profileUseCases: ProfileUseCases) {}

  // @Post()
  // createProfile(@Body() profile: CreateProfileDto) {
  //   return this.profileUseCases.createProfile(profile);
  // }

  @Get()
  getProfile() {
    const user_id = +UserData.getUserData().id;
    return this.profileUseCases.getProfile(user_id);
  }

  // @Get()
  // getProfiles() {
  //   return this.profileUseCases.getProfiles();
  // }

  @Put()
  updateProfile(@Body() profile: UpdateProfileDto) {
    const user_id = +UserData.getUserData().id;
    return this.profileUseCases.updateProfile(user_id, profile);
  }

  // @Delete(':id')
  // deleteProfile(@Param('id', ParseIntPipe) id: number) {
  //   return this.profileUseCases.deleteProfile(id);
  // }
}
