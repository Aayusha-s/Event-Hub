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

type CategoryItem = { name: string; count: number };

const categoryCopy: Record<
  string,
  { icon: React.ReactNode; description: string }
> = {
  music: {
    icon: <i className="fa-solid fa-music text-2xl" aria-hidden="true"></i>,
    description: "Live performances and festivals",
  },
  art: {
    icon: <i className="fa-solid fa-palette text-2xl" aria-hidden="true"></i>,
    description: "Exhibitions, galleries, and creative workshops",
  },
  tech: {
    icon: (
      <i className="fa-solid fa-laptop-code text-2xl" aria-hidden="true"></i>
    ),
    description: "Conferences, hackathons, and coding bootcamps",
  },
  sports: {
    icon: (
      <i className="fa-solid fa-basketball text-2xl" aria-hidden="true"></i>
    ),
    description: "Games, tournaments, and fitness events",
  },
  food: {
    icon: <i className="fa-solid fa-utensils text-2xl" aria-hidden="true"></i>,
    description: "Tastings, festivals, and culinary classes",
  },
  wellness: {
    icon: (
      <i className="fa-solid fa-heart-pulse text-2xl" aria-hidden="true"></i>
    ),
    description: "Yoga, meditation, and wellness retreats",
  },
  business: {
    icon: <i className="fa-solid fa-briefcase text-2xl" aria-hidden="true"></i>,
    description: "Networking events, seminars, and workshops",
  },
  education: {
    icon: (
      <i className="fa-solid fa-graduation-cap text-2xl" aria-hidden="true"></i>
    ),
    description: "Lectures, courses, and learning communities",
  },
  travel: {
    icon: <i className="fa-solid fa-plane text-2xl" aria-hidden="true"></i>,
    description: "Tours, adventures, and travel meetups",
  },
  gaming: {
    icon: <i className="fa-solid fa-gamepad text-2xl" aria-hidden="true"></i>,
    description: "Tournaments, conventions, and gaming nights",
  },
};

const describeCategory = (name: string) => {
  const key = name.toLowerCase().replace(/[^a-z]/g, "");
  return (
    categoryCopy[key] ?? {
      icon: (
        <i className="fa-solid fa-circle-nodes text-2xl" aria-hidden="true"></i>
      ),
      description: "Discover live events in this category",
    }
  );
};

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
              title={category.name}
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
