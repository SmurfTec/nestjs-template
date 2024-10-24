import { Injectable } from '@nestjs/common';
import {
  EventSubscriber,
  EntitySubscriberInterface,
  UpdateEvent,
  InsertEvent,
  RemoveEvent,
  DataSource,
} from 'typeorm';
import { RabbitMQPattersEnums } from '../enums/rabbitmq.enums';
import { RabbitMQService } from '../../services/rabbitmq.service';
import { UserData } from '../user.data';
// import { dotenv } from "dotenv";

// dotenv.config()

@Injectable()
@EventSubscriber()
export class EntitySubscriber implements EntitySubscriberInterface {
  // constructor(
  //   private rabbitMQService: RabbitMQService,
  //   private readonly connection: DataSource,
  // ) {
  //   this.connection.subscribers.push(this);
  // }
  // getExcludedTables() {
  //   return process.env.TABLES_EXCLUDED_FROM_CRUD_LOG.split(',');
  // }
  // extractExcludedTables(tableName: string, tables: string[]) {
  //   return tables.includes(tableName);
  // }
  // getUpdatedColumns(previousData = {}, updatedData = {}) {
  //   const keys = Object.keys(previousData);
  //   const updatedColumnsList = [];
  //   for (let i = 0; i < keys.length; i++) {
  //     if (previousData[keys[i]] !== updatedData[keys[i]]) {
  //       updatedColumnsList.push({
  //         columnName: keys[i],
  //         beforeValue: previousData[keys[i]],
  //         afterValue: updatedData[keys[i]],
  //       });
  //     }
  //   }
  //   return updatedColumnsList;
  // }
  // async afterUpdate(event: UpdateEvent<any>): Promise<any> {
  //   if (
  //     this.extractExcludedTables(
  //       event.metadata.tableName,
  //       this.getExcludedTables(),
  //     )
  //   ) {
  //     return;
  //   }
  //   const obj = {
  //     rowId: event.entity.id ? event.entity.id : null,
  //     tableName: event.metadata.tableName,
  //     userId: UserData.getUserData() ? UserData.getUserData().id : null,
  //     modificationTime: new Date(),
  //     columns: this.getUpdatedColumns(event.databaseEntity, event.entity),
  //   };
  //   await this.rabbitMQService.emit(RabbitMQPattersEnums.CRUD_LOGS, obj);
  // }
  // afterInsert(event: InsertEvent<any>): void | Promise<any> {
  //   if (
  //     this.extractExcludedTables(
  //       event.metadata.tableName,
  //       this.getExcludedTables(),
  //     )
  //   ) {
  //     return;
  //   }
  //   const obj = {
  //     rowId: event.entity.id ? event.entity.id : null,
  //     tableName: event.metadata.tableName,
  //     userId: UserData.getUserData() ? UserData.getUserData().id : null,
  //     insertionTime: new Date(),
  //     data: event.entity,
  //   };
  //   this.rabbitMQService.emit(RabbitMQPattersEnums.CRUD_LOGS, obj);
  // }
  // beforeRemove(event: RemoveEvent<any>): void | Promise<any> {
  //   if (
  //     this.extractExcludedTables(
  //       event.metadata.tableName,
  //       this.getExcludedTables(),
  //     )
  //   ) {
  //     return;
  //   }
  //   const obj = {
  //     rowId: event.entity ? event.entity.id : null,
  //     tableName: event.metadata.tableName,
  //     userId: UserData.getUserData() ? UserData.getUserData().id : null,
  //     insertionTime: new Date(),
  //     data: event.entity,
  //   };
  //   // console.log("before delete event", obj);
  // }
  // afterRemove(event: RemoveEvent<any>): void | Promise<any> {
  //   if (
  //     this.extractExcludedTables(
  //       event.metadata.tableName,
  //       this.getExcludedTables(),
  //     )
  //   ) {
  //     return;
  //   }
  //   const obj = {
  //     rowId: event.entity ? event.entity.id : null,
  //     tableName: event.metadata.tableName,
  //     userId: UserData.getUserData() ? UserData.getUserData().id : null,
  //     insertionTime: new Date(),
  //     data: event.entity,
  //   };
  // }
}
