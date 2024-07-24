interface errorDetails {
  error: boolean;
  message: string;
  stack?: string;
  errors?: Array<string> | boolean;
}

interface CustomError extends Error {
  statusCode?: number;
  errors?: Array<string> | boolean;
}

export { errorDetails, CustomError };
