import Button from "./Button";

const CallToAction = () => {
    return (
        <section className="my-10 mx-5 px-4">
            <div className="flex flex-col 
            text-text-dark 
            items-center justify-center 
            border border-brown-normal rounded-[10px] 
            p-5 
            bg-brown-light-hover
            leading-14">
                <h1 className="text-4xl mt-5 w-1/2 text-center font-semibold">Ready to Create Your
                    Next Event?</h1>

                <p className="text-base my-5 w-1/2 text-center leading-8">Join thousands of organizers who trust EventHub to bring their events to life.
                    Start hosting memorable experiences today.</p>

                <Button
                    text="Get Started"
                    variant="cta"
                    icon={
                    <i className="fa-solid fa-arrow-right ml-2 transition-transform duration-300 group-hover:translate-x-1"></i>
                    }>
                </Button>

            </div>
        </section>
    )
}

export default CallToAction;