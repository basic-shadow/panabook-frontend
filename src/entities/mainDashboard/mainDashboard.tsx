import HomeHeader from "@/components/navbar/HomeHeader";
import React from "react";

export default function MainDashboard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <div className="flex min-h-screen w-1/5 flex-col bg-slate-700 text-white">
        <p className="flex items-center gap-2 border-b border-white px-8 py-6 text-xl">
          Menu
        </p>
        <div className="mt-8 px-8">
          <p className="cursor-pointer text-base font-semibold">
            Список объектов
          </p>
        </div>
      </div>
      <div className="w-full">
        {/* HEADER */}
        <HomeHeader />
        {/* BODY */}
        {children}
      </div>
    </div>
  );
}
