import { useRouter } from "next/navigation";

export default function useUrlParams() {
  const router = useRouter();

  const onChangeSearchParams = (value: string) => {
    if (typeof window === "undefined") return;
    const { origin, pathname } = window.location;
    router.replace(origin + pathname + value);
  };

  return {
    onChangeSearchParams,
    currentLocation:
      typeof window !== "undefined" ? window.location.search : "",
  };
}
