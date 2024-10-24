import { LoggerService } from '@nestjs/common';
import fs from 'fs';

export class MyLogger implements LoggerService {
  log(message: any, ...optionalParams: any[]) {
    console.log(message);
  }

  error(message: any, ...optionalParams: any[]) {
    console.log(message);
  }

  warn(message: any, ...optionalParams: any[]) {
    console.log(message);
  }

  debug?(message: any, ...optionalParams: any[]) {
    console.log(message);
  }

  verbose?(message: any, ...optionalParams: any[]) {
    console.log(message);
  }

  createLog(obj: string) {
    const date = this.getDateTime();
    const message = `${date} Post/ Creating an a new ${obj}`;
    fs.writeFile('../../../../logs/logs.txt', message, (err) => {
      if (err) {
        console.error(err);
      }
      // file written successfully
    });
  }

  getLog(obj: string) {
    const date = this.getDateTime();
    const message = `${date} Get/ getting single data for ${obj}`;
    fs.writeFile('../../../../logs/logs.txt', message, (err) => {
      if (err) {
        console.error(err);
      }
      // file written successfully
    });
  }

  multipleGetLog(obj: string) {
    const date = this.getDateTime();
    const message = `${date} Get/ getting all ${obj}`;
    fs.writeFile('../../../../logs/logs.txt', message, (err) => {
      if (err) {
        console.error(err);
      }
      // file written successfully
    });
  }

  updateLog(obj: string) {
    const date = this.getDateTime();
    const message = `${date} Put/ updating ${obj}`;
    fs.writeFile('../../../../logs/logs.txt', message, (err) => {
      if (err) {
        console.error(err);
      }
      // file written successfully
    });
  }

  deleteLog(obj: string) {
    const date = this.getDateTime();
    const message = `${date} Delete/ deleting ${obj}`;
    fs.writeFile('../../../../logs/logs.txt', message, (err) => {
      if (err) {
        console.error(err);
      }
      // file written successfully
    });
  }

  customLog(message: string) {
    const date = this.getDateTime();
    const customrMessage = `${date} ${message}`;
    fs.writeFile('../../../../logs/logs.txt', customrMessage, (err) => {
      if (err) {
        console.error(err);
      }
      // file written successfully
    });
  }

  private getDateTime() {
    return new Date();
  }
}
