import HomeHeader from "@/components/navbar/HomeHeader";
import { routeEndpoints } from "@/shared/routeEndpoint";
import Link from "next/link";
import React, { useState } from "react";
import { AiFillSetting, AiOutlineMenu } from "react-icons/ai";
import { FaBuilding, FaHome } from "react-icons/fa";
import {
  MdDesignServices,
  MdOutlineKeyboardDoubleArrowDown,
  MdOutlineKeyboardDoubleArrowUp,
} from "react-icons/md";
import { usePathname } from "next/navigation";
import { MdEdit } from "react-icons/md";
import { BsFileEarmarkRuledFill } from "react-icons/bs";

const editPageLinks = [
  {
    link: "/edit/description",
    name: "Общие сведения",
    icon: <MdEdit />,
  },
  {
    link: "/edit/services",
    name: "Услуги отеля",
    icon: <MdDesignServices />,
  },

  {
    link: "/edit/policies",
    name: "Правила",
    icon: <BsFileEarmarkRuledFill />,
  },
];

export default function MainDashboard({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [openPropertyEdit, setOpenPropertyEdit] = useState<boolean>(
    !!pathname?.includes("/edit")
  );

  const linkClassName = (path: string) => {
    if (pathname === path) {
      return "bg-slate-800 text-white";
    }
  };

  return (
    <div className="flex">
      <div className="flex min-h-screen w-1/5 flex-col bg-slate-700 text-white">
        <div className="flex items-center gap-2 border-b border-gray-500 px-8 py-6">
          <AiOutlineMenu size={20} />
          <p>Menu</p>
        </div>
        <div className="mt-8">
          <Link
            className={
              "mb-3 flex cursor-pointer items-center gap-4 px-8 py-2 " +
              linkClassName("/")
            }
            href={routeEndpoints.home}
          >
            <FaHome />
            <p>Главная</p>
          </Link>
          <div>
            <div
              className={
                "flex cursor-pointer items-center gap-1 px-8 " +
                (!openPropertyEdit ? "mb-3" : "")
              }
              onClick={() => setOpenPropertyEdit((prev) => !prev)}
            >
              <AiFillSetting />
              <p className="pl-2">Настройки отеля</p>
              <div className="translate-y-0.5">
                {openPropertyEdit ? (
                  <MdOutlineKeyboardDoubleArrowUp />
                ) : (
                  <MdOutlineKeyboardDoubleArrowDown />
                )}
              </div>
            </div>
            <div
              className={`${
                openPropertyEdit ? "h-42 pt-4 transition-all" : "h-0 opacity-0"
              }`}
            >
              {editPageLinks.map((link) => (
                <Link
                  href={link.link}
                  key={link.name}
                  className={
                    "flex items-center gap-4 px-14 py-2 " +
                    linkClassName(link.link)
                  }
                >
                  {link.icon}
                  <p>{link.name}</p>
                </Link>
              ))}
            </div>
          </div>
          <Link
            className={
              "flex cursor-pointer items-center gap-4 px-8 py-2 " +
              linkClassName("/properties")
            }
            href={"/properties"}
          >
            <FaBuilding />
            <p>Список объектов</p>
          </Link>
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
