export const bentoFetch: typeof fetch = (input, init) => {
  const headers = new Headers(init?.headers);

  headers.delete("x-correlation-id");
  headers.delete("x-request-id");

  return globalThis.fetch(input, { ...init, headers });
};
