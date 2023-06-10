import React from "react";

export default function StatisticBox({
  icon,
  value,
  id,
  label,
}: {
  icon: React.ReactNode;
  value: string | number;
  id: string;
  label: string;
}) {
  return (
    <div className="flex gap-4 bg-white xs:w-full xs:px-4 xs:py-2 lg:w-fit lg:px-6 lg:py-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
        {icon}
      </div>
      <div>
        <p className="text-lg font-semibold" aria-labelledby={id}>
          {value}
        </p>
        <label id={id} className="text-sm font-light text-gray-500">
          {label}
        </label>
      </div>
    </div>
  );
}
