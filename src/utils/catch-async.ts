// utils/catch-async.util.ts

import { Request, Response, NextFunction } from 'express';
import { HttpException, HttpStatus } from '@nestjs/common';

type AsyncFunction = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<any>;

export const catchAsync = (fn: AsyncFunction) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch((error) => {
      // console.log('ERROR***********', error);
      console.log('ERROR***********', error.message);
      if (error instanceof HttpException) {
        // If the error is already an HttpException, pass it to the global exception handler
        next(error);
      } else {
        // If it's not an HttpException, create a new HttpException with a 500 status code
        next(
          new HttpException(
            error.message || 'Something went very wrong',
            HttpStatus.INTERNAL_SERVER_ERROR,
          ),
        );
      }
    });
  };
};
