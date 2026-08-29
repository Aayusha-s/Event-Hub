"use client";
import Button from "./Button";
import CategoryCard from "./CategoryCard";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionContainer from "./SectionContainer";
import SectionHeader from "./SectionHeader";
import FadeInView from "./motion/FadeInView";
import StaggerGrid from "./motion/StaggerGrid";
import { useEffect, useState } from "react";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import PaletteIcon from "@mui/icons-material/Palette";
import CodeIcon from "@mui/icons-material/Code";
import SportsIcon from "@mui/icons-material/Sports";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import TheatreComedyIcon from "@mui/icons-material/TheaterComedy";
import SchoolIcon from "@mui/icons-material/School";
import BookIcon from "@mui/icons-material/Book";
import FlightIcon from "@mui/icons-material/Flight";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import SpaIcon from "@mui/icons-material/Spa";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import DiamondIcon from "@mui/icons-material/Diamond";
import HomeIcon from "@mui/icons-material/Home";
import ServiceIcon from "@mui/icons-material/MiscellaneousServices";

type CategoryItem = { name: string; count: number };

const categoryCopy: Record<
  string,
  { icon: React.ReactNode; description: string }
> = {
  music: {
    icon: <MusicNoteIcon sx={{ fontSize: 28 }} aria-hidden="true" />,
    description: "Live performances and festivals",
  },
  art: {
    icon: <PaletteIcon sx={{ fontSize: 28 }} aria-hidden="true" />,
    description: "Exhibitions, galleries, and creative workshops",
  },
  art_theater: {
    icon: <TheatreComedyIcon sx={{ fontSize: 28 }} aria-hidden="true" />,
    description: "Theater, comedy shows, and performances",
  },
  tech: {
    icon: <CodeIcon sx={{ fontSize: 28 }} aria-hidden="true" />,
    description: "Conferences, hackathons, and coding bootcamps",
  },
  sports: {
    icon: <SportsIcon sx={{ fontSize: 28 }} aria-hidden="true" />,
    description: "Games, tournaments, and competitive events",
  },
  sports_fitness: {
    icon: <FitnessCenterIcon sx={{ fontSize: 28 }} aria-hidden="true" />,
    description: "Fitness classes, yoga, and wellness activities",
  },
  food: {
    icon: <RestaurantIcon sx={{ fontSize: 28 }} aria-hidden="true" />,
    description: "Tastings, festivals, and culinary classes",
  },
  food_drinks: {
    icon: <RestaurantIcon sx={{ fontSize: 28 }} aria-hidden="true" />,
    description: "Food and beverage events",
  },
  wellness: {
    icon: <SpaIcon sx={{ fontSize: 28 }} aria-hidden="true" />,
    description: "Yoga, meditation, and wellness retreats",
  },
  wellness_health: {
    icon: <SpaIcon sx={{ fontSize: 28 }} aria-hidden="true" />,
    description: "Health and wellness activities",
  },
  business: {
    icon: <BusinessCenterIcon sx={{ fontSize: 28 }} aria-hidden="true" />,
    description: "Networking events, seminars, and workshops",
  },
  education: {
    icon: <SchoolIcon sx={{ fontSize: 28 }} aria-hidden="true" />,
    description: "Lectures, courses, and learning communities",
  },
  learning_education: {
    icon: <SchoolIcon sx={{ fontSize: 28 }} aria-hidden="true" />,
    description: "Educational programs and learning events",
  },
  book_literature: {
    icon: <BookIcon sx={{ fontSize: 28 }} aria-hidden="true" />,
    description: "Book clubs, author talks, and literary events",
  },
  travel: {
    icon: <FlightIcon sx={{ fontSize: 28 }} aria-hidden="true" />,
    description: "Tours, adventures, and travel meetups",
  },
  gaming: {
    icon: <SportsEsportsIcon sx={{ fontSize: 28 }} aria-hidden="true" />,
    description: "Tournaments, conventions, and gaming nights",
  },
  gaming_esports: {
    icon: <SportsEsportsIcon sx={{ fontSize: 28 }} aria-hidden="true" />,
    description: "E-sports tournaments and gaming events",
  },
  photography: {
    icon: <PhotoCameraIcon sx={{ fontSize: 28 }} aria-hidden="true" />,
    description: "Photography workshops and exhibitions",
  },
  jewelry: {
    icon: <DiamondIcon sx={{ fontSize: 28 }} aria-hidden="true" />,
    description: "Jewelry and accessories showcases",
  },
  home: {
    icon: <HomeIcon sx={{ fontSize: 28 }} aria-hidden="true" />,
    description: "Home and lifestyle events",
  },
  services: {
    icon: <ServiceIcon sx={{ fontSize: 28 }} aria-hidden="true" />,
    description: "Professional and service-based events",
  },
};

const categoryAliases: Record<string, keyof typeof categoryCopy> = {
  art_theater: "art_theater",
  food_drinks: "food_drinks",
  sports_fitness: "sports_fitness",
  learning_education: "learning_education",
  gaming_esports: "gaming_esports",
  book_literature: "book_literature",
  wellness_health: "wellness_health",
  photography: "photography",
  jewelry: "jewelry",
  home: "home",
  services: "services",
};

const describeCategory = (name: string) => {
  const rawKey = name.toLowerCase().replace(/[^a-z_]/g, "");
  // First check if we have a direct key match
  if (categoryCopy[rawKey]) {
    return categoryCopy[rawKey];
  }
  // Then check aliases
  const aliasKey = categoryAliases[rawKey];
  if (aliasKey && categoryCopy[aliasKey]) {
    return categoryCopy[aliasKey];
  }
  // Try matching without underscores
  const keyNoUnderscore = rawKey.replace(/[^a-z]/g, "");
  for (const [key, value] of Object.entries(categoryCopy)) {
    if (key.replace(/[^a-z]/g, "") === keyNoUnderscore) {
      return value;
    }
  }
  // Default fallback
  return {
    icon: <ServiceIcon sx={{ fontSize: 28 }} aria-hidden="true" />,
    description: "Discover live events in this category",
  };
};

const formatCategoryTitle = (name: string) => name.split('_').filter(Boolean).map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()).join(' ');

const BrowseInterest = () => {
  const [categories, setCategories] = useState<CategoryItem[]>([]);

  useEffect(() => {
    let active = true;
    fetch("/api/events/taxonomy")
      .then(async (response) => {
        const result = await response.json();
        if (active && response.ok && result.success) {
          setCategories(result.data.categories ?? []);
        }
      })
      .catch(() => undefined);

    return () => {
      active = false;
    };
  }, []);

  return (
    <SectionContainer className="border-t border-brown-normal/30 py-10 md:py-14">
      <FadeInView>
        <SectionHeader
          title="Browse by interest"
          description="Find events that match your passion. From live music to tech talks, there's something for everyone."
          align="center"
          accent
        />
      </FadeInView>

      <StaggerGrid
        className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
        staggerMs={60}
      >
        {categories.map((category) => {
          const copy = describeCategory(category.name);
          return (
            <CategoryCard
              key={category.name}
              title={formatCategoryTitle(category.name)}
              icon={copy.icon}
              description={copy.description}
            />
          );
        })}
      </StaggerGrid>

      <FadeInView delay={150} className="mt-10 flex justify-center">
        <Link href="/categories">
          <Button
            text="View All Categories"
            variant="cta"
            iconRight={<ArrowRight className="h-4 w-4" aria-hidden="true" />}
          />
        </Link>
      </FadeInView>
    </SectionContainer>
  );
};

export default BrowseInterest;
