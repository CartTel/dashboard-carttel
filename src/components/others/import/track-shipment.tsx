"use client";

import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";




export function TrackShipment() {
    
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

                <div className="flex justify-between py-4 w-full ">
                    
                    <div className="flex relative w-full">
                        <div className="absolute md:left-5 xs:left-[.15rem] -bottom-2 text-lg flex mr-1 w-10 h-10 justify-center text-gray-600"><BsSearch /></div>
                        <input
                            type="text"
                            className="indent-8 md:mx-6 xs:mx-1 w-full rounded-lg border-gray-400 border text-gray-900 font-light outline-none text-[3px]"
                            placeholder="Enter Tracking ID"
                        />

                    </div>
                    <button className="bg-[#fbc41d] rounded-lg text-sm font-semibold md:px-8 xs:px-2 py-3 xs:mx-0 md:mx-4 ">Track</button>
                </div>

            </div>
        </div>
    );
}

export default TrackShipment;
