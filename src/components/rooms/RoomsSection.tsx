import React from "react";
import MainDashboard from "@/entities/mainDashboard/MainDashboard";
import { type PropertyRoom } from "@/server/objects/objects.types";
import { routeEndpoints } from "@/shared/routeEndpoint";
import { useRouter } from "next/navigation";
import { AiFillTags } from "react-icons/ai";
import { ROOM_TYPES } from "../registerProperty/components/register_multi_form/utils/const_data";
import noImgPlaceholder from "@/assets/images/no_img_placeholder.jpeg";
import Image from "next/image";

export default function RoomsSection({ rooms }: { rooms: PropertyRoom[] }) {
  // ROUTER
  const router = useRouter();
  const onEditRoom = (id: number) => () =>
    router.push(routeEndpoints.editRoom + id);

  return (
    <MainDashboard>
      <div className="px-6 py-4">
        <div className="bg-white shadow">
          <div className="mb-4 flex items-end px-4 pt-4">
            <div className="flex items-center gap-2">
              <AiFillTags size={24} />
              <h3 className="text-xl font-semibold">Номера</h3>
            </div>
            <button
              className="ml-4 rounded bg-blue-600 px-4 py-2 text-sm font-semibold text-white"
              onClick={() => router.push(routeEndpoints.createRoom)}
            >
              Добавить номер
            </button>
          </div>

          <div className="px-4 pb-4">
            {/* CARD */}
            <div className="w-fit rounded border">
              {rooms.map((room, i) => {
                const name = ROOM_TYPES[+room.roomType - 1]!.label;
                return (
                  <div className="px-4 py-4" key={room.id}>
                    <div className="relative mb-4 xs:h-[150px] xs:w-full lg:h-[300px]">
                      <Image
                        className="absolute inset-0 object-cover xs:h-[150px] xs:w-full lg:h-[300px] lg:w-[400px]"
                        src={
                          room.images && room.images.length > 0
                            ? process.env.NEXT_PHOTO_BASE_URL +
                              room.images[0]!.url
                            : noImgPlaceholder
                        }
                        height={300}
                        width={400}
                        alt={name}
                      />
                      {/* BACKDROP  */}
                      <div className="absolute inset-0 bg-black opacity-50"></div>
                      {/* TEXT IN WHITE IN CENTER */}
                      <div className="absolute inset-0 flex items-center justify-center px-4 text-center font-semibold text-white xs:text-base lg:text-2xl">
                        Вы можете загрузить фотографии
                      </div>
                    </div>
                    <h3 className="mb-1 text-sm">
                      {name} (ID {room.id})
                    </h3>
                    <p className="text-sm">
                      Стандартная вместимость:
                      <span className="ml-1 font-bold text-gray-600">
                        Взрослых: {room.maxGuests}
                      </span>
                      <span className="mx-1 font-bold text-gray-600">•</span>
                      <span className="font-bold text-gray-600">Детей: 3</span>
                    </p>
                    <div className="mt-4 flex items-center justify-between gap-4">
                      <button
                        className="rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-500"
                        onClick={() =>
                          router.push(routeEndpoints.singleRoomPhotos + (i + 1))
                        }
                      >
                        Загрузить фотографии
                      </button>
                      <button
                        className="rounded border-blue-700 px-4 py-2 text-sm text-blue-700 hover:bg-blue-700 hover:text-white"
                        onClick={onEditRoom(i + 1)}
                      >
                        Редактировать
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </MainDashboard>
  );
}
