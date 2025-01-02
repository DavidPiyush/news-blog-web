import ArticleMainPage from "../_components/ArticleMainPage";
import { getAllCategory, getFilteredArticles } from "../_lib/data-service";

async function Page() {
  const articles = await getFilteredArticles();
  const { categories } = await getAllCategory();
  const enterainment = articles
    .filter((article) => {
      // Find the category object that matches the name "Tech"
      const techCategory = categories.find(
        (category) => category.slug === "enterainment"
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
  return <ArticleMainPage articles={enterainment} />;
}
export default Page;
