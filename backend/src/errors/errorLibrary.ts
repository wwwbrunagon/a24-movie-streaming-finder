import { ErrorLog } from './errorLogs';

export const errorLibrary = {
	INVALID_CREDENTIALS: new ErrorLog(
		'ERR_INVALID_CREDENTIALS',
		'Invalid credentials',
		null,
		401
	),

	UNAUTHORIZED_ACCESS: new ErrorLog(
		'ERR_UNAUTHORIZED_ACCESS',
		'Unauthorized access',
		null,
		403
	),

	DATABASE_CONNECTION_FAILED: new ErrorLog(
		'ERR_DB_CONNECTION_FAILED',
		'Database connection failed',
		null,
		500,
		false
	),

	RECORD_NOT_FOUND: new ErrorLog(
		'ERR_RECORD_NOT_FOUND',
		'Record not found',
		null,
		404
	),

	INVALID_INPUT: new ErrorLog(
		'ERR_INVALID_INPUT',
		'Invalid input data',
		null,
		400
	),

	MISSING_REQUIRED_FIELD: new ErrorLog(
		'ERR_MISSING_REQUIRED_FIELD',
		'Missing required field',
		null,
		400
	),

	INTERNAL_SERVER_ERROR: new ErrorLog(
		'ERR_INTERNAL_SERVER_ERROR',
		'Internal server error',
		null,
		500
	),

	SERVICE_UNAVAILABLE: new ErrorLog(
		'ERR_SERVICE_UNAVAILABLE',
		'Service unavailable',
		null,
		503,
		false
	),
};
