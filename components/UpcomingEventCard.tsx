import Button from "./Button";

type UpcomingEventCardProps = {
    img: string;
    imgAlt: string;
    title: string;
    date: string;
    location: string;
    time: string;
    tickets: string;
    onOpen: () => void;
    onClick?: () => void;
}

const UpcomingEventCard = ({
    img,
    imgAlt,
    title,
    date,
    location,
    time,
    tickets,
    onOpen,
    onClick,
}: UpcomingEventCardProps) => {
    return (
        <div
            className="group flex w-full cursor-pointer flex-col overflow-hidden rounded-xl border border-[#E07A5F]/20 bg-[#FDF1EC] p-3 transition-all duration-200 ease-out hover:border-[#E07A5F]/40 hover:bg-[#FFF9F5]"
            onClick={onClick}
        >
            <div className="flex gap-3 sm:gap-3.5">
                <div className="w-28 shrink-0 overflow-hidden rounded-lg border border-[#E07A5F]/15 bg-[#FAFAFA] sm:w-32">
                    <img src={img} alt={imgAlt} className="h-24 w-full object-cover sm:h-28" />
                </div>

                <div className="flex min-w-0 flex-1 flex-col justify-between gap-2">
                    <div className="space-y-1.5">
                        <h3 className="line-clamp-2 font-dynapuff text-base leading-tight text-[#222222] sm:text-lg">{title}</h3>

                        <p className="flex items-start gap-2 text-xs text-[#222222]/80">
                            <i className="fa-solid fa-calendar mt-0.5 text-[11px] text-[#E07A5F]"></i>
                            <span className="min-w-0 break-words">{date}</span>
                        </p>

                        <p className="flex items-start gap-2 text-xs text-[#222222]/80">
                            <i className="fa-solid fa-location-dot mt-0.5 text-[11px] text-[#E07A5F]"></i>
                            <span className="min-w-0 break-words">{location}</span>
                        </p>

                        <p className="flex items-start gap-2 text-xs text-[#222222]/80">
                            <i className="fa-solid fa-clock mt-0.5 text-[11px] text-[#E07A5F]"></i>
                            <span className="min-w-0 break-words">{time}</span>
                        </p>

                        <p className="flex items-start gap-2 text-xs text-[#222222]/80">
                            <i className="fa-solid fa-ticket mt-0.5 text-[11px] text-[#E07A5F]"></i>
                            <span className="min-w-0 break-words">{tickets}</span>
                        </p>
                    </div>

                    <div className="flex justify-end pt-1">
                        <Button onClick={onOpen} text="View Ticket" variant="cta" size="sm" className="h-8 px-3 text-xs sm:h-9 sm:px-4 sm:text-sm" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpcomingEventCard
