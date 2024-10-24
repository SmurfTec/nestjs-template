import { Injectable } from '@nestjs/common';
import { validate } from 'class-validator';
import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';

@Injectable()
@EventSubscriber()
export class ValidationSubscriber implements EntitySubscriberInterface {
  constructor(private readonly datasource: DataSource) {
    this.datasource.subscribers.push(this);
  }

  async beforeInsert(event: InsertEvent<any>) {
    // console.log(`BEFORE POST INSERTED: `, event.entity);
    // const errors = await validate(event.entity);
  }
}
