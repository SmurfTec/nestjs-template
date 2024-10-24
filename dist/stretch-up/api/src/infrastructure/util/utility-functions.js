"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.axiosRequest = exports.axiosPostRequest = exports.checkExistingPermissions = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
const https = require("https");
const checkExistingPermissions = (existingArray, newArray) => {
    const intersection = existingArray.filter((element) => newArray.includes(element));
    console.log('intersection', intersection);
    if (intersection.length > 0)
        throw new common_1.ConflictException(`Already Exists ${intersection.toString()}`);
    return;
};
exports.checkExistingPermissions = checkExistingPermissions;
const axiosPostRequest = async (url, dataObj, token) => {
    const { data } = await axios_1.default.post(url, dataObj, {
        headers: {
            'X-AUTH-TOKEN': token,
            'Content-Type': 'application/json',
        },
        httpsAgent: new https.Agent({
            rejectUnauthorized: false,
        }),
    });
    return data;
};
exports.axiosPostRequest = axiosPostRequest;
exports.axiosRequest = {
    postRequest: (url, dataObj, token) => (0, exports.axiosPostRequest)(url, dataObj, token),
};
//# sourceMappingURL=utility-functions.js.map