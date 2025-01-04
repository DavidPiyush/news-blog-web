import Image from "next/image";
import Header from "./_components/Header";
import { getAllCategory, getFilteredArticles } from "./_lib/data-service";
import SubNavigation from "./_components/SubNavigation";
import Hero from "./_components/Hero";
import Trending from "./_components/Trending";
import WorldNews from "./_components/WorldNews";
import SportsTrend from "./_components/SportsTrend";
import WorldPolitics from "./_components/WorldPolitics";
import AdsHorizontalBig from "./_components/AdsHorizontalBig";
import TechnologyNews from "./_components/TechnologyNews";
import Footer from "./_components/Footer";
export const dynamic = 'force-dynamic'; // Mark the page as dynamic

export const metadata = {
  title: "News App",
};

// Revalidate data every hour
export const revalidate = 3600;

export default async function Home() {
  try {
    // Fetch articles and categories
    const articles = await getFilteredArticles();
    const { categories } = await getAllCategory();

    // Handle case where no articles are available
    if (!articles || articles.length === 0) {
      console.warn("No articles found.");
      return (
        <section className="bg-primary-950 text-primary-100 min-h-screen flex flex-col relative">
          <Header />
          <SubNavigation />
          <div className="flex-grow flex items-center justify-center">
            <p className="text-lg">No articles available at the moment.</p>
          </div>
        </section>
      );
    }

    // Render the page with content
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
  } catch (error) {
    console.error("Error loading Home page:", error);
    return (
      <section className="bg-primary-950 text-primary-100 min-h-screen flex flex-col relative">
        <Header />
        <SubNavigation />
        <div className="flex-grow flex items-center justify-center">
          <p className="text-lg">An error occurred while loading the page.</p>
        </div>
      </section>
    );
  }
}
