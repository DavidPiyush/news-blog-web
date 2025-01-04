import { Suspense } from "react";
import ArticleMainPage from "../_components/ArticleMainPage";
import { getAllCategory, getFilteredArticles } from "../_lib/data-service";
import NotFound from "../not-found";
import Spinner from "../_components/Spinner";

export const metadata = {
  title: "Enterainment",
};

// export async function generateStaticParams() {
//   const articles = await getFilteredArticles();

//    if (articles.length === 0) {
//      return [];
//    }

//   const { categories } = await getAllCategory();
//   const sportArticles = articles
//     .filter((article) => {
//       // Find the category object that matches the name "Tech"
//       const techCategory = categories.find(
//         (category) => category.slug === "enterainment"
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

  if (articles.length === 0) {
    return (
      <section className="bg-primary-950 text-primary-100 min-h-screen flex flex-col relative">
        <NotFound />
      </section>
    );
  }

  const { categories } = await getAllCategory();
  const enterainment = articles
    .filter((article) => {
      // Find the category object that matches the name "Tech"
      const techCategory = categories?.find(
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
  return (
    <div>
      {articles ? (
        <Suspense fallback={<Spinner />}>
          <ArticleMainPage articles={enterainment} />
        </Suspense>
      ) : (
        <NotFound />
      )}
    </div>
  );
}
export default Page;
