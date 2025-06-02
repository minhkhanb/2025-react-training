export function compileParamToUrl(
  endpoint: string,
  params?: Record<string, string | number>
): string {
  if (!params) return endpoint;
  return endpoint.replace(/:([a-zA-Z0-9_]+)/g, (_, key) => {
    if (params[key] === undefined) {
      throw new Error(`Missing value for URL param: ${key}`);
    }
    return encodeURIComponent(String(params[key]));
  });
}
