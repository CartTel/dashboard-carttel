import { BMiddle, BMiddleRegular, BodySmallest, BodySmallestMedium } from '@/components/custom-typography';
import Link from 'next/link';
import React from 'react'
import { formatDate } from '@/helper/format';
import { SkeletonLoader } from "@/components/ui/skeletonCard";

interface ISla {
    actualDeliveryDate: string;
    estimatedDeliveryDate: Date | string;
}

interface shipmentStatus {
    code: string;
    name: string;
}

interface tracking {
    tracking_number: string;
    tracking_url: string;
}

interface IShipmentCard {
    name: string;
    requested_by: string;
    status: shipmentStatus;
    totalShipmentCost: string;
    tracking: tracking;
    created_at: Date | string;
    sla?: ISla;
    code: string;
    indicatorClass?: string;
    containerClass?: string;
    loading: boolean | string;
}

export function ShipmentCard(
    { loading, name, requested_by, code, status, totalShipmentCost, tracking, created_at, sla, indicatorClass, containerClass }: IShipmentCard,

) {
    return (
        <div>
            {loading ? (

                <SkeletonLoader number={4} />

            ) : (
                <div className={`shadow bg-white px-[20px] py-[30px] rounded-[10px] w-[100%] h-full ${containerClass}`}>
                    <BMiddle >
                        <Link href={'/dashboard/activity/44e344534552462'}>
                            {name}
                        </Link>
                    </BMiddle>

                    <BodySmallestMedium className='my-[10px] !text-gray-500 text-xs'>Requested By: {requested_by}</BodySmallestMedium>

                    <BodySmallest className='my-[10px] !text-purple-700 uppercase'>{code}</BodySmallest>
                    <BMiddleRegular className="my-[10px] text-xs text-gray-600 truncate">
                        Created Date: {formatDate(created_at)}
                    </BMiddleRegular>
                    <div className='flex items-center '>
                        <div
                            className={`rounded-full h-2 w-2 mr-2 flex text-center animate-pulse 
                                                    ${status.name ===
                                    "Shipment Created"
                                    ? "bg-orange-600 text-orange-600"
                                    : status.name ===
                                        "Invoice Generated"
                                        ? "bg-sky-600 text-sky-600"
                                        : status.name ===
                                            "Shipment Approved"
                                            ? "bg-indigo-600 text-indigo-600"
                                            : status.name ===
                                                "Shipment Started"
                                                ? "bg-purple-600 text-purple-600"
                                                : status.name ===
                                                    "Arrival At The Warehouse"
                                                    ? "bg-gray-600 text-gray-600"
                                                    : status.name ===
                                                        "Shipment InTransit"
                                                        ? "bg-amber-600 text-amber-600"
                                                        : status.name ===
                                                            "Shipment Arrived"
                                                            ? "bg-pink-600 text-pink-600" :
                                                            status.name ===
                                                                "Shipment Completed"
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

                    {sla && <BMiddleRegular className='!text-[#13905C] mt-[10px] text-xs'>Delivery Date: {formatDate(sla.estimatedDeliveryDate)}</BMiddleRegular>}
                </div>
            )}

        </div>

    )
}
