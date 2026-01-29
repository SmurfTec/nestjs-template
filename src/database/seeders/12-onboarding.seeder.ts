import { DataSource } from 'typeorm';
import { BaseSeeder } from './base.seeder';

export class OnboardingSeeder extends BaseSeeder {
  name = 'Onboarding';

  async run(dataSource: DataSource): Promise<void> {
    // Get users
    const users = await dataSource.query('SELECT id FROM users ORDER BY id LIMIT 5');

    if (users.length === 0) {
      throw new Error('No users found. Please seed users first.');
    }

    const onboardingRecords = [
      {
        user_id: users[0]?.id,
        type: 'solo',
        state: 'completed',
        personal_details: JSON.stringify({
          firstName: 'John',
          lastName: 'Doe',
          phone: '+1234567890',
        }),
        is_active: true,
      },
      {
        user_id: users[1]?.id,
        type: 'solo',
        state: 'ready_to_connect',
        personal_details: JSON.stringify({
          firstName: 'Jane',
          lastName: 'Smith',
          phone: '+1234567891',
        }),
        is_active: true,
      },
      {
        user_id: users[2]?.id,
        state: 'not_started',
        personal_details: null,
        is_active: true,
      },
      {
        user_id: users[3]?.id,
        type: 'solo',
        state: 'ready_to_connect',
        personal_details: JSON.stringify({
          firstName: 'Alice',
          lastName: 'Williams',
        }),
        is_active: true,
      },
    ];

    for (const record of onboardingRecords) {
      await dataSource.query(
        `INSERT INTO onboarding (user_id, type, state, personal_details, is_active, created_at, updated_at)
         VALUES ($1, $2::onboarding_type_enum, $3::onboarding_state_enum, $4::jsonb, $7, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
         ON CONFLICT DO NOTHING`,
        [
          record.user_id,
          record.type,
          record.state,
          record.personal_details,
          record.is_active,
        ],
      );
    }
  }
}

