import Link from "next/link";

import FeaturedPost from "./FeaturedPost";
import DoNotMiss from "./DoNotMiss";
import WorldNewsSide from "./WorldNewsSide";
import WorldNewsList from "./WorldNewsList";
import WorldNewsTop from "./WorldNewsTop";
import AdsHorizontal from "./AdsHorizontal";
import NewsHeader from "./NewsHeader";

function WorldNews({ articles, categories }) {
  const worldArticles = articles
    .filter((article) => {
      // Find the category object that matches the name "Tech"
      const techCategory = categories.find(
        (category) => category.slug === "world-news"
      );

      // Check if the article's category matches the found category's _id
      return techCategory && article.categories === techCategory._id;
    })
    .map((article) => {
      // Find the matching category again to append the name
      const matchedCategory = categories.find(
        (category) => category._id === article.categories
      );

      // Return a new object with the category name appended
      return {
        ...article,
        categoryName: matchedCategory ? matchedCategory.name : "Unknown",
      };
    });

  return (
    <section className="mt-24">
      <div className="grid grid-cols-8 gap-8 max-w-6xl mx-auto items-start">
        {/* Left Section */}
        <div className="col-span-5 grid grid-cols-5 gap-6 scroll-smooth overflow-y-auto hide-scrollbar">
          <NewsHeader newType="World News" />
          {/* World News */}
          <div className="col-span-3 space-y-6">
            <WorldNewsTop articles={worldArticles} />{" "}
            {/* Pass articles as a prop */}
          </div>

          {/* World News Side */}
          <div className="space-y-6 col-span-2">
            <WorldNewsSide articles={worldArticles} />
          </div>

          <div className="col-span-5 space-y-6">
            <AdsHorizontal
              adImage="ads-01.jpg"
              adLink="https://placehold.co/600x400"
              adText="Sponsored Ad"
            />
            <WorldNewsList articles={worldArticles} />
            {/* Pass articles as a prop */}
          </div>
        </div>

        {/* Right Section: Featured Content */}
        <div className="col-span-3 space-y-6 sticky top-24 h-max">
          <FeaturedPost articles={articles} />
          <DoNotMiss />
        </div>
      </div>
    </section>
  );
}

export default WorldNews;
