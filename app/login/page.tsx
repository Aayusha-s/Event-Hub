import Link from "next/link";
import Button from "@/components/Button";
import Image from "next/image";

const page = () => {
    return (
        <section className="flex justify-center
        my-4 mx-2 px-4 font-cause text-text-dark 
            md:my-3 md:mx-3 md:px-3
            lg:my-4 lg:mx-4 lg:px-4
            xl:my-6 xl:mx-6 xl:px-6
            2xl:my-8 2xl:mx-8 2xl:px-8">

            <div className="w-full max-w-4xl border border-brown-normal rounded-xl p-4 flex gap-10 bg-brown-light">

                {/* LEFT SIDE */}
                <div className="flex-1">
                    {/* logo + text */}
                    <div className="flex flex-col gap-4 mb-6 justify-center items-center">
                        <Link href="/">
                            <div className="relative w-[140px] h-[80px] flex items-center justify-center cursor-pointer">
                                <Image
                                    src="/images/logo.png"
                                    alt="EventHub Logo"
                                    fill
                                    style={{ objectFit: 'contain' }}
                                    sizes="130px"
                                />
                            </div>
                        </Link>

                        <h3 className="font-dynapuff text-2xl sm:text-3xl md:text-3xl lg:text-3xl font-semibold">
                            Welcome Back
                        </h3>
                        <p className="text-md sm:text-base md:text-base lg:text-base font-bold">
                            Sign in to discover and manage your events
                        </p>
                    </div>

                    {/* form */}
                    <div className="flex flex-col gap-4">
                        <div>
                            <h2 className="font-bold">Email</h2>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full border border-brown-normal rounded-md p-2 mt-1"
                            />
                        </div>

                        <div>
                            <h2 className="font-bold">Password</h2>
                            <input
                                type="password"
                                placeholder="Enter your password"
                                className="w-full border border-brown-normal rounded-md p-2 mt-1"
                            />
                        </div>
                        <Button text="Login" variant="cta" size="md" />
                    </div>


                    <div className="mt-4 flex justify-center text-md gap-1">
                        Don't have an account?{" "}
                        <Link href="/signup" className="text-brown-normal font-semibold">
                            Register
                        </Link>
                    </div>
                </div>

                {/* DIVIDER */}
                <div className="hidden md:block lg:block border border-brown-normal"></div>

                {/* RIGHT SIDE */}
                <div className="hidden flex-1 md:flex md:flex-col lg:flex lg:flex-col justify-center items-center 
                p-6 rounded-lg bg-linear-to-b from-gray-300 to-brown-400 text-center">
                    <h3 className="font-dynapuff font-bold text-3xl">
                        Discover Amazing Events
                    </h3>
                    <p className="font-semibold text-lg mt-4">
                        Join millions of people finding and creating unforgettable
                        experiences every day.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default page;
