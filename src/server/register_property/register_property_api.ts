import { type IRegisterProperty } from "@/components/registerProperty/types/register_property_types";
import { API } from "../api/axios.instance";
import { propertyEndpoints } from "../apiEndpoints";
import { transformRegisterPropertyModel } from "./normalize_models";

export async function registerProperty(
  formData: IRegisterProperty,
  options?: { signal?: AbortSignal }
): Promise<void> {
  try {
    const body = transformRegisterPropertyModel(formData);

    const { data } = await API.post<void>(
      propertyEndpoints.registerProperty,
      body,
      {
        signal: options?.signal,
      }
    );

    return data;
  } catch (error) {
    throw error;
  }
}
