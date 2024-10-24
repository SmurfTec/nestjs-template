"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailConfigurations = void 0;
const mailer_1 = require("@nestjs-modules/mailer");
const handlebars_adapter_1 = require("@nestjs-modules/mailer/dist/adapters/handlebars.adapter");
const config_1 = require("@nestjs/config");
const path_1 = require("path");
const environment_config_service_1 = require("../../config/environment-config/environment-config.service");
const configSerivce = new environment_config_service_1.EnvironmentConfigService(new config_1.ConfigService());
exports.mailConfigurations = mailer_1.MailerModule.forRoot({
    transport: {
        host: configSerivce.getEmailHost(),
        port: +configSerivce.getEmailPort(),
        auth: {
            user: configSerivce.getEmailUser(),
            pass: configSerivce.getEmailPass(),
        },
    },
    defaults: {
        from: '"No Reply" <noreply@example.com>',
    },
    template: {
        dir: (0, path_1.join)(__dirname, 'templates'),
        adapter: new handlebars_adapter_1.HandlebarsAdapter(),
        options: {
            strict: true,
        },
    },
});
//# sourceMappingURL=email.config.js.map