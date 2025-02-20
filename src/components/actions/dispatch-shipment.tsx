"use client";

import {
    CustomButton,
    CustomInput,
    CustomSelect,
} from "@/components/custom-components";
import {
    B1,
    B2,
    BMiddle,
    BodySmallest,
    SecondaryText,
} from "@/components/custom-typography";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { payInvoice } from "@/config/api";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import Link from "next/link";



type PayInvoiceProps = {
    onClose: () => void; // Function to close the modal
    id: number; // ID of the request to approve
};

export function DispatchRequest({ onClose, id }: PayInvoiceProps) {

    const [isTick, setIsTick] = useState(false);

    const handleTickChange = () => {
        setIsTick(!isTick);
    };

    const [dispatchName, setDispatchName] = useState<string>("DropOff");

    const [dispatchLink, setDispatchLink] = useState<any>({
        nameOne: "DropOff",
        nameTwo: "Pickup",
        nameThree: "Inventory",
        nameFour: "Vendor",
        nameFive: "Retailer",
    });

    return (
        <div className=""> {/* Ensure the modal has a higher z-index */}
                <div className="">
                    <div className="relative w-auto my-6 max-w-xl mx-2">

                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
 
                            <div className=" my-2 mx-2 block w-full pb-0 text-lg font-medium text-gray-800 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">Choose Your Dispatch Option</div>

                            {/* <div>{dispatchName} {dispatchLink?.nameOne}</div> */}
                            
                            <div className='md:mx-5 xs:mx-2 '>
                                <div>
                                    <div                                       
                                        onClick={() => setDispatchName(dispatchLink.nameOne)}
                                        className={`cursor-pointer my-4 flex justify-between md:flex-row xs:flex-col md:gap-10 xs:gap-2 rounded-md md:py-3 xs:py-2 px-3 ${dispatchName === dispatchLink?.nameOne ? "border-[1px] border-indigo-500" : "border-[1px] border-indigo-200"}`}
                                    >
                                        <div className=''>
                                            {/* <div className='font-[500] text-gray-800 md:text-[15px] xs:text-[13px] md:text-start xs:text-center'>
                                                Schedule DropOff For Your Package
                                            </div> */}
                                            <div className='font-[500] text-gray-800 md:text-[15px] xs:text-[13px] md:text-start xs:text-center'>
                                            Schedule DropOff For Your Package
                                            </div>
                                            <div className='font-[400] text-gray-500 md:text-[12px] xs:text-[11px]  md:text-start xs:text-center'>
                                                Pick up your shipment at our office for Free
                                            </div>
                                        </div>
                                        <div className='float-left flex items-center justify-center '>
                                            <div className="text-gray-600 font-[500] uppercase md:text-end xs:text-center flex md:justify-end xs:justify-center">
                                                <span className={`rounded-full w-5 h-5 flex items-center justify-center ${dispatchName === dispatchLink?.nameOne ? "border-[1px] border-indigo-500" : "border-[1px] border-indigo-500"}`}>
                                                    <span className={`rounded-full w-3 h-3 flex items-center justify-center ${dispatchName === dispatchLink?.nameOne ? "bg-indigo-500" : "bg-white"}`} />
                                                </span>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <div
                                        onClick={() => setDispatchName(dispatchLink.nameTwo)}
                                        className={`cursor-pointer my-4 flex justify-between md:flex-row xs:flex-col md:gap-10 xs:gap-2 rounded-md md:py-3 xs:py-2 px-3 ${dispatchName === dispatchLink?.nameTwo ? "border-[1px] border-indigo-500" : "border-[1px] border-indigo-200"}`}
                                    >
                                        
                                        <div className=''>
                                            <div className='font-[500] text-gray-800 md:text-[15px] xs:text-[13px] md:text-start xs:text-center'>
                                                Schedule PickUps For Your Package
                                            </div>
                                            <div className='font-[400] text-gray-500 md:text-[12px] xs:text-[10px] md:leading-5 xs:leading-3 md:text-start xs:text-center'>
                                                Pay to get your items delivered to any address of your choice
                                            </div>
                                        </div>
                                        <div className='float-left flex items-center justify-center '>
                                            <div className="text-gray-600 font-[500] uppercase md:text-end xs:text-center flex md:justify-end xs:justify-center">
                                                <span className={`rounded-full w-5 h-5 flex items-center justify-center ${dispatchName === dispatchLink?.nameTwo ? "border-[1px] border-indigo-500" : "border-[1px] border-indigo-500"}`}>
                                                    <span className={`rounded-full w-3 h-3 flex items-center justify-center ${dispatchName === dispatchLink?.nameTwo ? "bg-indigo-500" : "bg-white"}`} />
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <div
                                        onClick={() => setDispatchName(dispatchLink.nameThree)}
                                        className={`cursor-pointer my-4 flex justify-between md:flex-row xs:flex-col md:gap-10 xs:gap-2 rounded-md md:py-3 xs:py-2 px-3 ${dispatchName === dispatchLink?.nameThree ? "border-[1px] border-indigo-500" : "border-[1px] border-indigo-200"}`}
                                    >
                                        <div className=''>
                                            <div className='font-[500] text-gray-800 md:text-[15px] xs:text-[13px] md:text-start xs:text-center'>
                                                Dispatch Package to Inventory
                                            </div>
                                            <div className='font-[400] text-gray-500 md:text-[12px] xs:text-[10px] md:leading-5 xs:leading-3 md:text-start xs:text-center'>
                                                Re-stock your CartTel on-line store with this Items
                                            </div>
                                        </div>
                                        
                                        <div className='float-left flex items-center justify-center'>
                                            <div className="text-gray-600 font-[500] uppercase md:text-end xs:text-center flex md:justify-end xs:justify-center">
                                                <span className={`rounded-full w-5 h-5 flex items-center justify-center ${dispatchName === dispatchLink?.nameThree ? "border-[1px] border-indigo-500" : "border-[1px] border-indigo-500"}`}>
                                                    <span className={`rounded-full w-3 h-3 flex items-center justify-center ${dispatchName === dispatchLink?.nameThree ? "bg-indigo-500" : "bg-white"}`} />
                                                </span>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <div
                                        onClick={() => setDispatchName(dispatchLink.nameFour)}
                                        className={`cursor-pointer my-4 flex justify-between md:flex-row xs:flex-col md:gap-10 xs:gap-2 rounded-md md:py-3 xs:py-2 px-3 ${dispatchName === dispatchLink?.nameFour ? "border-[1px] border-indigo-500" : "border-[1px] border-indigo-200"}`}
                                    >
                                        <div className=''>
                                            <div className='font-[500] text-gray-800 md:text-[15px] xs:text-[13px] md:text-start xs:text-center'>
                                                Dispatch Your Package to Our Vendor Page
                                            </div>
                                            <div className='font-[400] text-gray-500 md:text-[12px] xs:text-[10px] md:leading-5 xs:leading-3 md:text-start xs:text-center'>
                                                Send Item to our vendor page for other vendors to see and make purchase
                                            </div>
                                        </div>
                                        <div className='float-left flex items-center justify-center'>
                                            <div className="text-gray-600 font-[500] uppercase md:text-end xs:text-center flex md:justify-end xs:justify-center">
                                                <span className={`rounded-full w-5 h-5 flex items-center justify-center ${dispatchName === dispatchLink?.nameFour ? "border-[1px] border-indigo-500" : "border-[1px] border-indigo-500"}`}>
                                                    <span className={`rounded-full w-3 h-3 flex items-center justify-center ${dispatchName === dispatchLink?.nameFour ? "bg-indigo-500" : "bg-white"}`} />
                                                </span>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <div
                                        onClick={() => setDispatchName(dispatchLink.nameFive)}
                                        className={`cursor-pointer my-4 flex justify-between md:flex-row xs:flex-col md:gap-10 xs:gap-2 rounded-md md:py-3 xs:py-2 px-3 ${dispatchName === dispatchLink?.nameFive ? "border-[1px] border-indigo-500" : "border-[1px] border-indigo-200"}`}
                                    >
                                        
                                        <div className=''>
                                            <div className='font-[500] text-gray-800 md:text-[15px] xs:text-[13px] md:text-start xs:text-center md:leading-5 xs:leading-4'>
                                                Connect Your Package to Our Retail Channel
                                            </div>
                                            <div className='font-[400] text-gray-500 md:text-[12px] xs:text-[10px] md:leading-5 xs:leading-3 md:text-start xs:text-center'>
                                                Through our Distribution Channel, We can distribute your item to Retailers and End-Users
                                            </div>
                                        </div>
                                        <div className='float-left flex items-center justify-center '>
                                            <div className="text-gray-600 font-[500] uppercase md:text-end xs:text-center flex md:justify-end xs:justify-center">
                                                <span className={`rounded-full w-5 h-5 flex items-center justify-center ${dispatchName === dispatchLink?.nameFive ? "border-[1px] border-indigo-500" : "border-[1px] border-indigo-500"}`}>
                                                    <span className={`rounded-full w-3 h-3 flex items-center justify-center ${dispatchName === dispatchLink?.nameFive ? "bg-indigo-500" : "bg-white"}`} />
                                                </span>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                                <div className="w-full py-2">
                                    <div className=" bg-white overflow-hidden w-full sm:w-full xs:w-full">
                                        {dispatchName === "DropOff" && (
                                            <>

                                                <div className='w-full flex justify-center items-center my-2'>
                                                    <Link
                                                        href="/admin/dropoff"
                                                        className="w-fit bg-plain font-semibold rounded-lg text-primary md:px-6 md:py-3 xs:px-4 xs:py-2 md:text-[15px] xs:text-[13px] "
                                                    >
                                                        <span
                                                            className="w-fit capitalize md:px-1 md:py-2 xs:px-0 xs:py-1 font-[500] rounded-lg md:text-[14px] xs:text-[12px] text-center"
                                                        >Create DropOff for Package</span>
                                                    </Link>
                                                </div>
                                            </>
                                        )}
                                    </div>

                                    <div className=" bg-white overflow-hidden w-full font-semibold">
                                        {dispatchName === "Pickup" && (
                                            <>
                                                <div className='w-full flex justify-center items-center my-2'>
                                                    <Link
                                                        href="/admin/pickups"
                                                        className="w-fit bg-plain font-semibold rounded-lg text-primary md:px-6 md:py-3 xs:px-4 xs:py-2 md:text-[15px] xs:text-[13px] "
                                                    >
                                                        <div className="flex ">

                                                        </div>
                                                        <span
                                                            className="w-fit capitalize md:px-1 md:py-2 xs:px-0 xs:py-1 font-[500] rounded-lg md:text-[14px] xs:text-[12px] text-center"
                                                        >Schedule PickUps for Arrived Package</span>
                                                    </Link>
                                                </div>
                                            </>
                                        )}
                                    </div>

                                    <div className=" bg-white overflow-hidden w-full">
                                        {dispatchName === "Inventory" && (
                                            <>
                                                <div className='w-full flex justify-center items-center my-2'>
                                                    <Link
                                                        href="/admin/address-book"
                                                        className="w-fit bg-plain font-semibold rounded-lg text-primary md:px-6 md:py-3 xs:px-4 xs:py-2 md:text-[15px] xs:text-[13px] "
                                                    >
                                                        <div className="flex ">

                                                        </div>
                                                        <span
                                                            className="w-fit capitalize md:px-1 md:py-2 xs:px-0 xs:py-1 font-[500] rounded-lg md:text-[14px] xs:text-[12px] text-center"
                                                        >Dispatch Item to your Online Inventory</span>
                                                    </Link>
                                                </div>
                                            </>
                                        )}
                                    </div>

                                    <div className=" bg-white overflow-hidden w-full">
                                        {dispatchName === "Vendor" && (
                                            <>
                                                <div className='w-full flex justify-center items-center my-2'>
                                                    <Link
                                                        href="/admin/procurement"
                                                        className="w-fit bg-plain font-semibold rounded-lg text-primary md:px-6 md:py-3 xs:px-4 xs:py-2 md:text-[15px] xs:text-[13px] "
                                                    >
                                                        <div className="flex ">
                                                        </div>
                                                        <span
                                                            className="w-fit capitalize md:px-1 md:py-2 xs:px-0 xs:py-1 font-[500] rounded-lg md:text-[14px] xs:text-[12px] text-center"
                                                        >Make Item visible to other Vendors</span>
                                                    </Link>
                                                </div>
                                            </>
                                        )}
                                    </div>

                                    <div className=" bg-white overflow-hidden w-full">
                                        {dispatchName === "Retailer" && (
                                            <>
                                                <div className='w-full flex justify-center items-center my-2'>
                                                    <Link
                                                        href="/admin/wallet"
                                                        className="w-fit bg-plain font-semibold rounded-lg text-primary md:px-6 md:py-3 xs:px-4 xs:py-2 md:text-[15px] xs:text-[13px] "
                                                    >
                                                        <div className="flex ">

                                                        </div>
                                                        <span
                                                            className="w-fit capitalize md:px-1 md:py-2 xs:px-0 xs:py-1 font-[500] rounded-lg md:text-[14px] xs:text-[12px] text-center"
                                                        >Dispatch Item through Our Retail Channel</span>
                                                    </Link>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>

                                {/* <div className="xs:text-[10px] md:text-[15px] text-primary bg-sky-200 rounded-lg px-2 py-2 bg-opacity-50 font-[500] md:leading-7 xs:leading-5 flex my-4">

                                    <span className='mr-2'><IoInformationCircleOutline /></span>
                                    <span className='text-xs'>
                                        We use the mid-market rate for our Converter.
                                    </span>
                                </div> */}

                                {/* <div className="md:text-[15px] xs:text-[12px] text-slate-800 font-medium mb-7">Your subscription will automatically be renewed monthly. You will be charged $14 monthly unless you cancel your plan.Your next billing date will be in Mar 17, 2024.</div> */}
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    );
    
}
