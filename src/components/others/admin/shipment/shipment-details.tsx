"use client";
import { CustomBreadCrumb, CustomButton } from "@/components/custom-components";
import { B1, BMiddle, H2 } from "@/components/custom-typography";
import React, { useEffect, useState } from "react";

const breadCrumb = [
    {
        label: "Home",
        link: "/dashboard/admin",
    },
    {
        label: "Shipment",
        link: "/dashboard/admin/shipment",
    },
    {
        label: "Jobs In Planning",
    },
];

interface ShipmentRequestDetailsProps {
    id: string;
}


export function ShipmentRequestDetails({ id }: ShipmentRequestDetailsProps) {


    return (
        <div>
            {/* BREADCRUMB */}
            <div className="mb-[14px] flex items-center justify-between">
                <CustomBreadCrumb items={breadCrumb} className="bg-gray-200 w-fit px-5 py-1 rounded-full" />
            </div>
            <H2 className="mb-[36px]">Shipment Requests {id}</H2>
        </div>
    );
}
