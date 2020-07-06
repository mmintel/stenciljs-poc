import { Logger, LogLevel } from './logger';
import chalk from 'chalk';

interface LogOptions {
  message: string;
  data: any;
  level: LogLevel;
  method?: LogMethod;
}

enum LogMethod {
  log = 'log',
  info = 'info',
  warn = 'warn',
  error = 'error',
}

export class ConsoleLogger implements Logger {
  private client: Console = console;
  private defaultLogMethod: LogMethod = LogMethod.info;

  constructor(private name: string, private level: LogLevel) {
    if (!level && level !== 0) {
      this.level = LogLevel.info;
    }
  }

  private log({ message, level, method, data }: LogOptions): void {
    const loggable = level >= this.level;

    if (!loggable) return;

    const messageColors = {
      0: chalk.grey,
      1: chalk.grey,
      2: chalk.blue,
      3: chalk.yellow,
      4: chalk.red,
      5: chalk.red,
    };
    const formattedName = chalk.blueBright(`[${this.name}]`);
    const formattedMessage = messageColors[level](message);

    this.client[method || this.defaultLogMethod](
      `${formattedName} ${formattedMessage}`,
      ...data,
    );
  }

  public trace(message: string, ...data: any) {
    this.log({
      message,
      data,
      level: LogLevel.trace,
    });
  }

  public debug(message: string, ...data: any) {
    this.log({
      message,
      data,
      level: LogLevel.debug,
    });
  }

  public info(message: string, ...data: any) {
    this.log({
      message,
      data,
      level: LogLevel.info,
    });
  }

  public warn(message: string, ...data: any) {
    this.log({
      message,
      data,
      level: LogLevel.warn,
      method: LogMethod.warn,
    });
  }

  public error(message: string, ...data: any) {
    this.log({
      message,
      data,
      level: LogLevel.error,
      method: LogMethod.error,
    });
  }

  public fatal(message: string, ...data: any) {
    this.log({
      message,
      data,
      level: LogLevel.trace,
      method: LogMethod.error,
    });
  }

  public setLevel(level: LogLevel) {
    this.level = level;
  }
}
