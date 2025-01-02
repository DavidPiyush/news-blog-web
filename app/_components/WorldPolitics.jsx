import WorldNewsSide from "./WorldNewsSide";
import WorldNewsTop from "./WorldNewsTop";
import AdsHorizontal from "./AdsHorizontal";
import NewsHeader from "./NewsHeader";
import TopPick from "./TopPick";
import EveryDayPick from "./EveryDayPick";
import EveryDayNewList from "./EveryDayNewList";


function WorldPolitics({articles, categories}) {
   const politicsArticles = articles
     .filter((article) => {
       // Find the category object that matches the name "Tech"
       const techCategory = categories.find(
         (category) => category.slug === "politics-news"
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
          <TopPick />
          <EveryDayPick />
        </div>
      </div>
    </section>
  );
}

export default WorldPolitics;
