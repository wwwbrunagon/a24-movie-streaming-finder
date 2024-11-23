import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors/CustomError';
import Logger from '../utils/logger';

export const errorHandlerMiddleware = (
  err: CustomError,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  Logger.error(`Error occurred during processing ${req.method} ${req.url}`);
  Logger.error('Error details:', err);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({ error: { message, statusCode } });
};
