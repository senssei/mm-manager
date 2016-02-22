export function getQueryParam(query, name, def = undefined) {
  let param = query[name];
  if (!param) {
    return def;
  }
  return param;
}
