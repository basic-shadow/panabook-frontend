import { type Rates } from "@/server/objects/objects.types";
import SpinnerLoader from "@/shared/UI/SpinnerLoader/SpinnerLoader";
import React, { useMemo, useState } from "react";

const diffDays = (dateFrom: Date, dateTo: Date) =>
  (dateTo.getTime() - dateFrom.getTime()) / (1000 * 3600 * 24);

type BookingDayStatus = {
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
  >(
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

  const statusPadding = (bookingDays: BookingDayStatus[], i: number) => {
    let cl = "";
    if (
      bookingDays[i]?.status !== bookingDays[i + 1]?.status &&
      bookingDays[i]?.status !== bookingDays[i - 1]?.status
    ) {
      cl = "px-2 border-l";
    } else if (bookingDays[i]?.status !== bookingDays[i + 1]?.status) {
      cl = "pr-2";
    } else if (bookingDays[i]?.status !== bookingDays[i - 1]?.status) {
      cl = "pl-2";
    } else if (i === 0) {
      cl = "pl-2";
    } else if (i === bookingDays.length - 1) {
      cl = "pr-2";
    }

    return cl;
  };

  const statusBorders = (bookingDays: BookingDayStatus[], i: number) => {
    let cl = "";
    if (
      bookingDays[i]?.status !== bookingDays[i + 1]?.status &&
      bookingDays[i]?.status !== bookingDays[i - 1]?.status
    ) {
      cl = "rounded-full";
    } else if (bookingDays[i]?.status !== bookingDays[i + 1]?.status) {
      cl = "rounded-r-full";
    } else if (bookingDays[i]?.status !== bookingDays[i - 1]?.status) {
      cl = "rounded-l-full";
    } else if (i === 0) {
      cl = "rounded-l-full";
    } else if (i === bookingDays.length - 1) {
      cl = "rounded-r-full";
    }

    if (bookingDays[i]!.status === "open") {
      cl += " bg-green-600 hover:bg-green-700";
    } else if (bookingDays[i]!.status === "closed") {
      cl += " bg-red-600 hover:bg-red-700";
    }

    return cl;
  };

  const onChangeRoomStatus = (i: number) => {
    return () => {
      const newBookingDays = [...bookingDays];
      if (newBookingDays[i] === undefined) return;

      newBookingDays[i]!.status =
        newBookingDays[i]!.status === "open" ? "closed" : "open";
      setBookingDays(newBookingDays);
    };
  };

  const onChangeRateStatus = (rateIndex: number, i: number) => {
    return () => {
      const newRatesBookingStatus = ratesBookingStatus[rateIndex]?.bookingDays;
      if (
        newRatesBookingStatus === undefined ||
        newRatesBookingStatus[i] === undefined
      ) {
        return;
      }

      newRatesBookingStatus[i]!.status =
        newRatesBookingStatus[i]!.status === "open" ? "closed" : "open";

      setRatesBookingStatus((prev) =>
        prev.map((val, index) =>
          index === rateIndex
            ? { ...val, bookingDays: newRatesBookingStatus }
            : val
        )
      );
    };
  };

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
          <div key={"rate" + i} className="h-10 truncate border-b px-4 py-2">
            {val.name}
          </div>
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
            <div
              className={"h-10 border-b py-2 " + statusPadding(bookingDays, i)}
            >
              <div
                className={
                  "grid h-full cursor-pointer place-items-center " +
                  statusBorders(bookingDays, i)
                }
                onClick={onChangeRoomStatus(i)}
              >
                {isLoading && <SpinnerLoader />}
              </div>
            </div>
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
                <div
                  className={
                    "h-10 border-b py-2 " +
                    statusPadding(
                      ratesBookingStatus[rateIndex]?.bookingDays || [],
                      i
                    )
                  }
                >
                  <div
                    className={
                      "grid h-full cursor-pointer place-items-center " +
                      statusBorders(
                        ratesBookingStatus[rateIndex]?.bookingDays || [],
                        i
                      )
                    }
                    onClick={onChangeRateStatus(rateIndex, i)}
                  >
                    {isLoading && <SpinnerLoader />}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
