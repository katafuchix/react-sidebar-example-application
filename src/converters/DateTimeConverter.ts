
import moment from "moment";

export class DateTimeConverter {
  static convert(value?: string): string {
    if (value) {
      return moment(value).format('YYYY/MM/DD HH:mm:ss')
    }
    else {
      return '';
    }
  }
}
