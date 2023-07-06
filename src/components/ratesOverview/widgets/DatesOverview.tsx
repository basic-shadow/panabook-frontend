import { type Rates } from "@/server/objects/objects.types";
import React, { useCallback, useMemo, useState } from "react";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import BookingStatusBar from "./BookingStatusBar";

const diffDays = (dateFrom: Date, dateTo: Date) =>
  (dateTo.getTime() - dateFrom.getTime()) / (1000 * 3600 * 24);

export type BookingDayStatus = {
  date: Date;
  prevDate: Date;
  status: string;
};

export default function DatesOverview({
  selectedDate,
  roomRates,
  roomId,
  isLoading,
}: {
  selectedDate: { dateFrom: Date; dateTo: Date };
  roomRates: Rates[];
  roomId: number;
  isLoading: boolean;
}) {
  // RATES BOOKINGS
  const rates = useMemo(
    () =>
      roomRates.filter((val) => val.rooms.some((room) => room.id === roomId)),
    [roomRates, roomId]
  );
  const [ratesBookingStatus, setRatesBookingStatus] = useState<
    {
      rateId: number;
      bookingDays: BookingDayStatus[];
    }[]
  >(() =>
    rates.map((rate) => ({
      rateId: rate.id,
      bookingDays: Array.from({
        length: diffDays(selectedDate.dateFrom, selectedDate.dateTo),
      }).map((_, i) => ({
        date: new Date(selectedDate.dateFrom.getTime() + 1000 * 3600 * 24 * i),
        prevDate: new Date(
          selectedDate.dateFrom.getTime() + 1000 * 3600 * 24 * (i - 1)
        ),
        status: "open",
      })),
    }))
  );
  const [toggledRates, setToggledRates] = useState<boolean[]>(
    rates.map((_) => false)
  );
  // ROOM BOOKINGS
  const [bookingDays, setBookingDays] = useState(() =>
    Array.from({
      length: diffDays(selectedDate.dateFrom, selectedDate.dateTo),
    }).map((_, i) => ({
      date: new Date(selectedDate.dateFrom.getTime() + 1000 * 3600 * 24 * i),
      prevDate: new Date(
        selectedDate.dateFrom.getTime() + 1000 * 3600 * 24 * (i - 1)
      ),
      status: "open",
      activeRooms: 1,
      activeBookings: 1,
    }))
  );

  const onChangeStatus = useCallback(
    (i: number, bookingStatus: BookingDayStatus[], rateIndex?: number) => {
      return () => {
        const newBookingDays = [...bookingStatus];
        if (newBookingDays[i] === undefined) return;

        newBookingDays[i]!.status =
          newBookingDays[i]!.status === "open" ? "closed" : "open";

        if (rateIndex === undefined) {
          setBookingDays((prev) =>
            prev.map((val, index) =>
              index === i ? { ...val, bookingDays: newBookingDays } : val
            )
          );
        } else {
          setRatesBookingStatus((prev) =>
            prev.map((val, index) =>
              index === rateIndex
                ? { ...val, bookingDays: newBookingDays }
                : val
            )
          );
        }
      };
    },
    []
  );

  const onChangeActiveRooms = (i: number) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const newBookingDays = [...bookingDays];
      if (newBookingDays[i] === undefined) return;

      newBookingDays[i]!.activeRooms = parseInt(e.target.value);
      setBookingDays(newBookingDays);
    };
  };

  return (
    <div className="flex">
      {/* LEFT BAR */}
      <div className="flex w-44 flex-col border-r text-sm">
        {/* DATES */}
        <div className="h-14 border-b px-4 py-2"></div>
        {/* STATUS */}
        <div className="h-10 whitespace-nowrap border-b px-4 py-2">
          Статус номера
        </div>
        {/* ACTIVE ROOMS */}
        <div className="h-14 border-b px-4 py-2">Номера на продажу</div>
        {/* ACTIVE BOOKINGS */}
        <div className="h-14 border-b px-4 py-2">Активные бронирования</div>
        {/* RATES */}
        {rates.map((val, i) => (
          <React.Fragment key={"rate" + i}>
            <div
              className="flex h-10 cursor-pointer items-center truncate border-b px-4 py-2 text-blue-500 hover:bg-slate-100"
              onClick={() =>
                setToggledRates((prev) =>
                  prev.map((_, index) =>
                    index === i ? !prev[index]! : prev[index]!
                  )
                )
              }
            >
              {toggledRates[i] ? (
                <MdOutlineKeyboardArrowUp size={22} />
              ) : (
                <MdOutlineKeyboardArrowDown size={22} />
              )}
              {val.name}
            </div>

            {/* RATE TOGGLED DATA */}
            {toggledRates[i] && (
              <div className="h-14 border-b px-4 py-2">Цена</div>
            )}
          </React.Fragment>
        ))}
      </div>
      {/* RIGHT BAR */}
      <div className="flex w-full overflow-x-scroll">
        {bookingDays.map((val, i) => (
          <div key={"selected-date" + i} className="w-28 text-sm">
            {/* DATES */}
            <div className="flex h-14 flex-col justify-end border-b px-4 py-2">
              {i === 0 || val.date.getMonth() !== val.prevDate.getMonth() ? (
                <div className="text-xs text-gray-600">
                  {val.date.toLocaleString("ru", { month: "short" })}
                </div>
              ) : null}
              <div className="flex">
                <span className="capitalize">
                  {val.date.toLocaleString("ru", { weekday: "short" })}
                </span>
                <span className="ml-1 font-medium">{val.date.getDate()}</span>
              </div>
            </div>
            {/* BOOKING STATUS */}
            <BookingStatusBar
              onChangeStatus={onChangeStatus(i, bookingDays)}
              bookingDays={bookingDays}
              isLoading={isLoading}
              i={i}
            />
            {/* ACTIVE ROOMS */}
            <div className="grid h-14 place-items-center border-b border-r px-4 py-2">
              <input
                type="number"
                className="w-full rounded border py-1 text-center"
                value={val.activeRooms}
                onChange={onChangeActiveRooms(i)}
              />
            </div>
            {/* ACTIVE BOOKINGS */}
            <div className="grid h-14 place-items-center border-b border-r px-4 py-2">
              <p className="w-full py-1 text-center italic">
                {val.activeBookings}
              </p>
            </div>
            {/* RATES BOOKING STATUS */}
            {rates.map((rate, rateIndex) => (
              <div key={"rate-status-" + rateIndex}>
                {/* RATING BOOKING STATUS */}
                <BookingStatusBar
                  onChangeStatus={onChangeStatus(
                    i,
                    ratesBookingStatus[rateIndex]?.bookingDays || [],
                    rateIndex
                  )}
                  bookingDays={ratesBookingStatus[rateIndex]?.bookingDays || []}
                  isLoading={isLoading}
                  i={i}
                />

                {/* RATE TOGGLED DATA */}
                {toggledRates[rateIndex] && (
                  <div className="grid h-14 place-items-center border-b border-r px-4 py-2">
                    <input
                      type="number"
                      className="w-full rounded border py-1 text-center"
                      value={val.activeRooms}
                      onChange={onChangeActiveRooms(i)}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
