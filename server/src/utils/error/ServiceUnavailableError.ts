import { AppError } from "./AppError";

export class ServiceUnavailableError extends AppError {
    constructor(message: string = 'Service temporarily unavailable') {
      super(message, 503);
    }
  }