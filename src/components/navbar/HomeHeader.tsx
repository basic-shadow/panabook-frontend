import { routeEndpoints } from "@/shared/routeEndpoint";
import Link from "next/link";
import { FaBookReader } from "react-icons/fa";
import { useGetUser } from "../admin/api/usersQuery";
import { BsCaretDownFill } from "react-icons/bs";
import SpinnerLoader from "@/shared/UI/SpinnerLoader/SpinnerLoader";
import { useState } from "react";
import { useGetUserSelectedObject } from "../home/api/objectsQuery";
import { localStorageKeys } from "@/shared/localStorageKeys";

export default function HomeHeader() {
  const [openProfile, setOpenProfile] = useState(false);
  const { isLoading: userLoading, user } = useGetUser();
  const [selectedObjectId, setSelectedObjectId] = useState(() => {
    if (typeof localStorage === "undefined") return null;
    const objectId = localStorage.getItem(localStorageKeys.selectedObjectId);
    if (objectId === null) {
      return -1;
    }
    return +objectId;
  });
  const { object, isLoading: objectsLoading } = useGetUserSelectedObject({
    id: selectedObjectId,
    enabled: true,
  });

  return (
    <header className="bg-white text-black shadow-md">
      <nav className="flex items-center justify-between px-8 py-6">
        <Link
          href={routeEndpoints.home}
          className="flex items-center gap-2 text-xl"
        >
          <span>
            <FaBookReader />
          </span>
          Panabook
        </Link>

        {userLoading && !user ? (
          <SpinnerLoader color="#000" />
        ) : (
          <button
            id="dropdownDefaultButton"
            data-dropdown-toggle="dropdown"
            onClick={() => setOpenProfile((prev) => !prev)}
            className="relative flex w-44 cursor-pointer items-center gap-2 rounded p-2"
          >
            <div className="h-8 w-8 rounded-full border border-emerald-950 bg-gray-400"></div>
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
                <li className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                  Выйти
                </li>
              </ul>
            </div>
          </button>
        )}
      </nav>
    </header>
  );
}
