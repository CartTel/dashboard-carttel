"use client";

import Image from 'next/image'
import { CustomButton } from '@/components/custom-components';
import { CustomInput } from '@/components/custom-components';
import React from 'react'
import { B1, B2, H2, H1, BMiddle } from '@/components/custom-typography';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Spinner from '@/components/ui/Spinner/Spinner';
import Link from 'next/link';
import { useForgotPasswordMutation } from '@/store/onboarding';

import { z } from "zod";


const formSchema = z.object({
    email: z
        .string()
        .trim()
        .email("Invalid email format") // Customize error for invalid email
        .nonempty("Email is required"), // Shortcut for `min(1)`
});


// Define types for the form data
type FormSchema = z.infer<typeof formSchema>;


function ForgotPassword() {

    const [active, setActive] = useState<boolean>(true);
    const [formData, setFormData] = useState<FormSchema>({ email: ""});
    const [errors, setErrors] = useState<Partial<FormSchema>>({});

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter()

    // Handle input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name) {
            setFormData((prev) => ({ ...prev, [name]: value }));
        } else {
            console.error("Input element is missing the 'name' attribute.");
        }
    };

    const { mutate: forgotPassword } = useForgotPasswordMutation(
        (data) => {
            console.log('User logged in:', data);
            // router.push("/auth/register");
            // Redirect or update UI here
        },
        (error) => {
            console.error('Login error:', error);
            // Show error message
        }
    );

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrors({});

        console.log("first..", errors)

        // Validate using Zod
        const validation = formSchema.safeParse(formData);
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
            forgotPassword(formData)
            setActive(false)

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
                                <div className="items-center px-5 flex flex-col w-full max-w-md pb-16 z-10 justify-center">
                                    <h2 className="text-[3.95rem] text-[#6ba3f7] text-start leading-[4.5rem] font-medium mb-12 mt-10">
                                        Purchase<br />
                                        anywhere <br />
                                        in the World<br />
                                        and deliver directly to <br />
                                        Nigeria.
                                    </h2>

                                    <p className=" mb-10 text-start font-semibold text-purple-500">
                                        Enjoy fast, budget-friendly and stress-free shipping with CartTel.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {active && (
                    <div className="flex bg-white md:flex-1 min-h-screen flex-col w-full  justify-center items-center relative z-50">
                        <div className="flex  items-center justify-center h-screen lg:w-4/5 md:w-full">
                            <div className="w-full flex flex-col p-5 max-w-lg">
                                <div className=" w-full  flex flex-row justify-center">

                                    <div className=" text-start justify-start mx-auto text-primary cursor-pointer w-full flex">
                                        <div className="w-[200px]">
                                            <Image
                                                src={'/images/Logo/CARTEL.png'}
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

                                        Forgot your password? We’re here to help you recover it.
                                    </H1>

                                    <H2 className=" text-start text-gray-500 my-3">
                                        Please provide the email address linked to your account, and we’ll assist you in setting up a new password.
                                    </H2>
                                </div>

                                <div className="w-full flex-1 mt-4 ">
                                    <div className="">
                                        <form onSubmit={handleSubmit} className="space-y-6">
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

                                            </div>
                                            

                                            <CustomButton
                                                disabled={isLoading}
                                                type="submit" // Explicitly set as "submit"
                                                className="text-sm z-50 relative mt-5 tracking-wide font-semibold bg-primary text-gray-100 w-full rounded-lg hover:bg-secondary transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                                            >
                                                {/* {isLoading ? 'Logging in...' : 'Login'} */}
                                                <div>
                                                    {isLoading ? ( // Display spinner if userLoading is true
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
                                                            
                                                            <span className="ml-0">Send Email</span>
                                                        </div>
                                                    )}
                                                    

                                                </div>
                                            </CustomButton>
                                        </form>
                                        <H2 className="text-sm flex justify-end z-50 relative mt-4 text-gray-500">
                                            Back to
                                            <Link href="/auth/login" className="ml-1 cursor-pointer">
                                                <H2 className="text-primary cursor-pointer">
                                                    Login
                                                </H2>
                                            </Link>
                                        </H2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {!active && (
                    <div className="flex bg-white md:flex-1 min-h-screen flex-col w-full justify-center items-center relative z-50">
                        <div className="flex items-center justify-center h-screen lg:w-4/5 md:w-full">
                            <div className="w-full flex flex-col p-5 max-w-lg">


                                <div className="grid md:grid-cols-1 xs:grid-cols-1 justify-between">

                                    <H1 className=" font-semibold text-start text-primary">
                                        Check your email.
                                    </H1>

                                    <H2 className=" font-medium text-start text-gray-500 my-3">
                                        We have sent you an email with a link to reset your password.
                                    </H2>
                                </div>
                                <div className="w-full flex-1">
                                    <div
                                        // className="flex justify-end z-50 relative mt-4"
                                        className="text-sm z-50 relative mt-5 tracking-wide font-semibold bg-primary text-gray-100 w-full py-3 rounded-lg hover:bg-secondary transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none "
                                    >
                                        <Link
                                            href="/auth/login"
                                            className="flex justify-end z-50 relative w-fit"
                                        >
                                            <H2 className="text-white">Back to Login</H2>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>

    )
}


export default ForgotPassword