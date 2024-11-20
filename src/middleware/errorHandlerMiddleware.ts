import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors/CustomError';

export const errorHandlerMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let message = 'Internal Server Error';

  if (err instanceof CustomError) {
    statusCode = err.statusCode;
    message = err.message;
  }

  console.error(`${statusCode} - ${req.method} ${req.url}: ${message}`);

  res.status(statusCode).json({
    error: {
      message,
      statusCode,
    },
  });
};
