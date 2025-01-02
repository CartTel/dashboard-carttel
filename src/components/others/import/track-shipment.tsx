"use client";

import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import Image from "next/image";



export default function TrackShipment() {

    const [naming, setNaming] = useState<string>("All Tasks");


    return (
        <div className=" text-lg font-semibold w-full z-0 relative px-0 ">
            <div className="w-full">
                <div>
                    <div className="px-6 py-2 font-medium text-sm mt-3 w-full">Expected Shipment?</div>

                </div>
                <div>
                    <div className="text-gray-500  py-2 font-medium text-sm mt-3 px-6">Use the information below as your shipping address when shopping online. We’ll receive and process the package in your name</div>

                </div>

                <div className="flex justify-between py-4 w-full md:px-4 xs:px-2 gap-2">

                    {/* <div className="flex relative w-full">
                        <div className="absolute bg-white z-30 md:left-[35px] xs:left-[10px] bottom-[10px] text-lg flex mr-1 md:w-10 xs:w-10 h-5 justify-center text-gray-600"><BsSearch /></div>
                        <input
                            type="text"
                            className="indent-14 md:mx-6 xs:mx-1 w-full rounded-lg border-gray-400 border text-gray-900 font-light outline-none text-[3px]"
                            placeholder="Enter Tracking ID"
                        />

                    </div> */}
                    <div
                        className={`text-[1rem] text-black  bg-white border-gray-400 border flex items-center h-[58px] rounded-[10px] w-[100%] px-[18px] gap-[10px]`}
                    >
                        <Image
                            src={'/images/Home/search.svg'}
                            alt='search'
                            width={20}
                            height={20}
                        />

                        <input

                            placeholder="Enter Tracking ID"
                            className="h-[100%] w-[100%] bg-[transparent] rounded-lg text-gray-900 font-light outline-none"


                        />

                    </div>
                    <button className="bg-[#fbc41d] rounded-lg text-sm font-semibold md:px-8 xs:px-2 py-3 xs:mx-0 md:mx-0">Track</button>
                </div>



            </div>
        </div>
    );
}

