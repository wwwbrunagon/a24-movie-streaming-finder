import { CustomError } from './CustomError';

export class ValidationError extends CustomError {
  constructor(message: string) {
    super(message, 400);
  }
}
