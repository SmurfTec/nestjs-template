import { DataSource } from 'typeorm';
import { BaseSeeder } from './base.seeder';

export class RolesSeeder extends BaseSeeder {
  name = 'Roles';

  async run(dataSource: DataSource): Promise<void> {
    const roles = [
      {
        name: 'SUPER_ADMIN',
        description: 'Super Administrator with full system access',
        is_active: true,
      },
      {
        name: 'ADMIN',
        description: 'Administrator with elevated permissions',
        is_active: true,
      },
      {
        name: 'SELLER',
        description: 'Seller with access to their own products and orders',
        is_active: true,
      },
      {
        name: 'AGENCY',
        description: 'Agency user managing multiple sellers',
        is_active: true,
      },
      {
        name: 'MEMBER',
        description: 'Regular member with basic permissions',
        is_active: true,
      },
      {
        name: 'VIEWER',
        description: 'Read-only access',
        is_active: true,
      },
    ];

    for (const role of roles) {
      await dataSource.query(
        `INSERT INTO roles (name, description, is_active, created_on, updated_on)
         VALUES ($1, $2, $3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
         ON CONFLICT DO NOTHING`,
        [role.name, role.description, role.is_active],
      );
    }
  }
}

