import { SetMetadata } from '@nestjs/common';

export const TransformationType = (transform: string) =>
  SetMetadata('transform', transform);
