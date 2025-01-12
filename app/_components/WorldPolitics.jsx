import WorldNewsSide from "./WorldNewsSide";
import WorldNewsTop from "./WorldNewsTop";
import AdsHorizontal from "./AdsHorizontal";
import NewsHeader from "./NewsHeader";
import TopPick from "./TopPick";
import EveryDayPick from "./EveryDayPick";
import EveryDayNewList from "./EveryDayNewList";

function WorldPolitics({ articles, categories }) {
  const sportsCategory = categories.find(
    (category) => category.slug === "politics-news"
  );

  if (!sportsCategory) {
    console.warn("Sports category not found.");
    return null; // Exit early if the category doesn't exist
  }

  // Filter articles related to the sports category
  const politicsArticles = articles
    .filter(
      (article) =>
        article.categories?.toString() === sportsCategory._id.toString()
    )
    .map((article) => ({
      ...article,
      categoryName: sportsCategory.name,
    }));

  return (
    <section className="">
      <div className="grid grid-cols-8 gap-8 max-w-6xl mx-auto mt-12 ">
        {/* Left Section */}
        <div className="col-span-5 grid grid-cols-5 gap-6 scroll-smooth overflow-y-auto hide-scrollbar  ">
          <NewsHeader newType="World Politics" />
          {/* World News */}
          <div className="col-span-3 space-y-6 ">
            <WorldNewsTop articles={politicsArticles} />
          </div>

          {/* World News Side */}
          <div className="space-y-6 col-span-2">
            <WorldNewsSide articles={politicsArticles} />
          </div>

          <div className=" col-span-5 space-y-6 mt-24 ">
            <div className="grid grid-cols-3 gap-4">
              <EveryDayNewList articles={politicsArticles} />
            </div>
            <AdsHorizontal
              adImage="ads-01.jpg"
              adLink="https://example.com"
              adText="Sponsored Ad"
            />
          </div>
        </div>

        {/* Right Section: Featured Content */}
        <div className="col-span-3 space-y-6 sticky top-24 h-max ">
          <TopPick articles={politicsArticles} />
          <EveryDayPick />
        </div>
      </div>
    </section>
  );
}

export default WorldPolitics;
