import { format } from "date-fns";
import { ru } from "date-fns/locale";
import React, { useCallback, useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";

export default function DateSelectorSection({
  selectedDate,
  setSelectedDate,
}: {
  selectedDate: {
    dateFrom: Date;
    dateTo: Date;
  };
  setSelectedDate: React.Dispatch<
    React.SetStateAction<{
      dateFrom: Date;
      dateTo: Date;
    }>
  >;
}) {
  const [openDate, setOpenDate] = useState({ dateFrom: false, dateTo: false });
  const onOpenDate =
    (date: "dateFrom" | "dateTo") =>
    (e: React.MouseEvent<HTMLInputElement>) => {
      e.stopPropagation();
      setOpenDate((prev) => ({ ...prev, [date]: true }));
    };

  const closeDates = useCallback(
    () => setOpenDate({ dateFrom: false, dateTo: false }),
    []
  );

  useEffect(() => {
    if (!openDate.dateFrom && !openDate.dateTo) return;

    window.addEventListener("click", closeDates);

    return () => {
      window.removeEventListener("click", closeDates);
    };
  }, [openDate, closeDates]);

  return (
    <div className="mb-4 flex w-full items-center justify-between gap-2 px-4 py-4">
      <button className="flex items-center text-sky-600 hover:underline">
        <FaAngleLeft size={20} />
        Предыдущая неделя
      </button>
      <div className="flex gap-4">
        <div className="relative">
          {/* DATE FROM */}
          <div className="flex w-fit cursor-pointer items-center gap-2 rounded border border-gray-300 px-4 py-2">
            <input
              readOnly
              className="w-fit cursor-pointer outline-none"
              value={format(selectedDate.dateFrom, "dd.MM.yyyy")}
              onClick={onOpenDate("dateFrom")}
            />
            <MdDateRange size={18} />
          </div>
          {openDate.dateFrom && (
            <div
              className="absolute top-full border bg-white"
              onClick={(e) => e.stopPropagation()}
            >
              <DayPicker
                locale={ru}
                hidden={false}
                id="dateFrom"
                mode="single"
                toDate={selectedDate.dateTo}
                classNames={{
                  month: "capitalize",
                }}
                selected={selectedDate.dateFrom}
                onSelect={(date?: Date) => {
                  if (!date) return;
                  setSelectedDate((prev) => ({
                    ...prev,
                    dateFrom: date,
                  }));
                  closeDates();
                }}
              />
            </div>
          )}
        </div>

        {/* DATE TO */}
        <div className="relative">
          <div className="flex w-fit cursor-pointer items-center gap-2 rounded border border-gray-300 px-4 py-2">
            <input
              readOnly
              className="w-fit cursor-pointer outline-none"
              value={format(selectedDate.dateTo, "dd.MM.yyyy")}
              onClick={onOpenDate("dateTo")}
            />
            <MdDateRange size={18} />{" "}
          </div>
          {openDate.dateTo && (
            <div
              className="absolute top-full border bg-white"
              onClick={(e) => e.stopPropagation()}
            >
              <DayPicker
                locale={ru}
                hidden={false}
                id="dateTo"
                mode="single"
                fromDate={selectedDate.dateFrom}
                classNames={{
                  month: "capitalize",
                }}
                selected={selectedDate.dateTo}
                onSelect={(date?: Date) => {
                  if (!date) return;
                  setSelectedDate((prev) => ({
                    ...prev,
                    dateTo: date,
                  }));
                  closeDates();
                }}
              />
            </div>
          )}
        </div>

        {/* SEARCH RATES */}
        <button className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
          Установить
        </button>
      </div>
      <button className="flex items-center text-sky-600 hover:underline">
        Следующая неделя
        <FaAngleRight size={20} />
      </button>
    </div>
  );
}
