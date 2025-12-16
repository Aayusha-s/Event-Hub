import React from 'react'
import Link from 'next/link';
import Button from '@/components/Button';
import Image from 'next/image';

const page = () => {
    return (
        <section className="flex justify-center
        my-4 mx-2 px-4 font-cause text-text-dark 
            md:my-3 md:mx-3 md:px-3
            lg:my-4 lg:mx-4 lg:px-4
            xl:my-6 xl:mx-6 xl:px-6
            2xl:my-8 2xl:mx-8 2xl:px-8">

            <div className="w-full max-w-4xl border-2 border-brown-normal rounded-xl p-4 flex gap-10 bg-brown-light">

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




                {/* DIVIDER */}
                <div className="hidden md:block lg:block border border-brown-normal"></div>


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
                            Create Your Account
                        </h3>
                        <p className="text-md sm:text-base md:text-base lg:text-base font-bold">
                            Join the community and start exploring
                        </p>
                    </div>

                    {/* form */}
                    <div className="flex flex-col gap-4">

                        <div>
                            <h2 className='font-bold'>Full Name</h2>
                            <input
                                type="text"
                                placeholder="Enter your full name"
                                className="w-full border border-brown-normal rounded-md p-2 mt-1"
                            />
                        </div>

                        <div>
                            <h2 className='font-bold'>Email</h2>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full border border-brown-normal rounded-md p-2 mt-1"
                            />
                        </div>

                        <div>
                            <h2 className='font-bold'>Password</h2>
                            <input
                                type="password"
                                placeholder="Enter your password"
                                className="w-full border border-brown-normal rounded-md p-2 mt-1"
                            />
                        </div>

                        <div className='flex items-center gap-2 mt-2'>
                            <input
                                type="checkbox"
                                className="border border-brown-normal rounded-md "
                            />
                            <label>I agree to the Terms and Conditions</label>
                        </div>
                        <Button text="Register" variant="cta" />
                    </div>
                    

                    <div className="mt-4 flex justify-center text-md gap-1">
                        Already have an account?{" "}
                        <Link href="/login" className="text-brown-normal font-semibold">
                            Login Here
                        </Link>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default page
