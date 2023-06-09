import MainDashboard from "@/entities/mainDashboard/MainDashboard1";
import React from "react";

export default function RatesOverviewSection() {
  return (
    <MainDashboard>
      <div className="px-6 py-4">
        <div className="bg-white shadow">
          <h2 className="px-4 py-4 text-lg font-semibold">
            Обзор тарифов и наличия мест
          </h2>
        </div>
      </div>
    </MainDashboard>
  );
}
