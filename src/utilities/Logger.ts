import { NullType } from './MiscUtils';

const env = process.env.ENVIRONMENT;
type LogType =
  | string
  | any
  | object
  | number
  | bigint
  | boolean
  | symbol
  | unknown
  | never
  | NullType
  | Error
  | File
  | Date;

enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  ERROR = 'ERROR',
  LOG = 'LOG',
}

export default class Log {
  private static readonly isLoggingEnabled: boolean =
    env.toString().toLowerCase() === 'dev';
  //Debug log
  public static debug = async (...msg: LogType[]): Promise<void> => {
    Log.backgroundTask(async () => {
      if (Log.isLoggingEnabled) {
        console.debug(Log.logMessage(LogLevel.DEBUG, msg));
      }
      return Promise.resolve();
    }).catch((e) => console.error(e));
  };
  //error log
  public static err = async (...msg: LogType[]): Promise<void> => {
    Log.backgroundTask(async () => {
      if (Log.isLoggingEnabled) {
        console.error(Log.logMessage(LogLevel.ERROR, msg));
      }
      return Promise.resolve();
    }).catch((e) => console.error(e));
  };
  //Alias
  public static error = async (...msg: LogType[]): Promise<void> =>
    Log.err(msg);
  //log log
  public static log = async (...msg: LogType[]): Promise<void> => {
    Log.backgroundTask(async () => {
      if (Log.isLoggingEnabled) {
        console.log(Log.logMessage(LogLevel.LOG, msg));
      }
      return Promise.resolve();
    }).catch((e) => console.error(e));
  };
  //info log
  public static info = async (...msg: LogType[]): Promise<void> => {
    Log.backgroundTask(async () => {
      if (Log.isLoggingEnabled) {
        console.info(Log.logMessage(LogLevel.INFO, msg));
      }
      return Promise.resolve();
    }).catch((e) => console.error(e));
  };
  private static logMessage = async (
    logLevel: LogLevel,
    ...msg: LogType[]
  ): Promise<string | void> => {
    if (Log.isLoggingEnabled) {
      const stamp: string = new Date().toDateString();
      return `${logLevel.toString()}: ${stamp}: ` + JSON.stringify(...msg);
    }
  };
  private static backgroundTask = async (data) => {
    return new Promise(async resolve => {
      (typeof data === 'function') ? data() : data;
      resolve(true);
    }).catch((e) => console.error(e));
  };
}
