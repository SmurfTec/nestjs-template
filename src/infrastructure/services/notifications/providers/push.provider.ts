import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Notification } from '../../../entities/notification.entity';
import { DeviceToken, DevicePlatform } from '../../../entities/device-token.entity';
import * as admin from 'firebase-admin';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class PushProvider implements OnModuleInit {
  private readonly logger = new Logger(PushProvider.name);
  private firebaseApp: admin.app.App | null = null;

  constructor(private configService: ConfigService) {}

  onModuleInit() {
    this.initializeFirebase();
  }

  private initializeFirebase() {
    try {
      // Check if Firebase is already initialized
      if (admin.apps.length > 0) {
        this.firebaseApp = admin.app();
        this.logger.log('Firebase Admin already initialized');
        return;
      }

      // Try to get Firebase config from environment variables
      const firebaseServiceAccountPath = this.configService.get<string>(
        'FIREBASE_SERVICE_ACCOUNT_PATH',
      );
      const firebaseServiceAccountJson = this.configService.get<string>(
        'FIREBASE_SERVICE_ACCOUNT_JSON',
      );

      let credential: admin.credential.Credential;

      if (firebaseServiceAccountJson) {
        // Use JSON string from environment variable
        const serviceAccount = JSON.parse(firebaseServiceAccountJson);
        credential = admin.credential.cert(serviceAccount);
        this.logger.log('Firebase Admin initialized from environment JSON');
      } else if (firebaseServiceAccountPath) {
        // Use path from environment variable
        const fullPath = path.resolve(firebaseServiceAccountPath);
        if (!fs.existsSync(fullPath)) {
          throw new Error(`Firebase service account file not found: ${fullPath}`);
        }
        credential = admin.credential.cert(fullPath);
        this.logger.log(`Firebase Admin initialized from path: ${fullPath}`);
      } else {
        // Fallback to default path (for backward compatibility)
        const defaultPath = path.resolve(
          'uber-688ef-firebase-adminsdk-q7m5t-d2eaec5bf1.json',
        );
        if (fs.existsSync(defaultPath)) {
          credential = admin.credential.cert(defaultPath);
          this.logger.log(`Firebase Admin initialized from default path: ${defaultPath}`);
        } else {
          throw new Error(
            'Firebase service account not configured. Set FIREBASE_SERVICE_ACCOUNT_PATH or FIREBASE_SERVICE_ACCOUNT_JSON',
          );
        }
      }

      this.firebaseApp = admin.initializeApp({
        credential,
      });

      this.logger.log('Firebase Admin initialized successfully');
    } catch (error) {
      this.logger.error(`Failed to initialize Firebase Admin: ${error.message}`);
      this.logger.warn(
        'Push notifications will not work until Firebase is properly configured',
      );
    }
  }

  async send(
    notification: Notification,
    tokens: DeviceToken[],
  ): Promise<{ success: number; failed: number }> {
    if (tokens.length === 0) {
      return { success: 0, failed: 0 };
    } 

    if (!this.firebaseApp) {
      this.logger.error('Firebase Admin not initialized. Cannot send push notifications.');
      return { success: 0, failed: tokens.length };
    }

    try {
      // Filter out inactive tokens
      const activeTokens = tokens.filter((t) => t.is_active);
      if (activeTokens.length === 0) {
        this.logger.warn('No active device tokens found');
        return { success: 0, failed: tokens.length };
      }

      // Group tokens by platform for better message customization
      const iosTokens = activeTokens.filter((t) => t.platform === DevicePlatform.IOS);
      const androidTokens = activeTokens.filter(
        (t) => t.platform === DevicePlatform.ANDROID,
      );
      const webTokens = activeTokens.filter((t) => t.platform === DevicePlatform.WEB);

      let totalSuccess = 0;
      let totalFailed = 0;

      // Send to iOS devices
      if (iosTokens.length > 0) {
        const result = await this.sendToPlatform(
          notification,
          iosTokens,
          'IOS',
        );
        totalSuccess += result.success;
        totalFailed += result.failed;
      }

      // Send to Android devices
      if (androidTokens.length > 0) {
        const result = await this.sendToPlatform(
          notification,
          androidTokens,
          'ANDROID',
        );
        totalSuccess += result.success;
        totalFailed += result.failed;
      }

      // Send to Web devices
      if (webTokens.length > 0) {
        const result = await this.sendToPlatform(notification, webTokens, 'WEB');
        totalSuccess += result.success;
        totalFailed += result.failed;
      }

      // Add failed count for inactive tokens
      totalFailed += tokens.length - activeTokens.length;

      this.logger.log(
        `Push notification sent: ${totalSuccess} success, ${totalFailed} failed out of ${tokens.length} total tokens`,
      );

      return { success: totalSuccess, failed: totalFailed };
    } catch (error) {
      this.logger.error(`Error sending push notifications: ${error.message}`, error.stack);
      return { success: 0, failed: tokens.length };
    }
  }

  private async sendToPlatform(
    notification: Notification,
    tokens: DeviceToken[],
    platform: 'IOS' | 'ANDROID' | 'WEB',
  ): Promise<{ success: number; failed: number }> {
    const messaging = admin.messaging(this.firebaseApp);
    let totalSuccess = 0;
    let totalFailed = 0;

    // FCM supports up to 500 tokens per batch
    const batchSize = 500;
    const batches: DeviceToken[][] = [];

    for (let i = 0; i < tokens.length; i += batchSize) {
      batches.push(tokens.slice(i, i + batchSize));
    }

    for (const batch of batches) {
      try {
        const message: admin.messaging.MulticastMessage = {
          notification: {
            title: notification.title,
            body: notification.body,
          },
          data: this.formatDataPayload(notification.data || {}),
          tokens: batch.map((t) => t.token),
        };

        // Platform-specific configurations
        if (platform === 'IOS') {
          // iOS-specific APNs configuration
          message.apns = {
            payload: {
              aps: {
                alert: {
                  title: notification.title,
                  body: notification.body,
                },
                sound: 'default',
                badge: 1,
              },
            },
            headers: {
              'apns-priority': '10',
            },
          };
        } else if (platform === 'ANDROID') {
          // Android-specific FCM configuration
          message.android = {
            priority: 'high',
            notification: {
              sound: 'default',
              channelId: 'default',
              clickAction: 'FLUTTER_NOTIFICATION_CLICK',
            },
          };
        } else if (platform === 'WEB') {
          // Web push configuration
          message.webpush = {
            notification: {
              title: notification.title,
              body: notification.body,
              icon: '/icon-192x192.png', // Default icon, can be configured
              badge: '/badge-72x72.png', // Default badge, can be configured
            },
          };
        }

        const response = await messaging.sendEachForMulticast(message);

        totalSuccess += response.successCount;
        totalFailed += response.failureCount;

        // Handle invalid tokens
        if (response.responses) {
          const invalidTokens: string[] = [];
          response.responses.forEach((resp, idx) => {
            if (!resp.success) {
              const errorCode = resp.error?.code;
              // These error codes indicate the token is invalid and should be removed
              if (
                errorCode === 'messaging/invalid-registration-token' ||
                errorCode === 'messaging/registration-token-not-registered' ||
                errorCode === 'messaging/invalid-argument'
              ) {
                invalidTokens.push(batch[idx].token);
                this.logger.warn(
                  `Invalid token detected for platform ${platform}: ${batch[idx].token} - ${resp.error?.message}`,
                );
              } else {
                this.logger.warn(
                  `Failed to send to token ${batch[idx].token}: ${resp.error?.message}`,
                );
              }
            }
          });

          // Log invalid tokens (the processor should handle deactivating them)
          if (invalidTokens.length > 0) {
            this.logger.warn(
              `Found ${invalidTokens.length} invalid tokens for platform ${platform}. These should be deactivated.`,
            );
          }
        }
      } catch (error) {
        this.logger.error(
          `Error sending batch to ${platform}: ${error.message}`,
          error.stack,
        );
        totalFailed += batch.length;
      }
    }

    return { success: totalSuccess, failed: totalFailed };
  }

  private formatDataPayload(data: Record<string, any>): Record<string, string> {
    // FCM data payload must be strings
    const formatted: Record<string, string> = {};
    for (const [key, value] of Object.entries(data)) {
      if (value !== null && value !== undefined) {
        formatted[key] =
          typeof value === 'string' ? value : JSON.stringify(value);
      }
    }
    return formatted;
  }
}

