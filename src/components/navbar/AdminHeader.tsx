import { routeEndpoints } from "@/shared/routeEndpoint";
import Link from "next/link";
import { FaBookReader, FaTelegram } from "react-icons/fa";
import { useGetUser } from "../admin/api/usersQuery";
import { BsCaretDownFill } from "react-icons/bs";
import SpinnerLoader from "@/shared/UI/SpinnerLoader/SpinnerLoader";
import Tooltip from "@/shared/UI/Tooltip/Tooltip";
import { useLogoutUser } from "./api/useUserQuery";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { localStorageKeys } from "@/shared/localStorageKeys";

export default function AdminHeader() {
  const [openProfile, setOpenProfile] = useState(false);
  // USER QUERY
  const { isLoading: userLoading, user } = useGetUser();
  // LOGOUT
  const { mutateAsync, isLoading } = useLogoutUser();
  // ROUTER
  const router = useRouter();

  return (
    <header className="bg-white text-black shadow-md">
      <nav className="flex items-center xs:justify-end xs:px-2 xs:py-2 lg:justify-between lg:px-8 lg:py-4">
        <div className={"flex items-center gap-4 max-lg:hidden"}>
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
        </div>

        <div className={"ml-[50px] flex"}>
          {userLoading && !user ? (
            <SpinnerLoader color="#000" />
          ) : (
            <button
              id="dropdownDefaultButton"
              data-dropdown-toggle="dropdown"
              onClick={() => setOpenProfile((prev) => !prev)}
              className="relative flex w-44 cursor-pointer items-center gap-2 rounded xs:px-1 xs:py-2 lg:p-2"
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
                  <li
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={async () => {
                      if (!isLoading) {
                        await mutateAsync();
                        localStorage.removeItem(
                          localStorageKeys.selectedObjectId
                        );
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
