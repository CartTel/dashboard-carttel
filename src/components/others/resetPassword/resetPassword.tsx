"use client"


import React, { Suspense } from 'react'
import Spinner from '@/components/ui/Spinner/Spinner';

import Image from 'next/image'
import { CustomButton } from '@/components/custom-components';
import { CustomInput } from '@/components/custom-components';
import { B1, B2, H2, H1, BMiddle } from '@/components/custom-typography';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import Link from 'next/link';


function ResetPassword() {
    const [isToggle, setIsToggle] = useState<boolean>(true);
    const [confirmPasswordToggle, setConfirmPasswordToggle] = useState<boolean>(true);
    const changeConfirmPasswordToggle = () => setConfirmPasswordToggle(!confirmPasswordToggle);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter()
    const changeToggle = () => setIsToggle(!isToggle);

    // const [textValue, setTextValue] = useState<boolean>(false);

    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [text, setText] = useState<string>('');
    const [textValue, setTextValue] = useState<string>('');
    const [testOne, setTestOne] = useState<boolean>(false);
    const [testTwo, setTestTwo] = useState<boolean>(false);
    const [testThree, setTestThree] = useState<boolean>(false);
    const [testFour, setTestFour] = useState<boolean>(false);

    const handlePasswordChange = (value: any) => {        
        const userValue = value;
        setPassword(userValue);
        checkForTextOne(userValue);
        checkForTextTwo(userValue);
        checkForTextThree(userValue);
        checkForTextFour(userValue);
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

    


    // const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setConfirmPassword(e.target.value);
    // };




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
                                                changeToggle={changeToggle}
                                                showToggle={true}
                                                isToggle={isToggle}
                                                id='password'
                                                type={`${isToggle ? 'text' : 'password'}`}
                                                label='Password'
                                                className='mb-[0px]'
                                               
                                                // onChange={(value) => setFormData(prevFormData => ({
                                                //     ...prevFormData,
                                                //     password: value
                                                // }))}
                                                onChange={handlePasswordChange}
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
                                                changeToggle={changeConfirmPasswordToggle}
                                                showToggle={true}
                                                isToggle={confirmPasswordToggle}
                                                id='password'
                                                type={`${confirmPasswordToggle ? 'text' : 'password'}`}
                                                label='Confirm Password'
                                                
                                                // onChange={(value) => setFormData(prevFormData => ({
                                                //     ...prevFormData,
                                                //     confirmPassword: value
                                                // }))}
                                                className='mb-[20px]'
                                            />
                                        </div>
                                    </div>
                            
                                    <CustomButton
                                        // onClick={handleLoginUser}
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
            </div>
        </div>

    )
}

export default ResetPassword;