import { HttpStatus } from '@nestjs/common';

export class CoreApiResponse<TData> {
  public readonly success: boolean;
  public readonly code: HttpStatus;
  public readonly timestamp: number | string;
  public readonly data: TData | null;
  public readonly error: Error | null;
  //Constructor
  private constructor(
    success: boolean,
    code: HttpStatus,
    data?: TData,
    error?: Error,
  ) {
    this.success = success;
    this.code = code;
    this.data = data || null;
    this.timestamp = new Date().toLocaleString('ru-RU', {
      timeZone: 'Asia/Tashkent',
    });
    this.error = error;
  }
  //Succes
  public static success<TData>(
    code: HttpStatus,
    data?: TData,
  ): CoreApiResponse<TData> {
    return new CoreApiResponse(true, code, data, null);
  }
  //error
  public static error<TData>(
    code: HttpStatus,
    error?: Error,
  ): CoreApiResponse<TData> {
    return new CoreApiResponse(false, code, null, error);
  }
}
