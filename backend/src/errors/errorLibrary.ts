import { HttpStatus } from '../interfaces/errorEnum';
import { ErrorLog } from './errorLog';

export const errorLibrary = Object.freeze({
	INVALID_CREDENTIALS: new ErrorLog(
		'ERR_INVALID_CREDENTIALS',
		'Invalid credentials',
		undefined,
		HttpStatus.UNAUTHORIZED
	),
	UNAUTHORIZED_ACCESS: new ErrorLog(
		'ERR_UNAUTHORIZED_ACCESS',
		'Unauthorized access',
		undefined,
		HttpStatus.FORBIDDEN
	),
	DATABASE_CONNECTION_FAILED: new ErrorLog(
		'ERR_DB_CONNECTION_FAILED',
		'Database connection failed',
		undefined,
		HttpStatus.INTERNAL_SERVER_ERROR,
		false
	),
	RECORD_NOT_FOUND: new ErrorLog(
		'ERR_RECORD_NOT_FOUND',
		'Record not found',
		undefined,
		HttpStatus.NOT_FOUND
	),
	INVALID_INPUT: new ErrorLog(
		'ERR_INVALID_INPUT',
		'Invalid input data',
		undefined,
		HttpStatus.BAD_REQUEST
	),
	MISSING_REQUIRED_FIELD: new ErrorLog(
		'ERR_MISSING_REQUIRED_FIELD',
		'Missing required field',
		undefined,
		HttpStatus.BAD_REQUEST
	),
	INTERNAL_SERVER_ERROR: new ErrorLog(
		'ERR_INTERNAL_SERVER_ERROR',
		'Internal server error',
		undefined,
		HttpStatus.INTERNAL_SERVER_ERROR
	),
	SERVICE_UNAVAILABLE: new ErrorLog(
		'ERR_SERVICE_UNAVAILABLE',
		'Service unavailable',
		undefined,
		HttpStatus.SERVICE_UNAVAILABLE,
		false
	),
});
