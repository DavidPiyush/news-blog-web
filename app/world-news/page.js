import { Suspense } from "react";
import ArticleMainPage from "../_components/ArticleMainPage";
import { getAllCategory, getFilteredArticles } from "../_lib/data-service";
import Spinner from "../_components/Spinner";
import NotFound from "../not-found";

export const metadata = {
  title: "World News",
};

// export async function generateStaticParams() {
//   const articles = await getFilteredArticles();

//   if (articles.length === 0) {
//     return [];
//   }

//   const { categories } = await getAllCategory();
//   const sportArticles = articles
//     .filter((article) => {
//       // Find the category object that matches the name "Tech"
//       const techCategory = categories.find(
//         (category) => category.slug === "world-news"
//       );

//       // Check if the article's category matches the found category's _id
//       return techCategory && article.categories === techCategory._id;
//     })
//     .map((article) => {
//       // Find the matching category again to append the name
//       const matchedCategory = categories.find(
//         (category) => category._id === article.categories
//       );

//       // Return a new object with the category name appended
//       return {
//         ...article,
//         categoryName: matchedCategory ? matchedCategory.name : "Unknown",
//       };
//     });

//   const ids = sportArticles.map((article) => ({ id: article._id }));

//   return ids;
// }

async function Page() {
  const articles = await getFilteredArticles();
  const { categories } = await getAllCategory();
  const worldArticles = articles
    ?.filter((article) => {
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
    <div>
      {articles ? (
        <Suspense fallback={<Spinner />}>
          <ArticleMainPage articles={worldArticles} />
        </Suspense>
      ) : (
        <NotFound />
      )}
    </div>
  );
}
export default Page;
