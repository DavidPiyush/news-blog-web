import Link from "next/link";
import {
  FaFacebook,
  FaInstagram,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";

function Navbar() {
  return (
    <nav className="flex gap-12 items-center">
      <ul className="flex gap-4 text-sm font-medium">
        <li className="group">
          <Link href="#">
            <span className="px-2 py-1 rounded transition-all duration-300 ease-in-out transform group-hover:scale-110 group-hover:font-bold active:scale-95">
              Policies
            </span>
          </Link>
        </li>
        <li className="group">
          <Link href="#">
            <span className="px-2 py-1 rounded transition-all duration-300 ease-in-out transform group-hover:scale-110 group-hover:font-bold active:scale-95">
              Content
            </span>
          </Link>
        </li>
        <li className="group">
          <Link href="#">
            <span className="px-2 py-1 rounded transition-all duration-300 ease-in-out transform group-hover:scale-110 group-hover:font-bold active:scale-95">
              About
            </span>
          </Link>
        </li>
      </ul>

      <ul className="flex gap-5 text-lg">
        {/* Social Media Icons */}
        <li className="group">
          <Link href="#">
            <span className="transition-transform duration-300 ease-in-out transform group-hover:scale-125 active:scale-110">
              <FaInstagram />
            </span>
          </Link>
        </li>
        <li className="group">
          <Link href="#">
            <span className="transition-transform duration-300 ease-in-out transform group-hover:scale-125 active:scale-110">
              <FaXTwitter />
            </span>
          </Link>
        </li>
        <li className="group">
          <Link href="#">
            <span className="transition-transform duration-300 ease-in-out transform group-hover:scale-125 active:scale-110">
              <FaFacebook />
            </span>
          </Link>
        </li>
        <li className="group">
          <Link href="#">
            <span className="transition-transform duration-300 ease-in-out transform group-hover:scale-125 active:scale-110">
              <FaYoutube />
            </span>
          </Link>
        </li>
      </ul>

      <button className="px-6 py-2 bg-white shadow-sm rounded-md text-[#F80759] font-bold uppercase transition-all duration-300 transform hover:scale-105 active:scale-95 active:shadow-inner">
        Subscribe
      </button>
    </nav>
  );
}

export default Navbar;
