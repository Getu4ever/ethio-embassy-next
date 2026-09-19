import CinematicHero from "@/components/home/CinematicHero";
import HomeFaqSection from "@/components/home/HomeFaqSection";
import InfrastructureGallery from "@/components/home/InfrastructureGallery";
import {
  ConsularActions,
  HomeTop,
  LeadershipSection,
  NewsSection,
  ServicesAndHorn,
} from "@/components/home/HomeSections";
import JsonLd from "@/components/JsonLd";
import { faqPageJsonLd } from "@/lib/seo/structured-data";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqPageJsonLd()} />
      <CinematicHero />
      <HomeTop />
      <ConsularActions />
      <LeadershipSection />
      <InfrastructureGallery />
      <NewsSection />
      <HomeFaqSection />
      <ServicesAndHorn />
    </>
  );
}
