import { Request, Response, NextFunction } from 'express';
import { ErrorLog } from '../errors/errorLog';
import { logger } from '../utils/logger';

const errorHandler = (
	error: ErrorLog,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (error instanceof ErrorLog) {
		logger.error(error);
		res.status(error.status).json({
			errorCode: error.errorCode,
			message: error.message,
			details: error.details,
			isOperational: error.isOperational,
		});
	} else {
		logger.error(error);
		res.status(500).json({
			errorCode: 'ERR_UNKNOWN',
			message: 'An unknown error occurred',
		});
	}
};

export default errorHandler;
