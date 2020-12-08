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
  | NullType
  | Error
  | File
  | Date;

export default class Log {
  private readonly isLoggingEnabled: boolean =
    env.toString().toLowerCase() === 'dev';
  //Debug log
  public debug = (...msg: LogType[]) => {
    if (this.isLoggingEnabled) {
      console.debug(JSON.stringify(`DEBUG: ${new Date()}: `, ...msg));
    }
  };
  //error log
  public err = (...msg: LogType[] | Error[]) => {
    if (this.isLoggingEnabled) {
      console.error(JSON.stringify(`ERROR: ${new Date()}: `, ...msg));
    }
  };
  //Alias
  public error = (...msg: LogType[] | Error[]) => {
    this.err(msg);
  };
  //log log
  public log = (...msg: LogType[]) => {
    if (this.isLoggingEnabled) {
      console.log(JSON.stringify(`LOG: ${new Date()}: `, ...msg));
    }
  };
  //info log
  public info = (...msg: LogType[]) => {
    if (this.isLoggingEnabled) {
      console.info(JSON.stringify(`INFO: ${new Date()}: `, ...msg));
    }
  };
}
