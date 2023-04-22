import { routeEndpoints } from "@/shared/routeEndpoint";
import Link from "next/link";
import { FaBookReader } from "react-icons/fa";
import { BsFillHouseFill } from "react-icons/bs";

export default function RegisterHeader() {
  return (
    <header className="bg-slate-700 py-6 text-white">
      <nav className="flex items-center gap-4 px-8">
        <Link
          href={routeEndpoints.home}
          className="flex items-center gap-2 border-r pr-4 text-xl"
        >
          <span>
            <FaBookReader />
          </span>
          Panabook
        </Link>
        <Link
          href={routeEndpoints.registerProperty}
          className="flex items-center gap-2"
        >
          <BsFillHouseFill />
          <span>Добавить отель</span>
        </Link>
      </nav>
    </header>
  );
}
