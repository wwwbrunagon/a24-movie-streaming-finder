export class ErrorLog extends Error {
	errorCode: string;
	details: string | null;
	status: number;
	isOperational: boolean;

	constructor(
		errorCode: string,
		message: string,
		details: string | null = null,
		status: number = 500,
		isOperational = true
	) {
		super(message);
		this.name = this.constructor.name;
		this.errorCode = errorCode;
		this.details = details;
		this.status = status;
		this.isOperational = isOperational;

		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, this.constructor);
		}
	}
}
