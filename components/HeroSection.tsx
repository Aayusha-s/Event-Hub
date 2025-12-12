import Link  from "next/link";
import Button from "./Button";

const HeroSection = () => {
    return (
        <section className="my-10 mx-5 px-4">
            <div className="flex flex-col text-text-dark items-center justify-center 
            border border-brown-normal rounded-[10px] p-5 
            bg-brown-light-hover leading-14">

                <h3 className="text-lg mt-4">Discover 10,000+ events happening near you</h3>

                <h1 className="text-4xl mt-5 w-1/2 text-center font-semibold">Find Your Next 
                </h1>

                <h1 className="text-4xl mt-5 w-1/2 text-center font-semibold">
                <span className="font-dynapuff border-b-6 rounded-xl tranform transition rotate-6">Unforgettable  </span> Experience</h1>

                <p className="text-base my-5 w-1/2 text-center">Discover events, connect with communities, and create memories that last a lifetime.
                    From concerts to conferences, find what moves you.</p>

                <Link href="/explore-events">
                <Button
                text="Explore Events"
                variant="cta"
                size="md"
                icon={<i className="fa-solid fa-arrow-right ml-2 "></i>}
                
                ></Button>
                </Link>

                <h4>Quick search • Personalized results • Secure booking</h4>
            </div>
        </section>
    )
}

export default HeroSection;