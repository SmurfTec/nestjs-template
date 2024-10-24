import { ConfigService } from '@nestjs/config';
import { KafkaOptions, Transport } from '@nestjs/microservices';
import { readFileSync } from 'fs';
import { EnvironmentConfigService } from '../environment-config/environment-config.service';
const configSerivce = new EnvironmentConfigService(new ConfigService());

export const kafkaConfigurations: KafkaOptions = {
  transport: Transport.KAFKA,
  options: {
    client: {
      brokers: ['172.29.126.20:9092'],
      ssl: {
        rejectUnauthorized: false,
        ca: [readFileSync('src/ssl-files/ca.crt', 'utf-8')],
        key: readFileSync('src/ssl-files/client-key.pem', 'utf-8'),
        cert: readFileSync('src/ssl-files/client-cert.pem', 'utf-8'),
      },
    },
  },
};
