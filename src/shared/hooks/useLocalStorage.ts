import { useEffect, useRef, useState } from "react";

export function useLocalStorageHook<T>(key: string, initialValue: T) {
  const isMounted = useRef(false);
  const [value, setValue] = useState<T | null>(null);

  useEffect(() => {
    try {
      const item = localStorage.getItem(key);
      if (item) {
        setValue(JSON.parse(item));
      }
    } catch (e) {
      setValue(initialValue);
    }
    return () => {
      isMounted.current = false;
    };
  }, [key]);

  useEffect(() => {
    if (isMounted.current) {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      isMounted.current = true;
    }
  }, [key, value]);

  return [value, setValue, isMounted.current] as [T, typeof setValue, boolean];
}
