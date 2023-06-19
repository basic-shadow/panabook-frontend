import { compile } from "path-to-regexp";

export const pathToUrl = (
  path: string,
  params: object | null,
  secondaryPath?: string
) => (params === null ? secondaryPath ?? "" : compile(path)(params));
