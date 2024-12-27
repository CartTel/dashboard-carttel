"use client"


import React, { Suspense, useEffect } from 'react'
import Spinner from '@/components/ui/Spinner/Spinner';

import Image from 'next/image'
import { CustomButton } from '@/components/custom-components';
import { CustomInput } from '@/components/custom-components';
import { B1, B2, H2, H1, BMiddle } from '@/components/custom-typography';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
// import { getToken } from '@/config/api';
import { apiCall } from '@/config/api-clients';
import axios from 'axios';
import { toast } from "@/hooks/use-toast";

import Link from 'next/link';


function ResetPassword({ userId }: { userId: string }) {

    const [tokenData, setTokenData] = useState<any>(null); // State to hold token data
    const [isToggle, setIsToggle] = useState<boolean>(true);
    const [confirmPasswordToggle, setConfirmPasswordToggle] = useState<boolean>(true);
    const changeConfirmPasswordToggle = () => setConfirmPasswordToggle(!confirmPasswordToggle);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter()
    const changeToggle = () => setIsToggle(!isToggle);

    const [showReset, setShowReset] = useState<boolean>(true);
    const [showError, setShowError] = useState<string>('');

    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [text, setText] = useState<string>('');
    const [textValue, setTextValue] = useState<string>('');
    const [testOne, setTestOne] = useState<boolean>(false);
    const [testTwo, setTestTwo] = useState<boolean>(false);
    const [testThree, setTestThree] = useState<boolean>(false);
    const [testFour, setTestFour] = useState<boolean>(false);


    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { value } = e.target;
        // Update the password state
        setPassword(value);
        // Call validation functions with the new password value
        checkForTextOne(value);
        checkForTextTwo(value);
        checkForTextThree(value);
        checkForTextFour(value);
    };

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { value } = e.target;
        setConfirmPassword(value);
    };

    const checkForTextOne = (userValue: string) => {
        // CHARACTER MUST BE MORE THAN 8 CHARACTER
        if (userValue.length > 5) {
            setText("Too Weak");
            setTextValue("At least 6 characters long, with one uppercase letter or one number");
            setTestOne(true);
        } else {
            setText("");
            setTextValue("");
            setTestOne(false);
        }
    };

    const checkForTextTwo = (userValue: string) => {
        // UPPERCASE
        if (userValue.length > 5 && /[A-Z]/.test(userValue)) {
            setText("Could be Stronger");
            setTextValue("");
            setTestTwo(true);
        } else {
            setTestTwo(false);
        }
    };

    const checkForTextThree = (userValue: string) => {
        // DIGIT
        if (userValue.length > 5 && /[A-Z]/.test(userValue) && /\d/.test(userValue)) {
            setText("Strong Password");
            setTestThree(true);
        } else {
            setTestThree(false);
        }
    };

    const checkForTextFour = (userValue: string) => {
        // SPECIAL CHARACTER
        if (userValue.length > 5 && /[A-Z]/.test(userValue) && /\d/.test(userValue) && /[!@#$%^&*]/.test(userValue)) {
            setText("Very Strong Password");
            setTestFour(true);
        } else {
            setTestFour(false);
        }
    };

    const getToken = async (id: number | string) => {
        
        try {
            const response = await apiCall.get("/api/v1/token/get-token/" + id);
            setShowReset(true)
            setShowError("")
            return response.data;
        } catch (error: Error | any) {
            console.error("Error Getting Token:", error);
            setShowError(error?.response?.data.message)

            setShowReset(false)
            toast({
                title: "Error",
                description: `${error?.response?.data.message}`,
                variant: "destructive",
            });
            // throw error;
        }
    };

    const getResetPassword = async () => {
        // console.log("all the params..", userId)
        try {

            const response = await apiCall.post("/api/v1/auth/resetpassword/" + userId, {
                password, confirmPassword
            });
            // console.log("all the response")

            toast({
                title: "Success",
                description: `${response?.data.auth.message}`,
                variant: "default",
            });

            router.push("/auth/login");
            // console.log("Reset Password Successfully:", response.data);
            return response.data;
        } catch (error: Error | any) {
            console.error("Error Getting Token:", error);
            setShowError(error?.response?.data.message)

            setShowReset(false)
            toast({
                title: "Error",
                description: `${error?.response?.data.message}`,
                variant: "destructive",
            });
            // throw error;
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (!password || !confirmPassword) {
                toast({
                    title: "Error",
                    description: 'Please fill in all required fields.',
                    variant: "destructive",
                });
                return;
            }

            // TESTING FOR PASSWORD MATCHING WITH CONFIRMPASSWORD
            if (password !== confirmPassword) {
                toast({
                    title: "Error",
                    description: 'password does not match with confirmPassword',
                    variant: "destructive",
                });
                return
            }

            // TESTING STRENGTH OF PASSWORD
            if (!testOne) {
                toast({
                    title: "Error",
                    description: 'Password must be at least 8 characters',
                    variant: "destructive",
                });
                return;
            }

            if (!testTwo) {
                toast({
                    title: "Error",
                    description: 'Password must include at least one uppercase letter',
                    variant: "destructive",
                });
                return;
            }

            if (!testThree) {
                toast({
                    title: "Error",
                    description: 'Password must include at least one number',
                    variant: "destructive",
                });
                return;
            }

            if (!testFour) {
                toast({
                    title: "Error",
                    description: 'Password must include at least one special character',
                    variant: "destructive",
                });
                return;
            }

            await getResetPassword()

        } catch (error) {
            // toast.error("User creation Failed");
            console.log("Apparently the Message..", error);
            // errRef.current.focus();
        }

    }

    useEffect(() => {
        const fetchTokenData = async () => {
            setIsLoading(true);
            try {
                const data = await getToken(userId);
                // console.log("all the request ..", data)
                setTokenData(data); // Set the fetched token data
            } catch (error) {
                console.error("Error fetching token data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTokenData();
    }, [userId]); // Fetch token data when userId changes

    if (isLoading) {
        return <Spinner />;
    }

    return (
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
                {
                    showReset && (
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
                                        Reset your Password.
                                    </H1>

                                    <H2 className=" text-start text-gray-500 my-3">
                                        Enter the email address associated with your account and we’ll help you set up a new password
                                    </H2>
                                </div>


                                <div className="w-full flex-1 mt-4 ">

                                    <div className="">
                                        <form action="" method="post" autoComplete="off">

                                            <div className="flex md:flex-col xs:flex-col gap-5 ">
                                                <div className={`form-group flex w-[100%] text-[1rem] my-0 flex-col`}>
                                                    <CustomInput
                                                        id="password"
                                                        name="password"
                                                        type={isToggle ? "text" : "password"}
                                                        label="Password"
                                                        required
                                                        value={password}
                                                        onChange={handlePasswordChange}
                                                        // errorMessage={errors.password}
                                                        showToggle={true}
                                                        isToggle={isToggle}
                                                        changeToggle={changeToggle}
                                                        showRequirement={true}
                                                        className="mb-[0px]"
                                                    />
                                                    <div className="flex justify-between flex-wrap mt-2">
                                                        <div className="ml-auto mt-2 w-min">
                                                            <div className="password-strength">
                                                                <div className="strength-bars flex items-center justify-center gap-1">
                                                                    <div className={`${testOne ? "bg-[#dc6969]" : "bg-[#b6a7a7]"} bar bar--weak filled h-[4px] w-6 rounded-l block`}>
                                                                    </div>

                                                                    <div className={`${testTwo ? "bg-[#ffe48c]" : "bg-[#b6a7a7]"} bar bar--normal filled h-[4px] w-6 rounded-l block`}>
                                                                    </div>

                                                                    <div className={`${testThree ? "bg-[#46c28e]" : "bg-[#b6a7a7]"} bar bar--strong filled h-[4px] w-6 rounded-l block`}>
                                                                    </div>

                                                                    <div className={`${testFour ? "bg-[#208058]" : "bg-[#b6a7a7]"} bar bar--stronger filled h-[4px] w-6 rounded-l block`}>
                                                                    </div>
                                                                    {/* <div className="bar bar--stronger bg-[#e0e0e0] h-[4px] w-6 rounded-l block"></div> */}

                                                                </div>
                                                                <p className="strength-text text-gray-600 text-xs whitespace-nowrap">
                                                                    {text}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={`form-group flex w-[100%] text-[1rem] my-0`}>
                                                    <CustomInput
                                                        id="confirmpassword"
                                                        name="confirmpassword"
                                                        type={confirmPasswordToggle ? "text" : "password"}
                                                        label="Confirm Password"
                                                        required
                                                        value={confirmPassword}
                                                        onChange={handleConfirmPasswordChange}
                                                        // errorMessage={errors.password}
                                                        showToggle={true}
                                                        isToggle={confirmPasswordToggle}
                                                        changeToggle={changeConfirmPasswordToggle}
                                                        showRequirement={true}
                                                        className="mb-[0px]"
                                                    />
                                                </div>
                                            </div>

                                            <CustomButton
                                                onClick={handleSubmit}
                                                className="text-sm z-50 relative mt-5 tracking-wide font-semibold bg-primary text-gray-100 w-full  rounded-lg hover:bg-secondary transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                                            >
                                                <H2 className="">Reset Password</H2>
                                            </CustomButton>
                                        </form>
                                        <H2 className="text-sm flex justify-start z-50 relative mt-4 text-gray-500">
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
                    )
                }

                {!showReset && (
                    <div className="flex bg-white md:flex-1 min-h-screen flex-col w-full justify-center items-center relative z-50">
                        <div className="flex items-center justify-center h-screen lg:w-4/5 md:w-full">
                            <div className="w-full flex flex-col p-5 max-w-lg">


                                <div className="grid md:grid-cols-1 xs:grid-cols-1 justify-between">

                                    <H1 className=" font-semibold text-start text-primary">
                                        Invalid or Expired Token.
                                    </H1>
                                    <BMiddle className='!text-red-500 my-2'>{showError}</BMiddle>

                                    <H2 className=" font-medium text-start text-gray-500 my-3">
                                        We could not verify your request because the token is either invalid, expired, or does not exist in our records. Please try again by requesting a new reset link or contacting support for assistance.
                                    </H2>
                                </div>
                                <div className="w-full flex-1">
                                    <div
                                        // className="flex justify-end z-50 relative mt-4"
                                        className="text-sm z-50 relative mt-5 tracking-wide font-semibold bg-primary text-gray-100 w-full py-3 rounded-lg hover:bg-secondary transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none "
                                    >
                                        <Link
                                            href="/auth/forgotPassword"
                                            className="flex justify-end z-50 relative w-fit"
                                        >
                                            <H2 className="text-white">Go Back to ForgotPassword</H2>
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

export default ResetPassword;