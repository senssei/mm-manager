export function getQueryParam(query, name, def = undefined) {
  let param = query[param];
  if (!param) {
    return def;
  }
  return param;
}