import ArticleMainPage from "../_components/ArticleMainPage";
import { getAllCategory, getFilteredArticles } from "../_lib/data-service";
export const dynamic = "force-dynamic"; // Mark the page as dynamic

export const revalidate = 0;
// export async function generateStaticParams() {
//   try {
//     const articles = await getFilteredArticles();

//     // Ensure `articles` is valid and contains data
//     if (!articles || articles.length === 0) {
//       console.warn("No articles found for static params generation.");
//       return [];
//     }

//     // Return the expected format for static params
//     return articles.map((article) => ({ url: article.slug })); // Assuming `slug` is the correct property
//   } catch (error) {
//     console.error("Error generating static params:", error);
//     return []; // Return an empty array to prevent build failure
//   }
// }

async function Page() {
  const articles = await getFilteredArticles();
  const { categories } = await getAllCategory();

  const politicsArticles = articles
    .filter((article) => {
      // Find the category object that matches the name Politics News"
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

  return <ArticleMainPage articles={politicsArticles} />;
}
export default Page;
