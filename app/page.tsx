import HeroSection from "@/components/HeroSection";
import TrendingNearYou from "@/components/TrendingNearYou";
import BrowseInterest from "@/components/BrowseInterest";
import HowItWorks from "@/components/HowItWorks";
import CallToAction from "@/components/CallToAction";

export default function Home() {
    return (
        <main className="bg-background">
            <HeroSection />
            <TrendingNearYou />
            <BrowseInterest />
            <HowItWorks />
            <CallToAction />
        </main>
    );
}
