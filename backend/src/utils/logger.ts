import { ErrorLog } from '../errors/errorLog';

export enum LogLevel {
	INFO = 'INFO',
	WARN = 'WARN',
	ERROR = 'ERROR',
}

const getTimeStamp = (): string => new Date().toISOString();

export const logger = {
	info: (message: string, data?: object) => {
		const logMessage = `[${getTimeStamp()}] INFO: ${message}`;
		if (data) {
			console.log(logMessage, data);
		} else {
			console.log(logMessage);
		}
	},
	warn: (message: string, data?: object) => {
		const logMessage = `[${getTimeStamp()}] WARN: ${message}`;
		if (data) {
			console.warn(logMessage, data);
		} else {
			console.warn(logMessage);
		}
	},
	error: (error: ErrorLog, context?: object) => {
		const logMessage = `[${getTimeStamp()}] ERROR: [${error.errorCode}] ${
			error.message
		}`;
		if (context || error.details) {
			console.error(logMessage, {
				status: error.status,
				details: error.details,
				context: context || {},
			});
		} else {
			console.error(logMessage, { status: error.status });
		}
	},
};
