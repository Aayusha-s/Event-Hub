'use client';
import Link from "next/link";
import Button from "@/components/Button";
import Image from "next/image";
import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { CircleAlert, Lock, Mail } from "lucide-react";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const searchParams = useSearchParams();

    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [authError, setAuthError] = useState("");


    // email validation
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


    // password validation
    const validatePassword = (value: string): string => {
        if (!value) {
            return "Password is required!";
        }

        if (value.length < 8) {
            return "Password must be at least 8 characters long!";
        }
        return "";
    }


    // handle login
    const handleLogin = async () => {
        const emailValidation = validateEmail(email);
        const passwordValidation = validatePassword(password);

        setEmailError(emailValidation);
        setPasswordError(passwordValidation);
        setAuthError("");

        if (emailValidation || passwordValidation) {
            return;
        }

        const result = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        if (result?.error) {
            setAuthError("Invalid email or password.");
            return;
        }

        const callbackUrl = searchParams.get("callbackUrl") ?? "/";
        router.replace(callbackUrl);
        router.refresh();
    }

    {/* handle register button */ }
    const handleRegister = () => {
        router.push('/signup')
    }

    return (
        <section className="flex justify-center
        my-4 mx-2 px-4 font-cause text-text-dark 
            md:my-3 md:mx-3 md:px-3
            lg:my-4 lg:mx-4 lg:px-4
            xl:my-6 xl:mx-6 xl:px-6
            2xl:my-8 2xl:mx-8 2xl:px-8">

            <div className="w-full max-w-4xl border border-brown-light-active shadow-xl rounded-xl grid md:grid-cols-2 gap-2 bg-brown-light">

                {/* LEFT SIDE */}
                <div className="flex-1 items-center justify-center p-4 md:pr-2">
                    {/* logo + text */}
                    <div className="flex flex-col gap-4 mb-6 justify-center items-center">
                        <Link href="/">
                            <div className="relative w-[140px] h-20 flex items-center justify-center cursor-pointer">
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
                        <p className="text-md sm:text-base text-center font-bold">
                            Sign in to discover and manage your events
                        </p>
                    </div>

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

                        <div className="flex items-center justify-between">
                            <hr className="border border-brown-normal mt-2 w-23 md:w-15 lg:w-25 " />
                            <p className="text-center text-sm mt-2"> or continue with email</p>

                            <hr className="border border-brown-normal mt-2 w-23 md:w-15 lg:w-25 " />
                        </div>
                    </div>

                    {/* form */}

                    <div className="flex flex-col gap-4">
                        {/* email */}
                        <div>
                            <h2 className="font-bold">Email</h2>
                            <div className="flex items-center gap-2 p-2 border border-brown-normal rounded-md mt-1 focus:outline-brown-normal-active">
                                <Mail />
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full border-none rounded-md focus:outline-none"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value)
                                        setEmailError(validateEmail(e.target.value))
                                    }}
                                /></div>

                            {emailError && (
                                <div className="mt-2 flex items-center gap-1">
                                    <CircleAlert className="text-red-500" />
                                    <p className="text-sm text-red-500 ">{emailError}</p>
                                </div>
                            )}
                        </div>

                        {/* password */}
                        <div>
                            <h2 className="font-bold">Password</h2>
                            <div className="flex items-center gap-2 p-2 border border-brown-normal rounded-md mt-1">
                                <Lock />
                                <input
                                    type="password"
                                    placeholder="Enter your password"
                                    className="w-full border-none rounded-md focus:outline-none"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value)
                                        setPasswordError(validatePassword(e.target.value))

                                    }}
                                />
                            </div>

                            {passwordError && (
                                <div className="mt-2 flex items-center gap-1">
                                    <CircleAlert className="text-red-500" />
                                    <p className="text-sm text-red-500 ">{passwordError}</p>
                                </div>
                            )}
                        </div>

                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <input type="checkbox" id="rememberMe" name="rememberMe" />
                                <label htmlFor="rememberMe" className="text-sm cursor-pointer">Remember Me</label>
                            </div>

                            <div className="flex items-center gap-2">
                                <Button
                                    text="Forgot Password?"
                                    variant="secondary"
                                    size="sm"
                                    className="text-lg"
                                />
                            </div>
                        </div>

                        {authError && (
                            <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
                                {authError}
                            </div>
                        )}

                        <Button text="Login" variant="cta" size="md" onClick={handleLogin} />
                    </div>


                    <div className="mt-4 flex justify-center text-md gap-1">
                        Don&apos;t have an account?{" "}
                        <div className="text-brown-normal font-semibold hover:underline" onClick={handleRegister}>
                            Register
                        </div>
                    </div>
                </div>


                {/* DIVIDER */}

                {/* <div className="hidden md:block border-l border-brown-normal"></div> */}

                {/* RIGHT SIDE */}
                <div className="hidden flex-1 md:flex md:flex-col lg:flex lg:flex-col 
                    justify-center items-center p-4 rounded-lg text-center 
                    relative h-full w-full overflow-hidden">

                    {/* background layer */}
                    <div
                        className="absolute inset-0 
                        bg-[url('/images/doodle1.webp')] 
                        bg-center bg-repeat-y opacity-30
                        hidden md:block border-l-2 border-brown-normal">
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

            </div>
        </section>
    );
};

const Page = () => (
    <Suspense fallback={<div className="flex min-h-[50vh] items-center justify-center">Loading...</div>}>
        <LoginForm />
    </Suspense>
);

export default Page;

const Page = () => (
    <Suspense fallback={<div className="flex min-h-[50vh] items-center justify-center">Loading...</div>}>
        <LoginForm />
    </Suspense>
);

export default Page;
