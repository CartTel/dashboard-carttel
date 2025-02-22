import { BMiddle, BMiddleRegular, BodySmallest, BodySmallestMedium } from '@/components/custom-typography';
import Link from 'next/link';
import React from 'react'
import { formatDate } from '@/helper/format';
import { SkeletonLoader } from "@/components/ui/skeletonCard";
import Image from 'next/image';
import { formatDateTime } from '@/helper/format';

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
    logs: any;
}

export function ProcurementImportCard(
    { id, loading, name, totalValue, code, status, created_at, logs, indicatorClass, containerClass }: IProcurementCard
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
                <div className={`shadow bg-white px-[10px] py-[30px] rounded-[10px] border-[1px] w-[100%] h-full ${containerClass}`}>
                    <div className='flex justify-start items-center'>
                        <div className='p-2 bg-gray-100 rounded-md mr-2'>
                            <Image
                                src={'/images/box.svg'}
                                alt="logo"
                                width={30}
                                height={30}
                                priority
                                className=""
                            />
                        </div>
                        <BMiddle className='md:!text-[13px] xs:!text-[9px]'>
                            <div >
                                {name}
                            </div>
                        </BMiddle>

                    </div>

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

                    <BodySmallestMedium className='my-5'>Procurement Logs</BodySmallestMedium>
                    <ul className="relative w-[100%] bg-slate-100 rounded-lg p-2">
                        {logs.sort((a: any, b: any) => a.id - b.id)?.slice(-2)?.map((log: any, index: number) => (
                            <li
                                key={index}
                                className="flex items-start lg:gap-[5px] gap-3 relative mb-[20px]"
                            >
                                {/* <B1 className="min-w-[96px] w-[96px] text-xs">{log?.user ? log?.user.name : 'N/A'}</B1> */}

                                <div
                                    className={`rounded-full p-1 flex justify-center items-center z-50
                                    ${log?.comment?.title ===
                                            "Procurement Created"
                                            ? "bg-orange-500 text-orange-500"
                                            : log?.comment?.title ===
                                                "Restart Process"
                                                ? "bg-sky-500 text-sky-500"
                                                : log?.comment?.title ===
                                                    "Procurement Approved"
                                                    ? "bg-slate-500 text-slate-500"
                                                    : log?.comment?.title ===
                                                        "Procurement Confirmed"
                                                        ? "bg-purple-500 text-purple-500"
                                                        : log?.comment?.title ===
                                                            "Awaiting Process"
                                                            ? "bg-pink-500 text-pink-500"
                                                            : log?.comment?.title ===
                                                                "Shipment Initiated"
                                                                ? "bg-green-500 text-green-500"
                                                                : log?.comment?.title ===
                                                                    "Terminated"
                                                                    ? "bg-red-500 text-red-500" : ""
                                        }`}
                                // className="rounded-full bg-[#029B5B] p-1 flex justify-center items-center "
                                >
                                    {log?.comment?.title ===
                                        "Procurement Created"
                                        ?
                                        <Image
                                            src={"/images/Package/box-package.svg"}
                                            alt="checked"
                                            width={20}
                                            height={20}
                                            className="z-[50] text-white"
                                        />
                                        : log?.comment?.title ===
                                            "Restart Process"
                                            ?
                                            <Image
                                            src={"/images/Package/restart.svg"}
                                            alt="checked"
                                            width={20}
                                            height={20}
                                            className="z-[50] text-white"
                                        />
                                            : log?.comment?.title ===
                                                "Procurement Approved"
                                                ? <Image
                                                src={"/images/Package/sealed-box.svg"}
                                                alt="checked"
                                                width={20}
                                                height={20}
                                                className="z-[50] text-white"
                                            />
                                                : log?.comment?.title ===
                                                    "Procurement Confirmed"
                                                    ? <Image
                                                    src={"/images/Package/delivered-box.svg"}
                                                    alt="checked"
                                                    width={20}
                                                    height={20}
                                                    className="z-[50] text-white"
                                                />
                                                    : log?.comment?.title ===
                                                        "Awaiting Process"
                                                        ? <Image
                                                        src={"/images/Package/delivery.svg"}
                                                        alt="checked"
                                                        width={20}
                                                        height={20}
                                                        className="z-[50] text-white"
                                                    />
                                                        : log?.comment?.title ===
                                                            "Shipment Initiated"
                                                            ? <Image
                                                            src={"/images/Package/large-box.svg"}
                                                            alt="checked"
                                                            width={20}
                                                            height={20}
                                                            className="z-[50] text-white"
                                                        />
                                                            : ""
                                    }
                                    {/* <Image
                                        src={"/images/checked.svg"}
                                        alt="checked"
                                        width={20}
                                        height={20}
                                        className="z-[50] text-white"
                                    /> */}
                                </div>
                                <div className="">
                                    <BodySmallestMedium className="mb-[8px] w-full text-xs ">{log?.comment?.title}</BodySmallestMedium>
                                    {/* <BodySmallestMedium className="!text-gray808 text-[10px] text-gray-400 max-w-[250px]">
                                        {log?.comment?.text}
                                    </BodySmallestMedium> */}
                                </div>

                                <BodySmallestMedium className="!text-gray808 ml-auto">
                                    {log?.created_at ? formatDateTime(log?.created_at) : "N/A"}
                                </BodySmallestMedium>
                            </li>
                        ))}

                        <div className="absolute border-[1px] border-primary h-[100%] top-[0px] lg:left-[20px] left-[15px] xs:left-[20px] border-dashed" />
                    </ul>




                    {totalValue && <BMiddleRegular className='!text-[#13905C] mt-[10px] text-xs'>Total Value: ${formatValue(totalValue)}</BMiddleRegular>}

                    <div className="flex justify-center z-50 relative mt-4  bg-primary rounded-md py-2">
                        <Link
                            href={`/dashboard/import/procurement/${id}`}
                            className="flex justify-end z-50 relative  w-fit"
                        >
                            <div className="text-white ">View Details</div>
                        </Link>
                    </div>

                    {/* {sla && <BMiddleRegular className='!text-[#13905C] mt-[10px] text-xs'>Delivery Date: {formatDate(sla.estimatedDeliveryDate)}</BMiddleRegular>} */}
                </div>
            )}

        </div>

    )
}
