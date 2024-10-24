export interface DatabaseConfig {
    getDatabaseHost(): string;
    getDatabasePort(): number;
    getDatabaseUser(): string;
    getDatabasePassword(): string;
    getDatabaseName(): string;
    getDatabaseType(): any;
    getDatabaseSync(): boolean;
    getDatabaseMigrationRun(): boolean;
    getTablesExcludedFromCRUDLogs(): string[];
}
