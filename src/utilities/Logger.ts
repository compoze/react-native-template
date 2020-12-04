const env = process.env.ENVIRONMENT;
export default class Log {
  private readonly isLoggingEnabled: boolean =
    env.toString().toLowerCase() === 'dev';
  //Debug log
  public debug = (...msg: string[] | any[] | object[]) => {
    if (this.isLoggingEnabled) {
      console.debug(JSON.stringify(`DEBUG: ${new Date()}: `, ...msg));
    }
  };
  //error log
  public err = (...msg: string[] | any[] | object[] | Error[]) => {
    if (this.isLoggingEnabled) {
      console.error(JSON.stringify(`ERROR: ${new Date()}: `, ...msg));
    }
  };
  //Alias
  public error = (...msg: string[] | any[] | object[] | Error[]) => {
    this.err(msg);
  };
  //log log
  public log = (...msg: string[] | any[] | object[]) => {
    if (this.isLoggingEnabled) {
      console.log(JSON.stringify(`LOG: ${new Date()}: `, ...msg));
    }
  };
  //info log
  public info = (...msg: string[] | any[] | object[]) => {
    if (this.isLoggingEnabled) {
      console.info(JSON.stringify(`INFO: ${new Date()}: `, ...msg));
    }
  };
}
