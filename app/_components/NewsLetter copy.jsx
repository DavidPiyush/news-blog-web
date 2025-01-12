import { FaEnvelope } from "react-icons/fa6";
import TopViewNews from "./TopViewNews";

function NewsLetter() {
    return (
      <div className="col-span-2 space-y-6  ">
        <div className=" bg-white border border-gray-300 rounded-md shadow-md p-6 relative mt-12">
          {/* Icon at the top center */}
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-blue-500 p-3 rounded-full shadow-lg">
            <FaEnvelope className="text-white text-2xl" />
          </div>

          {/* Card Content */}
          <div className="text-center mt-8">
            <h3 className="text-lg font-semibold text-gray-800">
              Subscribe to Updates
            </h3>
            <p className="text-sm text-gray-600 mt-2">
              Get the latest creative news from FooBar about art, design, and
              business.
            </p>
          </div>

          {/* Email Input */}
          <form className="mt-4 space-y-3">
            <input
              type="email"
              placeholder="Your email address.."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md text-sm font-medium hover:bg-blue-600 transition"
            >
              Subscribe
            </button>
          </form>

          {/* Disclaimer */}
          <div className="flex items-start mt-4 space-x-2">
            {/* Checkbox */}
            <input
              type="checkbox"
              id="agreeTerms"
              className="w-4 h-4 mt-1 text-blue-500 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            />
            {/* Text */}
            <label htmlFor="agreeTerms" className="text-xs text-gray-500">
              By signing up, you agree to our{" "}
              <a href="#" className="text-blue-500 hover:underline">
                Terms
              </a>{" "}
              and{" "}
              <a href="#" className="text-blue-500 hover:underline">
                Privacy Policy
              </a>
              .
            </label>
          </div>
        </div>
      
      </div>
    );
}

export default NewsLetter
