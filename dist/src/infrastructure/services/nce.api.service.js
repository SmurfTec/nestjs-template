"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NceApiService = void 0;
const axios_1 = require("axios");
const https = require("https");
const common_1 = require("@nestjs/common");
class NceApiService {
    constructor(baseURL, token = '') {
        const headers = token === ''
            ? {
                'Content-Type': 'application/json;charset=UTF-8',
                Accept: 'application/json',
            }
            : {
                'X-AUTH-TOKEN': token,
                'Content-Type': 'application/json;charset=UTF-8',
                Accept: 'application/json',
            };
        this.axiosInstance = axios_1.default.create({
            baseURL,
            headers,
            httpsAgent: new https.Agent({
                rejectUnauthorized: false,
            }),
        });
        this.axiosInstance.interceptors.response.use(onResponse, onResponseError);
    }
    async post(url, body) {
        const data = await this.axiosInstance.post(url, body);
        return data === undefined ? { data: [] } : data.data;
    }
    async put(url, body) {
        const { data } = await this.axiosInstance.put(url, body);
        return data;
    }
    async get(url) {
        return this.axiosInstance.get(url);
    }
}
exports.NceApiService = NceApiService;
const onResponse = (response) => {
    return response;
};
const onResponseError = (error) => {
    var _a;
    if (((_a = error.response) === null || _a === void 0 ? void 0 : _a.status) == 400) {
        throw new common_1.HttpException('Session full', axios_1.HttpStatusCode.Conflict);
    }
};
//# sourceMappingURL=nce.api.service.js.map