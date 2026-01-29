import { DataSource } from 'typeorm';
import { BaseSeeder } from './base.seeder';
import * as bcrypt from 'bcrypt';

export class UsersSeeder extends BaseSeeder {
  name = 'Users';

  async run(dataSource: DataSource): Promise<void> {
    // Get profile IDs
    const profiles = await dataSource.query('SELECT id FROM profiles ORDER BY id LIMIT 5');
    if (profiles.length === 0) {
      throw new Error('No profiles found. Please seed profiles first.');
    }

    // Hash password for all users (default: "password123")
    const hashedPassword = await bcrypt.hash('password123', 10);

    const users = [
      {
        email: 'john.doe@example.com',
        password: hashedPassword,
        status: 'ACTIVE',
        profile_id: profiles[0]?.id || null,
        is_active: true,
      },
      {
        email: 'jane.smith@example.com',
        password: hashedPassword,
        status: 'ACTIVE',
        profile_id: profiles[1]?.id || null,
        is_active: true,
      },
      {
        email: 'bob.johnson@example.com',
        password: hashedPassword,
        status: 'ACTIVE',
        profile_id: profiles[2]?.id || null,
        is_active: true,
      },
      {
        email: 'alice.williams@example.com',
        password: hashedPassword,
        status: 'ACTIVE',
        profile_id: profiles[3]?.id || null,
        is_active: true,
      },
      {
        email: 'charlie.brown@example.com',
        password: hashedPassword,
        status: 'INACTIVE',
        profile_id: profiles[4]?.id || null,
        is_active: false,
      },
      {
        email: 'admin@example.com',
        password: hashedPassword,
        status: 'ACTIVE',
        profile_id: null,
        is_active: true,
      },
    ];

    for (const user of users) {
      await dataSource.query(
        `INSERT INTO users (email, password, status, profile_id, is_active, created_on, updated_on)
         VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
         ON CONFLICT DO NOTHING`,
        [user.email, user.password, user.status, user.profile_id, user.is_active],
      );
    }
  }
}

