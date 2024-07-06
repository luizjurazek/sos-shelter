interface errorDetails {
  error: boolean;
  message: string;
  stack?: string;
  errors?: Array<string>;
}

interface CustomError extends Error {
  statusCode?: number;
  errors?: Array<string>;
}

export { errorDetails, CustomError };
