import { SetMetadata } from '@nestjs/common';

export const AllowUnAuthorizedRequest = () =>
  SetMetadata('allowUnAuthorizedRequest', true);
