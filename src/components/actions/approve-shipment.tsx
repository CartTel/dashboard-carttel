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
import { approveShipment } from "@/config/api";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";



type ApproveShipmentProps = {
    onClose: () => void; // Function to close the modal
    id: number; // ID of the request to approve
};

export function ApproveShipment({ onClose, id }: ApproveShipmentProps) {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const router = useRouter();

    const [formData, setFormData] = useState<any>({
        shipment_id: null,
        estimatedDeliveryDate: null,  // ISO 8601 format for Date
        slaType: "",
        slaCharge: false,
        measurementCode: "",
        slaPriorityCode: "",
        slaAmount: null
    });

    useEffect(() => {
        (async () => {
            try {
                // console.log("user..", user.organizations[0]?.id);
                setFormData((prevState: any) => ({
                    ...prevState,
                    shipment_id: id,

                }));
            } catch (error) {
                // toast.error("Error Fetching User Organizations");
            } finally {
            }
        })();
    }, [id]);

    useEffect(() => {
        if (formData.slaAmount <= 0) {
          setFormData((prevForm: any ) => ({
            ...prevForm,
            slaCharge: false,
          }));
        } else {
          setFormData((prevForm: any) => ({
            ...prevForm,
            slaCharge: true,
          }));
        }
      }, [formData.slaAmount]);

    const handleSlaCostChange = (value: string) => {
        console.log("New value:", value);
    
        setFormData((prevForm: any) => ({
          ...prevForm,
          slaAmount: parseFloat(value)
        }));
      };




    const handleApproveShipment = async (e: React.FormEvent<HTMLFormElement>) => {
        e?.preventDefault();
        setLoading(true);
        setError("");
        setSuccessMessage("");

        try {
            // Call the API to approve the request
            console.log("all the ID", id)

            const result = await approveShipment(formData);
            // // console.log("object tab ..", result);

            console.log("all the issue..", formData)
            // //   router.push('/dashboard/activity?tab=Scoping');
            // // window.location.reload();
            if (result) {
                toast({
                    title: "Success",
                    description: `Shipment Approved successfully! 🎉`,
                    variant: "destructive",
                });
            }
            onClose()
            setLoading(false);
            window.location.reload();
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
        <form
            onSubmit={handleApproveShipment}
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
                <SecondaryText className="mb-[23px] !text-[16px]">Approve Shipment</SecondaryText>
            </div>

            <div className="px-0">
                <div>
                    <div className="flex md:flex-row xs:flex-col gap-5 my-10">
                        <div className={` w-[100%] text-[1rem] my-0`}>

                            <CustomSelect
                                wrapperClass='!border-[0.5px] !border-gray !h-[58px] md:w-full xs:w-full'
                                labelClass='!text-[0.875rem] text-gray-500 w-full'
                                optionsClass='!text-[0.875rem] !h-[48px] !w-[100%]'
                                optionWrapperClass=' border-[1px] border-gray-400 w-[100%] !w-full xl:left-[0px] !left-[0px] !h-[200px] !bottom-[-205px] overflow-y-auto'
                                label='Select Sla Type'
                                setSelected={(value) => 
                                    setFormData((prev: any) => ({ ...prev, slaType: value }))
                                }
                                selected={formData?.slaType}
                                options={[
                                    {
                                        label: 'Express',
                                        value: 'Express'
                                    },
                                    {
                                        label: 'Standard',
                                        value: 'Standard'
                                    }
                                ]}
                            />
                        </div>
                        <div className={`form-group flex w-[100%] text-[1rem] my-0`}>
                            <CustomInputDate
                                id="start_date"
                                showLabel={true}
                                type="date"
                                value={formData?.estimatedDeliveryDate}
                                setValue={(value) => 
                                    setFormData((prev: any) => ({ ...prev, estimatedDeliveryDate: value }))
                                }
                                label="Estimated DeliveryDate"
                                required
                                className=""
                            />
                        </div>

                    </div>
                    <div className="flex md:flex-row xs:flex-col gap-5 my-10">
                        <div className={` w-[100%] text-[1rem] my-0`}>
                        

                            <CustomSelect
                                wrapperClass='!border-[0.5px] !border-gray !h-[58px] md:w-full xs:w-full'
                                labelClass='!text-[0.875rem] text-gray-500 w-full'
                                optionsClass='!text-[0.875rem] !h-[48px] !w-[100%]'
                                optionWrapperClass=' border-[1px] border-gray-400 w-[100%] !w-full xl:left-[0px] !left-[0px] !h-[200px] !bottom-[-205px] overflow-y-auto'
                                label='Select Duration'
                                setSelected={(value) => 
                                    setFormData((prev: any) => ({ ...prev, measurementCode: value }))
                                }
                                selected={formData?.measurementCode}
                                options={[
                                    {
                                        label: 'Days',
                                        value: 'days'
                                    },
                                    {
                                        label: 'Weeks',
                                        value: 'weeks'
                                    },
                                    {
                                        label: 'Months',
                                        value: 'months'
                                    },
                                    {
                                        label: 'Years',
                                        value: 'years'
                                    }
                                ]}
                            />
                        </div>
                        <div className={` w-[100%] text-[1rem] my-0`}>

                            <CustomSelect
                                wrapperClass='!border-[0.5px] !border-gray !h-[58px] md:w-full xs:w-full'
                                labelClass='!text-[0.875rem] text-gray-500 w-full'
                                optionsClass='!text-[0.875rem] !h-[48px] !w-[100%]'
                                optionWrapperClass=' border-[1px] border-gray-400 w-[100%] !w-full xl:left-[0px] !left-[0px] !h-[200px] !bottom-[-205px] overflow-y-auto'
                                label='Select Sla Type'
                                setSelected={(value) => 
                                    setFormData((prev: any) => ({ ...prev, slaPriorityCode: value }))
                                }
                                selected={formData?.slaPriorityCode}
                                options={[
                                    {
                                        label: 'High',
                                        value: 'high'
                                    },
                                    {
                                        label: 'Medium',
                                        value: 'medium'
                                    },
                                    {
                                        label: 'Low',
                                        value: 'low'
                                    },

                                ]}
                            />
                        </div>

                    </div>
                    <div className="flex md:flex-row xs:flex-col gap-5 my-10">
                        
                    <div className={`form-group flex w-[100%] text-[1rem] my-0`}>
                                <CustomInput
                                    id="slaAmount"
                                    name="slaAmount" // Updated name to match nested property
                                    type="number"
                                    min={0}
                                    label="sla amount"
                                    required
                                    // showRequirement={true}
                                    value={formData?.slaAmount}
                                    setValue={(value) => handleSlaCostChange(value as string)}
                                    className="px-0 mb-[5px] md:w-full xs:w-full text-[16px]"
                                />
                            </div>

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
                    className={`!bg-[#029B5B] !py-[0px] !h-[58px] lg:!w-[175px] xs:!w-[300px] !text-md`}
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

                                <span className="ml-0">Approve Shipment</span>
                            </div>
                        )}


                    </div>
                </CustomButton>
            </div>
        </form>
    );
}
