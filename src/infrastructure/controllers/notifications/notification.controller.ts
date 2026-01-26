import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Query,
  Param,
  UseGuards,
  Request,
  ParseIntPipe,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwtAuth.guard';
import {
  CreateNotificationDto,
  GetNotificationsDto,
  RegisterDeviceTokenDto,
  UpdateNotificationSettingsDto,
  NotificationResponseDto,
  UnreadCountResponseDto,
} from './notification.dto';
import { NotificationService } from '../../services/notifications/notification.service';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('notifications')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('authorization')
export class NotificationController {
  constructor(private notificationService: NotificationService) {}

  @Post()
  async createNotification(
    @Body() createDto: CreateNotificationDto,
    @Request() req: any,
  ): Promise<NotificationResponseDto> {
    // Security: Only allow users to create notifications for themselves
    // For internal service-to-service calls, use /internal/notifications
    const userId = req.user.id || req.user.userId;
    
    if (createDto.user_id !== userId) {
      throw new ForbiddenException('You can only create notifications for yourself');
    }

    const notification = await this.notificationService.createNotification({
      userId: createDto.user_id,
      title: createDto.title,
      body: createDto.body,
      type: createDto.type,
      data: createDto.data,
      sendEmail: createDto.send_email,
      sendPush: createDto.send_push,
      sendSms: createDto.send_sms,
    });

    return this.mapToResponse(notification);
  }

  @Get()
  async getNotifications(
    @Query() query: GetNotificationsDto,
    @Request() req: any,
  ): Promise<NotificationResponseDto[]> {
    const userId = req.user.id || req.user.userId;
    const notifications = await this.notificationService.getNotifications(userId, {
      limit: query.limit,
      cursor: query.cursor,
      isRead: query.is_read,
      type: query.type,
    });

    return notifications.map((n) => this.mapToResponse(n));
  }

  @Get('unread-count')
  async getUnreadCount(@Request() req: any): Promise<UnreadCountResponseDto> {
    const userId = req.user.id || req.user.userId;
    const count = await this.notificationService.getUnreadCount(userId);
    return { count };
  }

  @Post(':id/read')
  async markAsRead(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: any,
  ): Promise<{ success: boolean }> {
    const userId = req.user.id || req.user.userId;
    
    try {
      await this.notificationService.markAsRead(id, userId);
      return { success: true };
    } catch (error) {
      if (error.message === 'Notification not found') {
        throw new NotFoundException('Notification not found');
      }
      if (error.message === 'Access denied') {
        throw new ForbiddenException('Access denied');
      }
      throw error;
    }
  }

  @Post('read-all')
  async markAllAsRead(@Request() req: any): Promise<{ success: boolean }> {
    const userId = req.user.id || req.user.userId;
    await this.notificationService.markAllAsRead(userId);
    return { success: true };
  }

  @Post('device-tokens')
  async registerDeviceToken(
    @Body() dto: RegisterDeviceTokenDto,
    @Request() req: any,
  ): Promise<{ success: boolean }> {
    const userId = req.user.id || req.user.userId;
    await this.notificationService.registerDeviceToken(
      userId,
      dto.token,
      dto.platform,
      dto.device_name,
    );
    return { success: true };
  }

  @Delete('device-tokens/:token')
  async removeDeviceToken(
    @Param('token') token: string,
    @Request() req: any,
  ): Promise<{ success: boolean }> {
    const userId = req.user.id || req.user.userId;
    await this.notificationService.removeDeviceToken(userId, token);
    return { success: true };
  }

  @Get('settings')
  async getSettings(@Request() req: any) {
    const userId = req.user.id || req.user.userId;
    return await this.notificationService.getSettings(userId);
  }

  @Put('settings')
  async updateSettings(
    @Body() dto: UpdateNotificationSettingsDto,
    @Request() req: any,
  ) {
    const userId = req.user.id || req.user.userId;
    return await this.notificationService.updateSettings(userId, dto);
  }

  private mapToResponse(notification: any): NotificationResponseDto {
    return {
      id: notification.id,
      user_id: notification.user_id,
      title: notification.title,
      body: notification.body,
      type: notification.type,
      data: notification.data,
      is_read: notification.is_read,
      read_at: notification.read_at,
      created_at: notification.created_at,
    };
  }
}
