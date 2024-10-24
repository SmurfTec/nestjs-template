import { LoggerService } from '@nestjs/common';
export declare class MyLogger implements LoggerService {
    log(message: any, ...optionalParams: any[]): void;
    error(message: any, ...optionalParams: any[]): void;
    warn(message: any, ...optionalParams: any[]): void;
    debug?(message: any, ...optionalParams: any[]): void;
    verbose?(message: any, ...optionalParams: any[]): void;
    createLog(obj: string): void;
    getLog(obj: string): void;
    multipleGetLog(obj: string): void;
    updateLog(obj: string): void;
    deleteLog(obj: string): void;
    customLog(message: string): void;
    private getDateTime;
}
