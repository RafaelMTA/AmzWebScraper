import type { AxiosError } from "axios";

export const AxiosErrorHandler = (error: AxiosError) : void => {
    if (error.response) {
        // The request was made and the server responded with a status code
        console.error('Data:', error.response.data);
        console.error('Status:', error.response.status);
        console.error('Headers:', error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
      } else {
        // Something happened in setting up the request
        console.error('Error:', error.message);
      }
};