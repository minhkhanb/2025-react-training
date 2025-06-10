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

export function filterQueryParams(params?: Record<string, string | number>) {
  if (!params) return {};
  const filtered: Record<string, string | number> = {};

  Object.entries(params).forEach(([key, value]) => {
    if (value === null || value === undefined) {
      return;
    }

    if (typeof value === 'string') {
      if (value === '') {
        return;
      }

      filtered[key] = value;
      return;
    }

    filtered[key] = value;
  });

  return filtered;
}
