import dayjs from "dayjs";
require("dayjs/locale/en");
import localizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(localizedFormat);

export function formatDate(date: string, format?: string) {
  const formattedDate = dayjs(date)
    .locale("en")
    .format(format ?? "DD MMMM YYYY");
  return formattedDate;
}
