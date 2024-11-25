import { Request, Response, NextFunction } from 'express';
import { ErrorLog } from '../errors/errorLog';
import { logger } from '../utils/logger';

export const errorHandlerMiddleware = (
	err: Error | ErrorLog,
	req: Request,
	res: Response,
	_next: NextFunction
) => {
	logger.error(`Error occurred during processing ${req.method} ${req.url}`);
	logger.error(`Error details: ${err.message}`);

	const statusCode = err instanceof ErrorLog ? err.status : 500;
	const message = err.message || 'Internal Server Error';

	res.status(statusCode).json({ error: { message, statusCode } });
};
