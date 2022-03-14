export class ResponseDTO<T> {
  constructor(message?: string, data?: T) {
    this.message = message ?? null;
    this.data = data ?? null;
  }

  message: string;
  data: T;
}
