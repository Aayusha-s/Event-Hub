import Button from "./Button";

type CategoryCardProps = {
    title: string;
    icon: React.ReactNode;
    description: string;
};

const CategoryCard = ({ title, icon, description }: CategoryCardProps) => {
    return (
        <div className="border border-brown-normal rounded-xl p-4 md:p-5 lg:p-6
            flex flex-col justify-between
            w-full h-auto min-h-[180px] md:min-h-[200px]
            hover:shadow-md hover:border-brown-dark transition-all duration-300
            bg-white">
            
            {/* Title and icon */}
            <div className="flex flex-row items-center justify-between mb-3 md:mb-4">
                <h3 className="text-base md:text-lg font-semibold truncate pr-2">
                    {title}
                </h3>
                <div className="text-brown-dark text-lg md:text-xl">
                    {icon}
                </div>
            </div>

            {/* Description */}
            <p className="text-sm md:text-base text-text-dark/70 
                leading-relaxed line-clamp-3 md:line-clamp-4 
                mb-4 md:mb-6 grow">
                {description}
            </p>

            {/* Button  */}
            <Button
                text="Explore Now"
                variant="cta"
                size="sm"
                iconRight={<i className="fa-solid fa-arrow-right ml-2"></i>}
            />
        </div>
    );
};

export default CategoryCard;