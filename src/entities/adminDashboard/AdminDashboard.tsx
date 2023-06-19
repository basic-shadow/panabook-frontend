import { adminRouteEndpoints } from "@/shared/routeEndpoint";
import Link from "next/link";
import React, { useState } from "react";
import { AiFillTags, AiOutlineMenu } from "react-icons/ai";
import { FaBuilding, FaHome, FaKey, FaMoneyCheck } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";
import AdminHeader from "@/components/navbar/AdminHeader";

export default function AdminDashboard({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState(false);

  const linkClassName = (path: string) => {
    if (pathname === path) {
      return "bg-sky-700 text-white";
    }
  };

  return (
    <div className="relative flex">
      <div
        className={twMerge(
          "flex flex-col text-white transition-all xs:absolute xs:z-50 xs:overflow-y-auto lg:relative lg:min-h-screen lg:w-1/5 " +
            (openMenu
              ? "w-full xs:min-h-screen"
              : "w-[50px] xs:h-[64px] xs:overflow-hidden ")
        )}
        style={{ backgroundColor: "rgb(4, 38, 60)" }}
      >
        <div
          className={
            "flex items-center justify-between xs:px-4 xs:py-6 lg:px-8 lg:pb-4 lg:pt-10"
          }
        >
          <div
            className="flex cursor-pointer items-center gap-2"
            onClick={() => setOpenMenu((prev) => !prev)}
          >
            <AiOutlineMenu size={20} />
            <p className={!openMenu ? "inline-block xs:hidden" : ""}>Menu</p>
          </div>
          <MdClose
            size={20}
            className={"cursor-pointer " + (!openMenu ? "hidden" : "block")}
            onClick={() => setOpenMenu((prev) => !prev)}
          />
        </div>
        <div className="mt-8">
          {/* HOME */}
          <Link
            className={
              "flex cursor-pointer items-center gap-4 py-2 xs:px-4 lg:px-8 " +
              linkClassName(adminRouteEndpoints.home)
            }
            href={adminRouteEndpoints.home}
          >
            <FaHome />
            <p>Список отелей</p>
          </Link>
        </div>
      </div>
      <div className="w-full">
        {/* HEADER */}
        <AdminHeader />
        {/* BODY */}
        {children}
      </div>
    </div>
  );
}
