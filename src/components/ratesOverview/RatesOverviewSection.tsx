import MainDashboard from "@/entities/mainDashboard/MainDashboard";
import { type Rates, type PropertyRoom } from "@/server/objects/objects.types";
import React, { useState } from "react";
import DateSelectorSection from "./DateSelectorSection";
import { ROOM_NAMES } from "../registerProperty/components/register_multi_form/utils/const_data";
import DatesOverview from "./widgets/DatesOverview";

export default function RatesOverviewSection({
  rooms,
  rates,
}: {
  rooms: PropertyRoom[];
  rates: Rates[];
}) {
  const [selectedDate, setSelectedDate] = useState({
    dateFrom: new Date(),
    dateTo: new Date(new Date().setMonth(new Date().getMonth() + 1)),
  });

  return (
    <MainDashboard bodyClassname="w-[85%]">
      <div className="px-6 py-4">
        <div className="bg-white pb-2 shadow">
          <h2 className="px-4 py-4 text-lg font-semibold">
            Обзор тарифов и наличия мест
          </h2>
          <DateSelectorSection
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
          <BookingStateBox />
          {/* ROOMS */}
          {rooms.map((room) => (
            <div key={room.id} className="mx-4 my-4 border border-b-0">
              <h3 className="px-4 py-2 text-sm font-bold text-zinc-700">
                {ROOM_NAMES[+room.roomName - 1]?.label}
              </h3>
              <DatesOverview
                room={room}
                selectedDate={selectedDate}
                isLoading={false}
                roomRates={rates}
              />
            </div>
          ))}
        </div>
      </div>
    </MainDashboard>
  );
}

const bookingStates = [
  {
    name: "Бронирование открыто",
    color: "bg-green-600",
  },
  {
    name: "Бронирование закрыто",
    color: "bg-red-500",
  },
  {
    name: "Распродано",
    color: "bg-orange-500",
  },
  {
    name: "Нет номера/цены",
    color: "bg-yellow-400",
  },
];

const BookingStateBox = () => {
  return (
    <div className="mb-4 flex w-full justify-end gap-4 px-4">
      {bookingStates.map((state) => (
        <div key={state.name} className="flex items-center gap-2">
          <div className={"h-4 w-4 rounded-sm " + state.color}></div>
          <p className="text-sm text-gray-700">{state.name}</p>
        </div>
      ))}
    </div>
  );
};
