import React, { useState } from "react";

export default function Tooltip({
  text,
  position = "top",
  className,
  children,
}: {
  text: string;
  position?: "top" | "bottom";
  className: string;
  children: React.ReactNode;
}) {
  const [show, setShow] = useState(false);

  return (
    <div
      className={"relative " + className}
      onMouseOver={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      <div
        className={
          "absolute left-0 rounded bg-gray-800 p-1 text-xs text-white " +
          (show ? "block " : "hidden ") +
          (position === "bottom"
            ? "bottom-[-20px]"
            : position === "top"
            ? "top-[-10px]"
            : "top-[-10px]")
        }
      >
        {text}
      </div>
    </div>
  );
}
