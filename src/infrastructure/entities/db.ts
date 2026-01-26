import { UserRoles } from './user-roles.entity';
import { Roles } from './roles.entity';
import { Users } from './users.entity';
import { Profiles } from './profiles.entity';
import { Onboarding } from './onboarding.entity';
import { NotificationPreferences } from './notification-preferences.entity';
import { TwoFactorAuth } from './two-factor-auth.entity';
import { UserPrefs } from './user-prefs.entity';
import { Subscription } from './subscription.entity';
import { Notification } from './notification.entity';
import { NotificationChannel } from './notification-channel.entity';
import { UserNotificationSettings } from './user-notification-settings.entity';
import { DeviceToken } from './device-token.entity';
import { Invoice } from './invoice.entity';
import { AuditEvents } from './audit-events.entity';

export default [
  Users,
  Profiles,
  Roles,
  AuditEvents,
  UserRoles,
  Onboarding,
  NotificationPreferences,
  TwoFactorAuth,
  UserPrefs,
  Subscription,
  Notification,
  NotificationChannel,
  UserNotificationSettings,
  DeviceToken,
  Invoice,
]; 
