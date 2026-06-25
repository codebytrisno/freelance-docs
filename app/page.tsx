import Header from "./components/Header";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import FeatureBento from "./components/FeatureBento";
import PreviewSection from "./components/PreviewSection";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <FeatureBento />
        <PreviewSection />
      </main>
      <Footer />
    </>
  );
}
