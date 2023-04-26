import React, { type FC } from "react";
import SpinnerLoader from "../SpinnerLoader/SpinnerLoader";

type styleType = "outlined" | "filled";
interface IButton {
  text: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
  type?: "button" | "submit" | "reset";
  prefixIcon?: React.ReactNode;
  styleType?: styleType;
  className?: string;
  disabled?: boolean;

  htmlFor?: string;
}

const AppButton: FC<IButton> = ({
  text,
  onClick,
  prefixIcon,
  type,
  children,
  className = "",
  styleType = "filled",
  disabled = false,
  htmlFor,
}) => {
  return htmlFor ? (
    <label
      className={
        "flex cursor-pointer items-center rounded-md py-2 px-4 text-lg font-semibold " +
        (styleType === "filled"
          ? "bg-indigo-500 text-white hover:bg-indigo-900"
          : "border border-indigo-500 text-indigo-500") +
        className
      }
      htmlFor={htmlFor}
    >
      {text && text}
    </label>
  ) : (
    <button
      className={
        "flex items-center rounded-md py-2 px-4 text-lg font-semibold " +
        (styleType === "filled"
          ? "bg-indigo-500 text-white hover:bg-indigo-900 "
          : "border border-indigo-500 text-indigo-500 ") +
        className
      }
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {prefixIcon && <span className="mr-2">{prefixIcon}</span>}
      {text && text}
      {children && children}
    </button>
  );
};

export default AppButton;
