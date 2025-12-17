import Link from "next/link";
import Button from "./Button";

const HeroSection = () => {
    return (
        <section className='my-2 mx-2 px-4 font-cause text-text-dark 
            md:my-3 md:mx-3 md:px-3
            lg:my-4 lg:mx-4 lg:px-4
            xl:my-6 xl:mx-6 xl:px-6
            2xl:my-8 2xl:mx-8 2xl:px-8 flex items-center justify-center'>

            <div className="flex flex-col text-text-dark items-center justify-center 
                border border-brown-normal rounded-[10px] p-4
                bg-brown-light-hover leading-14
                w-full max-w-8xl mx-auto 2xl:space-y-2 space-y-0.5">


                <h3 className="text-base font-bold
                sm:text-sm md:text-md lg:text-lg xl:text-xl 2xl:text-xl">Discover 10,000+ events happening near you</h3>

                <h1 className="text-4xl mt-5 text-center font-semibold">Find Your Next</h1>

                <div className="flex flex-col gap-2 lg:flex-row lg:gap-4 md:flex-row md:gap-4 items-center justify-center">
                    <h1 className="text-4xl mt-5 text-center font-semibold">
                        <span className="font-dynapuff border-b-6 border-text-dark rounded-xl tranform transition rotate-6">
                            Unforgettable
                        </span>
                    </h1>
                    <span className="text-4xl mt-5 text-center font-semibold">Experience</span>
                </div>

                <div className="font-bold text-base my-4 md:my-6 lg:my-6 w-full md:w-3/4 lg:w-3/4 2xl:w-2/4 text-center px-2 md:px-6 lg:px-0
                sm:text-sm md:text-md lg:text-lg xl:text-xl 2xl:text-xl">

                    Discover events, connect with communities, and create memories that last a lifetime.
                    From concerts to conferences, find what moves you.
                </div>

                <Link href="/explore-events">
                    <div className="my-2">
                        <Button
                            text="Explore Events"
                            variant="cta"
                            size="md"
                            iconRight={<i className="fa-solid fa-arrow-right ml-2"></i>}
                        />
                    </div>
                </Link>

                <div className="w-full flex items-center justify-center 
                    text-sm mt-4 md:mt-6 lg:mt-6 font-bold
                    sm:text-sm md:text-md lg:text-lg xl:text-xl 2xl:text-xl">
                    <h4 >Quick search • Personalized results • Secure booking</h4>
                </div>
            </div>
        </section>
    )
}

export default HeroSection;