import { routeEndpoints } from "@/shared/routeEndpoint";
import Link from "next/link";
import { FaBookReader } from "react-icons/fa";

export default function RegisterHeader() {
  return (
    <header className="bg-slate-700 py-6 text-white">
      <nav className="flex items-center gap-4 px-8">
        <Link
          href={routeEndpoints.home}
          className="flex items-center gap-2 text-xl"
        >
          <span>
            <FaBookReader />
          </span>
          Panabooking
        </Link>
      </nav>
    </header>
  );
}
