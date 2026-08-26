'use client';
import React, { useState } from 'react'
import Link from 'next/link';
import Button from '@/components/Button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { CircleAlert } from 'lucide-react';

const Page = () => {
    const [activeTab, setActiveTab] = useState<'attend' | 'host' | 'vendor'>('attend');

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [terms, setTerms] = useState(false);

    const [fullNameError, setFullNameError] = useState("");
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [termsError, setTermsError] = useState('');
    const [authError, setAuthError] = useState('');

    const router = useRouter();

    const handleSignup = async () => {
        const fullNameValidation = validateFullName(fullName);
        const emailValidation = validateEmail(email);
        const passwordValidation = validatePassword(password);
        const termsValidation = validateTerms(terms);


        setFullNameError(fullNameValidation)
        setEmailError(emailValidation)
        setPasswordError(passwordValidation)
        setTermsError(termsValidation)
        setAuthError('');

        if (fullNameValidation || emailValidation || passwordValidation || termsValidation) return;

        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: fullName, email, password, role: activeTab === 'host' ? 'organizer' : activeTab === 'vendor' ? 'vendor' : 'attendee' }),
        });

        const data = await response.json();
        if (!response.ok || !data.success) {
            setAuthError(data.error?.message ?? 'Unable to create account.');
            return;
        }

        const result = await signIn('credentials', {
            email,
            password,
            redirect: false,
        });

        if (result?.error) {
            setAuthError('Account created but sign in failed.');
            return;
        }

        router.replace(activeTab === 'host' ? '/organizerdashboard' : activeTab === 'vendor' ? '/vendordashboard' : '/userdashboard');
        router.refresh();
    }

    // handle full name

    const validateFullName = (value: string): string => {
        if (!value) {
            return "Full Name is required!";
        }

        if (value.length < 3) {
            return "Fullname must be at least 3 characters";
        }

        const nameRegex = /^[A-Za-z\s]+$/;

        if (!nameRegex.test(value)) {
            return "Fullname can only contain letters";
        }

        return "";


    }

    // handle email validation

    const validateEmail = (value: string): string => {
        if (!value) {
            return "Email is required!";
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(value)) {
            return "Invalid email format!";
        }
        return "";
    }

    // handle password validation
    const validatePassword = (value: string): string => {

        if (!value) return "Password is required!";

        if (value.length < 8) return "Password must be at least 8 characters long!";

        return "";

    }

    // handle terms validation 

    const validateTerms = (value: boolean): string => {
        if (!value) {
            return "Please agree to the terms & conditions!";
        }
        return "";
    }

    return (
        <section className="flex justify-center
            my-4 mx-2 px-4 font-cause text-text-dark 
            md:my-3 md:mx-3 md:px-3
            lg:my-4 lg:mx-4 lg:px-4
            xl:my-6 xl:mx-6 xl:px-6
            2xl:my-8 2xl:mx-8 2xl:px-8">

            <div className="w-full max-w-4xl border border-brown-light-active shadow-xl rounded-xl grid md:grid-cols-2 gap-2 bg-brown-light">

                {/* RIGHT SIDE */}
                <div className="hidden flex-1 md:flex md:flex-col lg:flex lg:flex-col 
                    justify-center items-center p-4 rounded-lg text-center 
                    relative h-full w-full overflow-hidden">

                    {/* background layer */}
                    <div
                        className="absolute inset-0 
                            bg-[url('/images/doodle1.webp')] 
                            bg-center bg-repeat-y opacity-30
                            hidden md:block border-r-2 border-brown-normal">
                    </div>

                    {/* content layer */}
                    <div className="relative z-10">
                        <h3 className="font-dynapuff font-bold text-3xl">
                            Discover Amazing Events
                        </h3>
                        <p className="font-semibold text-lg mt-4">
                            Join millions of people finding and creating unforgettable
                            experiences every day.
                        </p>
                    </div>
                </div>


                {/* LEFT SIDE */}
                <div className="flex-1 items-center justify-center p-4">
                    {/* logo + text */}
                    <div className="flex flex-col gap-4 mb-6 justify-center items-center">
                        <Link href="/">
                            <div className="relative w-[140px] h-20 flex items-center justify-center cursor-pointer">
                                <Image
                                    src="/VivntLogo.png"
                                    alt="Vivnt"
                                    fill
                                    className="scale-125 object-contain"
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


                    {/* options to choose as a attendee, vendor, or organizer */}
                    <div>
                        <p className='font-bold'>I want to...</p>
                        <div className="flex justify-between gap-2 mt-2 mb-4">
                            <Button
                                onClick={() => setActiveTab('attend')}
                                text="Attend Events"
                                variant="cta"
                                size="sm"
                                isActive={activeTab === 'attend'}
                            />
                            <Button
                                onClick={() => setActiveTab('host')}
                                text="Host Events"
                                variant="cta"
                                size="sm"
                                isActive={activeTab === 'host'}
                            />
                            <Button
                                onClick={() => setActiveTab('vendor')}
                                text='Be a Vendor'
                                variant="cta"
                                size="sm"
                                isActive={activeTab === 'vendor'}
                            />
                        </div>

                        {activeTab !== 'attend' && (
                            <p className="text-sm text-text-light mb-2">
                                {activeTab === 'host'
                                    ? "You'll be registered as an Attendee first, then we'll take you straight to the Organizer application. Your account is upgraded once it's approved."
                                    : "You'll be registered as an Attendee first, then we'll take you straight to the Vendor application. Your account is upgraded once it's approved."}
                            </p>
                        )}

                    </div>

                    {/*continue with google or github */}
                    <div className="flex flex-col gap-3 mb-4">
                        <Button
                            text="Continue with Google"
                            variant="cta"
                            size="md"
                            className="w-full"
                            iconLeft={<i className="fa-brands fa-google"></i>}
                        />
                        <Button
                            text="Continue with GitHub"
                            variant="cta"
                            size="md"
                            className="w-full"
                            iconLeft={<i className="fa-brands fa-github"></i>}
                        />

                        <div className="flex items-center gap-3 mt-2">
                            <hr className="flex-1 border border-brown-normal" />
                            <p className="text-sm">or</p>
                            <hr className="flex-1 border border-brown-normal" />
                        </div>

                    </div>

                    {/* form */}
                    <div className="flex flex-col gap-4">


                        {/* full name */}
                        <div>
                            <h2 className='font-bold'>Full Name</h2>
                            <input
                                type="text"
                                placeholder="Enter your full name"
                                className="w-full border border-brown-normal rounded-md p-2 mt-1"
                                value={fullName}
                                onChange={(e) => {
                                    setFullName(e.target.value)
                                    setFullNameError(validateFullName(e.target.value))
                                }}
                            />

                            {fullNameError && (
                                <div className="mt-2 flex items-center gap-1">
                                    <CircleAlert className="text-red-500" />
                                    <p className="text-sm text-red-500 ">{fullNameError}</p>
                                </div>
                            )}
                        </div>

                        {/* email */}
                        <div>
                            <h2 className='font-bold'>Email</h2>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full border border-brown-normal rounded-md p-2 mt-1"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value)
                                    setEmailError(validateEmail(e.target.value))
                                }}
                            />
                            {emailError && (
                                <div className="mt-2 flex items-center gap-1">
                                    <CircleAlert className="text-red-500" />
                                    <p className="text-sm text-red-500 ">{emailError}</p>
                                </div>
                            )}
                        </div>


                        {/* password  */}
                        <div>
                            <h2 className='font-bold'>Password</h2>
                            <input
                                type="password"
                                placeholder="Enter your password"
                                className="w-full border border-brown-normal rounded-md p-2 mt-1"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value)
                                    setPasswordError(validatePassword(e.target.value))
                                }}
                            />

                            {passwordError && (
                                <div className="mt-2 flex items-center gap-1">
                                    <CircleAlert className="text-red-500" />
                                    <p className="text-sm text-red-500 ">{passwordError}</p>
                                </div>
                            )}
                        </div>

                        {/* agree to terms */}
                        <div className="flex flex-col">
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="terms-condition"
                                    checked={terms}
                                    onChange={(e) => {
                                        setTerms(e.target.checked);
                                        setTermsError(validateTerms(e.target.checked));
                                    }}
                                />

                                <label htmlFor="terms-condition">
                                    I agree to the Terms and Conditions
                                </label>
                            </div>

                            {termsError && (
                                <div className="mt-2 flex items-center gap-1">
                                    <CircleAlert className="text-red-500" />
                                    <p className="text-sm text-red-500">{termsError}</p>
                                </div>
                            )}
                        </div>

                        {authError && (
                            <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
                                {authError}
                            </div>
                        )}

                        <Button text="Register" variant="cta" onClick={handleSignup} />
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

export default Page
