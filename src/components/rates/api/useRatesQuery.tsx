import { queryKeys } from "@/server/queryKeys";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { type TError } from "@/types/shared.types";
import {
  getPropertyRatesApi,
  putPropertyRatesApi,
} from "@/server/objects/userObjectsApi";
import { type Rates } from "@/server/objects/objects.types";
import { type RateDto } from "../types/editRate.types";

export function useGetAllRatesQuery(id?: number) {
  const { data, isLoading } = useQuery<Rates[], Error>(
    queryKeys.getRates,
    ({ signal }) => getPropertyRatesApi({ signal, id: id ?? -1 }),
    { enabled: !!id }
  );

  return { data, isLoading };
}

export function useCreateRate() {
  const queryClient = useQueryClient();

  const { mutateAsync, isLoading, isSuccess } = useMutation<
    void,
    TError,
    RateDto
  >(putPropertyRatesApi, {
    onSuccess: () => queryClient.invalidateQueries(queryKeys.getRates),
  });

  return { isLoading, mutateAsync, isSuccess };
}
