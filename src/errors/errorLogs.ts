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
    super(message); // Pass the message to the parent Error class
    this.name = this.constructor.name; // Set the error's name to the class name
    this.errorCode = errorCode;
    this.details = details;
    this.status = status;
    this.isOperational = isOperational;

    // Ensure the stack trace is captured (only available in V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
