"use client";

import Image from 'next/image'
import { CustomButton, CustomInput } from '@/components/custom-components';
import React from 'react'
import { B1, B2, H2, H1, BMiddle } from '@/components/custom-typography';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Spinner from '@/components/ui/Spinner/Spinner';
import Link from 'next/link';
import axios from 'axios';

// import { ArrowRight } from "lucide-react";
import { object, z } from "zod";
import { useLoginMutation } from '@/store/onboarding';
import { loginSchema } from '@/Interface';


interface FormStep {
    name: string;
    index: number;
}


// Define types for the form data
type FormSchema = z.infer<typeof loginSchema>;

function Login() {

    const [formData, setFormData] = useState<FormSchema>({ email: "", password: "" });
    const [errors, setErrors] = useState<Partial<FormSchema>>({});
    const [isToggle, setIsToggle] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter()
    const changeToggle = () => setIsToggle(!isToggle);

    // const [currentFormKey, setCurrentFormKey] = useState<number | string>(localStorage.getItem("currentAuthPage") || 0);

    const [currentFormKey, setCurrentFormKey] = useState<number | string>(0);

    const [formSteps] = useState<FormStep[]>([
        { name: "User Login", index: 0 },
        { name: "Security Code", index: 1 },
    ]);

    const isThisForm = (formStepIndex: number) => {
        return currentFormKey === formSteps[formStepIndex].index;
    };

    // Handle input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name) {
            setFormData((prev) => ({ ...prev, [name]: value }));
        } else {
            console.error("Input element is missing the 'name' attribute.");
        }
    };

    const { mutate: login, isPending } = useLoginMutation(
        (data) => {

            const hasImport = data.user.roles.some((item: any) => item.name === "Import");
            const hasAdmin = data.user.roles.some((item: any) => 
                item.name === "Super Administrator" || item.name === "System Administrator"
            );
            const hasManager = data.user.roles.some((item: any) => item.name === "Manager");

            console.log("object", hasImport, hasAdmin, hasManager);

            if (hasImport) {
                localStorage.setItem("roles", "import")
            }
            if (hasAdmin) {
                localStorage.setItem("roles", "admin");
            }
            if (hasManager) {
                localStorage.setItem("roles", "manager")
            }



            console.log("renting in the building..", localStorage.getItem("roles"))

            if (data.user.userMfa) {
                router.replace(`/verify-mfa?email=${data.user.email}`);
                return;
            } else{
                if (hasImport) {
                    console.log("first")
                    router.push("/dashboard/import");
                }
                if (hasAdmin) {
                    console.log("second")
                    router.push("/dashboard/admin");
                }
                if (hasManager) {
                    console.log("third")
                    router.push("/dashboard/manager");
                }
                // router.push("/dashboard")
            }
        },
        (error) => {
            console.error('Login error:', error);
        }
    );

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrors({});

        console.log("first..", errors)

        // Validate using Zod
        const validation = loginSchema.safeParse(formData);
        if (!validation.success) {
            // Map Zod errors to display on the form
            const fieldErrors: Partial<FormSchema> = {};
            validation.error.errors.forEach((error) => {
                const field = error.path[0] as keyof FormSchema;
                fieldErrors[field] = error.message;
            });
            setErrors(fieldErrors);
            return;
        }

        // If validation succeeds, proceed with API call
        setIsLoading(true);
        try {
            login(formData)

            // Redirect to the dashboard or another page
        } catch (error) {
            console.log("error in the code ..", error)
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full min-h-screen pt-0">
            {isLoading && <Spinner />}
            <div className="flex relative">
                <div className="border hidden md:flex-1 lg:inline-block opacity-90 bg-white max-w-2xl">

                    <div className=" flex-col z-10 flex justify-center items-center">
                        <div className="absolute left-0 bg-slate-300 bg-opacity-40 w-full h-screen"></div>
                        <div className="bg-center bg-no-repeat bg-contain opacity-100 w-full min-h-screen"></div>
                        <div className="flex justify-center items-center absolute ">

                            <Image
                                src={'/images/Auth/star1.svg'}
                                alt="logo"
                                width={40}
                                height={40}
                                priority
                                className=" md:block absolute top-96 z-10 left-96 animated bounceInDown"
                            />
                            <Image
                                src={'/images/Auth/circle1.svg'}
                                alt="logo"
                                width={30}
                                height={30}
                                priority
                                className=" md:block absolute top-40 z-30 left-80 animated bounceInDown"
                            />
                            <Image
                                src={'/images/Auth/circle2.svg'}
                                alt="logo"
                                width={30}
                                height={30}
                                priority
                                className="md:block absolute top-44 left-20 z-10 animated bounceInUp"
                            />


                            <div className="flex flex-col h-full w-full">
                                <div className="items-center px-5 flex flex-col w-full max-w-md pb-[0px] z-10 justify-center">
                                    <h2 className="text-[3.95rem] text-[#6ba3f7] text-start leading-[4.5rem] font-medium mb-12 mt-10">
                                        Purchase<br />
                                        anywhere <br />
                                        in the World<br />
                                        and deliver directly to <br />
                                        Nigeria.
                                    </h2>
                                    {/* text-[#332f41] */}
                                    <p className=" mb-10 text-start font-semibold text-purple-500">
                                        Enjoy fast, budget-friendly and stress-free shipping with CartTel.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex bg-white md:flex-1 min-h-screen flex-col w-full  justify-center items-center relative z-50">
                    <div className="flex  items-center justify-center h-screen lg:w-4/5 md:w-full">
                        <div className="w-full flex flex-col p-5 max-w-lg">
                            <div className=" w-full  flex flex-row justify-center">
                                <div className=" text-start justify-start mx-auto text-primary cursor-pointer w-full flex">
                                    <div className="w-[200px]">
                                        <Image
                                            src={'/images/Logo/CARTEL-removebg.png'}
                                            alt="logo"
                                            width={136}
                                            height={60}
                                            priority
                                            className="text-[1px] md:w-full md:h-full xs:w-full xs:h-full"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-1 xs:grid-cols-1 justify-between">
                                <H1 className=" font-semibold text-start text-primary">
                                    Welcome back to CartTel.
                                </H1>

                                <H2 className=" text-start text-gray-500 my-3">
                                    An account, with powerful, personalised tools all in one place.
                                </H2>
                            </div>


                            {isThisForm(0) && (
                                <div className="w-full flex-1 mt-4 ">
                                    <div className="hidden flex-col items-center ">
                                        <button className="w-full font-medium shadow-sm rounded-lg py-1 bg-gray-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
                                            <div className="bg-white p-2 rounded-full">
                                                <svg className="w-4" viewBox="0 0 533.5 544.3">
                                                    <path
                                                        d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                                                        fill="#4285f4"
                                                    />
                                                    <path
                                                        d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                                                        fill="#34a853"
                                                    />
                                                    <path
                                                        d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                                                        fill="#fbbc04"
                                                    />
                                                    <path
                                                        d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                                                        fill="#ea4335"
                                                    />
                                                </svg>
                                            </div>
                                            <span

                                                className="ml-4 xs:text-xs xl:text-sm font-medium text-start my-0"
                                            >Sign In with Google</span>

                                        </button>
                                    </div>

                                    <div className='hidden justify-center items-center h-[1px] my-10 w-full bg-[#d5d1d1] text-center font-[500] '>
                                        <span className='bg-white px-5 py-5 text-gray-600'>Or</span>
                                    </div>

                                    <div className="">
                                        <form onSubmit={handleSubmit} className="space-y-6">
                                            {/* Email Input */}
                                            <div className="group relative mt-5">

                                                <CustomInput
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    label="Email Address"
                                                    required
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    // errorMessage={errors.email}
                                                    showRequirement={true}
                                                    className="px-0 mb-[5px] md:w-full xs:w-full text-[16px]"
                                                />
                                                {errors && (
                                                    <p className="mt-1 text-sm text-red-600 error-message">{errors.email}</p>
                                                )}
                                            </div>

                                            {/* Password Input */}
                                            <div className="group relative mt-5">
                                                <CustomInput
                                                    id="password"
                                                    name="password"
                                                    type={isToggle ? "text" : "password"}
                                                    label="Password"
                                                    required
                                                    value={formData.password}
                                                    onChange={handleChange}
                                                    // errorMessage={errors.password}
                                                    showToggle={true}
                                                    isToggle={isToggle}
                                                    changeToggle={changeToggle}
                                                    showRequirement={true}
                                                    className="mb-[0px]"
                                                />
                                                {errors && (
                                                    <p className="mt-1 text-sm text-red-600 error-message">{errors.password}</p>
                                                )}
                                            </div>
                                            <div className="flex justify-end z-50 relative mt-4 ">
                                                <Link
                                                    href="/auth/forgotPassword"
                                                    className="flex justify-end z-50 relative  w-fit"
                                                >
                                                    <H2 className="text-primary ">Forgot Password?</H2>
                                                </Link>
                                            </div>


                                            <CustomButton
                                                disabled={isPending}
                                                type="submit" // Explicitly set as "submit"
                                                className="text-sm z-50 relative mt-5 tracking-wide font-semibold bg-primary text-gray-100 w-full rounded-lg hover:bg-secondary transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                                            >
                                                {/* {isPending ? 'Logging in...' : 'Login'} */}
                                                <div>
                                                    {isPending ? ( // Display spinner if userLoading is true
                                                        <div className="flex items-center px-6">
                                                            <div>

                                                                <Image
                                                                    src={'/images/Spinner.svg'}
                                                                    alt="logo"
                                                                    width={60}
                                                                    height={60}
                                                                    priority
                                                                    className="text-[1px] md:w-full md:h-full xs:w-full xs:h-full"
                                                                />

                                                            </div>

                                                        </div>
                                                    ) : (
                                                        <div className='flex'>
                                                            <div className="text-xl">
                                                                <Image
                                                                    src="/images/Auth/login.svg"
                                                                    alt="logo"
                                                                    width={20}
                                                                    height={20}
                                                                    priority
                                                                    style={{ filter: "invert(100%) brightness(1000%)" }}
                                                                />
                                                            </div>
                                                            <span className="ml-3">Sign In</span>
                                                        </div>
                                                    )}


                                                </div>
                                            </CustomButton>

                                        </form>

                                        <H2 className="text-sm flex justify-start z-50 relative mt-4 text-gray-500">
                                            Don’t have an account?
                                            <Link href="/auth/register" className="ml-1 cursor-pointer">
                                                <H2 className="text-primary cursor-pointer">
                                                    Register here
                                                </H2>
                                            </Link>
                                        </H2>

                                        <B2 className="text-xs dark:text-slate- font-normal mt-7">
                                            By signing in, you agree to our{" "}
                                            <a className="text-primary hover:underline" href="#">
                                                Terms of Service
                                            </a>{" "}
                                            and{" "}
                                            <a className="text-primary hover:underline" href="#">
                                                Privacy Policy
                                            </a>
                                            .
                                        </B2>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}


export default Login