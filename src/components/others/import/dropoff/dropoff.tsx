"use client";

import {
    CustomBreadCrumb,
    CustomButton,
    CustomSelect,
    CustomInput
} from "@/components/custom-components";
import Link from 'next/link';
import {
    B1,
    B2,
    H1,
    BMiddle,
    BodySmallest,
    SecondaryText,
} from "@/components/custom-typography";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { arrivalShipment } from "@/config/api";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { RiArrowRightSLine } from "react-icons/ri";
import { TiCalendarOutline } from "react-icons/ti";
import { MdOutlineDeliveryDining } from "react-icons/md";
import { TbHistory } from "react-icons/tb";


const breadCrumb = [
    {
        label: "Home",
        link: "/dashboard/import",
    },
    {
        label: "Dropoff",
        link: "/dashboard/import/dropoff",
    }
];

export function DropOffPage() {
    const [dropoffSet, setDropOffSet] = useState("Current DropOff");



    const [isOpen, setIsOpen] = useState(false);

    // eslint-disable-next-line no-unused-vars
    const [dropoffNaming, setDropoffNaming] = useState({
        nameOne: "Current DropOff",
        nameTwo: "DropOff History",
    });

    const closeModal = () => {
        setIsOpen(false);
    };

    const openModal = () => {
        setIsOpen(true);
    };

    const handleDelete = () => {
        console.log("first")

    };


    return (
        <div className="text-lg  w-full z-0 relative">
            <CustomBreadCrumb items={breadCrumb} className="bg-gray-200 font-[500] text-primary w-fit px-5 py-1 rounded-lg" />
            <div className="my-[20px] flex lg:items-center justify-between lg:flex-row flex-col mb-[0px]">
                <H1 className="">Dropoff</H1>
            </div>


            <div className="my-20">

                <div
                    className={`${dropoffSet === dropoffNaming.nameOne ||
                        dropoffNaming.nameTwo
                        ? ""
                        : ""
                        } w-full px-0 md:cursor-pointer group py-0  border-none`}
                >
                    <div className="w-full flex justify-center items-center ">
                        <div className="text-center grid grid-cols-2 justify-between md:w-[100%] xs:w-full text-sm border-none outline-none">
                            <h1
                                className={`${dropoffSet === dropoffNaming.nameOne ? "border-t-[2px] border-secondary bg-gray-100" : ""
                                    } py-4 flex items-center md:pr-0 pr-5 group w-full `}
                                onClick={() => {
                                    dropoffSet !== dropoffNaming.nameOne
                                        ? setDropOffSet(dropoffNaming.nameOne)
                                        : setDropOffSet(dropoffNaming.nameOne);

                                }}
                            >
                                <div className="flex justify-center items-center w-full text-xs">
                                    <div className="flex md:mr-1 xs:mr-0 h-5 w-5 justify-center">
                                        <div className="md:text-xl xs:text-3xl flex mr-1 w-10 h-10 justify-center text-gray-600"><MdOutlineDeliveryDining /></div>
                                    </div>
                                    <div className="md:flex xs:hidden justify-center items-center text-center text-gray-600">
                                        {dropoffNaming.nameOne}
                                    </div>

                                </div>
                            </h1>

                            <h1
                                className={`${dropoffSet === dropoffNaming.nameTwo ? "border-t-[2px] border-secondary bg-gray-100" : ""
                                    } py-4 flex items-center md:pr-0 pr-5 group w-full `}
                                onClick={() => {
                                    dropoffSet !== dropoffNaming.nameTwo
                                        ? setDropOffSet(dropoffNaming.nameTwo)
                                        : setDropOffSet(dropoffNaming.nameTwo)

                                }}
                            >
                                <div className="flex justify-center items-center w-full text-xs">
                                    <div className="flex md:mr-1 xs:mr-0 h-5 w-5 justify-center">
                                        <div className=" md:text-xl xs:text-3xl flex mr-1 w-10 h-10 justify-center text-gray-600"><TbHistory /></div>
                                    </div>
                                    <div className="md:flex xs:hidden justify-center items-center text-center text-gray-600 ">
                                        {dropoffNaming.nameTwo}
                                    </div>

                                </div>
                            </h1>
                        </div>
                    </div>
                </div>


                <div className="w-full">
                    <div className=" bg-gray-100 overflow-hidden w-full sm:w-full xs:w-full">
                        {dropoffSet === "Current DropOff" && (
                            <>
                                <div className="">
                                    <div>
                                        <div className='my-20 flex md:px-5 xs:px-0 w-full justify-center items-center  '>
                                            <div className='flex flex-col bg-transparent justify-center items-center my-8 rounded-lg xs:px-5 md:px-20'>
                                                {/* <img alt="" src={Scooter} className="text-[1px] w-40 h-40 flex justify-center items-center" /> */}
                                                <Image
                                                    src={'/images/Referral/scooter.svg'}
                                                    alt="logo"
                                                    width={40}
                                                    height={40}
                                                    priority
                                                    className="text-[1px] w-40 h-40 flex justify-center items-center"
                                                />

                                                <div className='font-medium md:text-lg xs:text-md my-5 w-full'>
                                                    <div className='font-semibold md:text-[17px] xs:text-[14px] w-full flex justify-center items-center'>
                                                        No Current DropOff Made Yet
                                                    </div>
                                                    <div className='text-gray-500 font-medium w-full md:text-[13px] xs:text-xs flex justify-center items-center my-5 text-center'>
                                                        There are no pickup appointments to show. <br />Once you schedule some appointments, <br />they would appear here.
                                                    </div>
                                                </div>

                                                {/* <button
                                                    onClick={() => openModal()}
                                                    className="w-fit bg-primary font-semibold rounded-lg text-white md:px-6 md:py-3 xs:px-4 xs:py-2 md:text-[15px] xs:text-[13px] " 
                                                    
                                                >

                                                    <span
                                                        className="w-fit md:px-3 md:py-3 xs:px-0 xs:py-1 font-semibold rounded-lg md:text-[14px] xs:text-[14px] text-center"
                                                    >Schedule DropOff</span>

                                                </button> */}
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>


                    <div className=" bg-gray-100 overflow-hidden w-full">
                        {dropoffSet === "DropOff History" && (
                            <>
                                <div>
                                    {/* <HistoryDropOff /> */}
                                </div>

                            </>
                        )}
                    </div>
                </div>


            </div>
        </div>
    )
}

