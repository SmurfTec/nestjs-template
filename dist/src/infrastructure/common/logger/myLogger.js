"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyLogger = void 0;
const fs_1 = require("fs");
class MyLogger {
    log(message, ...optionalParams) {
        console.log(message);
    }
    error(message, ...optionalParams) {
        console.log(message);
    }
    warn(message, ...optionalParams) {
        console.log(message);
    }
    debug(message, ...optionalParams) {
        console.log(message);
    }
    verbose(message, ...optionalParams) {
        console.log(message);
    }
    createLog(obj) {
        const date = this.getDateTime();
        const message = `${date} Post/ Creating an a new ${obj}`;
        fs_1.default.writeFile('../../../../logs/logs.txt', message, (err) => {
            if (err) {
                console.error(err);
            }
        });
    }
    getLog(obj) {
        const date = this.getDateTime();
        const message = `${date} Get/ getting single data for ${obj}`;
        fs_1.default.writeFile('../../../../logs/logs.txt', message, (err) => {
            if (err) {
                console.error(err);
            }
        });
    }
    multipleGetLog(obj) {
        const date = this.getDateTime();
        const message = `${date} Get/ getting all ${obj}`;
        fs_1.default.writeFile('../../../../logs/logs.txt', message, (err) => {
            if (err) {
                console.error(err);
            }
        });
    }
    updateLog(obj) {
        const date = this.getDateTime();
        const message = `${date} Put/ updating ${obj}`;
        fs_1.default.writeFile('../../../../logs/logs.txt', message, (err) => {
            if (err) {
                console.error(err);
            }
        });
    }
    deleteLog(obj) {
        const date = this.getDateTime();
        const message = `${date} Delete/ deleting ${obj}`;
        fs_1.default.writeFile('../../../../logs/logs.txt', message, (err) => {
            if (err) {
                console.error(err);
            }
        });
    }
    customLog(message) {
        const date = this.getDateTime();
        const customrMessage = `${date} ${message}`;
        fs_1.default.writeFile('../../../../logs/logs.txt', customrMessage, (err) => {
            if (err) {
                console.error(err);
            }
        });
    }
    getDateTime() {
        return new Date();
    }
}
exports.MyLogger = MyLogger;
//# sourceMappingURL=myLogger.js.map