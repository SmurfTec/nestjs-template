import { DataSource, EntitySubscriberInterface, InsertEvent } from 'typeorm';
export declare class ValidationSubscriber implements EntitySubscriberInterface {
    private readonly datasource;
    constructor(datasource: DataSource);
    beforeInsert(event: InsertEvent<any>): Promise<void>;
}
