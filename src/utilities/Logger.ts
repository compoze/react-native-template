import { NullType } from './MiscUtils';

const env = process.env.ENVIRONMENT;
type LogType =
  | string
  | any
  | object
  | number
  | boolean
  | symbol
  | unknown
  | never
  | NullType
  | Error
  | File
  | Date;

export default class Log {
  private readonly isLoggingEnabled: boolean =
    env.toString().toLowerCase() === 'dev';
  //Debug log
  public debug = (...msg: LogType[]): void => {
    if (this.isLoggingEnabled) {
      console.debug(JSON.stringify(`DEBUG: ${new Date()}: `, ...msg));
    }
  };
  //error log
  public err = (...msg: LogType[] | Error[]): void => {
    if (this.isLoggingEnabled) {
      console.error(JSON.stringify(`ERROR: ${new Date()}: `, ...msg));
    }
  };
  //Alias
  public error = (...msg: LogType[] | Error[]): void => this.err(msg);
  //log log
  public log = (...msg: LogType[]): void => {
    if (this.isLoggingEnabled) {
      console.log(JSON.stringify(`LOG: ${new Date()}: `, ...msg));
    }
  };
  //info log
  public info = (...msg: LogType[]): void => {
    if (this.isLoggingEnabled) {
      console.info(JSON.stringify(`INFO: ${new Date()}: `, ...msg));
    }
  };
}
