"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaAnglesRight } from "react-icons/fa6";

function BreadCrumb() {
  const pathname = usePathname();
  const pathParts = pathname.split("/").filter(Boolean); // Split the path and remove empty parts

  // console.log(pathParts)
  return (
    <div className="max-w-7xl mx-auto mt-12">
      <div className="flex items-center text-xs text-gray-500 ">
        <Link href="/" className="">
          Home
        </Link>
        {/* <FaAnglesRight className="mx-2" /> */}

        {pathParts.map((part, index) => (
          <span key={index} className="flex items-center gap-1 ">
            <FaAnglesRight className="mx-1 text-gray-400" size={12} />
            <Link
              href={`/${pathParts.slice(0, index + 1).join("/")}`}
              className=""
            >
              {part.charAt(0).toUpperCase() + part.slice(1)}{" "}
              {/* Capitalize each part */}
            </Link>
          </span>
        ))}
      </div>
    </div>
  );
}

export default BreadCrumb;
