// src/infrastructure/config/swagger/swagger.config.ts
import { SwaggerConfig } from './swagger.interface';

/**
 * Configuration for the swagger UI (found at /api).
 * Change this to suit your app!
 */
export const SWAGGER_CONFIG: SwaggerConfig = {
  title: 'Seller Swift api',
  description: 'Nest js api',
  version: '1.0',
  tags: [],
  contact: {
    name: 'uahmadsoft',
    url: 'uahmadsoft',
    email: 'umadahmad1928@gmail.com',
  },
};
