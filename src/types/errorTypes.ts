interface errorDetails {
  error: boolean;
  message: string;
  stack?: string;
}

interface CustomError extends Error {
  statusCode?: number;
}

export { errorDetails, CustomError };
