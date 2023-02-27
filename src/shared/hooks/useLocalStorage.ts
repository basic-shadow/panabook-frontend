import { useEffect, useState } from "react";

export function useLocalStorageHook<T>(
  key: string,
  initialValue: T | (() => T)
) {
  const [value, setValue] = useState<T | null>(null);

  useEffect(() => {
    if (value === null) return;
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  useEffect(() => {
    setValue(() => {
      const jsonValue = localStorage.getItem(key);
      if (jsonValue === null) {
        if (typeof initialValue === "function") {
          return (initialValue as () => T)();
        } else {
          return initialValue;
        }
      } else {
        return JSON.parse(jsonValue);
      }
    });
  }, []);

  return [value, setValue] as [T, typeof setValue];
}
