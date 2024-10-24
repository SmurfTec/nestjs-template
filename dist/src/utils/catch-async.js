"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catchAsync = void 0;
const common_1 = require("@nestjs/common");
const catchAsync = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch((error) => {
            console.log('ERROR***********', error.message);
            if (error instanceof common_1.HttpException) {
                next(error);
            }
            else {
                next(new common_1.HttpException(error.message || 'Something went very wrong', common_1.HttpStatus.INTERNAL_SERVER_ERROR));
            }
        });
    };
};
exports.catchAsync = catchAsync;
//# sourceMappingURL=catch-async.js.map