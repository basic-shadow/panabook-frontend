import MainDashboard from "@/entities/mainDashboard/MainDashboard";
import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import StatisticBox from "./widgets/StatisticBox";
import { IoMdPerson } from "react-icons/io";
import { BsHouseCheck } from "react-icons/bs";
import BookingTabs from "./widgets/BookingTabs";
import { FiBookOpen } from "react-icons/fi";

const emptyText = "На данный момент у вас нет броней";

const activeBlockClass =
  "flex flex-col gap-4 w-full items-center justify-center font-semibold text-center";

export default function HomeSection() {
  const [bookingTabs, setBookingTabs] = useState(0);
  const onSelectTab = (tab: number) => setBookingTabs(tab);

  return (
    <MainDashboard>
      <div className="px-4 py-6">
        <h3 id="statistics" className="mb-4 text-lg font-semibold">
          Статистика за текущий месяц
        </h3>
        <div className="mb-8 flex flex-wrap gap-4" aria-labelledby="statistics">
          <StatisticBox
            icon={<AiOutlineSearch size={24} />}
            label={"Просмотры в результатах поиска"}
            id={"viewsFromSearch"}
            value={0}
          />
          <StatisticBox
            icon={<IoMdPerson size={24} />}
            label={"Просмотры страницы объекта"}
            id={"viewsTotal"}
            value={0}
          />

          <StatisticBox
            icon={<BsHouseCheck size={24} />}
            label={"Забронировано"}
            id={"booked"}
            value={0}
          />
        </div>

        <h3 id="bookings" className="mb-4 text-lg font-semibold">
          Обзор бронирования
        </h3>
        <div aria-labelledby="bookings">
          <div className="bg-white">
            <BookingTabs
              onSelect={onSelectTab}
              selectedTab={bookingTabs}
              tabsHeaderCount={[0, 0, 0, 0]}
              tabsHeader={["Заезд", "Выезд", "Прибытие", "Отъезд"]}
            />
            <div className="tab-content tab-space flex h-60 px-4 py-4">
              <div
                className={bookingTabs === 0 ? activeBlockClass : "hidden"}
                id="link1"
              >
                {emptyText}
                <FiBookOpen size={96} color="rgb(59,139,246)" />
              </div>
              <div
                className={bookingTabs === 1 ? activeBlockClass : "hidden"}
                id="link2"
              >
                {emptyText}
                <FiBookOpen size={96} color="rgb(59,139,246)" />
              </div>
              <div
                className={bookingTabs === 2 ? activeBlockClass : "hidden"}
                id="link3"
              >
                {emptyText}
                <FiBookOpen size={96} color="rgb(59,139,246)" />
              </div>
              <div
                className={bookingTabs === 3 ? activeBlockClass : "hidden"}
                id="link4"
              >
                {emptyText}
                <FiBookOpen size={96} color="rgb(59,139,246)" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainDashboard>
  );
}
