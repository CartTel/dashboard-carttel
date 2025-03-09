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

import { formatDate, formatTime, formatDateTime } from '@/helper/format';


const breadCrumb = [
    {
        label: "Home",
        link: "/dashboard/admin",
    },
    {
        label: "Warehouse",
    },
];

const activityTabs = [
    "All Request",
    "Pending",
    "Approved",
    "Completed",
    // "Ready For DropOff",
    // "Ready For PickUp"
];


const fetchAllWarehouse = async () => {
    try {
        const response = await apiClient.get(`/api/v1/warehouse/get-all-warehouses`, {
            params: {
                associations: ['plan', 'logs'],
                sortOrder: 'DESC',
                sortBy: 'updated_at',
                page: 1,
                perPage: 10000,
            },
            paramsSerializer: (params) => {
                return qs.stringify(params, { arrayFormat: 'brackets' });
            },
        });
        console.log("all warehouse Request..", response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching warehouse:', error);
        throw error; // Rethrow the error for handling in the component
    }
};

export function MainWarehouse() {
    const [currentTab, setCurrentTab] = useState("");

    const router = useRouter();
    const queryParams = useSearchParams();

    const [currentActivityTab, setCurrentActivityTab] = useState("Pending"); // Default tab
    const [warehouse, setWarehouse] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(true)
    const [showPickupModal, setShowPickupModal] = useState(false);

    const togglePickupModal = () => {
        setShowPickupModal((prev) => !prev);
    };

    const { data: warehouseData, isLoading: isLoadingWarehouse, isError: isErrorUsers, error: warehouseError } = useQuery({
        queryKey: ["allWarehouse"],
        queryFn: fetchAllWarehouse,
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
        const fetchAllWarehouseData = async () => {
            const tabToStatusCodes: Record<string, string[]> = {
                Pending: ["01"],
                Approved: ["10"],
                Completed: ["50"]
                // ReadyForDropOff: ["115"],
                // ReadyForPickUp: ["125"]
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

                const response = await apiClient.get(`/api/v1/warehouse/get-all-warehouses`, {
                    params: {
                        associations: ['plan', 'logs'],
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

                setWarehouse(response.data)
                setLoading(false)

                console.log("all Request data..", response.data);
                return response.data;
            } catch (error) {
                console.error('Error fetching pickup:', error);
                throw error; // Rethrow the error for handling in the component
            }
        };
        fetchAllWarehouseData(); // Fetch data when the component mounts
    }, [currentActivityTab]);

    const updateTab = (tab: string) => {
        // console.log("current string..", tab);
        setCurrentActivityTab(tab)
        router.push(`/dashboard/admin/warehouse?tab=${tab}`);
    };

    return (
        <div className="h-[100%] w-full">
            {/* BREADCRUMB */}
            <CustomBreadCrumb items={breadCrumb} className="bg-gray-200 font-[500] text-primary w-fit px-5 py-1 rounded-lg" />

            <div className="my-16 flex justify-between md:items-center gap-10  md:flex-row xs:flex-col ">
                <H1 className="">Warehouse</H1>
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
                    list={warehouseData?.data}
                    pagination={{
                        perPage: 5,
                        totalPages: Math.ceil(warehouseData?.pagination?.total / 5),
                        total: warehouseData?.pagination?.total,
                        page: warehouseData?.pagination?.page,
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
                                            <th className="px-4 py-2 font-medium text-[13px]">Address</th>
                                            <th className="px-4 py-2 font-medium text-[13px]">Plan</th>
                                            <th className="px-4 py-2 font-medium text-[13px]">Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {paginatedList?.length > 0 ? (
                                            paginatedList.map((warehouse, index) => (
                                                <tr
                                                    key={warehouse.id || index}
                                                    className="text-[1rem] font-[500] align-top border-b border-gray-200"
                                                >
                                                    <td className="px-2 py-2 bg-gray-50 min-w-[200px]">
                                                        <div>
                                                            <Link href={`/dashboard/admin/warehouse/${warehouse.id}`}>
                                                                <BodySmallestMedium className="my-[10px] text-xs !text-indigo-500 capitalize">
                                                                    {warehouse.warehouseCode}
                                                                </BodySmallestMedium>
                                                            </Link>
                                                        </div>
                                                    </td>
                                                    <td className="px-5 py-4">
                                                        <div className="flex items-center">
                                                            <div
                                                                className={`rounded-full h-2 w-2 mr-2 flex animate-pulse ${warehouse.status.name === "Created"
                                                                    ? "bg-orange-600"
                                                                    : warehouse.status.name === "Almost Due"
                                                                        ? "bg-sky-600"
                                                                            : warehouse.status.name === "Stored In The Warehouse"
                                                                                ? "bg-purple-600"
                                                                                    : warehouse.status.name === "Ready For DropOff"
                                                                                        ? "bg-indigo-600"
                                                                                        : warehouse.status.name === "Ready For PickUp"
                                                                                            ? "bg-pink-600"
                                                                                            : warehouse.status.name === "Completed"
                                                                                                ? "bg-green-600"
                                                                                                    : warehouse.status.name === "Sent To Inventory"
                                                                                                        ? "bg-red-600"
                                                                                                        : ""
                                                                    }`}
                                                            ></div>
                                                            <span className="text-xs text-gray-600 truncate">
                                                                {warehouse.status.name}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="px-5 py-1 bg-gray-50 min-w-[300px]">
                                                        <BMiddleRegular className="my-[10px] text-xs !text-primary">
                                                            {warehouse.warehouseAddress}
                                                        </BMiddleRegular>
                                                    </td>
                                                    <td className="px-5 py-2">
                                                        {
                                                            warehouse?.plan && (
                                                                <BMiddleRegular className="my-[1px] text-xs !text-gray-500 whitespace-nowrap">
                                                                    Plan: {warehouse?.plan?.name}
                                                                </BMiddleRegular>
                                                            )
                                                        }
                                                    </td>

                                                    <td className="px-2 py-0 min-w-[250px]">
                                                        <div>
                                                            
                                                            {warehouse?.created_at && (
                                                                <BMiddleRegular className="!text-[#13905C] mt-[10px] text-xs">
                                                                    CreatedDate: {formatDate(warehouse?.created_at)}
                                                                </BMiddleRegular>
                                                            )}
                                                        </div>
                                                    </td>

                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={5} className="text-center py-4">
                                                    No warehouses found.
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
                    list={warehouse?.data}
                    pagination={{
                        perPage: 5,
                        totalPages: Math.ceil(warehouse?.pagination?.total / 5),
                        total: warehouse?.pagination?.total,
                        page: warehouse?.pagination?.page,
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
                                        <th className="px-4 py-2 font-medium text-[13px]">Address</th>
                                        <th className="px-4 py-2 font-medium text-[13px]">Plan</th>
                                        <th className="px-4 py-2 font-medium text-[13px]">Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paginatedList?.length > 0 ? (
                                        paginatedList.map((warehouse, index) => (
                                            <tr
                                                key={warehouse.id || index}
                                                className="text-[1rem] font-[500] align-top border-b border-gray-200"
                                            >
                                                <td className="px-2 py-2 bg-gray-50 min-w-[200px]">
                                                    <div>
                                                        <Link href={`/dashboard/admin/warehouse/${warehouse.id}`}>
                                                            <BodySmallestMedium className="my-[10px] text-xs !text-indigo-500 capitalize">
                                                                {warehouse.warehouseCode}
                                                            </BodySmallestMedium>
                                                        </Link>
                                                    </div>
                                                </td>
                                                <td className="px-5 py-4">
                                                    <div className="flex items-center">
                                                        <div
                                                            className={`rounded-full h-2 w-2 mr-2 flex animate-pulse ${warehouse.status.name === "Created"
                                                                ? "bg-orange-600"
                                                                : warehouse.status.name === "Almost Due"
                                                                    ? "bg-sky-600"
                                                                        : warehouse.status.name === "Stored In The Warehouse"
                                                                            ? "bg-purple-600"
                                                                                : warehouse.status.name === "Ready For DropOff"
                                                                                    ? "bg-indigo-600"
                                                                                    : warehouse.status.name === "Ready For PickUp"
                                                                                        ? "bg-pink-600"
                                                                                        : warehouse.status.name === "Completed"
                                                                                            ? "bg-green-600"
                                                                                                : warehouse.status.name === "Sent To Inventory"
                                                                                                    ? "bg-red-600"
                                                                                                    : ""
                                                                }`}
                                                        ></div>
                                                        <span className="text-xs text-gray-600 truncate">
                                                            {warehouse.status.name}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-5 py-1 bg-gray-50 min-w-[300px]">
                                                    <BMiddleRegular className="my-[10px] text-xs !text-primary">
                                                        {warehouse.warehouseAddress}
                                                    </BMiddleRegular>
                                                </td>
                                                <td className="px-5 py-2">
                                                    
                                                    {
                                                        warehouse?.plan && (
                                                            <BMiddleRegular className="my-[1px] text-xs !text-gray-500 whitespace-nowrap">
                                                                Plan: {warehouse?.plan?.name}
                                                            </BMiddleRegular>
                                                        )
                                                    }
                                                </td>

                                                <td className="px-2 py-0 min-w-[250px]">
                                                    <div>
                                                    {warehouse?.created_at && (
                                                                <BMiddleRegular className="!text-[#13905C] mt-[10px] text-xs">
                                                                    CreatedDate: {formatDate(warehouse?.created_at)}
                                                                </BMiddleRegular>
                                                            )}
                                                    </div>
                                                </td>

                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={5} className="text-center py-4">
                                                No Warehouses found.
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
