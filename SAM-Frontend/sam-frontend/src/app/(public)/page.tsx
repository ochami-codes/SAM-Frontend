import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";

import HeroSection from "@/src/components/home/HeroSection";
import WelcomeSection from "@/src/components/home/WelcomeSection";
import MissionSection from "@/src/components/home/MissionSection";
import PublicSections from "@/src/components/home/PublicSections";
import FeaturedArticles from "@/src/components/home/FeaturedArticles";
import ScrollToTop from "@/src/components/home/ScrollToTop";

import { getPublicContentMetadata } from "@/src/lib/content/getPublicContentMetadata";

export default async function HomePage() {
const sections = await getPublicContentMetadata();

return (
<> <Header />

  <main className="min-h-screen bg-gray-100 text-gray-800">
    <HeroSection />

    <WelcomeSection />

    <MissionSection />

    <PublicSections sections={sections} />

    <FeaturedArticles />
  </main>

  <ScrollToTop />

  <Footer />
</>
);
}
