/* eslint-disable @typescript-eslint/no-explicit-any */
export const getStringEnumKeys = (E: any) =>
  Object.keys(E).filter((k) => typeof E[k as any] === 'string');

export const getStringEnumValues = (E: any) =>
  getStringEnumKeys(E).map((k) => E[k as any]);
