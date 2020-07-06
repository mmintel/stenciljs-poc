declare global {
  import { LogLevel } from '../src/utils/logger';

  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      LOG_LEVEL: Loglevel;
    }
  }
}
