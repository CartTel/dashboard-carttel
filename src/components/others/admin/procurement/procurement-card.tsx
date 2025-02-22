import { BMiddle, BMiddleRegular, BodySmallest, BodySmallestMedium } from '@/components/custom-typography';
import Link from 'next/link';
import React from 'react'
import { formatDate } from '@/helper/format';
import { SkeletonLoader } from "@/components/ui/skeletonCard";

interface ISla {
    actualDeliveryDate: string;
    estimatedDeliveryDate: Date | string;
}

interface procurementStatus {
    code: string;
    name: string;
}

interface tracking {
    tracking_number: string;
    tracking_url: string;
}

interface IProcurementCard {
    id: number;
    name: string;
    status: procurementStatus;
    totalValue: string;
    created_at: Date | string;
    code: string;
    indicatorClass?: string;
    containerClass?: string;
    loading: boolean | string;
}

export function ProcurementCard(
    { id, loading, name, totalValue, code, status, created_at, indicatorClass, containerClass }: IProcurementCard
) {

    const formatValue = (value: string): string | number => {
        const valueFormat = parseInt(value)
        return valueFormat.toLocaleString("en-US");
    };

    return (
        <div>
            {loading ? (
                <SkeletonLoader number={4} />
            ) : (
                <div className={`shadow bg-white px-[20px] py-[30px] rounded-[10px] w-[100%] h-full ${containerClass}`}>
                    <BMiddle >
                        <Link href={`/dashboard/admin/procurement/${id}`}>
                            {name}
                        </Link>
                    </BMiddle>

                    {/* <BodySmallestMedium className='my-[10px] !text-gray-500 text-xs'>Requested By: {requested_by}</BodySmallestMedium> */}

                    <BodySmallest className='my-[10px] !text-purple-700 uppercase'>{code}</BodySmallest>
                    <BMiddleRegular className="my-[10px] text-xs text-gray-600 truncate">
                        Created Date: {formatDate(created_at)}
                    </BMiddleRegular>
                    <div className='flex items-center '>
                        <div
                            className={`rounded-full h-2 w-2 mr-2 flex text-center animate-pulse 
                                ${status.name ===
                                    "Procurement Created"
                                    ? "bg-orange-600 text-orange-600"
                                    : status.name ===
                                    "Restart Process"
                                    ? "bg-sky-600 text-sky-600"
                                    : status.name ===
                                    "Procurement Approved"
                                    ? "bg-primary text-primary"
                                    : status.name ===
                                    "Procurement Confirmed"
                                    ? "bg-purple-600 text-purple-600"
                                    : status.name ===
                                    "Awaiting Process"
                                    ? "bg-amber-600 text-amber-600"
                                    : status.name ===
                                    "Shipment Initiated"
                                    ? "bg-green-600 text-green-600" 
                                    : status.name ===
                                    "Terminated"
                                    ? "bg-red-600 text-red-600" : ""
                                }`}
                        >
                            {/* {status.name} */}
                        </div>
                        <BMiddleRegular className="text-xs text-gray-600 truncate">{status.name}</BMiddleRegular>
                    </div>
                    {totalValue && <BMiddleRegular className='!text-[#13905C] mt-[10px] text-xs'>Total Value: ${formatValue(totalValue)}</BMiddleRegular>}

                    {/* {sla && <BMiddleRegular className='!text-[#13905C] mt-[10px] text-xs'>Delivery Date: {formatDate(sla.estimatedDeliveryDate)}</BMiddleRegular>} */}
                </div>
            )}

        </div>

    )
}
