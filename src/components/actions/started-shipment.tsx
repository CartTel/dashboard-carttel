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
import React, { useEffect, useRef, useState } from "react";
import { startShipment } from "@/config/api";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";



type StartShipmentProps = {
    onClose: () => void; // Function to close the modal
    id: number; // ID of the request to approve
    slaId: number;
};

export function StartShipmentRequest({ onClose, id, slaId }: StartShipmentProps) {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const router = useRouter();

    const handleStartShipment = async (e: React.FormEvent<HTMLFormElement>) => {
        e?.preventDefault();
        setLoading(true);
        setError("");
        setSuccessMessage("");

        try {
            // Call the API to approve the request
            console.log("all the ID", id, slaId)

            const result = await startShipment(id, slaId);
            console.log("object tab ..", result);

            console.log("all the issue..", result)
            // //   router.push('/dashboard/activity?tab=Scoping');
            // // window.location.reload();
            if (result) {
                toast({
                    title: "Success",
                    description: `Shipment Started Successfully 🎉`,
                    variant: "destructive",
                  });
            }
            onClose()
            setLoading(false);
            // Handle success
            setSuccessMessage("payment Invoice successfully!");
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
            onSubmit={handleStartShipment}
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
                <SecondaryText className="mb-[23px]">Start shipment</SecondaryText>
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
                    className={`!bg-cyan-400 !py-[0px] !h-[58px] lg:!w-[175px] xs:!w-[300px] !text-md`}
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

                                <span className="ml-0">Start shipment</span>
                            </div>
                        )}


                    </div>
                </CustomButton>
            </div>
        </form>
    );
}
