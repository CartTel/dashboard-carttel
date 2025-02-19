"use client";


import { B1, B2, B2Regular, H2 } from "@/components/custom-typography";

import { useSearchParams, useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";

import { fetchAllShipmentRequest } from "@/config/api";
import { SkeletonLoader } from "@/components/ui/skeletonCard";
import { useQuery } from "@tanstack/react-query";
import { formatDate } from "@/helper/format";




const pendingRequests = [
    {
        requestId: "FFM/BID/155",
        requestName: "Testing image upload",
        slaTimeline: 'sla timeline',
        unit: 'Kings Palace',
        requestSla: 'Water Supply',
        slaStatus: 'pending',
        salesOrderTitle: "FFM/SO/600",
        status: "Awaiting RFQ",
        createdAt: "Wednesday, July 3, 2024",
    },
    {
        requestId: "FFM/BID/155",
        requestName: "Testing image upload",
        slaTimeline: 'sla timeline',
        unit: 'Kings Palace',
        requestSla: 'Water Supply',
        slaStatus: 'pending',
        salesOrderTitle: "FFM/SO/600",
        status: "Awaiting RFQ",
        createdAt: "Wednesday, July 3, 2024",
    },
    {
        requestId: "FFM/BID/155",
        requestName: "Testing image upload",
        slaTimeline: 'sla timeline',
        unit: 'Kings Palace',
        requestSla: 'Water Supply',
        slaStatus: 'pending',
        salesOrderTitle: "FFM/SO/600",
        status: "Awaiting RFQ",
        createdAt: "Wednesday, July 3, 2024",
    },
    {
        requestId: "FFM/BID/155",
        requestName: "Testing image upload",
        slaTimeline: 'sla timeline',
        unit: 'Kings Palace',
        requestSla: 'Water Supply',
        slaStatus: 'pending',
        salesOrderTitle: "FFM/SO/600",
        status: "Awaiting RFQ",
        createdAt: "Wednesday, July 3, 2024",
    },
    {
        requestId: "FFM/BID/155",
        requestName: "Testing image upload",
        slaTimeline: 'sla timeline',
        unit: 'Kings Palace',
        requestSla: 'Water Supply',
        slaStatus: 'pending',
        salesOrderTitle: "FFM/SO/600",
        status: "Awaiting RFQ",
        createdAt: "Wednesday, July 3, 2024",
    },
    {
        requestId: "FFM/BID/155",
        requestName: "Testing image upload",
        slaTimeline: 'sla timeline',
        unit: 'Kings Palace',
        requestSla: 'Water Supply',
        slaStatus: 'pending',
        salesOrderTitle: "FFM/SO/600",
        status: "Awaiting RFQ",
        createdAt: "Wednesday, July 3, 2024",
    },
    {
        requestId: "FFM/BID/155",
        requestName: "Testing image upload",
        slaTimeline: 'sla timeline',
        unit: 'Kings Palace',
        requestSla: 'Water Supply',
        slaStatus: 'pending',
        salesOrderTitle: "FFM/SO/600",
        status: "Awaiting RFQ",
        createdAt: "Wednesday, July 3, 2024",
    },
    {
        requestId: "FFM/BID/155",
        requestName: "Testing image upload",
        slaTimeline: 'sla timeline',
        unit: 'Kings Palace',
        requestSla: 'Water Supply',
        slaStatus: 'pending',
        salesOrderTitle: "FFM/SO/600",
        status: "Awaiting RFQ",
        createdAt: "Wednesday, July 3, 2024",
    },
];

interface shipmentStatus {
    code: string;
    name: string;
}

interface tracking {
    tracking_number: string;
    tracking_url: string;
}

interface shipmentInterface {
    code: string;
    name: string;
    status: shipmentStatus;
    totalShipmentCost: string;
    tracking: tracking;
    requested_by: string;
    created_at: Date | string;
}

function ShipmentRequests() {
    const [pagination, setPagination] = useState({
        perPage: 10,
        totalPages: 100,
        page: 1,
        lastPage: 100,
        links: [],
    });

    const { data: shipmentData, isLoading: isLoadingShipment, isError: isErrorShipment, error: shipmentError } = useQuery({
        queryKey: ["shipment-request"],
        queryFn: fetchAllShipmentRequest,
        staleTime: Infinity,
        retry: false,
    });

    const onPageChange = (page: number) => {
        setPagination((prev) => ({ ...prev, page }));
    };

    return (
        <div className="overflow-x-auto ">
            <div className='w-full'>
                {isLoadingShipment ? (
                    <SkeletonLoader number={2} />
                ) : isErrorShipment ? (
                    <div>Error loading shipment data: {shipmentError.message}</div>
                ) : (
                    <div className='overflow-auto w-full bg-white border border-gray-200 shadow-md py-[20px] rounded-[10px] mb-5'>
                        <table className="w-full">
                            <thead className="text-left text-[#8D8D8D] font-[500] text-[1rem] bg-[#ECECEC] h-[36px]">
                                <tr>
                                    <th className="pl-[15px] font-normal text-gray-500">Code</th>
                                    <th className='whitespace-nowrap xs:px-[20px] md:px-0 font-normal text-start text-gray-500'>Name</th>
                                    <th className='whitespace-nowrap xs:px-[20px] md:px-5 font-normal text-start text-gray-500'>Requested By</th>
                                    <th className='whitespace-nowrap xs:px-[20px] md:px-5 font-normal text-start text-gray-500'>Status</th>
                                    <th className='whitespace-nowrap xs:px-[20px] md:px-5 font-normal text-start text-gray-500'>Tracking Number</th>
                                    <th className='whitespace-nowrap xs:px-[20px] md:px-5 font-normal text-start text-gray-500'>Total Cost</th>
                                    <th className="whitespace-nowrap xs:px-[20px] md:px-5 font-normal text-start text-gray-500">Created At</th>
                                </tr>
                            </thead>
                            <tbody>
                                {shipmentData?.map((request: shipmentInterface, index: number) => (
                                    <tr key={index} className="border-b border-b-[#EEEEEE] last:border-b-0 align-top">
                                        <td className="pl-[15px] py-7 ">
                                            <B1 className="!text-[0.875rem] mb-[8px] !w-[150px] truncate">
                                                {request.code}
                                            </B1>
                                        </td>
                                        <td className="py-7 xs:px-[20px] md:px-0 text-start">
                                            <B1 className="!text-[0.875rem] w-[90%] truncate">
                                                {request.name}
                                            </B1>
                                        </td>
                                        <td className="py-7 xs:px-[20px] md:px-5 text-start !w-[150px]">
                                            <B1 className="!text-[0.875rem] w-[100%] truncate">
                                                {request.requested_by}
                                            </B1>
                                        </td>
                                        <td className="py-7 xs:px-[20px] md:px-5 text-start !w-[200px]">
                                            <B1 className="!text-[0.875rem] w-[100%] truncate">
                                                {request?.status?.name}
                                            </B1>
                                        </td>
                                        <td className="xs:px-[20px] md:px-5 py-7 text-start !w-[150px]">
                                            <B1 className="!text-[0.875rem] w-[100%] truncate">
                                                {request.tracking?.tracking_number || 'N/A'}
                                            </B1>
                                        </td>
                                        <td className="xs:px-[20px] md:px-5 py-7 text-start !w-[150px]">
                                            <B1 className="!text-[0.875rem] w-[100%] truncate">
                                            ${request.totalShipmentCost}
                                            </B1>
                                        </td>
                                        <td className="xs:px-[20px] md:px-5 py-7 text-start !w-[150px]"> 
                                            <B1 className="!text-[0.875rem] w-[100%] truncate">
                                                {formatDate(request.created_at)}
                                            </B1>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ShipmentRequests;