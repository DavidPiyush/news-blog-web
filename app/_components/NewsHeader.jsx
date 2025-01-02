import Link from "next/link";

function NewsHeader({ newType, view = "View More" }) {
  return (
    <header className="col-span-6 flex items-center justify-between">
      <h5 className="relative  text-xl font-semibold px-6 py-3 rounded-md bg-gradient-to-r from-blue-500 to-blue-800 text-white shadow-lg">
        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-full bg-blue-900 rounded"></span>
        {newType}
      </h5>

      {view && (
        <Link
          href="#"
          className="text-gray-400 text-base font-medium px-4 py-1 text-center border-[1px] rounded-3xl border-gray-200 hover:bg-gray-200 hover:text-black transition-all duration-300"
        >
          {view}
        </Link>
      )}
    </header>
  );
}

export default NewsHeader;
