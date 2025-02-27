/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

import { BsTruck } from "react-icons/bs";
// import { } from "react-icons/lu";
import { FaWarehouse } from "react-icons/fa";
import { GrClose } from "react-icons/gr";
import { formatDate } from "@/helper/format";

import Image from "next/image";
import { CustomButton } from "../custom-components";

import { createPlan } from "@/config/api";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";




export default function ModalPlan({ planId, selectDate, selectPriceOne, selectPlan, onClose }: any) {
    const [showOptions, setShowOptions] = useState(0);
    const userString = localStorage.getItem("user");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const [userId, setUserId] = useState<any>(null);

    useEffect(() => {
        if (userString) {
            if (!userString) {
                throw new Error("User not found in local storage");
            }
            let user: any;
            try {
                user = JSON.parse(userString); // Attempt to parse user data
            } catch (parseError) {
                console.log("Invalid user data format in local storage");
            }
            setUserId(user?.user?.id)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userString]);


    // console.log("plan id.", planId);

    const today = new Date();
    const oneMonthFromNow = new Date(today);
    oneMonthFromNow.setMonth(today.getMonth() + 1);

    const oneYearFromNow = new Date(today);
    oneYearFromNow.setFullYear(today.getFullYear() + 1);
    

    const handleCreatePlan = async (e: React.FormEvent<HTMLFormElement>) => {
        e?.preventDefault();
        setLoading(true);
        setError("");
        setSuccessMessage("");

        try {
            // Call the API to approve the request
            // console.log("all the ID", userId, planId)

            const result = await createPlan(planId, userId);

            if (result) {
                toast({
                    title: "Success",
                    description: `Plan Created successfully! 🎉`,
                    variant: "destructive",
                });

                onClose()
                setLoading(false);
                // Delay the page reload to allow the toast and onClose to complete
                setTimeout(() => {
                    window.location.reload();
                }, 5000); // 1000ms = 1 second delay
            }
            // Handle success
            // setSuccessMessage("Shipment Approved successfully!");
        } catch (err: any) {
            console.log("first", err)

            onClose()
            toast({
                title: "Error",
                description: `${err?.response?.data?.message}`,
                variant: "destructive",
            });

            // Handle error
            setError(err.message || "An error occurred while approving the request.");
        } finally {
            setLoading(false);
        }
    };


    return (
        <form onSubmit={handleCreatePlan} className="justify-center items-center flex ">
            <div className="relative my-6 max-w-xl w-full">
                <div className="mx-4 border-none rounded-lg shadow-lg relative bg-white text-black flex flex-col z-10">
                    {/*header*/}
                    <div className="w-full px-4 bg-white flex items-center justify-between py-1  rounded-t">
                        <div
                            className="md:text-[15px] xs:text-[12px] text-slate-800 font-medium"
                        
                        >
                            Subscription Summary
                        </div>
                        <button
                            className="ml-auto border-0 float-right leading-none font-semibold outline-none focus:outline-none rounded-full p-2 hover:bg-gray-200"
                            onClick={onClose}
                        >
                            <span className="text-2xl text-primary block outline-none focus:outline-none hover:text-slate-800">
                                <GrClose />
                            </span>
                        </button>
                    </div>
                    {/*body*/}
                    <div className="relative px-6">
                        <div className="px-0 pt-6 pb-3 mb-4 ">
                            <div className="flex justify-between relative mb-4 w-full border-t-[1px] border-b-[1px] border-gray-200 py-4">
                                <div className=" pb-1 text-sm font-medium text-slate-800 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">Plan Name</div>
                                <div className=" pb-1 text-sm font-medium text-slate-800">
                                    {selectPlan} {selectDate} Plan
                                </div>
                            </div>

                            <div className="flex justify-between relative mb-4 w-full border-b-[1px] border-gray-200 pb-4">
                                <div className=" pb-1 text-sm font-medium text-slate-800 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">Plan Duration</div>
                                <div className=" pb-1 text-sm font-medium text-slate-800 ">
                                    {selectDate}
                                </div>
                            </div>

                            <div className="flex justify-between relative mb-4 w-full border-b-[1px] border-gray-200 pb-4">
                                <div className=" pb-1 text-sm font-medium text-slate-800 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">Amount</div>

                                {
                                    selectDate === "Monthly" ? (
                                        <div className=" pb-1 text-sm font-medium text-slate-800 ">
                                            $ {selectPriceOne} /{selectDate}
                                        </div>

                                    )
                                        : (

                                            <div className=" pb-1 text-sm font-medium text-slate-800 ">
                                                $ {selectPriceOne} /{selectDate}
                                            </div>
                                        )
                                }
                            </div>


                            <div className="flex justify-between relative mb-4 w-full border-b-[1px] border-gray-200 pb-4">
                                <div className=" pb-1 text-sm font-medium text-slate-800 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">Total</div>

                                {
                                    selectDate === "Monthly" ? (
                                        <div className=" pb-1 text-sm font-medium text-slate-800 ">
                                            $ {selectPriceOne} /{selectDate}
                                        </div>

                                    )
                                        : (

                                            <div className=" pb-1 text-sm font-medium text-slate-800 ">
                                                $ {selectPriceOne} /{selectDate}
                                            </div>
                                        )
                                }
                            </div>

                            <div className="md:text-[15px] xs:text-[12px] text-slate-800 font-medium mb-7">
                                <span className="">
                                    <div className="block">
                                        <span className="">Your subscription will be reverted back to </span>
                                        <span className="font-semibold text-black">BASIC PLAN</span>
                                        <span className=""> if it is not renewed before it expires.</span>
                                        <span className=""> You will be charged</span>
                                        <span className="font-semibold text-black"> ${selectPriceOne} </span>
                                        <span className=""> for this plan.</span>
                                        <span className=""> Your next billing date will be in</span>
                                        <span className="text-rose-500"> {selectDate === "Monthly" ? `${formatDate(oneMonthFromNow)}` : `${formatDate(oneYearFromNow)}`}. </span>
                                    </div>
                                    <div className="flex flex-wrap">
                                        
                                    </div>
                                </span>
                            </div>

                            

                            <CustomButton
                    disabled={loading}
                    // loaderState={loading}
                    className="md:text-xs xs:text-[12px] !bg-[#fbc421] !text-slate-800 font-[700] uppercase text-xs px-3 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 w-full"
                >
                    <div>
                        {loading ? ( // Display spinner if userLoading is true
                            <div className="flex items-center justify-center px-6">
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
                            <div className='flex items-center justify-center text-[13px]'>

                                <span className="ml-0">Pay Now</span>
                            </div>
                        )}


                    </div>
                </CustomButton>
                        </div>
                    </div>
                </div>

            </div>
        </form>

    );
}
