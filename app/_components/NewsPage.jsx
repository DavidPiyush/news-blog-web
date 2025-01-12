import {
  FaCalendarAlt,
  FaRegCommentDots,
  FaEye,
  FaRegClock,
  FaTelegramPlane,
} from "react-icons/fa";
import { FaFacebookF, FaPinterest, FaTwitter } from "react-icons/fa6";
import StayInTouch from "./StayInTouch";
import AdsHorizontalBig from "./AdsHorizontalBig";
import CommentForm from "./CommentForm";
import AuthorInfo from "./AuthorInfo";
import RelatedPosts from "./RelatedPosts";
import DoNotMiss from "./DoNotMiss";
import TopPick from "./TopPick";
import SocailLinkBox from "./SocailLinkBox";
import NewsLetter from "./NewsLetter";
import AdsVerticalBig from "./AdsVertical";
import DangerousSetHtml from "./DangerousSetHtml";
import CommentCard from "./CommentCard";
function NewsPage({ article = [], user = [], articles = [], comments = [] }) {
  return (
    <section className="mt-12 max-w-7xl mx-auto ">
      <div className="grid grid-cols-1 md:grid-cols-8 gap-10">
        <div className="col-span-6 scroll-smooth  overflow-y-auto hide-scrollbar">
          {/* Category and Title */}
          <div className="flex items-center gap-4">
            <span className="bg-blue-400 px-4 py-2 text-white rounded-lg text-sm font-bold uppercase tracking-tight">
              {article?.categoryName || "Technology"}
            </span>
          </div>
          <h1 className="mt-4 text-4xl font-semibold text-[#161616">
            {article.title}
          </h1>
          <p className="mt-2 text-lg text-gray-500">{article.subTitle}</p>

          {/* Author and Post Details */}
          <div className="mt-4 flex items-center text-gray-600 text-sm gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full overflow-hidden">
                <img
                  src={
                    user.profilePicture || "https://via.placeholder.com/30x30"
                  }
                  alt={user.name || "Author Avatar"}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-gray-700">
                By{" "}
                <a
                  href="https://www.authorprofile.com"
                  className="font-semibold text-gray-700 hover:underline"
                >
                  {user.name || "Shane Doe"}
                </a>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <FaCalendarAlt size={16} />
              <span>
                {article.publishedAt
                  ? new Date(article.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })
                  : "Jan 14, 2021"}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <FaRegCommentDots size={16} />
              <a href="#comments" className="text-gray-700 hover:underline">
                <span>{article?.comments?.length}</span>
              </a>
            </div>

            <div className="flex items-center gap-2">
              <FaEye size={16} />
              <span>{article.views + " " + "Views"}</span>
            </div>

            <div className="flex items-center gap-2">
              <FaRegClock size={16} />
              <span>{article.readingTime + " " + "Min read"}</span>
            </div>
          </div>

          {/* Social Media Section */}
          <div className="flex gap-4 mt-6">
            {/* Facebook */}
            <StayInTouch
              icon={FaFacebookF}
              socialMediaName="Facebook"
              href={user?.socialLinks?.facebook}
              color="#fff"
              textColor="text-white"
              backgroundColor="bg-blue-700"
              hoverColor="hover:bg-blue-800"
            />

            {/* Twitter */}
            <StayInTouch
              icon={FaTwitter}
              href={user?.socialLinks?.twitter}
              socialMediaName="Twitter"
              color="#fff"
              textColor="text-white"
              backgroundColor="bg-blue-400"
              hoverColor="hover:bg-blue-500"
            />

            {/* Pinterest */}
            <StayInTouch
              icon={FaPinterest}
              socialMediaName="Pinterest"
              href={user?.socialLinks?.pinterest}
              color="#fff"
              textColor="text-white"
              backgroundColor="bg-red-600"
              hoverColor="hover:bg-red-700"
            />

            {/* Telegram */}
            <StayInTouch
              icon={FaTelegramPlane}
              socialMediaName="Telegram"
              href={user?.socialLinks?.telegram}
              color="#fff"
              textColor="text-white"
              backgroundColor="bg-blue-500"
              hoverColor="hover:bg-blue-600"
            />

            {/* Show More */}
            {/* <button
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
              onClick={() => alert("Show more social media links!")}
            >
              <span>Show More</span>
              <FaEllipsisH />
            </button> */}
          </div>

          {/* Main Content with Scroll */}
          <div className="mt-6 overflow-y-auto">
            <img
              src={article.coverImage || "https://via.placeholder.com/800x500"}
              alt="Placeholder"
              className="w-full h-[500px] object-cover rounded-lg shadow-lg"
            />
            <article className="mt-6 text-[#333] space-y-4 leading-8">
              <DangerousSetHtml content={article.content} />
              {/* </p> */}

              <AdsHorizontalBig />
            </article>
            <AuthorInfo
              socialMedia={user?.socialLinks}
              authorName={user?.name}
              authorAvatar={user?.profilePicture}
              authorBio={user?.bio}
            />
            <RelatedPosts articles={articles} />
            {article.isCommentAllowed && (
              <>
                <CommentCard comments={comments} id={article._id} />
                <CommentForm id={article._id} />{" "}
              </>
            )}
          </div>
        </div>

        {/* Sidebar with Scroll */}
        <div className="col-span-2 space-y-6 sticky top-24 h-max">
          <img
            src="https://via.placeholder.com/300x150"
            alt="Ad"
            className="w-full h-[150px] object-cover"
          />
          {/* Ad Content */}
          <div className="p-4 flex flex-col items-center text-center">
            <h3 className="text-lg font-semibold text-gray-800">
              Advertise with Us
            </h3>
            <p className="text-sm text-gray-600 mb-3">
              Reach a wider audience with targeted ads. Contact us today!
            </p>
            <button className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600 transition-colors">
              Learn More
            </button>
          </div>
          {/* </div> */}

          <DoNotMiss />
          <TopPick articles={articles} />
          <div className="  space-y-8">
            <h5 className="bg-gray-900 text-white text-xl font-semibold px-4 py-2 rounded-md">
              Stay In Touch
            </h5>
            <SocailLinkBox socialMedia={user?.socialLinks} />
          </div>

          <NewsLetter />

          <AdsVerticalBig />
        </div>
      </div>
    </section>
  );
}

export default NewsPage;
