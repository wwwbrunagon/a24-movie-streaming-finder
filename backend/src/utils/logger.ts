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
	error: (error: ErrorLog) => {
		const logMessage = `[${getTimeStamp()}] ERROR: [${error.errorCode}] ${
			error.message
		}`;
		if (error.details) {
			console.error(logMessage, {
				status: error.status,
				details: error.details,
			});
		} else {
			console.error(logMessage, { status: error.status });
		}
	},
};
