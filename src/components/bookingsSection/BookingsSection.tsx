import MainDashboard from "@/entities/mainDashboard/MainDashboard";
import React from "react";

export default function BookingsSection() {
  return (
    <MainDashboard>
      <div className="px-6 py-4">
        <h2 className="mb-4 text-xl font-semibold">Бронирования</h2>
        {/* FILTERS BOX */}
        <div className="mb-4 flex items-center gap-4"></div>
        {/* BOOKINGS */}
        <div className="bg-white px-4 py-4 shadow">
          <p className="text-lg font-semibold">
            На выбранной вами дате нет броней
          </p>
        </div>
      </div>
    </MainDashboard>
  );
}
