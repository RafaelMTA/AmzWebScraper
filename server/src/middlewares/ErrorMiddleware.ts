// src/middlewares/errorMiddleware.ts
import type { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/error/AppError';
import type { ErrorResponse } from '../types/ErrorResponse';
import { AppConfig } from '../config/AppConfig';

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
    // Default to 500 if status code not set
    const statusCode = 'statusCode' in err ? err.statusCode : 500;
    const message = err.message || 'Something went wrong';

    // Special handling for 503, due to Amazon blocking the requests
    if (statusCode === 503) {
        res.set('Retry-After', '60'); // Suggest retrying after 60 seconds
    }

    const errorResponse: ErrorResponse = {
        status: statusCode >= 400 && statusCode < 500 ? 'fail' : 'error',
        message,
    };

    // Include stack trace in development
    if (AppConfig.getInstance().env.NODE_ENV === 'development') {
        errorResponse.stack = err.stack;
    }
    
    res.status(statusCode).json(errorResponse);
};

// Catch 404 and forward to error handler
export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Not found - ${req.originalUrl}`, 404));
};