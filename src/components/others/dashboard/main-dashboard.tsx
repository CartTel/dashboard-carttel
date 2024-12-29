"use client";

import dynamic from "next/dynamic";
import { CustomButton } from "@/components/custom-components";
import { B1, H2 } from "@/components/custom-typography";
import Image from "next/image";
import React, { useEffect, useState } from "react";


export function Dashboard() {
  

  return (
    <div className="w-[100%]">
      <B1 className="text-gray808">Hi ,</B1>
      <div className="flex lg:items-center justify-between mt-[12px] mb-[41px] lg:flex-row flex-col gap-5 lg:gap-0">
        <H2 className="">Overview</H2>
        <div className="flex items-center gap-[20px] ">
          
        </div>
      </div>

      <div className="">
        
      </div>

      
    </div>
  );
}

export default Dashboard;
