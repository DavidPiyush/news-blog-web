import {
  FaFacebookF,
  FaPinterest,
  FaTwitter,
  FaWhatsapp,
  FaYoutube,
  FaEye,
} from "react-icons/fa";
import Logo from "./Logo";
import TextDescription from "./TextDescription";
import { getFilteredArticles } from "../_lib/data-service";
import Link from "next/link";
export const revalidate = 0;

async function Footer() {
  const  articles  = await getFilteredArticles();
  const filteredArticles = articles?.filter((articleA, indexA) =>
    articles.some(
      (articleB, indexB) => indexA !== indexB && articleA.views > articleB.views
    )
  );

  return (
    <footer className="bg-[#0f0f11] mt-4">
      <div className="bg-[#0f0f11] max-w-6xl mx-auto grid grid-cols-3 py-12 gap-6">
        {/* About Us Section */}
        <section>
          <header className="text-white">
          <Logo />
            <h6 className="text-white font-semibold mb-4">About Us</h6>
          </header>
          <TextDescription
            className="text-[#c0c0c0] my-4 leading-7"
            text="Your source for the lifestyle news. This demo is crafted
              specifically to exhibit the use of the theme as a lifestyle site.
              Visit our main page for more demos."
          />
          <br />
          <TextDescription
            className="text-[#c0c0c0]"
            text="We're accepting new partnerships right now."
          />
          <p className="mt-4 text-[#c0c0c0] tracking-normal font-semibold">
            Email Us:{" "}
            <Link
              href="mailto:info@example.com"
              className="text-blue-400 hover:underline tracking-wide"
            >
              info@example.com
            </Link>
          </p>
          <p className="text-[#c0c0c0] tracking-normal font-semibold">
            Contact:{" "}
            <Link
              href="tel:+13200123451"
              className="text-blue-400 hover:underline tracking-wide"
            >
              +1-320-0123-451
            </Link>
          </p>

          {/* Social Media Icons */}
          <div className="flex justify-start space-x-4 mt-8">
            {[
              { href: "https://www.facebook.com", icon: FaFacebookF },
              { href: "https://www.twitter.com", icon: FaTwitter },
              { href: "https://www.pinterest.com", icon: FaPinterest },
              { href: "https://www.youtube.com", icon: FaYoutube },
              { href: "https://www.whatsapp.com", icon: FaWhatsapp },
            ].map((social, index) => (
              <Link
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-700 text-white hover:bg-gray-500 transition-all"
                aria-label={`Link to ${social.href}`}
              >
                <social.icon size={20} />
              </Link>
            ))}
          </div>
        </section>

        {/* Our Picks Section */}
        <section>
          <header>
            <h6 className="text-white font-semibold mb-7">Our Picks</h6>
          </header>
          <ul className="space-y-5">
            {articles?.slice(0, 3)?.map((item, index, array) => (
              <li
                key={item._id}
                className={`flex items-center space-x-4 group pb-4 ${
                  index !== array.length - 1 ? "border-b border-gray-600" : ""
                }`}
              >
                <Link
                  href={`/news/${item.slug}`}
                  className="flex items-center space-x-4 w-full"
                >
                  <img
                    src={item.coverImage}
                    alt={`Thumbnail for ${item.title}`}
                    className="w-[110px] h-[76px] object-cover rounded-md"
                  />
                  <div>
                    <h4 className="text-[#c0c0c0] font-medium hover:text-white transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-gray-500 text-sm">
                      {item.publishedAt
                        ? new Date(item.publishedAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )
                        : "Unknown Date"}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Most Popular Section */}
        <section>
          <header>
            <h6 className="text-white font-semibold mb-7">Most Popular</h6>
          </header>
          <ul className="space-y-5">
            {filteredArticles?.slice(0, 3)?.map((item, index, array) => (
              <li
                key={item._id}
                className={`flex items-center space-x-4 group pb-4 ${
                  index !== array.length - 1 ? "border-b border-gray-600" : ""
                }`}
              >
                <Link
                  href={`/news/${item.slug}`}
                  className="flex items-center space-x-4 "
                >
                  <img
                    src={item.coverImage}
                    alt={item.title}
                    className="w-[110px] h-[75px] object-cover rounded-md"
                  />
                </Link>
                <div className="flex-1">
                  <h4 className="text-[#c0c0c0] font-medium hover:text-white transition-colors">
                    {item.title}
                  </h4>
                  <Link
                    href={`/news/${item.slug}`}
                    className="flex justify-between text-gray-500 text-sm mt-2"
                  >
                    <span>
                      {item.publishedAt
                        ? new Date(item.publishedAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )
                        : "Unknown Date"}
                    </span>
                    <span className="flex items-center space-x-2 text-gray-400 text-xs">
                      <FaEye className="w-4 h-4" />
                      <p>{item.views}</p>
                    </span>
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Footer Bottom Section */}
      <div className="bg-[#040404] py-6 text-center text-sm text-[#c0c0c0]">
        <div className="flex justify-center space-x-6 mb-4">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <Link
            href="/lifestyle"
            className="hover:text-white transition-colors"
          >
            Lifestyle
          </Link>
          <Link href="/about" className="hover:text-white transition-colors">
            About
          </Link>
          <Link href="/contact" className="hover:text-white transition-colors">
            Contact
          </Link>
        </div>
        <p>
          &#169; {new Date().getFullYear()} EverydayNews. Designed by Dustin
          Abhishek.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
