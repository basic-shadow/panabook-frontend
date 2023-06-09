import { routeEndpoints } from "@/shared/routeEndpoint";
import Link from "next/link";
import { FaBookReader, FaTelegram } from "react-icons/fa";
import { useGetUser } from "../admin/api/usersQuery";
import { BsCaretDownFill } from "react-icons/bs";
import SpinnerLoader from "@/shared/UI/SpinnerLoader/SpinnerLoader";
import { useState } from "react";
import { useGetUserSelectedObject } from "../home/api/objectsQuery";
import { localStorageKeys } from "@/shared/localStorageKeys";
import Tooltip from "@/shared/UI/Tooltip/Tooltip";
import { useLogoutUser } from "./api/useUserQuery";
import { useRouter } from "next/navigation";

export default function HomeHeader() {
  const [openProfile, setOpenProfile] = useState(false);
  const [selectedObjectId, setSelectedObjectId] = useState(() => {
    if (typeof localStorage === "undefined") return null;
    const objectId = localStorage.getItem(localStorageKeys.selectedObjectId);
    if (objectId === null) {
      return -1;
    }
    return +objectId;
  });
  // QUERY
  const { object, isLoading: objectsLoading } = useGetUserSelectedObject({
    id: selectedObjectId,
    enabled: true,
  });
  console.log("object =", object);
  // USER QUERY
  const { isLoading: userLoading, user } = useGetUser();
  // LOGOUT
  const { mutateAsync, isLoading } = useLogoutUser();
  // ROUTER
  const router = useRouter();
  // TELEGRAM
  const openTelegramChat = () => {
    window.open("https://t.me/+77072537787", "_blank");
  };

  return (
    <header className="bg-white text-black shadow-md">
      <nav className="flex items-center justify-between px-8 py-4">
        <Link
          href={routeEndpoints.home}
          className="flex items-center gap-2 text-xl"
        >
          <span>
            <FaBookReader fill="rgb(2,132,199)" />
          </span>
          <span className="tracking-wider text-sky-600">
            Pana
            <span className="tracking-normal text-black">booking</span>
          </span>
        </Link>

        <div className="flex">
          {/* OUR TELEGRAM */}
          <Tooltip
            text="Наш телеграмм чат"
            position="bottom"
            className="mr-2 flex cursor-pointer border-r pr-4"
          >
            <button
              className="flex items-center gap-2"
              onClick={openTelegramChat}
            >
              <FaTelegram size={24} color="#229ED9" />
              <p className="text-xs text-gray-500">+7 707 253 7787</p>
            </button>
          </Tooltip>

          {userLoading && !user ? (
            <SpinnerLoader color="#000" />
          ) : (
            <button
              id="dropdownDefaultButton"
              data-dropdown-toggle="dropdown"
              onClick={() => setOpenProfile((prev) => !prev)}
              className="relative flex w-44 cursor-pointer items-center gap-2 rounded p-2"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white">
                {user?.firstname[0] ?? ""}
              </div>
              <p>{user?.firstname}</p>
              <BsCaretDownFill />
              <div
                id="dropdown"
                className={
                  "absolute left-[-2px] top-full z-10 w-44 divide-y divide-gray-100 rounded-lg bg-white shadow dark:bg-gray-700 " +
                  (openProfile ? "block" : "hidden")
                }
              >
                <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownDefaultButton"
                >
                  <li>
                    <Link
                      href={routeEndpoints.profile}
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Профиль
                    </Link>
                  </li>
                  <li
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={async () => {
                      if (!isLoading) {
                        await mutateAsync();
                        router.refresh();
                      }
                    }}
                  >
                    Выйти
                  </li>
                </ul>
              </div>
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}
