import * as moment from 'moment';

export enum FormatDateEnum {
  YYYY_MM_DDD = 'YYYY-MM-DD',
  YYYY_MM = 'YYYY-MM',
  MM_DD = 'MM-DD',
  MM_SOLIDUS_YYYY = 'MM/YYYY',
  YYYY_MM_DDD_HH_MM_SS = 'YYYY-MM-DD HH:mm:ss',
  DD_SOLIDUS_MM_SOLIDUS_YYYY = 'DD/MM/YYYY',
  MM_SOLIDUS_DD_SOLIDUS_YYYY_EN_US = 'MM/DD/YYYY',
  HH_MM = 'HH:mm',
  DD = 'DD',
  MM = 'MM',
  YYYY = 'YYYY',
}

export function formatDate(
  date: string | Date,
  formatDate = FormatDateEnum.YYYY_MM_DDD,
): string {
  const dt = new Date(date);

  const dtDateOnly = new Date(
    dt.valueOf() + dt.getTimezoneOffset() * 60 * 1000,
  );

  return moment(dtDateOnly).format(formatDate);
}
