import { ArgumentsHost } from '@nestjs/common';
import { BaseWsExceptionFilter } from '@nestjs/websockets';
export declare class AllExceptionsSocketFilter extends BaseWsExceptionFilter {
    catch(exception: any, host: ArgumentsHost): void;
}
