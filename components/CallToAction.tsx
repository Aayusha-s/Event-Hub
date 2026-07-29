import Link from "next/link";

import { ArrowRight } from "lucide-react";

import Button from "./Button";

import SectionContainer from "./SectionContainer";

import FadeInView from "./motion/FadeInView";



const CallToAction = () => {

    return (

        <SectionContainer className="py-10 md:py-16">

            <FadeInView>

                <div className="surface-elevated mx-auto flex w-full max-w-3xl flex-col items-center px-6 py-10 text-center md:px-10 md:py-12">

                    <h2 className="text-2xl font-semibold tracking-tight text-text-dark sm:text-3xl">

                        Ready to create your next event?

                    </h2>



                    <p className="mt-4 max-w-lg text-base leading-relaxed text-text-light">

                        Join thousands of organizers who trust Vivnt to bring their events to life.

                        Start hosting memorable experiences today.

                    </p>



                    <Link href="/signup" className="mt-8">

                        <Button

                            text="Get Started"

                            variant="cta"

                            size="lg"

                            iconRight={<ArrowRight className="h-4 w-4" aria-hidden="true" />}

                        />

                    </Link>

                </div>

            </FadeInView>

        </SectionContainer>

    );

};



export default CallToAction;

