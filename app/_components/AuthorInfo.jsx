// import React from "react";
import StayInTouch from "./StayInTouch";
import {
  FaFacebookF,
  FaPinterestP,
  FaTwitter,
  FaTelegramPlane,
  FaEnvelope,
  FaLink,
  FaInstagram,
  FaHome,
} from "react-icons/fa";
import Image from "next/image";

function AuthorInfo({ socialMedia=[], authorName='', authorAvatar='', authorBio='' }) {
  return (
    <div className=" mt-16 mb-10 w-full">
      {/* Share Section */}
      <div className=" flex justify-between items-center border-t-[1px] border-b-[1px] py-4">
        <p>SHARE.</p>
        <div className="flex gap-4 justify-end">
          {/* Facebook */}
          <StayInTouch
            icon={FaFacebookF}
            socialMediaName="Facebook"
            href={socialMedia?.facebook || ""} // Replace with the author's Facebook URL
            color="#fff"
            textColor="text-white"
            backgroundColor="bg-blue-700"
            hoverColor="hover:bg-blue-800"
          />

          {/* Twitter */}
          <StayInTouch
            icon={FaTwitter}
            href={socialMedia?.twitter || ""}
            socialMediaName="Twitter"
            color="#fff"
            textColor="text-white"
            backgroundColor="bg-blue-400"
            hoverColor="hover:bg-blue-500"
          />

          {/* Pinterest */}
          <StayInTouch
            icon={FaPinterestP}
            socialMediaName="Pinterest"
            href={socialMedia?.pinterest || ""}
            color="#fff"
            textColor="text-white"
            backgroundColor="bg-red-600"
            hoverColor="hover:bg-red-700"
          />

          {/* Telegram */}
          <StayInTouch
            icon={FaTelegramPlane}
            socialMediaName="Telegram"
            href={socialMedia?.telegram || ""}
            color="#fff"
            textColor="text-white"
            backgroundColor="bg-blue-500"
            hoverColor="hover:bg-blue-600"
          />

          {/* Mail */}
          <StayInTouch
            icon={FaEnvelope}
            socialMediaName=""
            color="#fff"
            textColor="text-white"
            backgroundColor="bg-gray-500"
            hoverColor="hover:bg-gray-600"
          />

          {/* Link Copy */}
          <StayInTouch
            icon={FaLink}
            socialMediaName=" "
            color="#fff"
            textColor="text-white"
            backgroundColor="bg-black"
            hoverColor="hover:bg-gray-600"
          />
        </div>
      </div>

      {/* Author Details Section */}
      <div className=" mt-10 flex gap-6 ">
        <Image
          src={authorAvatar || "https://via.placeholder.com/100"} // Replace with the author's image URL
          alt={authorName}
          width={64}
          height={64}
          className="w-24 h-24 rounded-full"
        />
        <div className="author-info w-full">
          <div className="flex justify-between items-center w-full ">
            <div>
              <h3 className="text-xl font-semibold text-[#333]">
                {authorName}
              </h3>
            </div>
            <div className="author-social-icons flex gap-2">
              <a
                href={socialMedia.website || ""}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaHome className="text-xl text-gray-600 hover:text-gray-800" />
              </a>
              <a
                href={socialMedia.facebook}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebookF className="text-xl text-blue-700 hover:text-blue-900" />
              </a>
              <a
                href={socialMedia.twitter}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter className="text-xl text-blue-400 hover:text-blue-600" />
              </a>
              <a
                href={socialMedia.pinterest}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaPinterestP className="text-xl text-red-600 hover:text-red-800" />
              </a>
              <a
                href={socialMedia.instagram || ""}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram className="text-xl text-pink-500 hover:text-pink-700" />
              </a>
            </div>
          </div>
          <p className="text-sm text-[#555] tracking-wide mt-2">{authorBio}</p>
        </div>
      </div>
    </div>
  );
}

export default AuthorInfo;
