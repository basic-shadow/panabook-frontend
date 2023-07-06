import React from "react";
import { type BookingDayStatus } from "./DatesOverview";
import SpinnerLoader from "@/shared/UI/SpinnerLoader/SpinnerLoader";

export default function BookingStatusBar({
  onChangeStatus,
  bookingDays,
  isLoading,
  i,
}: {
  onChangeStatus: () => void;
  bookingDays: BookingDayStatus[];
  isLoading: boolean;
  i: number;
}) {
  return (
    <div className={"h-10 border-b py-2 " + statusPadding(bookingDays, i)}>
      <div
        className={
          "grid h-full cursor-pointer place-items-center " +
          statusBorders(bookingDays, i)
        }
        onClick={onChangeStatus}
      >
        {isLoading && <SpinnerLoader />}
      </div>
    </div>
  );
}

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
