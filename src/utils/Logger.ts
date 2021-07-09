export class Logger {
  static debug(message: string, obj?: any) {
    console.debug(this._(message, obj));
  }

  static info(message: string, obj?: any) {
    console.log(this._(message, obj));
  }

  static warn(message: string, obj?: any) {
    console.warn(this._(message, obj));
  }

  static error(message: string, obj?: any) {
    console.error(this._(message, obj));
  }

  private static _(message: string, obj?: any): string {
    let m = message;
    if (obj) {
      m += `(${JSON.stringify(obj)})`;
    }
    return `${m}.`;
  }
}
