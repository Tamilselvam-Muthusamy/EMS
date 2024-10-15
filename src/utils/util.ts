import { twMerge } from "tailwind-merge";
import { ClassValue, clsx } from "clsx";
import moment from "moment";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function dateFormatter(date: string | null) {
  if (date === null || date?.length <= 0) {
    return "None";
  } else {
    return moment(date).format("DD MMMM YYYY, h:mm a");
  }
}
