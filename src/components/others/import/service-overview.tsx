"use client"
import React, { useState } from "react";

import ShipmentAddress from "./shipment-address";
import ShipmentCalculator from "./shipment-calculator";
import TrackShipment from "./track-shipment";
import { BsSearch } from "react-icons/bs";
import { PiHouseLineDuotone } from "react-icons/pi";
import { MdOutlineCalculate } from "react-icons/md";
import { B1, H2, B2 } from "@/components/custom-typography";



export default function ServiceOverview () {
    const [naming, setNaming] = useState<string>("Track Shipment");

    const [linkName] = useState<{
        nameOne: string;
        nameTwo: string;
        nameThree: string;
    }>({
        nameOne: "Track Shipment",
        nameTwo: "Shipping Address",
        nameThree: "Shipping Calculator",
    });

    return (
        <div className="text-lg font-semibold w-full z-0 relative">
            <div className="my-20">
                <B1 className='text-slate-700 '>Service Overview</B1>

                <div className="mt-5 flex justify-center flex-row">
                    <div className="overflow-hidden md:w-full sm:w-full border-none">
                        <div className={`w-full px-0 md:cursor-pointer group py-0 border-none`}>
                            <div className="w-full justify-center items-center">
                                <div className="text-center grid grid-cols-3 justify-between md:w-[100%] xs:w-full text-sm border-none outline-none">
                                    <h1
                                        className={`${naming === linkName.nameOne ? "border-t-[2px] border-secondary bg-gray-100" : ""} py-4 flex items-center md:pr-0 pr-5 group w-full`}
                                        onClick={() => setNaming(linkName.nameOne)}
                                    >
                                        <div className="flex justify-center items-center w-full text-xs">
                                            <div className="flex md:mr-1 xs:mr-0 h-5 w-5 justify-center">
                                                <div className="text-lg flex mr-1 w-10 h-10 justify-center text-gray-600"><BsSearch /></div>
                                            </div>
                                            <div className="md:flex xs:hidden justify-center items-center text-center text-gray-600">
                                                {linkName.nameOne}
                                            </div>
                                        </div>
                                    </h1>

                                    <h1
                                        className={`${naming === linkName.nameTwo ? "border-t-[2px] border-secondary bg-gray-100" : ""} py-4 flex items-center md:pr-0 pr-5 group w-full`}
                                        onClick={() => setNaming(linkName.nameTwo)}
                                    >
                                        <div className="flex justify-center items-center w-full text-xs">
                                            <div className="flex md:mr-1 xs:mr-0 h-5 w-5 justify-center">
                                                <div className="text-lg flex mr-1 w-10 h-10 justify-center text-gray-600"><PiHouseLineDuotone /></div>
                                            </div>
                                            <div className="md:flex xs:hidden justify-center items-center text-center text-gray-600">
                                                {linkName.nameTwo}
                                            </div>
                                        </div>
                                    </h1>

                                    <h1
                                        className={`${naming === linkName.nameThree ? "border-t-[2px] border-secondary bg-gray-100" : ""} py-4 flex items-center md:pr-0 pr-5 group w-full`}
                                        onClick={() => setNaming(linkName.nameThree)}
                                    >
                                        <div className="flex justify-center items-center w-full text-xs">
                                            <div className="flex md:mr-1 xs:mr-0 h-5 w-5 justify-center">
                                                <div className="text-lg flex mr-1 w-10 h-10 justify-center text-gray-600"><MdOutlineCalculate /></div>
                                            </div>
                                            <div className="md:flex xs:hidden justify-center items-center text-center text-gray-600">
                                                {linkName.nameThree}
                                            </div>
                                        </div>
                                    </h1>
                                </div>
                            </div>
                        </div>

                        <div className="w-full">
                            <div className="bg-gray-100 overflow-hidden w-full">
                                {naming === "Track Shipment" && <TrackShipment />}
                            </div>

                            <div className="bg-gray-100 overflow-hidden w-full">
                                {naming === "Shipping Address" && <ShipmentAddress />}
                            </div>

                            <div className="w-full bg-gray-100 overflow-hidden">
                                {naming === "Shipping Calculator" && <ShipmentCalculator />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

