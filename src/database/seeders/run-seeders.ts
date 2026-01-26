import { DataSource } from 'typeorm';
import { databaseConfigurations } from '../../infrastructure/config/typeorm/typeorm.config';
import { BaseSeeder } from './base.seeder';
import { ProfilesSeeder } from './1-profiles.seeder';
import { UsersSeeder } from './2-users.seeder';
import { RolesSeeder } from './3-roles.seeder';
import { OnboardingSeeder } from './12-onboarding.seeder';

async function runSeeders() {
  const dataSource = new DataSource(databaseConfigurations);

  try {
    console.log('🚀 Starting database seeding...\n');

    await dataSource.initialize();
    console.log('✅ Database connection initialized\n');

    const seeders: BaseSeeder[] = [
      new ProfilesSeeder(),
      new UsersSeeder(),
      new RolesSeeder(),
      new OnboardingSeeder(),
    ];

    for (const seeder of seeders) {
      await seeder.seed(dataSource);
      console.log('');
    }

    console.log('🎉 All seeders completed successfully!');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  } finally {
    if (dataSource.isInitialized) {
      await dataSource.destroy();
      console.log('\n✅ Database connection closed');
    }
  }
}

// Run if executed directly
if (require.main === module) {
  runSeeders();
}

export { runSeeders };

