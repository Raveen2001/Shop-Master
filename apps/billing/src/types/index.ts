export interface IRequestError {
  response?: {
    data?: {
      error?: string;
    };
  };
}
