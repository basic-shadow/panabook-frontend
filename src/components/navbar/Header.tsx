import { routeEndpoints } from "@/shared/routeEndpoint";
import Link from "next/link";
import { FaBookReader } from "react-icons/fa";

export default function Header() {
  return (
    <header className="bg-slate-700 py-6 px-4 text-white">
      <nav className="m-auto max-w-7xl">
        <Link
          href={routeEndpoints.home}
          className="flex items-center gap-2 text-xl"
        >
          <span>
            <FaBookReader />
          </span>
          Panabook
        </Link>
      </nav>
    </header>
  );
}
