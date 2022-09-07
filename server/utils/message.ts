interface Response {
  statusCode: number;
  body: string;
}

enum StatusCode {
  success = 200,
  serverError = 500,
}

class Result<T> {
  private statusCode: number;
  private message: string;
  private data?: any;

  constructor(statusCode: number, message: string, data?: T) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }

  bodyToString () {
    return {
      statusCode: this.statusCode,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({
        code: this.statusCode,
        message: this.message,
        result: this.data,
      }),
    };
  }
}

export class MessageUtil {
  static success<T>(data: T): Response {
    const result = new Result<T>(StatusCode.success, 'success', data);

    return result.bodyToString();
  }

  static error(statusCode: number = StatusCode.serverError, message: string) {
    const result = new Result(statusCode, message);

    return result.bodyToString();
  }
}
