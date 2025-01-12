import SportsTrendMain from "./SportsTrendMain";
import SportTrendList from "./SportTrendList";

function SportsTrend({ articles, categories }) {
  // Identify the sports category based on the slug
  const sportsCategory = categories.find(
    (category) => category.slug === "sports-news"
  );

  if (!sportsCategory) {
    console.warn("Sports category not found.");
    return null; // Exit early if the category doesn't exist
  }

  // Filter articles related to the sports category
  const sportsArticles = articles
    .filter(
      (article) =>
        article.categories?.toString() === sportsCategory._id.toString()
    )
    .map((article) => ({
      ...article,
      categoryName: sportsCategory.name,
    }));

  // Exit early if no sports articles are found
  if (sportsArticles.length === 0) {
    console.warn("No sports articles found.");
    return null;
  }

  return (
    <section className="mt-24 bg-[#D5E6CE] py-16">
      <header className="flex items-center max-w-6xl mx-auto">
        <h5 className="text-black text-2xl font-semibold pb-6 rounded-md text-center">
          Sports Trends
        </h5>
      </header>
      <div className="max-w-6xl mx-auto grid grid-cols-2 gap-4">
        <SportsTrendMain articles={sportsArticles} />
        <div className="grid grid-cols-2 grid-rows-2">
          <SportTrendList articles={sportsArticles} />
        </div>
      </div>
    </section>
  );
}

export default SportsTrend;
