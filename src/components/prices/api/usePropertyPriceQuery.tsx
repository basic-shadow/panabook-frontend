import { type PriceDto } from "@/server/objects/objects.types";
import { putPropertyPricesApi } from "@/server/objects/userObjectsApi";
import { type TError } from "@/types/shared.types";
import { useMutation } from "react-query";

export function usePropertyPriceObject() {
  const { mutateAsync, isLoading, isSuccess } = useMutation<
    void,
    TError,
    PriceDto
  >(putPropertyPricesApi);

  return { isLoading, mutateAsync, isSuccess };
}
