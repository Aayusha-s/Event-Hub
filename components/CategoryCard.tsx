import Button from "./Button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type CategoryCardProps = {
    title: string;
    icon: React.ReactNode;
    description: string;
};

const CategoryCard = ({ title, icon, description }: CategoryCardProps) => {
    return (
        <div
            className={cn(
                "group surface-card motion-card-lift flex min-h-[160px] flex-col p-4 md:min-h-[180px] md:p-5"
            )}
        >
            <div className="mb-3 flex items-start justify-between gap-2">
                <h3 className="text-base font-semibold text-text-dark transition-colors duration-200 group-hover:text-brown-darker md:text-lg">
                    {title}
                </h3>
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brown-light text-brown-dark transition-colors duration-200 group-hover:bg-brown-light-hover">
                    {icon}
                </div>
            </div>

            <p className="mb-4 line-clamp-3 flex-1 text-sm leading-relaxed text-text-light">
                {description}
            </p>

            <Link href="/categories" className="mt-auto">
                <Button
                    text="Explore"
                    variant="secondary"
                    size="sm"
                    iconRight={<ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />}
                    className="!h-auto !px-0 !text-sm"
                />
            </Link>
        </div>
    );
};

export default CategoryCard;
