export enum LogLevel {
  trace,
  debug,
  info,
  warn,
  error,
  fatal,
}

export interface Logger {
  trace(message: string, ...data: any): void;
  debug(message: string, ...data: any): void;
  info(message: string, ...data: any): void;
  warn(message: string, ...data: any): void;
  error(message: string, ...data: any): void;
  fatal(message: string, ...data: any): void;
}
