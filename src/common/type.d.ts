export interface IError {
  message: string;
}
export interface IResponse<T> {
  status: STATUS_RESPONSE;
  data: T;
}
