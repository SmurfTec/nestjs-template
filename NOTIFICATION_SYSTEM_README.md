# Notification System Implementation

## Overview
A comprehensive multi-channel notification system supporting:
- **In-app notifications** (real-time + persisted)
- **Email notifications**
- **Push notifications** (FCM/APNs - placeholder)
- **SMS notifications** (placeholder)

## Architecture

### Components

1. **Database Entities**
   - `Notification` - Stores in-app notifications
   - `NotificationChannel` - Tracks delivery per channel
   - `UserNotificationSettings` - User preferences
   - `DeviceToken` - Push notification device tokens

2. **Repositories**
   - `NotificationRepository` - CRUD for notifications
   - `NotificationChannelRepository` - Channel status tracking
   - `UserNotificationSettingsRepository` - Settings management
   - `DeviceTokenRepository` - Device token management

3. **Services**
   - `NotificationService` - Main service for creating and managing notifications
   - `EmailProvider` - Email delivery
   - `PushProvider` - Push notification delivery (placeholder)
   - `SmsProvider` - SMS delivery (placeholder)

4. **Processors (BullMQ Workers)**
   - `InAppProcessor` - Processes in-app notifications
   - `EmailProcessor` - Processes email notifications
   - `PushProcessor` - Processes push notifications
   - `SmsProcessor` - Processes SMS notifications

5. **Real-time**
   - `NotificationGateway` - WebSocket gateway for real-time delivery

6. **API**
   - `NotificationController` - REST endpoints

## Setup

### 1. Database Migrations
Run the migrations to create the tables:
```bash
npm run migration:up
```

Migrations created:
- `1710000000050-create-notifications-table.ts`
- `1710000000051-create-notification-channels-table.ts`
- `1710000000052-create-user-notification-settings-table.ts`
- `1710000000053-create-device-tokens-table.ts`

### 2. Redis Configuration
Ensure Redis is running and configured in your `.env`:
```
CACHE_MANAGER_HOST=localhost
CACHE_MANAGER_PORT=6379
CACHE_MANAGER_PASSWORD=  # Optional
```

### 3. Dependencies Installed
- `bullmq` - Queue management
- `@nestjs/bullmq` - NestJS BullMQ integration

## API Endpoints

### Create Notification (Internal)
```
POST /notifications
Body: {
  user_id: number,
  title: string,
  body: string,
  type?: NotificationType,
  data?: object,
  send_email?: boolean,
  send_push?: boolean,
  send_sms?: boolean
}
```

### Get Notifications
```
GET /notifications?limit=20&cursor=123&is_read=false&type=ORDER
```

### Get Unread Count
```
GET /notifications/unread-count
```

### Mark as Read
```
POST /notifications/:id/read
```

### Mark All as Read
```
POST /notifications/read-all
```

### Register Device Token
```
POST /notifications/device-tokens
Body: {
  token: string,
  platform: 'IOS' | 'ANDROID' | 'WEB',
  device_name?: string
}
```

### Get/Update Settings
```
GET /notifications/settings
PUT /notifications/settings
Body: {
  email_enabled?: boolean,
  push_enabled?: boolean,
  sms_enabled?: boolean,
  in_app_enabled?: boolean,
  quiet_hours?: { start: string, end: string },
  preferences?: object
}
```

## WebSocket Connection

Connect to `/notifications` namespace:
```javascript
const socket = io('http://localhost:3000/notifications', {
  auth: {
    token: 'your-jwt-token'
  }
});

socket.on('notification', (data) => {
  console.log('New notification:', data);
});

socket.on('unread_count', (data) => {
  console.log('Unread count:', data.count);
});
```

## Usage Example

```typescript
// In your service
constructor(private notificationService: NotificationService) {}

async orderShipped(orderId: number, userId: number) {
  await this.notificationService.createNotification({
    userId,
    title: 'Order Shipped',
    body: `Your order #${orderId} has been shipped`,
    type: NotificationType.ORDER,
    data: { orderId, deepLink: `/orders/${orderId}` },
    sendEmail: true,
    sendPush: true,
  });
}
```

## Caching Strategy

- **User Settings**: Cached for 5 minutes (`notif:settings:{userId}`)
- **Unread Count**: Cached for 5 minutes (`notif:unread_count:{userId}`)
- **Device Tokens**: Cached for 5 minutes (`notif:tokens:{userId}`)

Cache is invalidated on updates.

## Queue Configuration

- **Queue Names**: 
  - `notifications:inapp`
  - `notifications:email`
  - `notifications:push`
  - `notifications:sms`

- **Job Options**:
  - Attempts: 5
  - Backoff: Exponential (5s delay)
  - Remove on complete: true
  - Remove on fail: false (for debugging)

## Future Enhancements

1. **Push Notifications**: 
   - Install `firebase-admin` for FCM
   - Configure FCM credentials
   - Implement APNs for iOS

2. **SMS Notifications**:
   - Integrate Twilio or AWS SNS
   - Add phone number to user profile

3. **Features**:
   - Notification templates
   - Timezone-based scheduling
   - Quiet hours enforcement
   - Notification digests
   - ML-based priority ranking

## Notes

- Email notifications use the existing MailService infrastructure
- Push and SMS providers are placeholders and need full implementation
- All notifications are persisted in the database
- Real-time delivery uses WebSockets for instant updates
- Background processing keeps API responses fast

