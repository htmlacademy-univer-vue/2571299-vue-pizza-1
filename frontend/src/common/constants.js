export const SEC = 1000;
export const MINUTE_IN_SEC = 60;
export const HOUR_IN_SEC = MINUTE_IN_SEC * 60;
export const DAY_IN_SEC = HOUR_IN_SEC * 24;
export const MONTH_IN_SEC = DAY_IN_SEC * 30;
export const YEAR_IN_SEC = DAY_IN_SEC * 365;
export const DAY_IN_MILLISEC = DAY_IN_SEC * SEC;

export const MAX_INGREDIENT_COUNT = 3;

export const TAG_SEPARATOR = "#";
export const MOVE = "move";
export const DATA_TRANSFER_PAYLOAD = "payload";

export const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const urlRegex =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/;
