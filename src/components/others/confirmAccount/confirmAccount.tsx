/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState, useMemo, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";


import Spinner from '@/components/ui/Spinner/Spinner';

import { CustomButton } from "@/components/custom-components";
import { B1, B2, H1, SecondaryText, H2 } from "@/components/custom-typography";

import Image from "next/image";
import Link from "next/link";
import { apiCall } from "@/config/api-clients";
import { toast } from "@/hooks/use-toast";
import { useSearchParams, useRouter } from "next/navigation";

const RE_DIGIT = /^\d+$/;

function ConfirmAccount() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [currentQuery, setCurrentQuery] = useState("");
    const [currentUserId, setCurrentUserId] = useState<number | string>("");
    // const navigate = useNavigate();
    const valueLength = 4;
    const [otp, setOtp] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [showError, setShowError] = useState<string>("");
    const [verificationData, setVerificationData] = useState<any>(null); // State to hold token data

    useEffect(() => {
        const code = searchParams.get("code");

        const user = searchParams.get("userId");

        if (code && user) {
            setCurrentUserId(user);
            setCurrentQuery(code); // This will trigger the next useEffect
        } else {
            // Handle the case where no code is provided
            setShowError("No verification code provided.");
        }
    }, [searchParams]);

    const valueItems = useMemo(() => {
        const valueArray = otp.split("");
        const items: string[] = [];

        for (let i = 0; i < valueLength; i++) {
            const char = valueArray[i];
            items.push(RE_DIGIT.test(char) ? char : "");
        }

        return items;
    }, [otp, valueLength]);

    const focusToNextInput = (target: HTMLInputElement) => {
        const nextElementSibling = target.nextElementSibling as HTMLInputElement;
        if (nextElementSibling) {
            nextElementSibling.focus();
        }
    };

    const focusToPrevInput = (target: HTMLInputElement) => {
        const previousElementSibling =
            target.previousElementSibling as HTMLInputElement;
        if (previousElementSibling) {
            previousElementSibling.focus();
        }
    };

    const onChange = (value: string) => setOtp(value);

    const inputOnChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        idx: number
    ) => {
        const target = e.target;
        let targetValue = target.value.trim();
        const isTargetValueDigit = RE_DIGIT.test(targetValue);

        if (!isTargetValueDigit && targetValue !== "") return;

        const nextInputEl = target.nextElementSibling as HTMLInputElement;

        if (!isTargetValueDigit && nextInputEl && nextInputEl.value !== "") {
            return;
        }

        targetValue = isTargetValueDigit ? targetValue : " ";

        const newValue =
            otp.substring(0, idx) + targetValue + otp.substring(idx + 1);

        onChange(newValue);

        if (isTargetValueDigit) {
            focusToNextInput(target);
        }
    };

    const inputOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const { key } = e;
        const target = e.target as HTMLInputElement;

        if (key === "ArrowRight" || key === "ArrowDown") {
            e.preventDefault();
            return focusToNextInput(target);
        }

        if (key === "ArrowLeft" || key === "ArrowUp") {
            e.preventDefault();
            return focusToPrevInput(target);
        }

        const targetValue = target.value;

        target.setSelectionRange(0, targetValue.length);

        if (key === "Backspace" && targetValue === "") {
            focusToPrevInput(target);
        }
    };

    const inputOnFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        const { target } = e;
        const prevInputEl = target.previousElementSibling as HTMLInputElement;

        if (prevInputEl && prevInputEl.value === "") {
            return prevInputEl.focus();
        }

        target.setSelectionRange(0, target.value.length);
    };

    const bruteForceAttack = (securityCode: string) => {
        let found = false;
        let attempts = 0;

        while (!found) {
            const randomCode = Math.floor(1000 + Math.random() * 9000).toString();

            if (randomCode === securityCode) {
                found = true;
                console.log("Matched code:", randomCode);
                console.log("Attempts:", attempts);
            }

            attempts++;
        }
    };

    const getVerification = async (query: string) => {

        try {
            const response = await apiCall.get(
                `/api/v1/verification/get-verification/${query}`
            );
            setShowError("");
            toast({
                title: "Success",
                description: `${response.data.message}`,
                variant: "default",
            });
            return response.data;
        } catch (error: Error | any) {
            console.error("Error Getting Token:", error);
            setShowError(error?.response?.data.message || "An error occurred");

            toast({
                title: "Error",
                description: `${error?.response?.data.message || "An error occurred"}`,
                variant: "destructive",
            });
            throw error; // Ensure to throw the error to be caught in the calling function
        }
    };

    const resendCode = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await apiCall.post(`/api/v1/auth/resend-code`, { currentUserId });
            setShowError("");
            toast({
                title: "Success",
                description: `${response.data.message}`,
                variant: "default",
            });
            return response.data;
        } catch (error: Error | any) {
            console.error("Error Getting Token:", error);
            setShowError(error?.response?.data.message || "An error occurred");

            toast({
                title: "Error",
                description: `${error?.response?.data.message || "An error occurred"}`,
                variant: "destructive",
            });
            throw error; // Ensure to throw the error to be caught in the calling function
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // If validation succeeds, proceed with API call
        setIsLoading(true);

        try {
            setIsLoading(true);
            try {
                if (!otp) {
                    toast({
                        title: "Error",
                        description: 'Please fill in all required fields.',
                        variant: "destructive",
                    });
                    return;
                }

                const response = await apiCall.post(`/api/v1/auth/security-code`, { otp });
                setShowError("");
                toast({
                    title: "Success",
                    description: `${response.data.message}`,
                    variant: "default",
                });
                router.push("/auth/login");
                return response.data;

                // Redirect to the dashboard or another page
            } catch (error:any) {
                toast({
                    title: "Error",
                    description: `${error?.response?.data.message || "An error occurred"}`,
                    variant: "destructive",
                });
                console.log("error in the code ..", error)
            } finally {
                setIsLoading(false);
            }

        } catch (error) {
            // toast.error("User creation Failed");
            console.log("Apparently the Message..", error);
            // errRef.current.focus();
        }

    }

    useEffect(() => {
        const fetchTokenData = async () => {
            if (!currentQuery) return; // Prevent fetching if currentQuery is null

            setIsLoading(true);
            try {
                const data = await getVerification(currentQuery);
                setVerificationData(data); // Set the fetched token data
            } catch (error) {
                console.error("Error fetching token data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTokenData();
    }, [currentQuery]);

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
                                src={"/images/Auth/star1.svg"}
                                alt="logo"
                                width={40}
                                height={40}
                                priority
                                className=" md:block absolute top-96 z-10 left-96 animated bounceInDown"
                            />
                            <Image
                                src={"/images/Auth/circle1.svg"}
                                alt="logo"
                                width={30}
                                height={30}
                                priority
                                className=" md:block absolute top-40 z-30 left-80 animated bounceInDown"
                            />
                            <Image
                                src={"/images/Auth/circle2.svg"}
                                alt="logo"
                                width={30}
                                height={30}
                                priority
                                className="md:block absolute top-44 left-20 z-10 animated bounceInUp"
                            />

                            <div className="flex flex-col h-full w-full">
                                <div className="items-center px-5 flex flex-col w-full max-w-md pb-16 z-10 justify-center">
                                    <h2 className="text-[3.95rem] text-[#6ba3f7] text-start leading-[4.5rem] font-medium mb-12 mt-10">
                                        Purchase
                                        <br />
                                        anywhere <br />
                                        in the World
                                        <br />
                                        and deliver directly to <br />
                                        Nigeria.
                                    </h2>
                                    {/* text-[#332f41] */}
                                    <p className=" mb-10 text-start font-semibold text-purple-500">
                                        Enjoy fast, budget-friendly and stress-free shipping with
                                        CartTel.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex bg-white md:flex-1 min-h-screen flex-col w-full  justify-center items-center relative z-50">
                    <div className="flex items-start md:w-[700px] justify-center mt-24 lg:w-4/5 px-2">
                        <div className="w-[100%]  flex justify-center md:px-10 xs:px-2 py-10 flex-col items-center !my-10  xs:w-full overflow-x-auto mt-[36px]">
                            <div className="grid md:grid-cols-1 xs:grid-cols-1 justify-between">
                                <H1 className="xs:text-xs lg:text-sm font-medium text-center text-gray-500 my-3">
                                    Please enter the verification code sent to your email below to
                                    verify your account.
                                </H1>
                            </div>

                            <div className="  w-full flex-1 mt-4">
                                <div className="flex flex-col w-full">
                                    <div className=" flex flex-col items-center">
                                        <form className="form w-full ">
                                            <div className="flex justify-center items-center md:space-x-4 xs:space-x-3 w-full ">
                                                {valueItems.map((digit, index) => {
                                                    return (
                                                        <input
                                                            key={index}
                                                            type="text"
                                                            inputMode="numeric"
                                                            autoComplete="one-time-code"
                                                            pattern="\d{1}"
                                                            maxLength={valueLength}
                                                            value={digit}
                                                            className="border-b-slate-200 boder border-white border-[3px] w-full h-16 rounded outline-none text-center font-semibold text-xl spin-button-none focus:border-b-primary focus:text-gray-700 text-gray-700 transition"
                                                            onChange={(e) => inputOnChange(e, index)}
                                                            onKeyDown={inputOnKeyDown}
                                                            onFocus={inputOnFocus}
                                                        />
                                                    );
                                                })}
                                            </div>
                                            <H2 className="!md:text-[13px] !xs:text-[6px] flex items-center justify-end z-50 relative mt-4 text-gray-500">
                                                Your code is expired or invalid?
                                                {/* <Link href="/auth/register" className="ml-1 cursor-pointer ">
                                                    <H2 className="text-primary cursor-pointer !md:text-[13px] !xs:text-[6px]">
                                                        Click here to get a new one.
                                                    </H2>
                                                </Link> */}
                                                <CustomButton
                                                    className=" !bg-white ml-1 cursor-pointer"
                                                    onClick={resendCode}
                                                >
                                                    <H2 className="text-primary cursor-pointer !md:text-[13px] !xs:text-[6px]">
                                                        Click here to get a new one.
                                                    </H2>
                                                </CustomButton>
                                            </H2>

                                            {errMsg && (
                                                <p className="mb-4 text-sm text-red-700 ">{errMsg}</p>
                                            )}


                                            <CustomButton
                                                disabled={isLoading}
                                                onClick={handleSubmit}
                                                type="submit" // Explicitly set as "submit"
                                                className="text-sm z-50 relative mt-5 tracking-wide font-semibold bg-primary text-gray-100 w-full rounded-lg hover:bg-secondary transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                                            >
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
                                                            <H2 className="">Verify Code</H2>
                                                        </div>
                                                    )}
                                                </div>
                                            </CustomButton>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ConfirmAccount;
