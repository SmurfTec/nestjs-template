"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDocument = void 0;
const swagger_1 = require("@nestjs/swagger");
const swagger_config_1 = require("./swagger.config");
const response_interceptor_1 = require("../../common/interceptors/response.interceptor");
function createDocument(app) {
    const { name, url, email } = swagger_config_1.SWAGGER_CONFIG.contact;
    const builder = new swagger_1.DocumentBuilder()
        .setTitle(swagger_config_1.SWAGGER_CONFIG.title)
        .setContact(name, url, email)
        .setDescription(swagger_config_1.SWAGGER_CONFIG.description)
        .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'authorization')
        .setVersion(swagger_config_1.SWAGGER_CONFIG.version);
    for (const tag of swagger_config_1.SWAGGER_CONFIG.tags) {
        builder.addTag(tag);
    }
    const options = builder.build();
    return swagger_1.SwaggerModule.createDocument(app, options, {
        extraModels: [response_interceptor_1.ResponseFormat],
        deepScanRoutes: true,
    });
}
exports.createDocument = createDocument;
//# sourceMappingURL=swagger.js.map