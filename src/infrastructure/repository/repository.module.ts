import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import db1Entities from '../entities/db';
import { BcryptService } from '../services/bcrypt/bcrypt.service';

@Module({
  imports: [TypeOrmModule.forFeature(db1Entities)],
  providers: [BcryptService],
  exports: [],
})
export class RepositoryModule {}
