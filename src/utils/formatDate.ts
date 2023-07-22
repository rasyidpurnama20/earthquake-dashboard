import dayjs from "dayjs";
require("dayjs/locale/id");
import localizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(localizedFormat);

export function formatDate(date: string) {
  const formattedDate = dayjs(date).locale("id").format("DD MMMM YYYY LT");
  return formattedDate;
}
