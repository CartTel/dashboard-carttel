"use client"

import Image from 'next/image'
import { CustomButton, CustomSelect } from '@/components/custom-components';
import { CustomInput, CustomInputDate } from '@/components/custom-components';
import { B1, B2, H2, H1, BMiddle, B2Regular } from '@/components/custom-typography';
import Link from 'next/link';
import React from 'react'
import { useState, useEffect, useMemo } from 'react';
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import CreateShipment from '../create-shipment';
import { SkeletonLoader } from '@/components/ui/skeletonCard';
import { BsCheckLg, BsChevronLeft, BsShopWindow, BsXCircle, BsChevronRight, BsCheckCircle } from "react-icons/bs";
import { createShipment } from '@/config/api';



interface SenderInfoDetails {
    name: string,
    email: string,
    phone: string,
    address_line_1: string,
    address_line_2: string,
    postal_code: string,
    country: string,
    state: string,
    city: string
}

interface ReceiverInfoDetails {
    name: string,
    email: string,
    phone: string,
    address_line_1: string,
    address_line_2: string,
    postal_code: string,
    country: string,
    state: string,
    city: string
}

interface TrackingDetails {
    tracking_id: string,
    tracking_url: string,
    tracking_number: string,
    third_party_tracking_id: string,
    third_party_tracking_name: string
}

interface InsuranceDetails {
    insurance_type: "",
    policy_number: "",
    start_date: Date | any,
    end_date: Date | null
}

interface ItemDetails {
    name: string;
    quantity: number;
    value: number;
    description: string;
    weight: number;
    category: string;
    dimension: {
        length: number;
        width: number;
        height: number;
    };
}

interface SenderInfoForm {
    userId: number | any;
    name: string;
    description: string;
    senderInfo: SenderInfoDetails;
    receiverInfo: ReceiverInfoDetails;
    tracking: TrackingDetails
    insurance: InsuranceDetails
    items: ItemDetails[];
}

interface ShipmentDetailsProps {
    active: number;
    setActive: (active: number) => void;
    isLoadingButton: boolean;
    formData: SenderInfoForm; // Use the SenderInfoForm interface
    setFormData: React.Dispatch<React.SetStateAction<SenderInfoForm>>;
}


const ReviewDetails = ({
    active,
    setActive,
    isLoadingButton,
    formData,
    setFormData
}: ShipmentDetailsProps) => {

    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleTrackingChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        if (!name) {
            console.error("Input element is missing the 'name' attribute.");
            return;
        }

        // Check if the field is nested under senderInfo (e.g. "senderInfo.phone")
        if (name.startsWith("tracking.")) {
            // Extract the property key from the input name
            const key = name.split(".")[1];
            setFormData((prev: any) => ({
                ...prev,
                tracking: {
                    ...prev.tracking,
                    [key]: value,
                },
            }));
        } else {
            const key = name.split(".")[1];
            setFormData((prev: any) => ({
                ...prev,
                insurance: {
                    ...prev.insurance,
                    [key]: value,
                },
            }));

        }
    };

    const handleInsuranceChange = (value: string) => {

        setFormData((prev: any) => ({
            ...prev,
            insurance: {
                ...prev.insurance,
                insurance_type: value
            },
        }));
    };

    const handleInsuranceDateChange = (value: string) => {

        console.log("date ..", value);
        setFormData((prev: any) => ({
            ...prev,
            insurance: {
                ...prev.insurance,
                start_date: value
            },
        }));
    };



    const handleProviderFive = () => {
        console.log("form data..", formData);
        // setActive(active + 1);
    };
    const submitClientRequest = async () => {
        // e?.preventDefault();
        setLoading(true);
        try {
            // const valid = validateForm();
            console.log("form in the code FOR now ..", formData);
            const data = await createShipment(formData);
            // window.location.reload();
            if (data) {
                toast({
                    title: "Success",
                    description: `Shipment Created Successfully`,
                    variant: "default",
                });

                setLoading(false);
                router.push('/dashboard/import/shipment');

                setTimeout(() => {
                    window.location.reload();
                }, 5000); 
            }

            

        } catch (error: any) {
            if (error) {
                console.error("An unexpected error occurred:", error);
                toast({
                    title: "Error",
                    description: "An unexpected error occurred",
                    variant: "destructive",
                });
                
            }
        } finally {
            setLoading(false)
        }
    };


    if (isLoadingButton) {
        return <SkeletonLoader number={5} />
    }

    return (
        <div className='w-full flex-col flex justify-center items-center h-screen'>

            <div className="w-full flex xs:h-full md:h-screen items-center justify-center">
                <div
                    className="w-full"

                >
                    <div className=' text-[16px] md:item-center flex md:justify-start text-start font-medium bg-primary text-white py-2 px-2 my-10'>Review Your Request</div>

                    <div className=" border-[1px] border-gray-300 block w-full pb-1 text-md font-semibold text-primary transition-all duration-200 ease-in-out group-focus-within:text-blue-400 md:mt-5 xs:mt-0 md:text-[15px] xs:text-[15px] bg-plain px-2">
                        Review
                    </div>


                    <div className="">

                        <div className="my-3 xl:text-md xs:text-sm font-[400] text-gray-800 px-2">
                            Click on any options to go back to edit whatever option, If You are not satisfied with your choice:
                        </div>

                        <div className="grid md:grid-cols-2 xs:grid-cols-1 px-2 gap-6">
                            <div className="bg-white rounded-lg shadow-xl border-[1px] flex items-center py-5 px-2 cursor-pointer">
                                <div className="h-full flex justify-center items-center ">
                                    <div className="xl:text-5xl xs:text-4xl font-extralight text-green-600">
                                        <BsCheckCircle />
                                    </div>
                                </div>
                                <button
                                    className=" flex w-full  justify-between h-full px-2"
                                    onClick={() => { setActive(1) }}
                                >
                                    <div className="flex justify-start flex-col ">
                                        <div className="lg:text-xl xs:text-sm font-medium text-gray-500 text-start  w-full md:text-xs h-full flex items-center  ">
                                            Step 1
                                        </div>
                                        <div className="lg:text-md xs:text-[14px] font-[400] h-full flex justify-start items-center text-slate-800">
                                            Sender Info
                                        </div>
                                    </div>

                                    <div className=" flex justify-center items-center flex-col">
                                        <div className="text-lg font-extralight text-gray-500 h-full flex justify-center items-center">
                                            <BsChevronRight />
                                        </div>
                                    </div>
                                </button>
                            </div>

                            <button
                                className="bg-white rounded-lg shadow-xl border-[1px] flex items-center py-5 px-2 cursor-pointer"
                                onClick={() => { setActive(2) }}
                            >
                                <div className="h-full flex justify-center items-center ">
                                    <div className="xl:text-5xl xs:text-4xl font-extralight text-green-600">
                                        <BsCheckCircle />
                                    </div>
                                </div>
                                <div className=" flex w-full  justify-between h-full px-2">


                                    <div className="flex justify-start flex-col ">
                                        <div className="lg:text-xl xs:text-sm font-medium text-gray-500 text-start  w-full md:text-xs h-full flex items-center  ">
                                            Step 2
                                        </div>
                                        <div className="lg:text-md xs:text-[14px] font-[400] h-full flex justify-start items-center text-slate-800">
                                            Receiver Info
                                        </div>
                                    </div>

                                    <div className=" flex justify-center items-center flex-col">
                                        <div className="text-lg font-extralight text-gray-500 h-full flex justify-center items-center">
                                            <BsChevronRight />
                                        </div>
                                    </div>
                                </div>
                            </button>

                            <button
                                className="bg-white rounded-lg shadow-xl border-[1px] flex items-center py-5 px-2 cursor-pointer"
                                onClick={() => { setActive(3) }}
                            >
                                <div className="h-full flex justify-center items-center ">
                                    <div className="xl:text-5xl xs:text-4xl font-light text-green-600">
                                        <BsCheckCircle />
                                    </div>
                                </div>
                                <div className=" flex w-full  justify-between h-full px-2">
                                    <div className="flex justify-start flex-col">
                                        <div className="lg:text-xl xs:text-sm font-medium text-gray-500 text-start  w-full md:text-xs h-full flex items-center  ">
                                            Step 3
                                        </div>
                                        <div className="lg:text-md xs:text-[14px] font-[400] h-full flex justify-start items-center text-slate-800">
                                            Item Details
                                        </div>
                                    </div>

                                    <div className=" flex justify-center items-center flex-col">
                                        <div className="text-lg font-extralight text-gray-500 h-full flex justify-center items-center">
                                            <BsChevronRight />
                                        </div>
                                    </div>
                                </div>
                            </button>

                            <button
                                className="bg-white rounded-lg shadow-xl border-[1px] flex items-center py-5 px-2 cursor-pointer"
                                onClick={() => { setActive(4) }}
                            >
                                <div className="h-full flex justify-center items-center ">
                                    <div className="xl:text-5xl xs:text-4xl font-light text-green-600">
                                        <BsCheckCircle />
                                    </div>
                                </div>
                                <div className=" flex w-full  justify-between h-full px-2">
                                    <div className="flex justify-start flex-col">
                                        <div className="lg:text-xl xs:text-sm font-medium text-gray-500 text-start  w-full md:text-xs h-full flex items-center  ">
                                            Step 4
                                        </div>
                                        <div className="lg:text-md xs:text-[14px] font-[400] h-full flex justify-start items-center text-slate-800">
                                            Shipment Details
                                        </div>
                                    </div>

                                    <div className=" flex justify-center items-center flex-col">
                                        <div className="text-lg font-extralight text-gray-500 h-full flex justify-center items-center">
                                            <BsChevronRight />
                                        </div>
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>

                    <div className="flex pb-10">
                        <div className="flex z-10 relative mt-4 w-full text-center justify-center">

                            <button
                                onClick={submitClientRequest}
                                className={`${loading ? "bg-primary opacity-90" : "bg-primary"} flex text-center justify-center font-semibold z-10 relative bg-primary text-white md:text-[16px] rounded-lg md:py-2 md:px-16 xs:text-[15px] xs:py-4 xs:px-10 w-full `}
                                disabled={loading} // Disable the button when userLoading is true
                            >
                                {loading ? ( // Display spinner if userLoading is true
                                    <div className="flex items-center px-6 md:py-1">
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
                                    <span className="md:py-1">Create Shipment</span> // Show the "Submit" text when isLoading is false
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ReviewDetails