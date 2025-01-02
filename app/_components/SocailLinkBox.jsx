import {
  FaUser,
  FaCalendarAlt,
  FaRegCommentDots,
  FaEye,
  FaRegClock,
  FaEllipsisH,
  FaTelegramPlane,
} from "react-icons/fa";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedin,
  FaPinterest,
  FaTwitter,
  FaX,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import StayInTouch from "./StayInTouch";
function SocailLinkBox({socialMedia}) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <StayInTouch
        icon={FaFacebookF}
        view={"1.2k"}
        socialMediaName="Facebook"
        href={socialMedia?.facebook}
        color="#1877f2" // Facebook brand color
        hoverColor="hover:bg-blue-100"
      />
      <StayInTouch
        icon={FaXTwitter}
        view={"1.2k"}
        socialMediaName="XTwiiter"
        href={socialMedia?.twitter}
        color="#1DA1F2" // X (Twitter) brand color
        hoverColor="hover:bg-blue-100"
      />
      <StayInTouch
        icon={FaInstagram}
        view={"1.2k"}
        socialMediaName="Instagram"
        href={socialMedia?.instagram}
        color="#E1306C" // Instagram brand color
        hoverColor="hover:bg-blue-100"
      />
      <StayInTouch
        icon={FaYoutube}
        view={"1.2k"}
        socialMediaName="Youtube"
        href={socialMedia?.youtube}
        color="#FF0000" // YouTube brand color
        hoverColor="hover:bg-blue-100"
      />
      <StayInTouch
        icon={FaPinterest}
        view={"1.2k"}
        socialMediaName="Pinterest"
        href={socialMedia?.pinterest}
        color="#E60023" // Pinterest brand color
        hoverColor="hover:bg-blue-100"
      />
      <StayInTouch
        icon={FaLinkedin}
        view={"1.2k"}
        socialMediaName="Linkedin"
        href={socialMedia?.linkedin}
        color="#0077b5" // LinkedIn brand color
        hoverColor="hover:bg-blue-100"
      />
    </div>
  );
}

export default SocailLinkBox;
