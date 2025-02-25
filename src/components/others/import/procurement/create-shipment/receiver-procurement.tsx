"use client"



import Image from 'next/image'
import { CustomButton, CustomSelect } from '@/components/custom-components';
import { CustomInput } from '@/components/custom-components';
import { B1, B2, H2, H1, BMiddle, B2Regular } from '@/components/custom-typography';
import Link from 'next/link';

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
    start_date: Date | null,
    // end_date: Date | null
}

interface SenderInfoForm {
    procurement_id: number | null;
    senderInfo: SenderInfoDetails;
    receiverInfo: ReceiverInfoDetails;
    insurance: InsuranceDetails
}

// interface ReceiverInfoImportProps {
//     active: number;
//     setActive: (active: number) => void;
//     isLoadingButton: boolean;
//     formData: SenderInfoForm; // Use the SenderInfoForm interface
//     setFormData: React.Dispatch<React.SetStateAction<SenderInfoForm>>;
// }

interface ReceiverInfoImportProps {
    active: number;
    setActive: (active: number) => void;
    isBasic: number;
    setIsBasic: (active: number) => void;
    isLoadingButton: boolean;
    formData: SenderInfoForm; // Use the SenderInfoForm interface
    setFormData: React.Dispatch<React.SetStateAction<SenderInfoForm>>;
}


const ReceiverInfoProcurement = ({ active, setActive, isLoadingButton, isBasic, setIsBasic, formData, setFormData }: ReceiverInfoImportProps) => {

    const isReceiverInfoComplete = useMemo(() => {
        const receiver = formData.receiverInfo;
        // Check that every value is a non-empty string.
        return Object.values(receiver).every(
            (field) => typeof field === 'string' && field.trim() !== ""
        );
    }, [formData.receiverInfo]);

    const renderPreviousForm = () => {
        setActive(active - 1);
    };

    const handleProviderThree = () => {
        // console.log("all the name ..", formData)
        setActive(active + 1);
    };

    const handleUSAChange = () => {
        console.log("goal first..")
        
        setFormData((prev: any) => ({
            ...prev,
            receiverInfo: {
                ...prev.receiverInfo,
                address_line_1: "260 Nimblewill Way SW",
                address_line_2: "3657 Spring Haven Trail",
                city: "Lilburn",
                country: "United States",
                email: "carttelstores@gmail.com",
                name: "Mike Smith",
                phone: "+1-770-931-8767",
                postal_code: "30047",
                state: "Georgia(GA)"
            },
        }));
        setIsBasic(1)
    };

    const handleUKChange = () => {
        setFormData((prev: any) => ({
            ...prev,
            receiverInfo: {
                ...prev.receiverInfo,
                address_line_1: "71 Pendwyallt Road",
                address_line_2: "34 Southend Avenue",
                city: "Blackacre",
                country: "United Kingdom",
                email: "carttelstores@gmail.com",
                name: "Wayne Graham",
                phone: "+44-078-8892-4148",
                postal_code: "DG11-1FT",
                state: "Brighton and Hove"
            },
        }));
        setIsBasic(2)
    };

    const handleCHINAChange = () => {
        setFormData((prev: any) => ({
            ...prev,
            receiverInfo: {
                ...prev.receiverInfo,
                address_line_1: "Shang Hai Shi Xin Hua Lu 668long Jia San Lou",
                address_line_2: "Xi Huan Lu 3108hao Xin Yuan Jing Yuan 6-806",
                city: "City Area - Changning District",
                country: "China",
                email: "carttelstores@gmail.com",
                name: "Liu Kang",
                phone: "+86-13063824269",
                postal_code: "563362",
                state: "Shanghai"
            },
        }));
        setIsBasic(3)
    };

    return (
        <div>
            <div className=' text-[16px] md:item-center flex md:justify-start text-start font-medium bg-primary text-white py-2 px-2 my-10'>Receiver Info</div>

            <div>
                <div>
                    <div className="block w-full pb-1 text-md font-medium text-gray-800 transition-all duration-200 ease-in-out group-focus-within:text-blue-400 md:mt-10 xs:mt-0 md:text-[15px] xs:text-[12px]">Where are you Shipping From?</div>
                    <div
                        onClick={() => { handleUSAChange()}}
                        className={`my-4 flex justify-between md:flex-row xs:flex-col gap-10 rounded-md py-6 px-3 cursor-pointer ${isBasic === 1 ? "border-[1px] border-indigo-500" : "border-[1px] border-indigo-200"}`}
                    >
                        <div className=''>
                            <div className='font-semibold text-gray-800 text-[15px]'>
                                USA HUB:
                            </div>
                            <div className='font-[500] text-gray-600 py-1 mt-1 md:text-[14px] xs:text-[10px]'>
                                3657 Spring Haven Trail, Mountain View New Jersey, United States  TEL: +1 973-709-3572
                            </div>

                        </div>
                        <div className='float-left'>
                            <div className="text-gray-600 font-[500] uppercase md:text-end xs:text-center flex md:justify-end xs:justify-center">

                                <span className={`rounded-full w-5 h-5 flex items-center justify-center ${isBasic === 1 ? "border-[1px] border-indigo-500" : "border-[1px] border-indigo-500"}`}>
                                    <span className={`rounded-full w-3 h-3 flex items-center justify-center ${isBasic === 1 ? "bg-indigo-500" : "bg-white"}`} />
                                </span>
                            </div>

                        </div>
                    </div>
                </div>

                <div>
                    <div
                        onClick={() => { handleUKChange()}}
                        className={`cursor-pointer my-4 flex justify-between md:flex-row xs:flex-col gap-10 rounded-md py-6 px-3 ${isBasic === 2 ? "border-[1px] border-indigo-500" : "border-[1px] border-indigo-200"}`}
                    >
                        <div className=''>
                            <div className='font-semibold text-gray-800 text-[15px]'>
                                UK HUB:
                            </div>
                            <div className='font-[500] text-gray-600 py-1 mt-1 md:text-[14px] xs:text-[10px]'>
                                16 Graham Road, Cheddar United Kingdom TEL: +44 077 7167 9295
                            </div>

                        </div>
                        <div className='float-left'>
                            <div className="text-gray-600 font-[500] uppercase md:text-end xs:text-center flex md:justify-end xs:justify-center">

                                <span className={`rounded-full w-5 h-5 flex items-center justify-center ${isBasic === 2 ? "border-[1px] border-indigo-500" : "border-[1px] border-indigo-500"}`}>
                                    <span className={`rounded-full w-3 h-3 flex items-center justify-center ${isBasic === 2 ? "bg-indigo-500" : "bg-white"}`} />
                                </span>
                            </div>

                        </div>
                    </div>
                </div>

                <div>
                    <div
                        onClick={() => {handleCHINAChange()}}
                        className={`cursor-pointer my-4 flex justify-between md:flex-row xs:flex-col gap-10 rounded-md py-6 px-3 ${isBasic === 3 ? "border-[1px] border-indigo-500" : "border-[1px] border-indigo-200"}`}
                    >
                        <div className=''>
                            <div className='font-semibold text-gray-800 text-[15px]'>
                                CHINA HUB:
                            </div>
                            <div className='font-[500] text-gray-600 py-1 mt-1 md:text-[14px] xs:text-[10px]'>
                                1 Liu Shan Lu 99long 16hao Lou 202, Pudongxin District Shanghai China TEL: +86 13073375896
                            </div>
                        </div>

                        <div className='float-left'>
                            <div className="text-gray-600 font-[500] uppercase md:text-end xs:text-center flex md:justify-end xs:justify-center">
                                <span className={`rounded-full w-5 h-5 flex items-center justify-center ${isBasic === 3 ? "border-[1px] border-indigo-500" : "border-[1px] border-indigo-500"}`}>
                                    <span className={`rounded-full w-3 h-3 flex items-center justify-center ${isBasic === 3 ? "bg-indigo-500" : "bg-white"}`} />
                                </span>
                            </div>

                        </div>
                    </div>
                </div>

            </div>

            <div>

                <div>
                    {(isBasic === 1) && (
                        <div>
                            <div className=" text-lg font-semibold w-full z-0 relative px-0 ">
                                <div className="">

                                    <div className="px-0 py-2 font-medium text-sm mt-3 flex flex-row">
                                        <div className=" text-sm font-semibold flex justify-center items-center">USA - Houston - Texas</div>
                                    </div>

                                    <div>
                                        <div className="text-gray-500 px-0 py-2 font-medium text-sm mt-3">Use this address to ship your items with us from the United States.</div>
                                    </div>

                                    <div className="flex md:flex-row xs:flex-col md:py-4 md:px-0 xs:py-2 xs:px-0 w-full justify-center items-center gap-5 ">

                                        <div className="flex w-full flex-col gap-7">
                                            <div className="w-full ">
                                                <div className="text-sm font-[400]">Full Name</div>

                                                <div className="relative">
                                                    <input
                                                        className="indent-3 w-full rounded-md border text-gray-500 font-light outline-none text-[15px] py-1 bg-gray-200"
                                                        value={'Mike Smith'}
                                                        readOnly
                                                    />
                                                </div>
                                            </div>

                                            <div className="w-full ">
                                                <div className="text-sm font-[400]">Address Line 1</div>

                                                <div className="relative">
                                                    <input

                                                        className="indent-3 w-full rounded-md border text-gray-500 font-light outline-none text-[15px] py-1 bg-gray-200"
                                                        value={'260 Nimblewill Way SW'}
                                                        readOnly
                                                    />
                                                </div>
                                            </div>
 

                                            <div className="w-full ">
                                                <div className="text-sm font-[400]">Address Line 2</div>

                                                <div className="relative">
                                                    <input

                                                        className="indent-3 w-full rounded-md border text-gray-500 font-light outline-none text-[15px] py-1 bg-gray-200"
                                                        value={'3657 Spring Haven Trail'}
                                                        readOnly
                                                    />

                                                </div>
                                            </div>

                                            <div className="w-full ">
                                                <div className="text-sm font-[400]">City</div>

                                                <div className="relative">
                                                    <input

                                                        className="indent-3 w-full rounded-md border text-gray-500 font-light outline-none text-[15px] py-1 bg-gray-200"
                                                        value={'Lilburn'}
                                                        readOnly
                                                    />

                                                </div>

                                            </div>
                                        </div>

                                        <div className="flex w-full flex-col gap-7">
                                            <div className="w-full ">
                                                <div className="text-sm font-[400]">Phone Number</div>

                                                <div className="relative">
                                                    <input

                                                        className="indent-3 w-full rounded-md border text-gray-500 font-light outline-none text-[15px] py-1 bg-gray-200"
                                                        value={'+1-770-931-8767'}
                                                        readOnly
                                                    />

                                                </div>

                                            </div>

                                            <div className="w-full ">
                                                <div className="text-sm font-[400]">Postal Code</div>

                                                <div className="relative">
                                                    <input

                                                        className="indent-3 w-full rounded-md border text-gray-500 font-light outline-none text-[15px] py-1 bg-gray-200"
                                                        value={'30047'}
                                                        readOnly
                                                    />
                                                </div>
                                            </div>

                                            <div className="w-full ">
                                                <div className="text-sm font-[400]">Country</div>
                                                <div className="relative">
                                                    <input

                                                        className="indent-3 w-full rounded-md border text-gray-500 font-light outline-none text-[15px] py-1 bg-gray-200"
                                                        value={'United States'}
                                                        readOnly
                                                    />
                                                </div>

                                            </div>

                                            <div className="w-full ">
                                                <div className="text-sm font-[400]">State/Province/Region</div>

                                                <div className="relative">
                                                    <input

                                                        className="indent-3 w-full rounded-md border text-gray-500 font-light outline-none text-[15px] py-1 bg-gray-200"
                                                        value={'Georgia(GA)'}
                                                        readOnly
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div>
                    {(isBasic === 2) && (
                        <div>
                            <div className=" text-lg font-semibold w-full z-0 relative px-0 ">
                                <div className="">

                                    <div className="px-0 py-2 font-medium text-sm mt-3 flex flex-row">
                                        <div className=" text-sm font-semibold flex justify-center items-center">UK - Manchester</div>
                                    </div>

                                    <div>
                                        <div className="text-gray-500 px-0 py-2 font-medium text-sm mt-3">Use this address to ship your items with us from the United Kingdom.</div>
                                    </div>

                                    <div className="flex md:flex-row xs:flex-col md:py-4 md:px-0 xs:py-2 xs:px-0 w-full justify-center items-center gap-5 ">

                                        <div className="flex w-full flex-col gap-7">
                                            <div className="w-full ">
                                                <div className="text-sm font-[400]">Full Name</div>

                                                <div className="relative">
                                                    <input
                                                        
                                                        className="indent-3 w-full rounded-md border text-gray-500 font-light outline-none text-[15px] py-1 bg-gray-200"
                                                        value={'Wayne Graham'}
                                                        readOnly
                                                    />
                                                </div>
                                            </div>

                                            <div className="w-full ">
                                                <div className="text-sm font-[400]">Address Line 1</div>

                                                <div className="relative">
                                                    <input

                                                        className="indent-3 w-full rounded-md border text-gray-500 font-light outline-none text-[15px] py-1 bg-gray-200"
                                                        value={'71 Pendwyallt Road'}
                                                        readOnly
                                                    />
                                                </div>
                                            </div>

                                            <div className="w-full ">
                                                <div className="text-sm font-[400]">Address Line 2</div>

                                                <div className="relative">
                                                    <input

                                                        className="indent-3 w-full rounded-md border text-gray-500 font-light outline-none text-[15px] py-1 bg-gray-200"
                                                        value={'34 Southend Avenue'}
                                                        readOnly
                                                    />

                                                </div>
                                            </div>

                                            <div className="w-full ">
                                                <div className="text-sm font-[400]">City</div>

                                                <div className="relative">
                                                    <input

                                                        className="indent-3 w-full rounded-md border text-gray-500 font-light outline-none text-[15px] py-1 bg-gray-200"
                                                        value={'Blackacre'}
                                                        readOnly
                                                    />

                                                </div>

                                            </div>
                                        </div>

                                        <div className="flex w-full flex-col gap-7">
                                            <div className="w-full ">
                                                <div className="text-sm font-[400]">Phone Number</div>

                                                <div className="relative">
                                                    <input

                                                        className="indent-3 w-full rounded-md border text-gray-500 font-light outline-none text-[15px] py-1 bg-gray-200"
                                                        value={'+44-078-8892-4148'}
                                                        readOnly
                                                    />

                                                </div>

                                            </div>

                                            <div className="w-full ">
                                                <div className="text-sm font-[400]">Postal Code</div>

                                                <div className="relative">
                                                    <input

                                                        className="indent-3 w-full rounded-md border text-gray-500 font-light outline-none text-[15px] py-1 bg-gray-200"
                                                        value={'DG11 1FT'}
                                                        readOnly
                                                    />
                                                </div>
                                            </div>

                                            <div className="w-full ">
                                                <div className="text-sm font-[400]">Country</div>
                                                <div className="relative">
                                                    <input

                                                        className="indent-3 w-full rounded-md border text-gray-500 font-light outline-none text-[15px] py-1 bg-gray-200"
                                                        value={'United Kingdom'}
                                                        readOnly
                                                    />
                                                </div>

                                            </div>

                                            <div className="w-full ">
                                                <div className="text-sm font-[400]">State/Province/Region</div>

                                                <div className="relative">
                                                    <input

                                                        className="indent-3 w-full rounded-md border text-gray-500 font-light outline-none text-[15px] py-1 bg-gray-200"
                                                        value={'Brighton and Hove'}
                                                        readOnly
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div>
                    {(isBasic === 3) && (
                        <div>
                            <div className=" text-lg font-semibold w-full z-0 relative px-0 ">
                                <div className="">

                                    <div className="px-0 py-2 font-medium text-sm mt-3 flex flex-row">
                                        <div className=" text-sm font-semibold flex justify-center items-center">CHINA - Shanghai</div>
                                    </div>

                                    <div>
                                        <div className="text-gray-500 px-0 py-2 font-medium text-sm mt-3">Use this address to ship your items with us from the China.</div>
                                    </div>

                                    <div className="flex md:flex-row xs:flex-col md:py-4 md:px-0 xs:py-2 xs:px-0 w-full justify-center items-center gap-5 ">

                                        <div className="flex w-full flex-col gap-7">
                                            <div className="w-full ">
                                                <div className="text-sm font-[400]">Full Name</div>

                                                <div className="relative">
                                                    <input
                                                        className="indent-3 w-full rounded-md border text-gray-500 font-light outline-none text-[15px] py-1 bg-gray-200"
                                                        value={'Liu Kang'}
                                                        readOnly
                                                    />
                                                </div>
                                            </div>

                                            <div className="w-full ">
                                                <div className="text-sm font-[400]">Address Line 1</div>

                                                <div className="relative">
                                                    <input

                                                        className="indent-3 w-full rounded-md border text-gray-500 font-light outline-none text-[15px] py-1 bg-gray-200"
                                                        value={'Shang Hai Shi Xin Hua Lu 668long Jia San Lou'}
                                                        readOnly
                                                    />
                                                </div>
                                            </div>

                                            <div className="w-full ">
                                                <div className="text-sm font-[400]">Address Line 2</div>

                                                <div className="relative">
                                                    <input

                                                        className="indent-3 w-full rounded-md border text-gray-500 font-light outline-none text-[15px] py-1 bg-gray-200"
                                                        value={'Xi Huan Lu 3108hao Xin Yuan Jing Yuan 6-806'}
                                                        readOnly
                                                    />

                                                </div>
                                            </div>

                                            <div className="w-full ">
                                                <div className="text-sm font-[400]">City</div>

                                                <div className="relative">
                                                    <input

                                                        className="indent-3 w-full rounded-md border text-gray-500 font-light outline-none text-[15px] py-1 bg-gray-200"
                                                        value={'City Area - Changning District'}
                                                        readOnly
                                                    />

                                                </div>

                                            </div>
                                        </div>

                                        <div className="flex w-full flex-col gap-7">
                                            <div className="w-full ">
                                                <div className="text-sm font-[400]">Phone Number</div>

                                                <div className="relative">
                                                    <input

                                                        className="indent-3 w-full rounded-md border text-gray-500 font-light outline-none text-[15px] py-1 bg-gray-200"
                                                        value={'+86-13063824269'}
                                                        readOnly
                                                    />

                                                </div>

                                            </div>

                                            <div className="w-full ">
                                                <div className="text-sm font-[400]">Postal Code</div>

                                                <div className="relative">
                                                    <input

                                                        className="indent-3 w-full rounded-md border text-gray-500 font-light outline-none text-[15px] py-1 bg-gray-200"
                                                        value={'563362'}
                                                        readOnly
                                                    />
                                                </div>
                                            </div>

                                            <div className="w-full ">
                                                <div className="text-sm font-[400]">Country</div>
                                                <div className="relative">
                                                    <input

                                                        className="indent-3 w-full rounded-md border text-gray-500 font-light outline-none text-[15px] py-1 bg-gray-200"
                                                        value={'China'}
                                                        readOnly
                                                    />
                                                </div>

                                            </div>

                                            <div className="w-full ">
                                                <div className="text-sm font-[400]">State/Province/Region</div>

                                                <div className="relative">
                                                    <input

                                                        className="indent-3 w-full rounded-md border text-gray-500 font-light outline-none text-[15px] py-1 bg-gray-200"
                                                        value={'Shanghai'}
                                                        readOnly
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex justify-between pb-10">
                
                <div className="flex">
                        <div className="flex justify-end z-10 relative mt-4 mr-3">
                            <button
                                onClick={handleProviderThree}
                                disabled={!isReceiverInfoComplete}
                                className={`${!isReceiverInfoComplete ? "bg-primary opacity-40" : "bg-primary"} flex justify-end items-center z-10 relative md:text-sm rounded-lg md:py-3 md:px-16 xs:px-10 xs:text-[15px] xs:py-3 !text-white`}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                <div className="flex justify-end z-10 relative mt-4 ">
                    <button
                        onClick={renderPreviousForm}
                        className="flex justify-end z-10 relative bg-white border-[1px] border-primary text-primary md:text-sm rounded-lg md:py-3 md:px-16 xs:text-[15px] xs:py-3 xs:px-10"
                    >
                        <span className="font-semibold">Previous</span>
                    </button>
                </div>

            </div>
        </div>

    )
}

export default ReceiverInfoProcurement