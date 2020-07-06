import { ConsoleLogger } from './console';
import { Logger } from './logger';
export * from './logger';

export function createLogger(name: string): Logger {
  return new ConsoleLogger(name, Number(process.env.LOG_LEVEL));
}
