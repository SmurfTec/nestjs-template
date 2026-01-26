import { DataSource } from 'typeorm';
import { BaseSeeder } from './base.seeder';

export class ProfilesSeeder extends BaseSeeder {
  name = 'Profiles';

  async run(dataSource: DataSource): Promise<void> {
    const profiles = [
      {
        name: 'John Doe',
        mobile: '+1234567890',
        image_path: '/images/profiles/john-doe.jpg',
        is_active: true,
      },
      {
        name: 'Jane Smith',
        mobile: '+1234567891',
        image_path: '/images/profiles/jane-smith.jpg',
        is_active: true,
      },
      {
        name: 'Bob Johnson',
        mobile: '+1234567892',
        image_path: null,
        is_active: true,
      },
      {
        name: 'Alice Williams',
        mobile: '+1234567893',
        image_path: '/images/profiles/alice-williams.jpg',
        is_active: true,
      },
      {
        name: 'Charlie Brown',
        mobile: '+1234567894',
        image_path: null,
        is_active: false,
      },
    ];

    for (const profile of profiles) {
      await dataSource.query(
        `INSERT INTO profiles (name, mobile, image_path, is_active, created_on, updated_on)
         VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
         ON CONFLICT DO NOTHING`,
        [profile.name, profile.mobile, profile.image_path, profile.is_active],
      );
    }
  }
}

