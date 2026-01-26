export enum AuditEventType {
  PERSONAL_DETAILS_SAVED = 'PERSONAL_DETAILS_SAVED',
  ONBOARDING_COMPLETED = 'ONBOARDING_COMPLETED'
}

export class AuditEventModel {
  userId: number;
  eventType: AuditEventType;
  eventData: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
  timestamp: Date;
}

export class FetchAuditEventModel {
  id: number;
  userId: number;
  eventType: AuditEventType;
  eventData: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
  timestamp: Date;
}
