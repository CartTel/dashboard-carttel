"use client"

import Image from 'next/image'
import { CustomButton, CustomSelect } from '@/components/custom-components';
import { CustomInput, CustomInputDate } from '@/components/custom-components';
import { B1, B2, H2, H1, BMiddle, B2Regular } from '@/components/custom-typography';
import Link from 'next/link';
import CountrySelector from '@/components/custom-components/country-selector';
import { useQuery } from "@tanstack/react-query";
import React from 'react'
import { useState, useEffect, useMemo } from 'react';

import Spinner from '@/components/ui/Spinner/Spinner';
import axios from "axios";
import { SkeletonLoader } from '@/components/ui/skeletonCard';


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

interface InsuranceDetails {
    insurance_type: "",
    // policy_number: "",
    start_date: Date | any,
    // end_date: Date | null
}

interface SenderInfoForm {
    procurement_id: number | null;
    senderInfo: SenderInfoDetails;
    receiverInfo: ReceiverInfoDetails;
    insurance: InsuranceDetails
}

interface InsuranceProps {
    active: number;
    setActive: (active: number) => void;
    isLoadingButton: boolean;
    formData: SenderInfoForm; // Use the SenderInfoForm interface
    setFormData: React.Dispatch<React.SetStateAction<SenderInfoForm>>;
}


const InsuranceShipmentDetails = ({
    active,
    setActive,
    isLoadingButton,
    formData,
    setFormData
}: InsuranceProps) => {

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

    const isShipmentDetailsComplete = useMemo(() => {
        // const tracking = formData.tracking;
        const insurance = formData.insurance;

        // const trackingComplete = Object.values(tracking).every(
        //     (field) => typeof field === 'string' && field.trim() !== ""
        // );

        const insuranceComplete = Object.entries(insurance)
            .filter(([key]) => key !== 'policy_number' && key !== 'end_date')
            .every(([, field]) => typeof field === 'string' && field.trim() !== "");

        return insuranceComplete;
    }, [formData.insurance]);





    const handleProviderFive = () => {
        console.log("form data..", formData);
        setActive(active + 1);
    };


    if (isLoadingButton) {
        return <SkeletonLoader number={5} />
    }

    return (
        <div>
            <div>
                <div className=' text-[16px] md:item-center flex md:justify-start text-start font-medium bg-primary text-white py-2 px-2 my-10'>Shipment Details</div>

                <div className=' text-[16px] md:item-center flex md:justify-start text-start font-medium py-2  my-3 text-slate-600'>Select Your Shipment Details</div>
                

                <div className=" border-[1px] border-gray-300 block w-full pb-1 text-md font-semibold text-primary transition-all duration-200 ease-in-out group-focus-within:text-blue-400 md:mt-5 xs:mt-0 md:text-[15px] xs:text-[15px] bg-plain px-2">
                    Insurance
                </div>

                <div className="px-0">
                    <div>
                        <div className="flex md:flex-row xs:flex-col gap-10 my-10">
                            <div className={` w-[100%] text-[1rem] my-0`}>

                                <CustomSelect
                                    wrapperClass='!border-[0.5px] !border-gray !h-[58px] md:w-full xs:w-full'
                                    labelClass='!text-[0.875rem] text-gray-500 w-full'
                                    optionsClass='!text-[0.875rem] !h-[48px] !w-[100%]'
                                    optionWrapperClass=' border-[1px] border-gray-400 w-[100%] !w-full xl:left-[0px] !left-[0px] !h-[200px] !bottom-[-205px] overflow-y-auto'
                                    label='Select Insurance Plan'
                                    setSelected={handleInsuranceChange}
                                    selected={formData?.insurance?.insurance_type}
                                    options={[
                                        {
                                            label: 'Premium',
                                            value: 'Premium'
                                        },
                                        {
                                            label: 'Pro',
                                            value: 'Pro'
                                        },
                                        {
                                            label: 'Basic',
                                            value: 'Basic'
                                        }
                                    ]}
                                />
                            </div>
                            <div className={`form-group flex w-[100%] text-[1rem] my-0`}>
                                <CustomInputDate
                                    id="start_date"
                                    showLabel={true}
                                    type="date"
                                    value={formData?.insurance?.start_date}
                                    setValue={handleInsuranceDateChange}
                                    label="Start Date"
                                    required
                                    className=""
                                />
                            </div>

                        </div>

                        <div className="my-10 xs:text-[10px] md:text-[13px] text-primary bg-sky-200 rounded-lg px-2 py-2 bg-opacity-50 font-[500] md:leading-7 xs:leading-5">
                            {/* <p>Choose the plan that best suits your needs:</p> */}
                            <div className='flex mx-0 md:flex-row xs:flex-col'>
                                <div><strong>Premium Plan:</strong> 10% of the total value of your item.</div>
                                <div><strong>Pro Plan:</strong> 7% of the total value of your item.</div>
                                <div><strong>Basic Plan:</strong> 4% of the total value of your item.</div>
                            </div>
                            {/* <p>Select your preferred plan from the dropdown menu to proceed.</p> */}
                        </div>

                    </div>
                </div>
                <div className="flex pb-10">
                    <div className="flex z-10 relative mt-4 w-full text-center justify-center">
                        <button
                            onClick={handleProviderFive}
                            disabled={!isShipmentDetailsComplete}
                            className={`${!isShipmentDetailsComplete ? "bg-primary opacity-40" : "bg-primary"} flex text-center justify-center font-semibold z-10 relative md:text-[16px] rounded-lg md:py-2 md:px-16 xs:text-[15px] xs:py-4 xs:px-10 w-full !text-white`}
                        >
                            Continue
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InsuranceShipmentDetails