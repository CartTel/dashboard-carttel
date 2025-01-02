"use client";

import dynamic from "next/dynamic";
import { CustomButton } from "@/components/custom-components";
import { B1, H2, B2 } from "@/components/custom-typography";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import { HiArrowSmUp, HiArrowSmDown } from "react-icons/hi";
import { BsBoxSeam } from "react-icons/bs";
import { MdOutlineLocalShipping } from "react-icons/md";
import { LuPackageOpen, LuPackageCheck } from "react-icons/lu";


const ShipmentOverview = () => {
  

  return (
    <div className="w-[100%]">
      <div className="mt-0">
      <B1 className='text-slate-700 '>Shipment Overview</B1>
      <div className="grid md:grid-cols-4 xs:grid-cols-1 gap-4 mt-5">
        <div className="rounded-lg shadow-lg border-[1px] border-gray-200">
          <div className="p-5">
            <div className="card-body">
              <div className="flex justify-between ">
                <div className="">
                  <div className="mb-5 text-[1.5rem] rounded-full p-1 bg-gray-100  border-[1px] text-green-600 flex justify-center items-center">
                    {/* <AiOutlinePieChart /> */}
                    <LuPackageCheck />
                  </div>

                </div>
              </div>
              <B2 className="font-normal block mb-2 text-slate-500 md:text-sm xs:text-[15px]">Total Shipment Made</B2>
              <div className="flex justify-between items-center">
                <h3 className="text-green-600 mb-0 font-[400]">12,628</h3>
                <div className="bg-green-200 rounded-lg p-1 text-green-600 text-sm flex items-center">
                  <HiArrowSmUp />
                  <div>
                    +2.80%
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div className="rounded-lg shadow-lg border-[1px] border-gray-200">
          <div className="p-5">
            <div className="card-body">
              <div className="flex justify-between ">
                <div className="">
                  <div className="mb-5 text-[1.5rem] rounded-full p-1 bg-gray-100  border-[1px] text-amber-500 flex justify-center items-center">
                    {/* <AiOutlineClockCircle /> */}
                    <LuPackageOpen />
                  </div>

                </div>
              </div>
              <B2 className="font-normal block mb-2 text-slate-500 md:text-sm xs:text-[15px]">Total Procurement</B2>
              <div className="flex justify-between items-center">
                <h3 className="text-amber-600 mb-0 font-[400]">624</h3>
                <div className="bg-red-200 rounded-lg p-1 text-rose-600 text-sm flex items-center">
                  <HiArrowSmDown />
                  <div>
                    -1.06%
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div className="rounded-lg shadow-lg border-[1px] border-gray-200">
          <div className="p-5">
            <div className="card-body">
              <div className="flex justify-between ">
                <div className="">
                  <div className="mb-5 text-[1.5rem] rounded-full p-1 bg-gray-100  border-[1px] text-purple-600 flex justify-center items-center">
                    <BsBoxSeam />
                  </div>

                </div>
              </div>
              <B2 className="font-normal block mb-2 text-slate-500 md:text-sm xs:text-[15px]">Pickup packages</B2>
              <div className="flex justify-between items-center">
                <h3 className="text-purple-600 mb-0 font-[400]">28</h3>
                <div className="bg-red-200 rounded-lg p-1 text-rose-600 text-sm flex items-center">
                  <HiArrowSmDown />
                  <div>
                    -0.40%
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div className="rounded-lg shadow-lg border-[1px] border-gray-200">
          <div className="p-5">
            <div className="card-body">
              <div className="flex justify-between ">
                <div className="">
                  <div className="mb-5 text-[1.5rem] rounded-full p-1 bg-gray-100 border-[1px] text-sky-600 flex justify-center items-center">
                    <MdOutlineLocalShipping />
                  </div>

                </div>
              </div>
              <B2 className="font-normal block mb-2 text-slate-500 md:text-sm xs:text-[15px]">Delivery Shipments</B2>
              <div className="flex justify-between items-center">
                <h3 className="text-sky-600 mb-0 font-[400]">1,628</h3>
                <div className="bg-green-200 rounded-lg p-1 text-green-600 text-sm flex items-center">
                  <HiArrowSmUp />
                  <div>
                    +3.10%
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

      
    </div>
  );
}

export default ShipmentOverview;

