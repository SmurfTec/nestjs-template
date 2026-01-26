export class NotificationPreferencesModel {
  user_id: number;
  email_alerts?: boolean;
  push_notifications?: boolean;
  in_app_digest?: boolean;
  marketing_emails?: boolean;
}

export class FetchNotificationPreferencesModel {
  id: number;
  user_id: number;
  email_alerts: boolean;
  push_notifications: boolean;
  in_app_digest: boolean;
  marketing_emails: boolean;
  created_at: Date;
  updated_at: Date;
}

export class UpdateNotificationPreferencesModel {
  email_alerts?: boolean;
  push_notifications?: boolean;
  in_app_digest?: boolean;
  marketing_emails?: boolean;
}

