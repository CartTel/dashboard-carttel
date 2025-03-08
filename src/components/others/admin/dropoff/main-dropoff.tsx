"use client";

import {
    CustomBreadCrumb,
    CustomButton,
    CustomSelect,
} from "@/components/custom-components";
import { H2, H1, BMiddleRegular, BodySmallestMedium } from "@/components/custom-typography";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";


import Image from 'next/image'

import CustomModal from "@/components/custom-components/custom-modal";
import PaginationV2 from "@/components/wrappers/pagination";

import apiClient from "@/config/api-clients";
import qs from 'qs';
import { useQuery } from "@tanstack/react-query";

import Link from 'next/link';

import { formatDate, formatTime, convertTime, formatDateTime } from '@/helper/format';


const breadCrumb = [
    {
        label: "Home",
        link: "/dashboard/admin",
    },
    {
        label: "Dropoff",
    },
];

const activityTabs = [
    "All Request",
    "Pending",
    "Invoice",
    "Paid",
    "Approved",
    "Intransit",
    "Delivered"
];

interface StatusCount {
    name: string;
    count: number;
}

const fetchAllDropoff = async () => {
    try {
        const response = await apiClient.get(`/api/v1/dropoff/get-all-dropoffs`, {
            params: {
                associations: ['shipment', 'logs'], // Specify the relationships to include
                sortOrder: 'DESC',
                sortBy: 'updated_at',
                page: 1,
                perPage: 10000,
            },
            paramsSerializer: (params) => {
                return qs.stringify(params, { arrayFormat: 'brackets' });
            },
        });
        console.log("all dropoff Request..", response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching dropoff:', error);
        throw error; // Rethrow the error for handling in the component
    }
};

export function MainDropoff() {
    const [currentTab, setCurrentTab] = useState("");

    const router = useRouter();
    const queryParams = useSearchParams();

    const [currentActivityTab, setCurrentActivityTab] = useState("Pending"); // Default tab
    const [dropoff, setDropoff] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(true)
    const [showPickupModal, setShowDropoffModal] = useState(false);

    const toggleDropoffModal = () => {
        setShowDropoffModal((prev) => !prev);
    };

    const { data: dropoffData, isLoading: isLoadingDropoff, isError: isErrorUsers, error: dropoffError } = useQuery({
        queryKey: ["allDropoffs"],
        queryFn: fetchAllDropoff,
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
        const fetchAllDropoffData = async () => {
            // console.log("current tab..", currentActivityTab);

            // Map tab names to corresponding status codes
            const tabToStatusCodes: Record<string, string[]> = {
                Pending: ["01"],
                Paid: ["40"],
                Approved: ["50"],
                Intransit: ["65"],
                Delivered: ["100"],
                Invoice: ["20"]
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

                const response = await apiClient.get(`/api/v1/dropoff/get-all-dropoffs`, {
                    params: {
                        associations: ['shipment', 'logs'],
                        sortOrder: 'DESC',
                        sortBy: 'updated_at',
                        byStatusCodes,
                        page: 1,
                        perPage: 1000,
                    },
                    paramsSerializer: (params) => {
                        return qs.stringify(params, { arrayFormat: 'brackets' });
                    },
                });

                setDropoff(response.data)
                setLoading(false)

                console.log("all Request data..", response.data);
                return response.data;
            } catch (error) {
                console.error('Error fetching dropoff:', error);
                throw error; // Rethrow the error for handling in the component
            }
        };
        fetchAllDropoffData(); // Fetch data when the component mounts
    }, [currentActivityTab]);

    const updateTab = (tab: string) => {
        // console.log("current string..", tab);
        setCurrentActivityTab(tab)
        router.push(`/dashboard/admin/dropoff?tab=${tab}`);
    };

    return (
        <div className="h-[100%] w-full">
            {/* BREADCRUMB */}
            <CustomBreadCrumb items={breadCrumb} className="bg-gray-200 font-[500] text-primary w-fit px-5 py-1 rounded-lg" />

            <div className="my-16 flex justify-between md:items-center gap-10  md:flex-row xs:flex-col ">
                <H1 className="">Dropoff</H1>
            </div>


            <ul className="my-[14px] flex items-center gap-[29px] border-b-[0.5px] border-b-gray mb-[33px] overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 scrollbar-hide lg:overflow-x-visible">
                {activityTabs.map((tab, index) => (
                    <li
                        key={index}
                        className={`lg:text-[1rem]  text-sm font-[500] tab ${currentTab === tab ? "tab-active" : ""
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
                    list={dropoffData?.data}
                    pagination={{
                        perPage: 5,
                        totalPages: Math.ceil(dropoffData?.pagination?.total / 5),
                        total: dropoffData?.pagination?.total,
                        page: dropoffData?.pagination?.page,
                    }}
                    onPageChange={(page) => console.log("Page changed to:", page)}
                >
                    {(paginatedList) => (
                        <div className="overflow-x-auto">

                            <div className=" overflow-y-auto">
                                <table className="min-w-full border shadow">
                                    <thead className="sticky top-0 bg-[#ECECEC] text-[#8D8D8D] font-[500] lg:text-[1rem] text-xs whitespace-nowrap">
                                        <tr className="text-left">
                                            <th className="px-4 py-2 font-medium text-[13px]">Code</th>
                                            <th className="px-4 py-2 font-medium text-[13px]">Status</th>
                                            <th className="px-4 py-2 font-medium text-[13px]">Delivery From</th>
                                            <th className="px-4 py-2 font-medium text-[13px]">Delivery To</th>
                                            <th className="px-4 py-2 font-medium text-[13px]">Plan</th>
                                            <th className="px-4 py-2 font-medium text-[13px]">Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {paginatedList?.length > 0 ? (
                                            paginatedList.map((dropoff, index) => (
                                                <tr
                                                    key={dropoff.id || index}
                                                    className="text-[1rem] font-[500] align-top border-b border-gray-200"
                                                >
                                                    <td className="px-2 py-2 bg-gray-50 min-w-[200px]">
                                                        <div>
                                                            <Link href={`/dashboard/admin/dropoff/${dropoff.id}`}>
                                                                <BodySmallestMedium className="my-[10px] text-xs !text-purple-500 capitalize">
                                                                    {dropoff?.shipment?.code}
                                                                </BodySmallestMedium>
                                                                {
                                                                    dropoff?.trackingId && (
                                                                        <BodySmallestMedium className="my-[10px] text-xs !text-gray-500 capitalize">
                                                                            {dropoff?.trackingId}
                                                                        </BodySmallestMedium>
                                                                    )
                                                                }
                                                            </Link>
                                                        </div>
                                                    </td>
                                                    <td className="px-5 py-4">
                                                        <div className="flex items-center">
                                                            <div
                                                                className={`rounded-full h-2 w-2 mr-2 flex animate-pulse ${dropoff.status.name === "Shipment Created"
                                                                    ? "bg-orange-600"
                                                                    : dropoff.status.name === "Create Invoice"
                                                                        ? "bg-sky-600"
                                                                        : dropoff.status.name === "Paid"
                                                                        ? "bg-indigo-600"
                                                                        : dropoff.status.name === "Approved"
                                                                            ? "bg-plain"
                                                                            : dropoff.status.name === "Package Intransit"
                                                                                ? "bg-purple-600"
                                                                                : dropoff.status.name === "Delivered"
                                                                                    ? "bg-lime-600"
                                                                                        : dropoff.status.name === "Terminated"
                                                                                            ? "bg-red-600"
                                                                                            : ""
                                                                    }`}
                                                            ></div>
                                                            <span className="text-xs text-gray-600 truncate">
                                                                {dropoff.status.name}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="px-5 py-1 bg-gray-50 min-w-[300px]">
                                                        <BMiddleRegular className="my-[10px] text-xs !text-green-600">
                                                            {dropoff.deliveryFrom}
                                                        </BMiddleRegular>
                                                    </td>
                                                    <td className="px-5 py-1 bg-gray-50 min-w-[300px]">
                                                        <BMiddleRegular className="my-[10px] text-xs !text-sky-600">
                                                        {dropoff.deliveryTo}
                                                        </BMiddleRegular>
                                                    </td>
                                                    <td className="px-5 py-2">
                                                        <BMiddleRegular className="my-[1px] text-xs !text-gray-500 whitespace-nowrap">
                                                            {dropoff?.deliveryPlan}

                                                        </BMiddleRegular>
                                                    </td>

                                                    <td className="px-2 py-0 min-w-[250px]">
                                                        <div>
                                                            <BMiddleRegular className="my-[10px] text-xs text-red-600 truncate">
                                                                Delivery Date: {formatDate(dropoff?.deliveryDate)} 
                                                            </BMiddleRegular>
                                                            
                                                        </div>
                                                    </td>

                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={6} className="text-center py-4">
                                                    No pickups found.
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
                    list={dropoff?.data}
                    pagination={{
                        perPage: 5,
                        totalPages: Math.ceil(dropoff?.pagination?.total / 5),
                        total: dropoff?.pagination?.total,
                        page: dropoff?.pagination?.page,
                    }}
                    onPageChange={(page) => console.log("Page changed to:", page)}
                >
                    {(paginatedList) => (
                        <div className=" overflow-y-auto">
                            <table className="min-w-full border shadow">
                                <thead className="sticky top-0 bg-[#ECECEC] text-[#8D8D8D] font-[500] lg:text-[1rem] text-xs whitespace-nowrap">
                                    <tr className="text-left">
                                        <th className="px-4 py-2 font-medium text-[13px]">Code</th>
                                        <th className="px-4 py-2 font-medium text-[13px]">Status</th>
                                        <th className="px-4 py-2 font-medium text-[13px]">Delivery From</th>
                                        <th className="px-4 py-2 font-medium text-[13px]">Delivery To</th>
                                        <th className="px-4 py-2 font-medium text-[13px]">Plan</th>
                                        <th className="px-4 py-2 font-medium text-[13px]">Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paginatedList?.length > 0 ? (
                                        paginatedList.map((dropoff, index) => (
                                            <tr
                                                key={dropoff.id || index}
                                                className="text-[1rem] font-[500] align-top border-b border-gray-200"
                                            >
                                                <td className="px-2 py-2 bg-gray-50 min-w-[200px]">
                                                    <div>
                                                        <Link href={`/dashboard/admin/dropoff/${dropoff.id}`}>
                                                            <BodySmallestMedium className="my-[10px] text-xs !text-purple-500 capitalize">
                                                                {dropoff?.shipment?.code}
                                                            </BodySmallestMedium>
                                                            {
                                                                dropoff?.trackingId && (
                                                                    <BodySmallestMedium className="my-[10px] text-xs !text-gray-500 capitalize">
                                                                        {dropoff?.trackingId}
                                                                    </BodySmallestMedium>
                                                                )
                                                            }
                                                        </Link>
                                                    </div>
                                                </td>
                                                <td className="px-5 py-4">
                                                        <div className="flex items-center">
                                                            <div
                                                                className={`rounded-full h-2 w-2 mr-2 flex animate-pulse ${dropoff.status.name === "Shipment Created"
                                                                    ? "bg-orange-600"
                                                                    : dropoff.status.name === "Create Invoice"
                                                                        ? "bg-sky-600"
                                                                        : dropoff.status.name === "Paid"
                                                                        ? "bg-indigo-600"
                                                                        : dropoff.status.name === "Approved"
                                                                            ? "bg-plain"
                                                                            : dropoff.status.name === "Package Intransit"
                                                                                ? "bg-purple-600"
                                                                                : dropoff.status.name === "Delivered"
                                                                                    ? "bg-lime-600"
                                                                                        : dropoff.status.name === "Terminated"
                                                                                            ? "bg-red-600"
                                                                                            : ""
                                                                    }`}
                                                            ></div>
                                                            <span className="text-xs text-gray-600 truncate">
                                                                {dropoff.status.name}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="px-5 py-1 bg-gray-50 min-w-[300px]">
                                                        <BMiddleRegular className="my-[10px] text-xs !text-green-600">
                                                            {dropoff.deliveryFrom}
                                                        </BMiddleRegular>
                                                    </td>
                                                    <td className="px-5 py-1 bg-gray-50 min-w-[300px]">
                                                        <BMiddleRegular className="my-[10px] text-xs !text-sky-600">
                                                        {dropoff.deliveryTo}
                                                        </BMiddleRegular>
                                                    </td>
                                                <td className="px-5 py-2">
                                                    <BMiddleRegular className="my-[1px] text-xs !text-gray-500 whitespace-nowrap">
                                                        {dropoff?.deliveryPlan}

                                                    </BMiddleRegular>
                                                </td>

                                                <td className="px-2 py-0 min-w-[250px]">
                                                        <div>
                                                            <BMiddleRegular className="my-[10px] text-xs text-red-600 truncate">
                                                                Delivery Date: {formatDate(dropoff?.deliveryDate)} 
                                                            </BMiddleRegular>
                                                            
                                                        </div>
                                                    </td>

                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={6} className="text-center py-4">
                                                No pickups found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        
                    )}
                </PaginationV2>
            )}



        </div>
    );
}
