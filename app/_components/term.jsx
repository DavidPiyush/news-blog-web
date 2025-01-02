import { useState } from "react";
import Cookies from "js-cookie";
import Link from "next/link";

const Terms = () => {
  const [accepted, setAccepted] = useState(
    Cookies.get("accepted_terms") === "true"
  );

  const handleAccept = () => {
    // Set the cookie to indicate that the user has accepted the terms
    Cookies.set("accepted_terms", "true", { expires: 365 });
    setAccepted(true);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 sm:w-96">
        <h1 className="text-2xl font-semibold mb-4">Terms and Conditions</h1>
        <div className="mb-4 text-sm text-gray-700">
          <p>
            By using this website, you agree to the following terms and
            conditions. Please read them carefully.
            <br />
            <br />
            <strong>1. Introduction</strong>
            <br />
            These terms govern your use of the website.
            <br />
            <br />
            <strong>2. User Responsibilities</strong>
            <br />
            You agree to use the website in compliance with all applicable laws.
            <br />
            <br />
            {/* Add more terms as needed */}
          </p>
        </div>
        {!accepted ? (
          <div className="flex justify-between items-center">
            <button
              onClick={handleAccept}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Accept
            </button>
            <Link href="/privacy-policy">
              <a className="text-blue-500 text-sm">Read Privacy Policy</a>
            </Link>
          </div>
        ) : (
          <p className="text-green-500 mt-4">
            You have accepted the terms and conditions!
          </p>
        )}
      </div>
    </div>
  );
};

export default Terms;
