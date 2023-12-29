import { NextFunction, Request, Response } from 'express';
import { HttpException } from '@/core/exceptions/http-exception';
import { logger } from '@/core/utils/logger';

export const ErrorMiddleware = (
  error: HttpException,
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const status: number = error.status || 500;
    const message: string = error.message || 'Something went wrong';
    const errors = error.errors || {};

    logger.error(
      `[${request.method}] ${request.path} >> StatusCode:: ${status}, Message:: ${message}`,
    );
    response.status(status).json({
      message,
      ...(errors && { errors }),
    });
  } catch (error) {
    next(error);
  }
};
