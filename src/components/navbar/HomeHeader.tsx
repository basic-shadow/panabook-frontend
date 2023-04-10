import { routeEndpoints } from "@/shared/routeEndpoint";
import Link from "next/link";
import { FaBookReader } from "react-icons/fa";

export default function HomeHeader() {
  return (
    <header className="border-b-2 bg-white py-6 text-black shadow-md">
      <nav className="px-8">
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
