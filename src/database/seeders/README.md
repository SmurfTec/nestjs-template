# Database Seeders

This directory contains database seeders for populating the database with mock data for development and testing purposes.

## Structure

- `base.seeder.ts` - Base abstract class that all seeders extend
- `run-seeders.ts` - Main runner that executes all seeders in the correct order
- Individual seeders numbered by execution order (1-15)

## Seeder Execution Order

The seeders are executed in the following order to respect foreign key dependencies:

1. **Profiles** - User profile information
2. **Users** - User accounts (depends on profiles)
3. **Roles** - System roles
4. **Onboarding** - User onboarding records (depends on users)
5. **Audit Events** - System audit logs (depends on users)

## Usage

### Run All Seeders

```bash
npm run seed
```

This will:
1. Connect to the database using the configuration from `typeorm.config.ts`
2. Execute all seeders in the correct order
3. Handle errors gracefully and provide feedback

### Default Test Data

The seeders create the following test data:

- **5 Profiles** - Various user profiles
- **6 Users** - Including an admin user (admin@example.com)
- **6 Roles** - System roles (SUPER_ADMIN, ADMIN, SELLER, AGENCY, MEMBER, VIEWER)
- **4 Onboarding Records** - User onboarding states
- **7 Audit Events** - System audit logs

### Default Credentials

All users are seeded with the password: `password123`

You can log in with any of the seeded user emails:
- john.doe@example.com
- jane.smith@example.com
- bob.johnson@example.com
- alice.williams@example.com
- charlie.brown@example.com
- admin@example.com

## Adding New Seeders

To add a new seeder:

1. Create a new file following the naming convention: `{number}-{name}.seeder.ts`
2. Extend the `BaseSeeder` class
3. Implement the `run` method with your seeding logic
4. Add the seeder to the `seeders` array in `run-seeders.ts` in the correct order

Example:

```typescript
import { DataSource } from 'typeorm';
import { BaseSeeder } from './base.seeder';

export class MyNewSeeder extends BaseSeeder {
  name = 'My New Table';

  async run(dataSource: DataSource): Promise<void> {
    const items = [
      { field1: 'value1', field2: 'value2' },
      // ... more items
    ];

    for (const item of items) {
      await dataSource.query(
        `INSERT INTO my_table (field1, field2) VALUES ($1, $2) ON CONFLICT DO NOTHING`,
        [item.field1, item.field2],
      );
    }
  }
}
```

## Notes

- All seeders use `ON CONFLICT DO NOTHING` to prevent errors on re-runs
- Seeders are idempotent - you can run them multiple times safely
- Foreign key relationships are automatically handled by the execution order
- JSONB fields are properly cast using `::jsonb` in SQL queries
- Enum types are properly cast using `::enum_name_enum` in SQL queries

