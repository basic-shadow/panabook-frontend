import { pathToUrl } from "@/shared/utils/pathComplete";
import { API } from "../api/axios.instance";
import { objectsEndpoints } from "../apiEndpoints";
import {
  type PropertyRoom,
  type ObjectsInfo,
  type Rates,
  type PriceDto,
} from "./objects.types";
import { type RateDto } from "@/components/rates/types/editRate.types";

export async function getUserObjectsApi(options: {
  signal?: AbortSignal;
}): Promise<ObjectsInfo[]> {
  try {
    const { data } = await API.get<ObjectsInfo[]>(objectsEndpoints.getObjects, {
      signal: options?.signal,
    });

    return data;
  } catch (error: any) {
    throw error;
  }
}

export async function getUserSingleObjectApi(options: {
  signal?: AbortSignal;
  id?: number | null;
}): Promise<ObjectsInfo> {
  try {
    const { data } = await API.get<ObjectsInfo>(
      pathToUrl(
        objectsEndpoints.getSingleObject,
        options.id ? { id: options.id } : null,
        objectsEndpoints.getFirstObject
      ),
      {
        signal: options?.signal,
      }
    );

    return data;
  } catch (error: any) {
    throw error;
  }
}

export async function putUserObjectApi(
  object: Partial<ObjectsInfo>
): Promise<void> {
  try {
    const { data } = await API.put<void>(
      pathToUrl(objectsEndpoints.editProperty, { id: object.id }),
      object
    );

    return data;
  } catch (error: any) {
    throw error;
  }
}

export async function putObjectRoomApi(
  object: Partial<PropertyRoom>
): Promise<void> {
  try {
    const { data } = await API.put<void>(
      pathToUrl(objectsEndpoints.editRoom, { id: object.id }),
      object
    );

    return data;
  } catch (error: any) {
    throw error;
  }
}

export async function getPropertyRatesApi(options: {
  signal?: AbortSignal;
  id: number;
}): Promise<Rates[]> {
  try {
    const { data } = await API.get<Rates[]>(
      pathToUrl(objectsEndpoints.getRates, { id: options.id }),
      {
        signal: options?.signal,
      }
    );

    return data;
  } catch (error: any) {
    throw error;
  }
}

export async function putPropertyRatesApi(rate: RateDto): Promise<void> {
  try {
    await API.post<void>(
      pathToUrl(objectsEndpoints.getRates, { id: rate.objectId }),
      { meals: rate.meals, name: rate.name, roomIds: rate.roomIds }
    );
  } catch (error: any) {
    throw error;
  }
}

export async function putPropertyPricesApi(price: PriceDto): Promise<void> {
  try {
    await API.post<void>(objectsEndpoints.createPrice, price);
  } catch (error) {
    throw error;
  }
}
