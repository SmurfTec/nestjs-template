# Database Migration and Setup Guide

This guide details the process for initializing the PostgreSQL database, ensuring all necessary extensions (`pg_trgm`, `uuid-ossp`) and user permissions are correctly configured *before* the TypeORM application migrations begin.

This process separates the high-privilege administrative tasks from the standard application schema tasks, which is the best practice for robust deployment.

## 1. Prerequisites

Before running any setup scripts, ensure the following tools are installed and configured:

1. **PostgreSQL:** Database server is running and accessible.

2. **`psql`:** PostgreSQL command-line client is installed and available in your environment's PATH.

3. **Node.js/npm:** Node.js and npm are installed to run TypeORM migrations.

## 2. Environment Variables

The setup scripts rely on the following environment variables, which should be sourced from your environment file or deployment pipeline:

| **Variable** | **Value (Example)** | **Used By** | **Description** |
| --- | --- | --- | --- |
| `DATABASE_HOST` | `localhost` | `init.sh` | The hostname or IP address of the PostgreSQL server. |
| `DATABASE_NAME` | `sellerswift` | `init.sh` | The target database name. |
| `SUPERUSER` | `postgres` | `init.sh` | The highly privileged user used to install extensions and grant permissions. |
| `DATABASE_USERNAME` | `myuser` | TypeORM | The application user that TypeORM will use for standard operations. |

## 3. Database Setup Process

The setup uses the files located in the `db_setup/` directory: `db_setup.sql` (administrative commands) and `init.sh` (execution script).

### 3.1 Review the Administrative SQL

The `db_setup.sql` file contains the high-privilege commands that must be run by the Superuser (`postgres`):
