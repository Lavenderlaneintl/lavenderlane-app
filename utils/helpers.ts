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
