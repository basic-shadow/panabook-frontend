import HomeHeader from "@/components/navbar/HomeHeader";
import { routeEndpoints } from "@/shared/routeEndpoint";
import Link from "next/link";
import React, { useState } from "react";
import { AiFillSetting, AiFillTags, AiOutlineMenu } from "react-icons/ai";
import { FaBuilding, FaHome } from "react-icons/fa";
import {
  MdDesignServices,
  MdOutlineKeyboardDoubleArrowDown,
  MdOutlineKeyboardDoubleArrowUp,
  MdOutlinePhotoCamera,
  MdPhotoLibrary,
} from "react-icons/md";
import { usePathname } from "next/navigation";
import { MdEdit } from "react-icons/md";
import { BsFileEarmarkRuledFill, BsFillBuildingFill } from "react-icons/bs";

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

const photosPageLinks = [
  {
    link: routeEndpoints.propertyPhotos,
    name: "Фото объекта",
    icon: <BsFillBuildingFill />,
  },
  {
    link: routeEndpoints.roomPhotos,
    name: "Фото номеров",
    icon: <MdPhotoLibrary />,
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
  const [openPropertyPhotos, setOpenPropertyPhotos] = useState<boolean>(
    !!pathname?.includes("photos")
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
          {/* HOME */}
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
          {/* EDIT PROPERTY */}
          <div>
            <div
              className={
                "flex cursor-pointer items-center gap-2 px-8 " +
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
                openPropertyEdit
                  ? "h-42 pt-4 transition-all"
                  : "pointer-events-none h-0 opacity-0"
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
          {/* PROPERTY LIST */}
          <Link
            className={
              "flex cursor-pointer items-center gap-4 px-8 py-2 " +
              linkClassName(routeEndpoints.properties)
            }
            href={routeEndpoints.properties}
          >
            <FaBuilding />
            <p>Список объектов</p>
          </Link>
          {/* ROOM LIST */}
          <Link
            className={
              "flex cursor-pointer items-center gap-4 px-8 py-2 " +
              linkClassName(routeEndpoints.rooms)
            }
            href={routeEndpoints.rooms}
          >
            <AiFillTags />
            <p>Номера</p>
          </Link>
          {/* PHOTOS */}
          <div>
            <div
              className={
                "mt-1 flex cursor-pointer items-center gap-2 px-8 " +
                (!openPropertyPhotos ? "mb-3" : "")
              }
              onClick={() => setOpenPropertyPhotos((prev) => !prev)}
            >
              <MdOutlinePhotoCamera />
              <p className="pl-2">Фотографии</p>
              <div className="translate-y-0.5">
                {openPropertyPhotos ? (
                  <MdOutlineKeyboardDoubleArrowUp />
                ) : (
                  <MdOutlineKeyboardDoubleArrowDown />
                )}
              </div>
            </div>
            <div
              className={`${
                openPropertyPhotos
                  ? "h-42 pt-4 transition-all"
                  : "pointer-events-none h-0 opacity-0"
              }`}
            >
              {photosPageLinks.map((link) => (
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
