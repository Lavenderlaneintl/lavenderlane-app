import _ from "lodash";
import { v4 as uuidv4 } from "uuid";

export const isTrue = (value: string | undefined | null) => {
  if (typeof value === "string") {
    value = value.trim().toLowerCase();
  }
  switch (value) {
    case "true":
    case "1":
    case "on":
    case "yes":
      return true;
    default:
      return false;
  }
};

/**
 * Recursively removes properties with undefined or null values from an object.
 * @param {Record<string, any>} payload - The object to clean.
 * @returns {Partial<T>} The cleaned object.
 * @template T - The type of the object.
 */

export function removeUndefinedAndNull<T extends Record<string, any>>(
  payload: T
): Partial<T> {
  return _.transform(payload, (result, value, key) => {
    if (_.isObject(value)) {
      const newValue = removeUndefinedAndNull(value);
      if (!_.isEmpty(newValue)) {
        result[key as keyof T] = newValue as T[keyof T];
      }
    } else if (!_.isUndefined(value) && !_.isNull(value)) {
      result[key as keyof T] = value as T[keyof T];
    }
  });
}

/**
 * Parses a date string and returns a Date object.
 * @param {string} dateString - The date string to parse.
 * @returns {Date} The parsed Date object.
 */
export const parseDateString = (dateString: string): Date => {
  return new Date(dateString);
};

/**
 * Handles a date string and returns a human-readable representation
 * such as "Today" with the time, "Yesterday", or a formatted date string.
 *
 * @param dateString - The date string to handle.
 * @returns A string representing "Today" with time, "Yesterday", or the formatted date.
 */
export const formatDate = (dateString: Date) => {
  // Convert the input date string to a Date object
  const date = new Date(dateString);

  // Get the current date and time
  const now = new Date();

  // Extract the date part (YYYY-MM-DD) from the input date
  const currentDate = date.toISOString().slice(0, 10);

  // Extract the date part (YYYY-MM-DD) from today's date
  const today = now.toISOString().slice(0, 10);

  // Calculate yesterday's date by subtracting 24 hours from the current time
  const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000)
    .toISOString()
    .slice(0, 10);

  // Compare the input date with today's date
  if (today === currentDate) {
    // Format the time part (HH:MM AM/PM)
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "pm" : "am";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${formattedHours}:${formattedMinutes}${ampm}`;
  }

  // Compare the input date with yesterday's date
  if (yesterday === currentDate) {
    return "Yesterday";
  }

  // If the date is neither today nor yesterday, format it to "MMM DD" format
  const formattedDate = date
    .toDateString()
    .slice(4, 10)
    .split(" ")
    .reverse()
    .join(" ");

  return formattedDate;
};

/**
 * Generates a unique identifier.
 * @returns {string} The generated unique identifier.
 */
export const generateUniqueId = (): string => {
  return uuidv4();
};
