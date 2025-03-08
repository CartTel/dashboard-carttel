"use client";

import {
    CustomButton,
    CustomInput,
    CustomSelect,
    CustomInputImage
} from "@/components/custom-components";
import { CustomInputDate } from "@/components/custom-components";
import {
    B1,
    B2,
    BMiddle,
    BodySmallest,
    SecondaryText,
} from "@/components/custom-typography";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { payForDropoffRequest } from "@/config/api";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";



type PayDropoffProps = {
    dropoffId: number; 
    shipmentId: number;
    onClose: () => void; // Function to close the modal
    // id: number; // ID of the request to approve
};

export function PayDropoff({ onClose, dropoffId, shipmentId }: PayDropoffProps) {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const router = useRouter();

    const handlePayDropoff = async (e: React.FormEvent<HTMLFormElement>) => {
        e?.preventDefault();
        setLoading(true);
        setError("");
        setSuccessMessage("");

        try {
            // Call the API to approve the request
            console.log("all the ID", dropoffId, shipmentId)

            const result = await payForDropoffRequest(dropoffId, shipmentId);
            if (result) {
                toast({
                    title: "Success",
                    description: `Dropoff Paid Successfully 🎉`,
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
            setSuccessMessage("Dropoff Paid Successfully!");
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
        <form
            onSubmit={handlePayDropoff}
            className="py-[38px] lg:px-[30px] px-4 bg-white rounded-[10px] shadow md:w-[574.18px] xs:w-full">

            <div className="w-full flex justify-center items-center">
                <Image
                    src={"/images/checkmark.svg"}
                    alt="check"
                    width={100}
                    height={100}
                />
            </div>

            <div className="text-center w-full">
                <SecondaryText className="mb-[23px]">Pay For Dropoff</SecondaryText>
            </div>

            <div className="flex items-center justify-center gap-[20px] lg:flex-row xs:flex-col w-full lg:w-auto">
                {
                    <CustomButton

                        onClick={onClose}
                        className="!text-[#292D32] border-gray !bg-white border-[1px] !py-[0px] !h-[58px] lg:!w-[175px] xs:!w-[300px] !text-[13px]"
                    >
                        Cancel
                    </CustomButton>
                }
                <CustomButton
                    disabled={loading}
                    // loaderState={loading}
                    className={`!bg-[#f87316] !py-[0px] !h-[58px] lg:!w-[175px] xs:!w-[300px] !text-md`}
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
                                <span className="ml-0">Pay Dropoff</span>
                            </div>
                        )}


                    </div>
                </CustomButton>
            </div>
        </form>
    );
}
