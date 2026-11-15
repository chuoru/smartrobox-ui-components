import { snakeCase, camelCase } from 'lodash';

export type QtToSnake<T extends string, Acc extends string = ''> = string extends T
  ? string
  : T extends `${infer First}${infer Rest}`
    ? QtToSnake<Rest, First extends Uppercase<First> ? `${Acc}_${Lowercase<First>}` : `${Acc}${First}`>
    : Acc;

export type QtCamelToSnake<T extends object> = {
  [K in keyof T as K extends string ? QtToSnake<K> : K extends number ? K : never]: T[K] extends object
    ? T[K] extends Array<infer U>
      ? U extends object
        ? QtCamelToSnake<U>[]
        : T[K]
      : QtCamelToSnake<T[K]>
    : T[K];
};

export const camelToSnake = <T extends object>(object: T): QtCamelToSnake<T> => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const convert = (value: any): any => {
    if (Array.isArray(value)) {
      return value.map(convert);
    }
    if (value !== null && typeof value === 'object') {
      const out: Record<string, unknown> = {};
      for (const [k, v] of Object.entries(value)) {
        out[snakeCase(k)] = convert(v);
      }
      return out;
    }
    return value;
  };

  return convert(object);
};

export const snakeToCamel = <T extends object>(obj: QtCamelToSnake<T>): T => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const convert = (value: any): any => {
    if (Array.isArray(value)) {
      return value.map(convert);
    }
    if (value !== null && typeof value === 'object') {
      const out: Record<string, unknown> = {};
      for (const [k, v] of Object.entries(value)) {
        out[camelCase(k)] = convert(v);
      }
      return out;
    }
    return value;
  };

  return convert(obj);
};
