import Button from "./Button";

type CategoryCardProps = {
    title: string;
    icon: React.ReactNode;
    description: string;
};

const CategoryCard = ({ title, icon, description }: CategoryCardProps) => {
    return (
        <section className="text-text-dark">
            
            <div className="border border-brown-normal rounded-[10px] p-3 my-2 w-[200px] h-[200px] flex flex-col justify-between">
                
                {/* Title and icon */}
                <div className="flex flex-row items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold">{title}</h3>
                    {icon}
                </div>

                {/* Description */}
                <p className="text-sm leading-relaxed overflow-hidden text-ellipsis h-[60px] mb-4">
                    {description}
                </p>

                {/* Button */}
                <Button
                    text="Explore Now"
                    variant="cta"
                    size="sm"
                    icon={<i className="fa-solid fa-arrow-right ml-2"></i>}
                />
            </div>
        </section>
    );
};

export default CategoryCard;
