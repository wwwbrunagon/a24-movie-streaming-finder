// src/utils/logger.ts

export enum LogLevel {
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
}

class Logger {
  static log(
    level: LogLevel,
    message: string,
    ...optionalParams: unknown[]
  ): void {
    const timestamp = new Date().toISOString();
    switch (level) {
      case LogLevel.INFO:
        console.log(
          `[${timestamp}] [${LogLevel.INFO}] ${message}`,
          ...optionalParams
        );
        break;
      case LogLevel.WARN:
        console.warn(
          `[${timestamp}] [${LogLevel.WARN}] ${message}`,
          ...optionalParams
        );
        break;
      case LogLevel.ERROR:
        console.error(
          `[${timestamp}] [${LogLevel.ERROR}] ${message}`,
          ...optionalParams
        );
        break;
    }
  }

  static info(message: string, ...optionalParams: unknown[]): void {
    this.log(LogLevel.INFO, message, ...optionalParams);
  }

  static warn(message: string, ...optionalParams: unknown[]): void {
    this.log(LogLevel.WARN, message, ...optionalParams);
  }

  static error(message: string, ...optionalParams: unknown[]): void {
    this.log(LogLevel.ERROR, message, ...optionalParams);
  }
}

export default Logger;
