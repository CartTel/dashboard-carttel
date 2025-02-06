"use client";

import {
    CustomBreadCrumb,
    CustomButton,
    CustomSelect,
} from "@/components/custom-components";
import { H2, H1, BMiddleRegular, BodySmallestMedium } from "@/components/custom-typography";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";



import CustomModal from "@/components/custom-components/custom-modal";
import PaginationV2 from "@/components/wrappers/pagination";

import apiClient from "@/config/api-clients";
import qs from 'qs';
import { useQuery } from "@tanstack/react-query";
import { TbFileInvoice } from "react-icons/tb";
import Link from 'next/link';
import { LuPackagePlus } from "react-icons/lu";
import { RxDownload } from "react-icons/rx";
import { formatDate } from '@/helper/format';






const breadCrumb = [
    {
        label: "Home",
        link: "/dashboard/import",
    },
    {
        label: "Shipment",
    },
];

const activityTabs = [
    "All Request",
    "Pending",
    "Invoice",
    "Approved",
    "Started",
    "Arrival",
    "Intransit",
    "Arrived",
    "Completed"
];




interface StatusCount {
    name: string;
    count: number;
}

const fetchAllShipment = async () => {

    try {

        const userString = localStorage.getItem("user"); // Get user data as string
        if (!userString) {
            throw new Error("User not found in local storage");
        }
        let user;

        try {
            user = JSON.parse(userString); // Attempt to parse user data
        } catch (parseError) {
            throw new Error("Invalid user data format in local storage");
        }

        if (!user.user || !user.user.id) {
            throw new Error("User ID not found in local storage");
        }

        const response = await apiClient.get(`/api/v1/shipment/get-all-shipments`, {
            params: {
                associations: ['invoice', 'tracking', 'sla', 'insurance', 'items', 'logs', 'user', 'senderInfo', 'receiverInfo'], // Specify the relationships to include
                sortOrder: 'DESC',
                sortBy: 'created_at',
                byUserId: user.user.id,
                page: 1,
                perPage: 1000,
            },
            paramsSerializer: (params) => {
                return qs.stringify(params, { arrayFormat: 'brackets' });
            },
        });
        console.log("shipment..", response.data);


        return response.data;

    } catch (error) {
        console.error('Error fetching shipment:', error);
        throw error; // Rethrow the error for handling in the component
    }
};

export function ImportShipment() {
    const [currentTab, setCurrentTab] = useState("");

    const router = useRouter();
    const queryParams = useSearchParams();

    const [currentActivityTab, setCurrentActivityTab] = useState("Pending"); // Default tab
    const [shipment, setShipment] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(true)

    const { data: shipmentData, isLoading: isLoadingShipment, isError: isErrorUsers, error: shipmentsError } = useQuery({
        queryKey: ["allShipments"],
        queryFn: fetchAllShipment,
        staleTime: Infinity, // Data is always stale
        retry: false,
    });



    useEffect(() => {
        const tab = queryParams.get("tab");
        if (tab) {
            setCurrentTab(tab);
        } else {
            setCurrentTab(activityTabs[0]);
        }
    }, [queryParams]);


    useEffect(() => {
        const fetchAllShipmentData = async () => {
            // console.log("current tab..", currentActivityTab);

            // Map tab names to corresponding status codes
            const tabToStatusCodes: Record<string, string[]> = {
                Pending: ["01"],
                Approved: ["30"],
                Intransit: ["135"],
                Started: ["40"],
                Completed: ["160"],
                Invoice: ["05"],
                Arrival: ["60"],
                Arrived: ["150"]
            };

            const byStatusCodes = tabToStatusCodes[currentActivityTab] || [];
            setLoading(true)
            // console.log("status code..", byStatusCodes, tabToStatusCodes.Pending);

            try {
                const userString = localStorage.getItem("user"); // Get user data as string
                if (!userString) {
                    throw new Error("User not found in local storage");
                }
                let user;

                try {
                    user = JSON.parse(userString); // Attempt to parse user data
                } catch (parseError) {
                    throw new Error("Invalid user data format in local storage");
                }

                if (!user.user || !user.user.id) {
                    throw new Error("User ID not found in local storage");
                }

                const response = await apiClient.get(`/api/v1/shipment/get-all-shipments`, {
                    params: {
                        associations: ['invoice', 'tracking', 'sla', 'insurance', 'items', 'logs', 'user', 'senderInfo', 'receiverInfo'], // Specify the relationships to include
                        sortOrder: 'DESC',
                        sortBy: 'created_at',
                        byUserId: user.user.id,
                        // byStatusCodes: ["05"],
                        byStatusCodes,
                        page: 1,
                        perPage: 1000,
                    },
                    paramsSerializer: (params) => {
                        return qs.stringify(params, { arrayFormat: 'brackets' });
                    },
                });

                setShipment(response.data)
                setLoading(false)

                // console.log("all Request..", response.data);
                return response.data;
            } catch (error) {
                console.error('Error fetching shipment:', error);
                throw error; // Rethrow the error for handling in the component
            }
        };
        fetchAllShipmentData(); // Fetch data when the component mounts
    }, [currentActivityTab]);

    const updateTab = (tab: string) => {
        // console.log("current string..", tab);
        setCurrentActivityTab(tab)
        router.push(`/dashboard/import/shipment?tab=${tab}`);
    };

    return (
        <div className="h-[100%] w-full">
            {/* BREADCRUMB */}
            <CustomBreadCrumb items={breadCrumb} className="bg-gray-200 font-[500] text-primary w-fit px-5 py-1 rounded-lg" />

            {/* <div className="my-[20px] flex lg:items-center justify-between lg:flex-row flex-col mb-[0px]">
                <H1 className="">Shipments</H1>
            </div> */}

            <div className="my-16 flex justify-between md:items-center gap-10  md:flex-row xs:flex-col ">
                {/* <div className='text-slate-700 text-lg md:item-center flex  md:justify-center text-start'>Shipments</div> */}
                <H1 className="">Shipments</H1>

                <div className='text-slate-700 text-lg flex gap-5 md:flex-row xs:flex-col '>
                    <div className="md:my-0 xs:my-1 flex md:justify-center items-center w-full">
                        <div className="block font-semibold">
                            <div
                                className="link flex font-semibold"

                            >
                                <div
                                    className="flex justify-center items-center cursor rounded-md bg-white border-primary border-[1px] font-medium px-4 md:py-3 xs:py-1 text-primary sm:text-xs xs:text-[12px] lg:text-[0.65rem] xl:text-[0.75rem] lg:w-fit xl:w-fit"
                                >
                                    <span className="mr-2 text-xl"><RxDownload /></span>
                                    <span>Export CSV</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="md:my-0 xs:my-1 flex md:justify-center w-full">
                        <div className="block  font-semibold">
                            <button
                                className="link flex font-semibold"
                            // onClick={() => openModal()}
                            >
                                <div
                                    className="w-full flex justify-center items-center cursor rounded-md bg-primary font-medium px-4 md:py-3 xs:py-2 text-white sm:text-xs xs:text-[12px] lg:text-[0.65rem] xl:text-[0.75rem]"
                                >
                                    <span className="mr-2 text-xl"><LuPackagePlus /></span>
                                    <span className="w-full  whitespace-nowrap">Add new shipment</span>
                                </div>
                            </button>
                        </div>
                    </div>
                    <div>
                        {/* <CreateShipment
                            isOpen={isOpen}
                            closeModal={closeModal}
                        /> */}
                    </div>

                </div>
            </div>


            <ul className="my-[14px] flex items-center gap-[29px] border-b-[0.5px] border-b-gray mb-[33px] overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 scrollbar-hide lg:overflow-x-visible">
                {activityTabs.map((tab, index) => (
                    <li
                        key={index}
                        className={`lg:text-[1rem] text-sm font-[500] tab ${currentTab === tab ? "tab-active" : ""
                            }`}
                        onClick={() => updateTab(tab)}
                    >
                        <button className="w-[100%] capitalize pb-[13px] whitespace-nowrap">
                            {tab}
                        </button>
                    </li>
                ))}
            </ul>

            {currentTab === "All Request" && (
                <PaginationV2
                    list={shipmentData?.data}
                    pagination={{
                        perPage: 5,
                        totalPages: Math.ceil(shipmentData?.pagination.total / 5),
                        total: shipmentData?.pagination.total,
                        page: shipmentData?.pagination.page,
                    }}
                    onPageChange={(page) => console.log("Page changed to:", page)}
                >
                    {(paginatedList) => (
                        <div className="overflow-x-auto">
                            {/* Container for vertical scrolling */}
                            <div className=" overflow-y-auto">
                                <table className="min-w-full border shadow">
                                    <thead className="sticky top-0 bg-[#ECECEC] text-[#8D8D8D] font-[500] lg:text-[1rem] text-xs whitespace-nowrap">
                                        <tr className="text-left">
                                            <th className="px-4 py-2 font-medium text-[13px]">Item</th>
                                            <th className="px-4 py-2 font-medium text-[13px]">Status</th>
                                            <th className="px-4 py-2 font-medium text-[13px]">Requested By</th>
                                            <th className="px-4 py-2 font-medium text-[13px]">Tracking</th>
                                            <th className="px-4 py-2 font-medium text-[13px]">Pickup</th>
                                            <th className="px-4 py-2 font-medium text-[13px]">Delivery To</th>
                                            <th className="px-4 py-2 font-medium text-[13px]">Date</th>
                                            <th className="px-4 py-2 font-medium text-[13px]">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {paginatedList?.length > 0 ? (
                                            paginatedList.map((shipment, index) => (
                                                <tr
                                                    key={shipment.id || index}
                                                    className="text-[1rem] font-[500] align-top border-b border-gray-200"
                                                >
                                                    <td className="px-2 py-2 bg-gray-50 min-w-[200px]">
                                                        <div>
                                                            <Link href={`/dashboard/import/shipment/${shipment.id}`}>
                                                                <BodySmallestMedium className="my-[10px] text-xs !text-gray-500 capitalize">
                                                                    {shipment.name}
                                                                </BodySmallestMedium>
                                                            </Link>
                                                            <BodySmallestMedium className="my-[10px] text-xs !text-purple-400">
                                                                {shipment.code}
                                                            </BodySmallestMedium>
                                                        </div>
                                                    </td>
                                                    <td className="px-5 py-4">
                                                        <div className="flex items-center">
                                                            <div
                                                                className={`rounded-full h-2 w-2 mr-2 flex animate-pulse ${shipment.status.name === "Shipment Created"
                                                                        ? "bg-orange-600"
                                                                        : shipment.status.name === "Invoice Generated"
                                                                            ? "bg-sky-600"
                                                                            : shipment.status.name === "Shipment Approved"
                                                                                ? "bg-primary"
                                                                                : shipment.status.name === "Shipment Started"
                                                                                    ? "bg-purple-600"
                                                                                    : shipment.status.name === "Arrival At The Warehouse"
                                                                                        ? "bg-gray-600"
                                                                                        : shipment.status.name === "Shipment InTransit"
                                                                                            ? "bg-amber-600"
                                                                                            : shipment.status.name === "Shipment Arrived"
                                                                                                ? "bg-pink-600"
                                                                                                : shipment.status.name === "Shipment Completed"
                                                                                                    ? "bg-green-600"
                                                                                                    : shipment.status.name === "Terminated"
                                                                                                        ? "bg-red-600"
                                                                                                        : ""
                                                                    }`}
                                                            ></div>
                                                            <span className="text-xs text-gray-600 truncate">
                                                                {shipment.status.name}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="px-5 py-1 bg-gray-50">
                                                        <BMiddleRegular className="my-[10px] text-xs !text-primary">
                                                            {shipment.requested_by}
                                                        </BMiddleRegular>
                                                    </td>
                                                    <td className="px-5 py-2">
                                                        <BMiddleRegular className="my-[1px] text-xs !text-gray-500 whitespace-nowrap">
                                                            Tracking Number: {shipment?.tracking?.tracking_number}
                                                        </BMiddleRegular>
                                                        <br />
                                                        <BMiddleRegular className="my-[1px] text-xs !text-gray-500 whitespace-nowrap">
                                                            Tracking ID: {shipment?.tracking?.tracking_id}
                                                        </BMiddleRegular>
                                                    </td>
                                                    <td className="px-5 py-2 text-gray-900 font-[500] whitespace-nowrap bg-gray-50">
                                                        <div>
                                                            <BMiddleRegular className="my-[1px] text-xs !text-gray-500 whitespace-nowrap">
                                                                {shipment?.receiverInfo?.address_line_1}, {shipment?.receiverInfo?.city}, {shipment?.receiverInfo?.country}
                                                            </BMiddleRegular>
                                                        </div>
                                                        <BMiddleRegular className="my-[1px] text-xs !text-gray-500 whitespace-nowrap">
                                                            {shipment?.senderInfo?.name}
                                                        </BMiddleRegular>
                                                    </td>
                                                    <td className="px-5 py-2 text-gray-900 font-[500] whitespace-nowrap bg-gray-50">
                                                        <div>
                                                            <BMiddleRegular className="my-[1px] text-xs !text-gray-500 whitespace-nowrap">
                                                                {shipment?.senderInfo?.address_line_1}, {shipment?.senderInfo?.city}, {shipment?.senderInfo?.country}
                                                            </BMiddleRegular>
                                                        </div>
                                                        <BMiddleRegular className="my-[1px] text-xs !text-gray-500 whitespace-nowrap">
                                                            {shipment?.receiverInfo?.name}
                                                        </BMiddleRegular>
                                                    </td>
                                                    <td className="px-2 py-0">
                                                        <div>
                                                            <BMiddleRegular className="my-[10px] text-xs text-gray-600 truncate">
                                                                Created Date: {formatDate(shipment?.created_at)}
                                                            </BMiddleRegular>
                                                            {shipment?.sla && (
                                                                <BMiddleRegular className="!text-[#13905C] mt-[10px] text-xs">
                                                                    Delivery Date: {formatDate(shipment?.sla.estimatedDeliveryDate)}
                                                                </BMiddleRegular>
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {/* Render your action buttons or links here */}
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={8} className="text-center py-4">
                                                    No shipments found.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                </PaginationV2>
            )}


            {currentTab !== "All Request" && (
                <PaginationV2
                    list={shipment?.data}
                    pagination={{
                        perPage: 5,
                        totalPages: Math.ceil(shipment?.pagination?.total / 5),
                        total: shipment?.pagination?.total,
                        page: shipment?.pagination?.page,
                    }}
                    onPageChange={(page) => console.log("Page changed to:", page)}
                >
                    {(paginatedList) => (
                        <div className="overflow-x-auto">
                            {/* Container for vertical scrolling */}
                            <div className="max-h-[500px] overflow-y-auto">
                                <table className="min-w-full">
                                    <thead className="sticky top-0 bg-[#ECECEC] text-[#8D8D8D] font-[500] lg:text-[1rem] text-xs whitespace-nowrap">
                                        <tr className="text-left">
                                            <th className="px-4 py-2 font-medium text-[13px]">Item</th>
                                            <th className="px-4 py-2 font-medium text-[13px]">Status</th>
                                            <th className="px-4 py-2 font-medium text-[13px]">Requested By</th>
                                            <th className="px-4 py-2 font-medium text-[13px]">Tracking</th>
                                            <th className="px-4 py-2 font-medium text-[13px]">Pickup</th>
                                            <th className="px-4 py-2 font-medium text-[13px]">Delivery To</th>
                                            <th className="px-4 py-2 font-medium text-[13px]">Date</th>
                                            <th className="px-4 py-2 font-medium text-[13px]">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {paginatedList?.length > 0 ? (
                                            paginatedList.map((shipment, index) => (
                                                <tr
                                                    key={shipment.id || index}
                                                    className="text-[1rem] font-[500] align-top border-b border-gray-200"
                                                >
                                                    <td className="px-2 py-2 bg-gray-50 min-w-[200px]">
                                                        <div>
                                                            <Link href={`/dashboard/import/shipment/${shipment.id}`}>
                                                                <BodySmallestMedium className="my-[10px] text-xs !text-gray-500 capitalize">
                                                                    {shipment.name}
                                                                </BodySmallestMedium>
                                                            </Link>
                                                            <BodySmallestMedium className="my-[10px] text-xs !text-purple-400">
                                                                {shipment.code}
                                                            </BodySmallestMedium>
                                                        </div>
                                                    </td>
                                                    <td className="px-5 py-4">
                                                        <div className="flex items-center">
                                                            <div
                                                                className={`rounded-full h-2 w-2 mr-2 flex animate-pulse ${shipment.status.name === "Shipment Created"
                                                                        ? "bg-orange-600"
                                                                        : shipment.status.name === "Invoice Generated"
                                                                            ? "bg-sky-600"
                                                                            : shipment.status.name === "Shipment Approved"
                                                                                ? "bg-primary"
                                                                                : shipment.status.name === "Shipment Started"
                                                                                    ? "bg-purple-600"
                                                                                    : shipment.status.name === "Arrival At The Warehouse"
                                                                                        ? "bg-gray-600"
                                                                                        : shipment.status.name === "Shipment InTransit"
                                                                                            ? "bg-amber-600"
                                                                                            : shipment.status.name === "Shipment Arrived"
                                                                                                ? "bg-pink-600"
                                                                                                : shipment.status.name === "Shipment Completed"
                                                                                                    ? "bg-green-600"
                                                                                                    : shipment.status.name === "Terminated"
                                                                                                        ? "bg-red-600"
                                                                                                        : ""
                                                                    }`}
                                                            ></div>
                                                            <span className="text-xs text-gray-600 truncate">
                                                                {shipment.status.name}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="px-5 py-1 bg-gray-50">
                                                        <BMiddleRegular className="my-[10px] text-xs !text-primary">
                                                            {shipment.requested_by}
                                                        </BMiddleRegular>
                                                    </td>
                                                    <td className="px-5 py-2">
                                                        <BMiddleRegular className="my-[1px] text-xs !text-gray-500 whitespace-nowrap">
                                                            Tracking Number: {shipment?.tracking?.tracking_number}
                                                        </BMiddleRegular>
                                                        <br />
                                                        <BMiddleRegular className="my-[1px] text-xs !text-gray-500 whitespace-nowrap">
                                                            Tracking ID: {shipment?.tracking?.tracking_id}
                                                        </BMiddleRegular>
                                                    </td>
                                                    <td className="px-5 py-2 text-gray-900 font-[500] whitespace-nowrap bg-gray-50">
                                                        <div>
                                                            <BMiddleRegular className="my-[1px] text-xs !text-gray-500 whitespace-nowrap">
                                                                {shipment?.receiverInfo?.address_line_1}, {shipment?.receiverInfo?.city}, {shipment?.receiverInfo?.country}
                                                            </BMiddleRegular>
                                                        </div>
                                                        <BMiddleRegular className="my-[1px] text-xs !text-gray-500 whitespace-nowrap">
                                                            {shipment?.senderInfo?.name}
                                                        </BMiddleRegular>
                                                    </td>
                                                    <td className="px-5 py-2 text-gray-900 font-[500] whitespace-nowrap bg-gray-50">
                                                        <div>
                                                            <BMiddleRegular className="my-[1px] text-xs !text-gray-500 whitespace-nowrap">
                                                                {shipment?.senderInfo?.address_line_1}, {shipment?.senderInfo?.city}, {shipment?.senderInfo?.country}
                                                            </BMiddleRegular>
                                                        </div>
                                                        <BMiddleRegular className="my-[1px] text-xs !text-gray-500 whitespace-nowrap">
                                                            {shipment?.receiverInfo?.name}
                                                        </BMiddleRegular>
                                                    </td>
                                                    <td className="px-2 py-0">
                                                        <div>
                                                            <BMiddleRegular className="my-[10px] text-xs text-gray-600 truncate">
                                                                Created Date: {formatDate(shipment?.created_at)}
                                                            </BMiddleRegular>
                                                            {shipment?.sla && (
                                                                <BMiddleRegular className="!text-[#13905C] mt-[10px] text-xs">
                                                                    Delivery Date: {formatDate(shipment?.sla.estimatedDeliveryDate)}
                                                                </BMiddleRegular>
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {/* Render your action buttons or links here */}
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={8} className="text-center py-4">
                                                    No shipments found.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </PaginationV2>
            )}

        </div>
    );
}
