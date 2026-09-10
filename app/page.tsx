import CinematicHero from "@/components/home/CinematicHero";
import InfrastructureGallery from "@/components/home/InfrastructureGallery";
import {
  ConsularActions,
  HomeTop,
  LeadershipSection,
  NewsSection,
  ServicesAndHorn,
} from "@/components/home/HomeSections";

export default function HomePage() {
  return (
    <>
      <CinematicHero />
      <HomeTop />
      <ConsularActions />
      <LeadershipSection />
      <InfrastructureGallery />
      <NewsSection />
      <ServicesAndHorn />
    </>
  );
}
