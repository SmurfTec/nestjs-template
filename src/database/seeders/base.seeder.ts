import { DataSource } from 'typeorm';

export abstract class BaseSeeder {
  abstract name: string;

  abstract run(dataSource: DataSource): Promise<void>;

  async seed(dataSource: DataSource): Promise<void> {
    console.log(`🌱 Seeding ${this.name}...`);
    try {
      await this.run(dataSource);
      console.log(`✅ Successfully seeded ${this.name}`);
    } catch (error) {
      console.error(`❌ Error seeding ${this.name}:`, error);
      throw error;
    }
  }
}

