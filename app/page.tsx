import Image from "next/image";
import styles from "./page.module.css";
import HeroSection from "@/components/HeroSection";
import TrendingNearYou from "@/components/TrendingNearYou";


export default function Home() {
  return (
    <>
    <HeroSection />
    <TrendingNearYou/>
    </>
  );
}
