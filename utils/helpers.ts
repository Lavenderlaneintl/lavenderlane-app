import _ from "lodash";

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
