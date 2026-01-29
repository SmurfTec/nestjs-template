import { AuditEventModel, FetchAuditEventModel } from '../models/audit';

export interface AuditRepositoryInterface {
  createEvent(event: AuditEventModel): Promise<FetchAuditEventModel>;
  getEventsByUserId(userId: number, limit?: number, offset?: number): Promise<FetchAuditEventModel[]>;
  getEventsByEventType(eventType: string, limit?: number, offset?: number): Promise<FetchAuditEventModel[]>;
}
