"use client"

import {
    CustomBreadCrumb,
    CustomButton,
    CustomSelect,
    CustomInput
} from "@/components/custom-components";
import { H2, H1, BMiddleRegular, BodySmallestMedium } from "@/components/custom-typography";
import Link from 'next/link';
import { RiArrowRightSLine } from "react-icons/ri";
import { useState, useEffect, useRef, useMemo } from 'react';
import { BsCheckLg } from "react-icons/bs";
import Image from "next/image";
import { fetchSingleProcurementRequest, awaitingProcessRequest } from "@/config/api";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import CreateProcurement from "../create/create-procurement";


import SenderInfoProcurement from "./sender-procurement";
import ReceiverInfoProcurement from "./receiver-procurement";
import InsuranceShipmentDetails from "./insurance-procurement";
import ReviewProcurementDetails from "./review-procurement";



const breadCrumb = [
    {
        label: "Home",
        link: "/dashboard/import",
    },
    {
        label: "Procurement",
        link: "/dashboard/import/procurement",
    },
    {
        label: "Shipment",

    },
];

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
    insurance: InsuranceDetails;
}

interface AwaitingProcessDetailsProps {
    id: string;
}

const CreateProcurementForShipment = ({ id }: AwaitingProcessDetailsProps) => {
    const [formData, setFormData] = useState<SenderInfoForm>({
        procurement_id: parseInt(id),
        senderInfo: {
            name: "",
            email: "",
            phone: "",
            address_line_1: "",
            address_line_2: "",
            postal_code: "",
            country: "",
            state: "",
            city: ""
        },
        receiverInfo: {
            name: "",
            email: "",
            phone: "",
            address_line_1: "",
            address_line_2: "",
            postal_code: "",
            country: "",
            state: "",
            city: ""
        },
        insurance: {
            insurance_type: "",
            start_date: null,
            // end_date: null
        }
    });

    const [isBasic, setIsBasic] = useState<number>(0)

    const [active, setActive] = useState<number>(1)

    const [isLoadingButton, setLoadingButton] = useState(false);

    const renderPreviousForm = () => {
        // console.log("all the prevoius data...", detailsData);
        setActive(active - 1);
    };

    useEffect(() => {
        if (id) {
            setFormData((prev: any) => {
                const newData = {
                    ...prev,
                    procurement_id: parseInt(id)
                };
                return newData;
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    return (
        <div className="text-lg  w-full z-0 relative">
            <CustomBreadCrumb items={breadCrumb} className="bg-gray-200 font-[500] text-primary w-fit px-5 py-1 rounded-lg" />
            <div className="my-[20px] flex lg:items-center justify-between lg:flex-row flex-col mb-[0px]">
                <H1 className="">Create Procurement For Shipment</H1>
            </div>

            <div className="mt-20 bg-white md:flex-1 flex-col w-full  items-center relative z-10 flex font-medium justify-between max-w-screen-xl mx-auto">
                <div className=" w-full mt-10">
                    <div className="w-full lg:flex xs:hidden md:hidden flex-row justify-center">
                        <div className="flex flex-col ">
                            <div className="flex flex-row">

                                <div className={`${active > 1 ? "flex items-center justify-center rounded-full p-6 h-10 w-10 bg-primary text-white"
                                    : "flex items-center justify-center rounded-full p-6 h-10 w-10 bg-slate-200 text-lime-700"
                                    }`}>
                                    {
                                        active > 1 ?
                                            <span className="font-semibold">
                                                <BsCheckLg />
                                            </span>
                                            :
                                            <span className="font-semibold text-slate-500">
                                                1
                                            </span>

                                    }
                                </div>
                                <div className="flex items-center h-full">
                                    <div
                                        className={`${active > 1 ? "h-2 w-40 !bg-primary "
                                            : " h-2 w-40 bg-slate-200"
                                            }`}
                                    ></div>

                                </div>
                            </div>
                            <span
                                className={`${active > 1 ? " !text-primary px-2  md:text-[15px] flex mt-1  "
                                    : " !text-slate-500 px-2 md:text-[15px] flex mt-1 "
                                    }`}
                            >
                                Sender Info
                            </span>
                        </div>

                        <div className="flex flex-col ">
                            <div className="flex flex-row">

                                <div className={`${active > 2 ? "flex items-center justify-center rounded-full p-6 h-10 w-10 bg-primary text-white"
                                    : "flex items-center justify-center rounded-full p-6 h-10 w-10 bg-slate-200 text-lime-700"
                                    }`}>
                                    {
                                        active > 2 ?
                                            <span className="font-semibold">
                                                <BsCheckLg />
                                            </span>
                                            :
                                            <span className="font-semibold text-slate-500">
                                                2
                                            </span>

                                    }
                                </div>
                                <div className="flex items-center h-full">
                                    <div
                                        className={`${active > 2 ? "h-2 w-40 !bg-primary "
                                            : " h-2 w-40 bg-slate-200"
                                            }`}
                                    ></div>

                                </div>
                            </div>
                            <span
                                className={`${active > 2 ? " !text-primary px-2  md:text-[15px] flex mt-1  "
                                    : " !text-slate-500 px-2 md:text-[15px] flex mt-1 "
                                    }`}
                            >
                                Receiver Info
                            </span>
                        </div>

                        <div className="flex flex-col ">
                            <div className="flex flex-row">

                                <div className={`${active > 3 ? "flex items-center justify-center rounded-full p-6 h-10 w-10 bg-primary text-white"
                                    : "flex items-center justify-center rounded-full p-6 h-10 w-10 bg-slate-200 text-lime-700"
                                    }`}>
                                    {
                                        active > 3 ?
                                            <span className="font-semibold">
                                                <BsCheckLg />
                                            </span>
                                            :
                                            <span className="font-semibold text-slate-500">
                                                3
                                            </span>

                                    }
                                </div>
                                <div className="flex items-center h-full">
                                    <div
                                        className={`${active > 3 ? "h-2 w-40 !bg-primary "
                                            : " h-2 w-40 bg-slate-200"
                                            }`}
                                    ></div>

                                </div>
                            </div>
                            <span
                                className={`${active > 3 ? " !text-primary px-2  md:text-[15px] flex mt-1  "
                                    : " !text-slate-500 px-2 md:text-[15px] flex mt-1 "
                                    }`}
                            >
                                Insurance
                            </span>
                        </div>

                        <div className="flex flex-col ">
                            <div className="flex flex-row">

                                <div className={`${active > 4 ? "flex items-center justify-center rounded-full p-6 h-10 w-10 bg-primary text-white"
                                    : "flex items-center justify-center rounded-full p-6 h-10 w-10 bg-slate-200 text-lime-700"
                                    }`}>
                                    {
                                        active > 4 ?
                                            <span className="font-semibold">
                                                <BsCheckLg />
                                            </span>
                                            :
                                            <span className="font-semibold text-slate-500">
                                                4
                                            </span>
                                    }
                                </div>

                            </div>

                            <span
                                className={`${active > 4 ? " !text-primary px-2  md:text-[15px] flex mt-1  "
                                    : " !text-slate-500 px-2 md:text-[15px] flex mt-1 "
                                    }`}
                            >
                                Review
                            </span>
                        </div>
                    </div>

                    <div className="w-full md:flex xs:flex lg:hidden flex-row justify-center">
                        <div className="bg-primary rounded-full px-10 py-10 text-white text-2xl font-bold">
                            {active}/4
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-center lg:w-full md:w-full">
                <div className="w-full flex flex-col p-0 max-w-5xl px-2">
                    <div className="w-full flex-1 mt-4">
                        <div className="">
                            {(active === 0 || active <= 1) && (
                                <SenderInfoProcurement
                                    active={active}
                                    setActive={setActive}
                                    isLoadingButton={isLoadingButton}
                                    formData={formData}
                                    setFormData={setFormData}
                                />
                            )}

                            {(active > 1 && active <= 2) && (
                                <ReceiverInfoProcurement
                                    active={active}
                                    setActive={setActive}
                                    isLoadingButton={isLoadingButton}
                                    isBasic={isBasic}
                                    setIsBasic={setIsBasic}
                                    formData={formData}
                                    setFormData={setFormData}
                                />
                            )}

                            {(active > 2 && active <= 3) && (
                                <InsuranceShipmentDetails
                                    active={active}
                                    setActive={setActive}
                                    isLoadingButton={isLoadingButton}
                                    formData={formData}
                                    setFormData={setFormData}
                                />
                            )}

                            {(active > 3 && active <= 4) && (
                                <ReviewProcurementDetails
                                    active={active}
                                    setActive={setActive}
                                    isLoadingButton={isLoadingButton}
                                    formData={formData}
                                    setFormData={setFormData}
                                />
                            )}


                        </div>
                    </div>
                </div>
            </div>



        </div>
    )
}

export default CreateProcurementForShipment;