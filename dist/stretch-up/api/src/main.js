"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const cookieParser = require("cookie-parser");
const app_module_1 = require("./app.module");
const environment_config_service_1 = require("./infrastructure/config/environment-config/environment-config.service");
const config_1 = require("@nestjs/config");
const common_1 = require("@nestjs/common");
const global_exception_handler_1 = require("./infrastructure/common/exceptions/global-exception-handler");
const helmet_1 = require("helmet");
const swagger_2 = require("./infrastructure/config/swagger/swagger");
const configSerivce = new environment_config_service_1.EnvironmentConfigService(new config_1.ConfigService());
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        bodyParser: false,
    });
    app.enableCors({
        origin: true,
        credentials: true,
    });
    const httpAdapterHost = app.get(core_1.HttpAdapterHost);
    app.useGlobalFilters(new global_exception_handler_1.AllExceptionsFilter(httpAdapterHost));
    app.use(cookieParser());
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.getHttpAdapter().getInstance().disable('x-powered-by');
    app.enableCors();
    app.use((0, helmet_1.default)());
    app.use(helmet_1.default.noSniff());
    app.use(helmet_1.default.hidePoweredBy());
    app.use(helmet_1.default.contentSecurityPolicy());
    swagger_1.SwaggerModule.setup('api', app, (0, swagger_2.createDocument)(app));
    await app.listen(configSerivce.getPORT() || 3010, () => {
        console.log(`app is listening on port ${configSerivce.getPORT()}`);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map