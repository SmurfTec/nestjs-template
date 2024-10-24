export interface DatabaseConfig {
  getDatabaseHost(): string;
  getDatabasePort(): number;
  getDatabaseUser(): string;
  getDatabasePassword(): string;
  getDatabaseName(): string;
  getDatabaseType(): any;
  // getDatabaseSchema(): string;
  getDatabaseSync(): boolean;
  getDatabaseMigrationRun(): boolean;
  getTablesExcludedFromCRUDLogs(): string[];
}
