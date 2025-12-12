import Image from "next/image";
import styles from "./page.module.css";
import HeroSection from "@/components/HeroSection";
import TrendingNearYou from "@/components/TrendingNearYou";
import BrowseInterest from "@/components/BrowseInterest";
import HowItWorks from "@/components/HowItWorks";
import CallToAction from "@/components/CallToAction";


export default function Home() {
  return (
    <section className="font-cause">
    <HeroSection />
    <TrendingNearYou/>
    <BrowseInterest/>
    <HowItWorks/>
    <CallToAction/>
    </section>
  );
}
