import MainDashboard from "@/entities/mainDashboard/MainDashboard";
import React from "react";

export default function RoomPhotosSection() {
  return (
    <MainDashboard>
      <div className="px-6 py-4">
        <div className="bg-white shadow">
          <div className="mb-4 flex items-center gap-2 px-4 pt-4">
            <h3 className="text-xl font-semibold">Фотографии номера</h3>
          </div>
          {/* ROOMS LIST */}
          <div className="px-4 py-4">
            <table className="w-full border">
              <thead className="w-full">
                <tr>
                  <th className="px-4 py-2 text-left">Название</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-gray-200">
                  <td className="cursor-pointer px-4 py-2 text-left hover:bg-gray-100">
                    1
                  </td>
                </tr>
                <tr>
                  <td className="cursor-pointer px-4 py-2 text-left hover:bg-gray-100">
                    1
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </MainDashboard>
  );
}
