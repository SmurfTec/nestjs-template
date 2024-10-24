declare enum Environment {
    Development = "development",
    Production = "production",
    Local = "local",
    Test = "test"
}
declare class EnvironmentVariables {
    NODE_ENV: Environment;
    EMAIL_HOST: string;
    EMAIL_USER: string;
    EMAIL_PASS: string;
    EMAIL_PORT: string;
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
    JWT_SECRET: string;
    JWT_EXPIRATION_TIME: string;
    JWT_REFRESH_TOKEN_SECRET: string;
    JWT_REFRESH_TOKEN_EXPIRATION_TIME: string;
    DATABASE_TYPE: string;
    DATABASE_NAME: string;
    DATABASE_PORT: string;
    DATABASE_HOST: string;
    DATABASE_USERNAME: string;
    DATABASE_PASSWORD: string;
    DATABASE_SYNCHRONIZE: string;
    DATABASE_MIGRATIONS_RUN: string;
    PORT: string;
}
export declare function validate(config: Record<string, unknown>): EnvironmentVariables;
export {};
