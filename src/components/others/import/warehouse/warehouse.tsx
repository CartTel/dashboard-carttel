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

import { TbHistory } from "react-icons/tb";
import { TiCalendarOutline } from "react-icons/ti";
import { CiCalendarDate } from "react-icons/ci";
import { IoTimeOutline } from "react-icons/io5";

import { TfiLocationPin } from "react-icons/tfi";
import { CiBarcode } from "react-icons/ci";

import { BiDockBottom } from "react-icons/bi";

import { PiWarehouseDuotone } from "react-icons/pi";


const initialState = [
    {
        pickUpCode: "#9BA59OPW45R",
        itemName: "Apple iPhone X 256 GB Black",
        pickUpAddress: "Suite 004, Ground Floor, Right Wing. Airport Business Hub, Along Murtala Muhammad International Airport Road, Ikeja, Lagos",
        pickUpDate: "Thu May 30 2024",
        pickUpTime: "4:30 PM",
    },
    {
        pickUpCode: "#4RE914QX4JZ",
        itemName: "Samba OG Shoes",
        pickUpAddress: "Suite 004, Ground Floor, Right Wing. Airport Business Hub, Along Murtala Muhammad International Airport Road, Ikeja, Lagos",
        pickUpDate: "Fri Nov 29 2024",
        pickUpTime: "1:30 PM",
    },

]


const breadCrumb = [
    {
        label: "Home",
        link: "/dashboard/import",
    },
    {
        label: "Warehouse",
        link: "/dashboard/import/warehouse",
    }
];

export function WarehousePage() {
    const [warehouseSet, setWarehouseSet] = useState("Current Warehouse");
    const [isOpen, setIsOpen] = useState(false);

    const [warehoused, setWarehoused] = useState<any>(initialState);

    // eslint-disable-next-line no-unused-vars
    const [warehouseNaming, setWarehouseNaming] = useState({
        nameOne: "Current Warehouse",
        nameTwo: "Warehouse History",
    });


    return (
        <div className="text-lg  w-full z-0 relative">
            <CustomBreadCrumb items={breadCrumb} className="bg-gray-200 font-[500] text-primary w-fit px-5 py-1 rounded-lg" />
            <div className="my-[20px] flex lg:items-center justify-between lg:flex-row flex-col mb-[0px]">
                <H1 className="">Warehouse</H1>
            </div>


            <div className="my-20">

                <div
                    className={`${warehouseSet === warehouseNaming.nameOne ||
                        warehouseNaming.nameTwo
                        ? ""
                        : ""
                        } w-full px-0 md:cursor-pointer group py-0  border-none`}
                >
                    <div className="w-full flex justify-center items-center ">
                        <div className="text-center grid grid-cols-2 justify-between md:w-[100%] xs:w-full text-sm border-none outline-none">
                            <h1
                                className={`${warehouseSet === warehouseNaming.nameOne ? "border-t-[2px] border-secondary bg-gray-100" : ""
                                    } py-4 flex items-center md:pr-0 pr-5 group w-full `}
                                onClick={() => {
                                    warehouseSet !== warehouseNaming.nameOne
                                        ? setWarehouseSet(warehouseNaming.nameOne)
                                        : setWarehouseSet(warehouseNaming.nameOne);

                                }}
                            >
                                <div className="flex justify-center items-center w-full text-xs">
                                    <div className="flex md:mr-1 xs:mr-0 h-5 w-5 justify-center">
                                        <div className="md:text-xl xs:text-3xl flex mr-1 w-10 h-10 justify-center text-gray-600"><PiWarehouseDuotone /></div>
                                    </div>
                                    <div className="md:flex xs:hidden justify-center items-center text-center text-gray-600">
                                        {warehouseNaming.nameOne}
                                    </div>

                                </div>
                            </h1>

                            <h1
                                className={`${warehouseSet === warehouseNaming.nameTwo ? "border-t-[2px] border-secondary bg-gray-100" : ""
                                    } py-4 flex items-center md:pr-0 pr-5 group w-full `}
                                onClick={() => {
                                    warehouseSet !== warehouseNaming.nameTwo
                                        ? setWarehouseSet(warehouseNaming.nameTwo)
                                        : setWarehouseSet(warehouseNaming.nameTwo)

                                }}
                            >
                                <div className="flex justify-center items-center w-full text-xs">
                                    <div className="flex md:mr-1 xs:mr-0 h-5 w-5 justify-center">
                                        <div className=" md:text-xl xs:text-3xl flex mr-1 w-10 h-10 justify-center text-gray-600"><TbHistory /></div>
                                    </div>
                                    <div className="md:flex xs:hidden justify-center items-center text-center text-gray-600 ">
                                        {warehouseNaming.nameTwo}
                                    </div>

                                </div>
                            </h1>
                        </div>
                    </div>
                </div>


                <div className="w-full">
                    <div className=" bg-gray-100 overflow-hidden w-full sm:w-full xs:w-full">
                        {warehouseSet === "Current Warehouse" && (
                            <>
                                <div className='my-20 flex flex-col md:px-5 xs:px-0 w-full justify-center items-center'>
                                    {!warehoused ? (
                                        warehoused?.map((schedule: any, index: number) => (
                                            <div
                                            key={schedule}
                                                className={`mx-2 cursor-pointer my-4 flex justify-between md:flex-row xs:flex-col md:gap-10 xs:gap-2 rounded-md md:py-3 xs:py-2 px-3 border-[1px] border-plain bg-white `}
                                            >
                                                <div className=''>
                                                    <div className='grid grid-cols-2'>
                                                        <div>
                                                            <div className='font-[500] text-primary md:text-[15px] xs:text-[15px] md:text-start xs:text-justify'>

                                                                <div className='flex items-center'>
                                                                    <div className='text-xl'><CiBarcode /></div>

                                                                    <div className='ml-1'>Pickup Code</div>

                                                                </div>
                                                            </div>
                                                            <div className='font-[400] text-gray-600 md:text-[15px] xs:text-[13px] md:text-start xs:text-justify'>
                                                                {schedule.pickUpCode}
                                                            </div>

                                                        </div>

                                                        <div>
                                                            <div className='font-[500] text-primary md:text-[15px] xs:text-[15px] md:text-start xs:text-justify'>
                                                                <div className='flex items-center'>
                                                                    <div className='text-xl'><BiDockBottom /></div>

                                                                    <div className='ml-1'>Item Name</div>

                                                                </div>
                                                            </div>
                                                            <div className='font-[400] text-gray-600 md:text-[15px] xs:text-[13px] md:text-start xs:text-justify'>
                                                                {schedule.itemName}
                                                            </div>

                                                        </div>
                                                    </div>

                                                    <div className='my-3'>
                                                        <div className='font-[500] text-primary md:text-[15px] xs:text-[16px] md:text-start xs:text-justify '>

                                                            <div className='flex items-center'>
                                                                <div className='text-xl'><TfiLocationPin /></div>

                                                                <div className='ml-1'>Pickup - CartTel Lagos, Nigeria</div>

                                                            </div>
                                                        </div>
                                                        <div className='font-[400] text-gray-600 md:text-[15px] xs:text-[13px] md:text-start xs:text-justify'>
                                                            {schedule.pickUpAddress}
                                                        </div>

                                                    </div>

                                                    <div className='grid grid-cols-2'>
                                                        <div>
                                                            <div className='font-[500] text-primary md:text-[15px] xs:text-[16px] md:text-start xs:text-justify'>

                                                                <div className='flex items-center'>
                                                                    <div className='text-xl'><CiCalendarDate /></div>

                                                                    <div className='ml-1'>Pickup Date</div>

                                                                </div>
                                                            </div>
                                                            <div className='font-[400] text-gray-600 md:text-[15px] xs:text-[13px] md:text-start xs:text-justify'>
                                                                {schedule.pickUpDate}
                                                            </div>

                                                        </div>

                                                        <div>
                                                            <div className='font-[500] text-primary md:text-[15px] xs:text-[16px] md:text-start xs:text-justify'>
                                                                <div className='flex items-center'>
                                                                    <div className='text-xl'><IoTimeOutline /></div>

                                                                    <div className='ml-1'>Pickup Time</div>

                                                                </div>
                                                            </div>
                                                            <div className='font-[400] text-gray-600 md:text-[15px] xs:text-[13px] md:text-start xs:text-justify'>
                                                                {schedule.pickUpTime}
                                                            </div>

                                                        </div>
                                                    </div>

                                                </div>
                                                <div className='float-left flex items-center justify-center '>
                                                    {/* <img alt="" src={Package} className="text-[1px] md:w-52 md:h-40 xs:w-32 xs:h-32 flex justify-center items-center" /> */}
                                                    <Image
                                                        src={'/images/Referral/order-tracking.svg'}
                                                        alt="logo"
                                                        width={40}
                                                        height={40}
                                                        priority
                                                        className="text-[1px] md:w-52 md:h-40 xs:w-32 xs:h-32 flex justify-center items-center"
                                                    />

                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className='flex flex-col bg-transparent justify-center items-center my-8 rounded-lg xs:px-5 md:px-20'>
                                            {/* <img alt="" src={OpenBox} className="text-[1px] w-44 h-44 flex justify-center items-center" /> */}
                                            {/* <Image
                                                src={'/images/Referral/warehouse-animated.gif'}
                                                alt="logo"
                                                width={40}
                                                height={40}
                                                priority
                                                className="text-[1px] w-44 h-44 flex justify-center items-center"
                                            /> */}
                                            <Image
                                                src={'/images/Referral/warehouse.svg'}
                                                alt="logo"
                                                width={40}
                                                height={40}
                                                priority
                                                className="text-[1px] w-44 h-44 flex justify-center items-center"
                                            />
                                            <div className='font-medium md:text-lg xs:text-md my-5 w-full'>
                                                <div className='font-semibold md:text-[17px] xs:text-[14px] w-full flex justify-center items-center'>
                                                    No Current WareHouse Created Yet
                                                </div>
                                                <div className='text-gray-500 font-medium w-full md:text-[13px] xs:text-xs flex justify-center items-center my-5 text-center'>
                                                    There is currently no warehouse item made yet to show. <br />Once you create a warehouse, they would appear here.
                                                </div>
                                            </div>


                                        </div>
                                    )}




                                </div>
                            </>
                        )}
                    </div>


                    <div className=" bg-gray-100 overflow-hidden w-full">
                        {warehouseSet === "Warehouse History" && (
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

