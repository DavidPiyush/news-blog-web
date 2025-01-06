import Link from "next/link";

import {
  FaBarsStaggered,
  FaChevronDown,
  FaMagnifyingGlass,
  FaRegMoon,
} from "react-icons/fa6";
import { getAllCategory, getFilteredArticles } from "../_lib/data-service";

async function SubNavigation() {
  const articles = await getFilteredArticles();
  const { categories } = await getAllCategory();
  return (
    <div className="border-b-2 h-16 border-gray-100 sticky top-0 bg-white z-50 shadow-sm">
      <nav className="max-w-7xl mx-auto h-14 flex items-center justify-between relative">
        {/* Main Menu */}
        <ul className="flex gap-10 items-center font-bold relative">
          <li className="cursor-pointer group hover:text-[#F80759]">
            <Link href="#">
              <FaBarsStaggered size={20} />
            </Link>
          </li>

          <li className="gradient-nav-hover">
            <Link href="/">Home</Link>
          </li>

          {/* Categories */}
          <li className="relative group">
            <div className="flex items-center gap-1 gradient-nav-hover cursor-pointer">
              <span className="text-lg font-semibold">Categories </span>
              <FaChevronDown />
            </div>
            {/* Dropdown Content */}
            <div className="absolute left-0 w-[320px] bg-white shadow-xl rounded-lg opacity-0 group-hover:opacity-100 transform transition-all duration-300 ease-in-out z-50 group-hover:block hidden">
              <ul className="mt-2 p-4 space-y-2">
                {categories?.map((item) => (
                  <li className="relative group" key={item._id}>
                    <Link
                      href={`${item.slug}`}
                      className="text-lg font-semibold text-gray-800 hover:text-[#F80759] transition-all border-b border-gray-200 py-2"
                      passHref
                      target="_blank"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </li>

          {/* Latest News */}
          <li className="relative group">
            <div className="flex items-center gap-1 gradient-nav-hover cursor-pointer">
              <span>Latest News</span>
              <FaChevronDown />
            </div>
            {/* Dropdown Content */}
            <div className="absolute left-0 w-full bg-white shadow-xl rounded-lg opacity-0 group-hover:opacity-100 transform transition-all duration-300 ease-in-out z-50 group-hover:block hidden">
              <div className="mt-2 p-3 flex gap-4 w-[900px] bg-white border-t border-gray-200 rounded-lg">
                {articles?.slice(0, 5)?.map((article) => (
                  <div
                    key={article.id}
                    className="border border-gray-300 rounded-lg shadow-sm overflow-hidden bg-transparent transition-all transform hover:scale-105 hover:shadow-lg w-1/4"
                  >
                    <Link
                      href={`/news/${article.slug}`}
                      target="_blank"
                      passHref
                      className="block h-full"
                    >
                      <div className="w-full h-[130px] bg-gray-100 flex items-center justify-center">
                        <img
                          src={
                            article.coverImage ||
                            "https://via.placeholder.com/180x130"
                          }
                          alt={article.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-3 ">
                        <h4 className="text-sm font-semibold text-gray-800 hover:text-[#F80759] transition ">
                          <span>{article.title}</span>
                        </h4>
                        <p className="text-xs text-gray-500 pt-2">
                          {article.date}
                        </p>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </li>

          <li className="flex items-center gap-1 gradient-nav-hover">
            <Link href="#">Linux</Link>
          </li>
          <li className="flex items-center gap-1 gradient-nav-hover">
            <Link href="#">Windows</Link>
          </li>
          <li className="flex items-center gap-1 gradient-nav-hover">
            <Link href="#">Resources</Link>
          </li>
        </ul>

        {/* Right Side Menu */}
        <ul className="flex items-center gap-6">
          <li className="cursor-pointer group transform transition-transform duration-200 hover:scale-105">
            <span className="gradient-nav-hover-color group-hover:text-[#F80759]">
              <FaMagnifyingGlass size={20} />
            </span>
          </li>
          <li className="cursor-pointer group transform transition-transform duration-200 hover:scale-105">
            <span className="group-hover:text-[#F80759]">
              <FaRegMoon size={20} />
            </span>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default SubNavigation;
