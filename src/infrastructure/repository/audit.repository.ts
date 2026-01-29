import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditEventModel, FetchAuditEventModel, AuditEventType } from '../../domain/models/audit';
import { AuditRepositoryInterface } from 'src/domain/repositories/audit.repository.interface';
import { AuditEvents } from '../entities/audit-events.entity';

@Injectable()
export class AuditRepository implements AuditRepositoryInterface {
  constructor(
    @InjectRepository(AuditEvents)
    private readonly auditRepository: Repository<AuditEvents>,
  ) {}

  async createEvent(event: AuditEventModel): Promise<FetchAuditEventModel> {
    const auditEvent = this.auditRepository.create({
      user_id: event.userId,
      event_type: event.eventType,
      event_data: event.eventData,
      ip_address: event.ipAddress,
      user_agent: event.userAgent,
      timestamp: event.timestamp,
    });

    const saved = await this.auditRepository.save(auditEvent);
    return {
      id: saved.id,
      userId: saved.user_id,
      eventType: saved.event_type,
      eventData: saved.event_data,
      ipAddress: saved.ip_address,
      userAgent: saved.user_agent,
      timestamp: saved.timestamp,
    };
  }

  async getEventsByUserId(userId: number, limit = 50, offset = 0): Promise<FetchAuditEventModel[]> {
    const events = await this.auditRepository.find({
      where: { user_id: userId },
      order: { timestamp: 'DESC' },
      take: limit,
      skip: offset,
    });

    return events.map(event => ({
      id: event.id,
      userId: event.user_id,
      eventType: event.event_type,
      eventData: event.event_data,
      ipAddress: event.ip_address,
      userAgent: event.user_agent,
      timestamp: event.timestamp,
    }));
  }

  async getEventsByEventType(eventType: string, limit = 50, offset = 0): Promise<FetchAuditEventModel[]> {
    const events = await this.auditRepository.find({
      where: { event_type: eventType as AuditEventType },
      order: { timestamp: 'DESC' },
      take: limit,
      skip: offset,
    });

    return events.map(event => ({
      id: event.id,
      userId: event.user_id,
      eventType: event.event_type,
      eventData: event.event_data,
      ipAddress: event.ip_address,
      userAgent: event.user_agent,
      timestamp: event.timestamp,
    }));
  }
}
