export function capitalizeAll (s:string) {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function capitalizeFirstCaracter(s:string) {
  return s.toLowerCase().replace(/^.{1}/g, s[0].toUpperCase());
}

export const isEmpty = (value:string) =>
  value === undefined ||
  value === null ||
  (typeof value === "object" && Object.keys(value).length === 0) ||
  (typeof value === "string" && value.trim().length === 0);

export const sleep = (time:number) => new Promise((acc) => setTimeout(acc, time))
