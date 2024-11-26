import { Response } from 'express';
import { ErrorLog } from '../errors/errorLog';

export const sendSuccess = (
	res: Response,
	data: object,
	status: number = 200
) => {
	res.status(status).json({
		success: true,
		data,
	});
};

export const sendError = (res: Response, error: ErrorLog) => {
	res.status(error.status).json({
		success: false,
		errorCode: error.errorCode,
		message: error.message,
		details: error.details || undefined, // Send details only if available
		isOperational: error.isOperational,
	});
};
