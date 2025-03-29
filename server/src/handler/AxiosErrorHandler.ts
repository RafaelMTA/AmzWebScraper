import type { AxiosError } from "axios";
import { AppError } from "../utils/error/AppError";
import { ServiceUnavailableError } from "../utils/error/ServiceUnavailableError";
import type { AxiosErrorResponse } from "../types/AxiosErrorResponse";

export const AxiosErrorHandler = (error: AxiosError) : void => {
  if (error.response) {
    const { status, data } = error.response;
    const responseData = data as AxiosErrorResponse;
    
    // Handle 503 specifically, due to amazon blocking the request
    if (status === 503) {
      throw new ServiceUnavailableError(
        responseData?.message || 'Upstream service unavailable'
      );
    }
    
    // Handle other HTTP errors
    throw new AppError(
      responseData?.message || `HTTP error ${status}`,
      status
    );
  }
  
  if (error.request) {
    // No response received
    throw new ServiceUnavailableError('No response from upstream service');
  }
  
  // Request setup error
  throw new AppError(`Request error: ${error.message}`, 500);
};