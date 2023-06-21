import MainDashboard from "@/entities/mainDashboard/MainDashboard";
import { type PropertyRoom } from "@/server/objects/objects.types";
import React from "react";
import { HiPhotograph } from "react-icons/hi";
import { ROOM_NAMES } from "../registerProperty/components/register_multi_form/utils/const_data";
import { BsImageFill } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { routeEndpoints } from "@/shared/routeEndpoint";

export default function RoomPhotosTable({ rooms }: { rooms: PropertyRoom[] }) {
  // ROUTER
  const router = useRouter();

  return (
    <MainDashboard>
      <div className="px-6 py-4">
        <div className="bg-white shadow">
          <div className="mb-4 flex items-center gap-3 px-4 pt-4">
            <HiPhotograph
              className="xs:h-[32px] xs:w-[32px] lg:h-[42px] lg:w-[42px]"
              color="rgb(37,99,235)"
            />
            <h2 className="font-semibold xs:text-base lg:text-xl">
              Выберите номер для управления фотографиями
            </h2>
          </div>
          {/* ROOMS LIST */}
          <div className="px-4 py-4">
            <table className="w-full border">
              <thead className="w-full">
                <tr className="bg-blue-100">
                  <th className="px-4 py-4 text-left">Название</th>
                </tr>
              </thead>
              <tbody>
                {rooms.map((room, i) => {
                  return (
                    <tr className="hover:bg-blue-50" key={room.id}>
                      <td
                        className="flex cursor-pointer items-center gap-2 px-4 py-4 text-left underline hover:bg-gray-100"
                        onClick={() => {
                          router.push(
                            routeEndpoints.singleRoomPhotos + (i + 1)
                          );
                        }}
                      >
                        {ROOM_NAMES[+room.roomName - 1]!.label}
                        <span>
                          <BsImageFill color="rgb(14,165,233)" />
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </MainDashboard>
  );
}
