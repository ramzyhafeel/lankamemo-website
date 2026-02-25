import Layout from "../components/layout/Layout";
import Hero from "../components/home/Hero";
import PromotionsSlider from "../components/home/PromotionsSlider";
import FeaturedDestinations from "../components/home/FeaturedDestinations";
import WhySriLanka from "../components/home/WhySriLanka";
import ReviewsPreview from "../components/home/ReviewsPreview";
import GalleryPreview from "../components/home/GalleryPreview";
import FAQ from "../components/home/FAQ";

export default function Home() {
  return (
    <Layout whatsappMessage="Hi Lanka Memo Holidays! I’d like to explore destinations and plan my trip.">
      <Hero />
      <PromotionsSlider />
      <FeaturedDestinations />
      <WhySriLanka />
      <ReviewsPreview />
      <GalleryPreview />
      <FAQ />
    </Layout>
  );
}