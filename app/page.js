import Image from "next/image";
import Header from "./_components/Header";
import {
  getAllArticle,
  getAllCategory,
  getFilteredArticles,
} from "./_lib/data-service";
import SubNavigation from "./_components/SubNavigation";
import Hero from "./_components/Hero";
import Trending from "./_components/Trending";
import WorldNews from "./_components/WorldNews";
import SportsTrend from "./_components/SportsTrend";
import WorldPolitics from "./_components/WorldPolitics";
import AdsHorizontal from "./_components/AdsHorizontal";
import AdsHorizontalBig from "./_components/AdsHorizontalBig";
import TechnologyNews from "./_components/TechnologyNews";
import Footer from "./_components/Footer";

export const metadata = {
  title: "News App",
};

// export async function generateStaticParams() {
//   const articles = await getFilteredArticles();

//   if (articles.length === 0) {
//     return [];
//   }

//   const ids = articles.map((article) => ({ articleId: String(article._id) }));

//   return ids;
// }

export default async function Home() {
  const articles = await getFilteredArticles();
  const { categories } = await getAllCategory();

  if (articles.length === 0) return;
  return (
    <section className="bg-primary-950 text-primary-100 min-h-screen flex flex-col relative">
      <Header />
      <SubNavigation />
      <Hero articles={articles} categories={categories} />
      <Trending articles={articles} />
      <WorldNews articles={articles} categories={categories} />
      <SportsTrend articles={articles} categories={categories} />
      <WorldPolitics articles={articles} categories={categories} />
      <AdsHorizontalBig />
      <TechnologyNews articles={articles} categories={categories} />
      <Footer />
    </section>
  );
}
