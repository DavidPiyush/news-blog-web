import SportsTrendMain from "./SportsTrendMain";
import SportTrendList from "./SportTrendList";


function SportsTrend({articles,categories}) {
   const sportsArticles = articles
     .filter((article) => {
       // Find the category object that matches the name "Tech"
       const techCategory = categories.find(
         (category) => category.slug === "sports-news"
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
    <section className="mt-24 bg-[#D5E6CE] py-16">
      <header className="flex items-center max-w-6xl mx-auto ">
        <h5 className="text-black text-2xl font-semibold pb-6  rounded-md text-center">
          Sports Trends
        </h5>
      </header>
      <div className="max-w-6xl mx-auto grid grid-cols-2 gap-4">
        <SportsTrendMain articles={sportsArticles} />
        <div className="grid grid-cols-2">
          <SportTrendList articles={sportsArticles} />
        </div>
      </div>
    </section>
  );
}

export default SportsTrend;
