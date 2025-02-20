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
import { arrivedShipment } from "@/config/api";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";



type ArrivedShipmentProps = {
    onClose: () => void; // Function to close the modal
    id: number;
    slaId: number // ID of the request to approve
};

export function ArrivedShipmentRequest({ onClose, id, slaId }: ArrivedShipmentProps) {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const router = useRouter();

    const [formData, setFormData] = useState<any>({
        shipment_id: null,
        actualDate: null,  // ISO 8601 format for Date
        sla_id: "",
        remark: ""
    });

    useEffect(() => {
        (async () => {
            try {
                // console.log("user..", user.organizations[0]?.id);
                setFormData((prevState: any) => ({
                    ...prevState,
                    shipment_id: id,
                    sla_id: slaId
                }));
            } catch (error) {
                // toast.error("Error Fetching User Organizations");
            } finally {
            }
        })();
    }, [id, slaId]);

    

    const handleRemarkChange = (value: string) => {
        console.log("New value:", value);
    
        setFormData((prevForm: any) => ({
          ...prevForm,
          remark: value
        }));
    };




    const handleArrivedShipment = async (e: React.FormEvent<HTMLFormElement>) => {
        e?.preventDefault();
        setLoading(true);
        setError("");
        setSuccessMessage("");

        try {
            // Call the API to approve the request
            console.log("all the ID", id, formData)

            const result = await arrivedShipment(formData);
            // // console.log("object tab ..", result);

            console.log("all the issue..", formData)
            // //   router.push('/dashboard/activity?tab=Scoping');
            // // window.location.reload();
            if (result) {
                toast({
                    title: "Success",
                    description: `Shipment Arrived successfully! 🎉`,
                    variant: "destructive",
                });
            }
            onClose()
            setLoading(false);
            // window.location.reload();
            // Handle success
            // setSuccessMessage("Shipment Approved successfully!");
        } catch (err: any) {
            

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
            onSubmit={handleArrivedShipment}
            className="py-[28px] lg:px-[30px] px-4 bg-white rounded-[10px] shadow md:w-[574.18px] xs:w-full">

            <div className="w-full flex justify-center items-center">
                <Image
                    src={"/images/checkmark.svg"}
                    alt="check"
                    width={100}
                    height={100}
                />
            </div>

            <div className="text-center w-full">
                <SecondaryText className="mb-[23px] !text-[16px]">Arrived Shipment</SecondaryText>
            </div>

            <div className="px-0">
                <div>
                    <div className="flex md:flex-row xs:flex-col gap-5 my-10">
                        
                        <div className={`form-group flex w-[100%] text-[1rem] my-0`}>
                            <CustomInputDate
                                id="actual_date"
                                showLabel={true}
                                type="date"
                                value={formData?.actualDate}
                                setValue={(value) => 
                                    setFormData((prev: any) => ({ ...prev, actualDate: value }))
                                }
                                label="Actual Date"
                                required
                                className=""
                            />
                        </div>

                    </div>


                    <div className="flex md:flex-row xs:flex-col gap-5 my-10">
                        <CustomInput
                            id="remark"
                            inputType="textarea"
                            label="Remarks"
                            className="!h-[150px] mb-[38px]"
                            setValue={(value) =>
                                setFormData((prev: any) => ({ ...prev, remark: value }))
                            }
                            value={formData?.remark}
                        />
                    </div>
                </div>
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
                    className={`!bg-rose-500 !py-[0px] !h-[58px] lg:!w-[175px] xs:!w-[300px] !text-md`}
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

                                <span className="ml-0">Arrived Shipment</span>
                            </div>
                        )}


                    </div>
                </CustomButton>
            </div>
        </form>
    );
}
