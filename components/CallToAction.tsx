import Button from "./Button";

const CallToAction = () => {
    return (
        <section className="my-2 mx-2 px-4 font-cause text-text-dark 
            md:my-3 md:mx-3 md:px-3
            lg:my-4 lg:mx-4 lg:px-4
            xl:my-6 xl:mx-6 xl:px-6
            2xl:my-8 2xl:mx-8 2xl:px-8 flex items-center justify-center">

            <div className="flex flex-col 
            text-text-dark 
            items-center justify-center 
            border border-brown-normal rounded-[10px] 
            p-5 
            bg-brown-light-hover
            leading-14 w-full max-w-8xl mx-auto">
                <h1 className="text-4xl mt-5 w-full text-center font-semibold">Ready to Create Your
                    Next Event?</h1>

                <p className="text-base my-5 w-full md:w-2/2 lg:w-2/3 text-center leading-8">Join thousands of organizers who trust EventHub to bring their events to life.
                    Start hosting memorable experiences today.</p>

                <Button
                    text="Get Started"
                    variant="cta"
                    iconRight={
                        <i className="fa-solid fa-arrow-right ml-2 transition-transform duration-300 group-hover:translate-x-1"></i>
                    }>
                </Button>

            </div>
        </section>
    )
}

export default CallToAction;