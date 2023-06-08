import clsx from "clsx";
import React from "react";

export default function FormLabel({
  id,
  label,
  className,
  children,
}: {
  id: string;
  label?: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={clsx("mb-4 flex flex-col gap-2", className)}>
      {label && (
        <label
          htmlFor={id}
          className="w-fit text-sm font-semibold text-gray-700"
        >
          {label}
        </label>
      )}
      <div aria-labelledby={id}>{children}</div>
    </div>
  );
}
