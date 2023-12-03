import { WEEKDAYS_SHORT } from "@/components/prices/forms/SelectPriceForm";
import Modal from "@/shared/UI/Modal/Modal";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import React, { useCallback, useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";

export type PriceProperty = {
  dateFrom: Date;
  dateTo: Date;
  price: number;
  activeRange: number[];
};

export default function EditPriceModal({
  open,
  onClose,
  rateId,
  title,
}: {
  open: boolean;
  onClose: () => void;
  rateId: number;
  title: string;
}) {
  const [openDate, setOpenDate] = useState({ dateFrom: false, dateTo: false });
  const onOpenDate =
    (date: "dateFrom" | "dateTo") =>
    (e: React.MouseEvent<HTMLInputElement>) => {
      e.stopPropagation();
      setOpenDate((prev) => ({ ...prev, [date]: true }));
    };

  const closeDates = useCallback(() => {
    console.log("closing");
    setOpenDate({ dateFrom: false, dateTo: false });
  }, []);

  useEffect(() => {
    if (!openDate.dateFrom && !openDate.dateTo) return;

    window.addEventListener("click", closeDates);

    return () => {
      window.removeEventListener("click", closeDates);
    };
  }, [openDate, closeDates]);

  const [priceData, setPriceData] = useState<PriceProperty>({
    dateFrom: new Date(),
    dateTo: new Date(),
    price: 0,
    activeRange: Array.from({ length: 7 }).map((_, i) => i),
  });

  return (
    <Modal open={open} onClose={onClose} title={title}>
      {/* FORM */}
      <div>
        <h4 className="mb-4 text-sm font-semibold">Выберите диапазон дат</h4>
        <div className="flex gap-4">
          {/* DATE FROM */}
          <div className="relative flex flex-col">
            <label htmlFor="dateFrom" className="mb-2 text-sm">
              Дата начала
            </label>
            <input
              readOnly
              className="rounded border border-gray-300 px-4 py-2"
              value={format(priceData.dateFrom, "dd.MM.yyyy")}
              onClick={onOpenDate("dateFrom")}
            />
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
                  toDate={priceData.dateTo}
                  classNames={{
                    month: "capitalize",
                  }}
                  selected={priceData.dateFrom}
                  onSelect={(date?: Date) => {
                    if (!date) return;
                    setPriceData({
                      ...priceData,
                      dateFrom: date,
                    });
                    closeDates();
                  }}
                />
              </div>
            )}
          </div>
          {/* DATE TO */}
          <div className="relative flex flex-col">
            <label htmlFor="dateTo" className="mb-2 text-sm">
              Дата окончания
            </label>
            <input
              className="rounded border border-gray-300 px-4 py-2"
              readOnly
              value={format(priceData.dateTo, "dd.MM.yyyy")}
              onClick={onOpenDate("dateTo")}
            />
            {openDate.dateTo && (
              <div
                className="absolute top-full border bg-white"
                onClick={(e) => e.stopPropagation()}
              >
                <DayPicker
                  hidden={false}
                  id="dateTo"
                  locale={ru}
                  fromDate={priceData.dateFrom}
                  mode="single"
                  classNames={{
                    month: "capitalize",
                  }}
                  selected={priceData.dateTo}
                  onSelect={(date?: Date) => {
                    if (!date) return;
                    setPriceData({
                      ...priceData,
                      dateTo: date,
                    });
                    closeDates();
                  }}
                />
              </div>
            )}
          </div>
        </div>
        {/* ACTIVE RANGE */}
        <div className="mb-8 mt-4 flex flex-wrap gap-2">
          {WEEKDAYS_SHORT.map((day, i) => (
            <div className="flex items-center gap-2" key={day}>
              <input
                type="checkbox"
                id={day}
                checked={priceData.activeRange.includes(i)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setPriceData({
                      ...priceData,
                      activeRange: [...priceData.activeRange, i],
                    });
                  } else {
                    setPriceData({
                      ...priceData,
                      activeRange: priceData.activeRange.filter(
                        (item) => item !== i
                      ),
                    });
                  }
                }}
                className="h-4 w-4 rounded border border-gray-300"
              />
              <label className="text-sm" htmlFor={day}>
                {day}
              </label>
            </div>
          ))}
        </div>
        {/* PRICE */}
        <label htmlFor="price" className="mb-2 block text-sm">
          Цена
        </label>
        <input
          id="price"
          name="price"
          type="number"
          value={priceData.price}
          onChange={(e) => {
            setPriceData({
              ...priceData,
              price: Number(e.target.value),
            });
          }}
          className="w-fit rounded border border-gray-300 px-4 py-2"
        />
        {/* FOOTER */}
        <div className="mt-8 flex justify-end border-t pt-4">
          <button
            className="rounded border bg-gray-400 px-4 py-2 text-sm text-white"
            onClick={onClose}
          >
            Отмена
          </button>
          <button className="ml-4 rounded border bg-blue-500 px-4 py-2 text-sm text-white">
            Сохранить
          </button>
        </div>
      </div>
    </Modal>
  );
}
