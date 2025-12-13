import Link from "next/link";
import Button from "@/components/Button";

const page = () => {
    return (
        <section className="font-cause text-text-dark my-10 flex justify-center">
            <div className="w-full max-w-4xl border-2 border-brown-normal rounded-xl p-10 flex gap-10 bg-brown-light">

                {/* LEFT SIDE */}
                <div className="flex-1">
                    {/* logo + text */}
                    <div className="flex flex-col gap-6 mb-8">
                        <Link href="/">
                            <img
                                src="/images/logo.png"
                                alt="Logo"
                                className="w-[200px] h-[100px] cursor-pointer"
                            />
                        </Link>

                        <h3 className="font-dynapuff text-2xl font-semibold">
                            Welcome Back
                        </h3>
                        <p className="text-lg">
                            Sign in to discover and manage your events
                        </p>
                    </div>

                    {/* form */}
                    <div className="flex flex-col gap-4">
                        <div>
                            <h2>Email</h2>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full border border-brown-normal rounded-md p-2 mt-1"
                            />
                        </div>

                        <div>
                            <h2>Password</h2>
                            <input
                                type="password"
                                placeholder="Enter your password"
                                className="w-full border border-brown-normal rounded-md p-2 mt-1"
                            />
                        </div>
                    </div>

                    <div className="mt-5">

                    <Button text="Login" variant="cta" />
                    </div>

                    <p className="mt-4">
                        Don’t have an account?{" "}
                        <Link href="/signup" className="text-brown-normal font-semibold">
                            Register
                        </Link>
                    </p>
                </div>

                {/* DIVIDER */}
                <div className="border border-brown-normal"></div>

                {/* RIGHT SIDE */}
                <div className="flex-1 flex flex-col justify-center items-center 
                p-6 rounded-lg bg-gradient-to-b from-gray-300 to-brown-400 text-center">
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
