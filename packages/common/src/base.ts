
export interface ServerError {
  hasError: true;
}

export function hasServerError<T extends ServerError>(data: any): data is T {
  return data.hasError === true;
}