"use client";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Link from "next/link";
import { FaCookieBite } from "react-icons/fa"; // Importing an icon for a visual touch

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [cookiesAccepted, setCookiesAccepted] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Check if cookies have been accepted
  useEffect(() => {
    if (!Cookies.get("accepted_terms")) {
      setShowBanner(true);
    } else {
      setCookiesAccepted(true);
    }
  }, []);

  const handleAcceptAll = () => {
    Cookies.set("accepted_terms", "true", { expires: 90 });
    Cookies.set("cookie_preferences", "all", { expires: 90 });
    setCookiesAccepted(true);
    setShowBanner(false);
    setShowConfirmation(true);

    // Hide confirmation message after 3 seconds
    setTimeout(() => {
      setShowConfirmation(false);
    }, 3000);
  };

  const handleAcceptEssential = () => {
    Cookies.set("accepted_terms", "true", { expires: 90 });
    Cookies.set("cookie_preferences", "essential", { expires: 90 });
    setCookiesAccepted(true);
    setShowBanner(false);
    setShowConfirmation(true);

    // Hide confirmation message after 3 seconds
    setTimeout(() => {
      setShowConfirmation(false);
    }, 3000);
  };

  return (
    <>
      {/* Cookie Consent Banner */}
      {showBanner && (
        <div
          className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 flex justify-between items-center z-50 shadow-2xl rounded-t-lg"
          style={{ zIndex: 9999 }}
        >
          {/* Left Section */}
          <div className="flex flex-col md:w-3/4 text-center md:text-left space-y-3">
            <div className="flex items-center justify-center md:justify-start space-x-2">
              <FaCookieBite className="text-3xl md:text-4xl" />
              <p className="text-lg md:text-xl font-semibold">
                We use cookies to improve your experience.
              </p>
            </div>

            <p className="text-sm md:text-lg font-medium mb-4">
              By continuing to browse, you agree to our use of cookies. You can
              manage your preferences or read more about our use of cookies.
            </p>

            <div className="text-xs text-gray-200 mt-2">
              <Link href="/terms" className="text-white hover:underline">
                Learn more about our Terms and Conditions
              </Link>
              <span> | </span>
              <Link
                href="/manage-cookies"
                className="text-white hover:underline"
              >
                Manage Cookies
              </Link>
            </div>
          </div>

          {/* Right Section with Buttons */}
          <div className="flex flex-col items-center space-y-4 md:space-y-0 md:flex-row md:space-x-4">
            {/* Essential Cookies Button */}
            <button
              onClick={handleAcceptEssential}
              className="px-6 py-2 bg-transparent text-white border-2 border-white rounded-full hover:bg-white hover:text-purple-600 transition-all duration-300 transform hover:scale-105"
            >
              Essential Cookies
            </button>

            {/* Accept All Cookies Button */}
            <button
              onClick={handleAcceptAll}
              className="px-6 py-2 bg-white text-purple-700 rounded-full hover:bg-purple-700 hover:text-white transition-all duration-300 transform hover:scale-105"
            >
              Accept All Cookies
            </button>
          </div>
        </div>
      )}

      {/* Confirmation Message */}
      {showConfirmation && (
        <div className="fixed bottom-0 left-0 right-0 bg-green-500 text-white p-4 text-center z-50">
          <p className="font-semibold">
            Cookies Accepted! Thank you for your preference.
          </p>
        </div>
      )}
    </>
  );
};

export default CookieConsent;
