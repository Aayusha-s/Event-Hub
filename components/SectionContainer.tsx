import { cn } from "@/lib/utils";

type SectionContainerProps = {
    children: React.ReactNode;
    className?: string;
    id?: string;
};

const SectionContainer = ({ children, className, id }: SectionContainerProps) => {
    return (
        <section
            id={id}
            className={cn(
                "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8",
                className
            )}
        >
            {children}
        </section>
    );
};

export default SectionContainer;
