"use client";

import {
    CustomBreadCrumb,
    CustomButton,
    CustomSelect,
} from "@/components/custom-components";
import { H2, H1, BMiddleRegular, BodySmallestMedium } from "@/components/custom-typography";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ShipmentCard } from "./shipment-card";
import CustomModal from "@/components/custom-components/custom-modal";
import PaginationV2 from "@/components/wrappers/pagination";

import apiClient from "@/config/api-clients";
import qs from 'qs';
import { useQuery } from "@tanstack/react-query";
import { TbFileInvoice } from "react-icons/tb";

const breadCrumb = [
    {
        label: "Home",
        link: "/dashboard/admin",
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
        const response = await apiClient.get(`/api/v1/shipment/get-all-shipments`, {
            params: {
                associations: ['invoice', 'tracking', 'sla', 'insurance', 'items', 'logs'], // Specify the relationships to include
                sortOrder: 'DESC',
                sortBy: 'created_at',
                page: 1,
                perPage: 1000,
            },
            paramsSerializer: (params) => {
                return qs.stringify(params, { arrayFormat: 'brackets' });
            },
        });
        console.log("all shipment Request..", response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching shipment:', error);
        throw error; // Rethrow the error for handling in the component
    }
};

export function MainShipment() {
    const [currentTab, setCurrentTab] = useState("");

    const router = useRouter();
    const queryParams = useSearchParams();

    const [currentActivityTab, setCurrentActivityTab] = useState("Pending"); // Default tab
    const [shipment, setShipment] = useState<any>([]);

    const { data: shipmentData, isLoading: isLoadingShipment, isError: isErrorUsers, error: shipmentsError } = useQuery({
        queryKey: ["allShipments"],
        queryFn: fetchAllShipment,
        staleTime: Infinity, // Data is always stale
        retry: false,
    });

    const [statusCounts, setStatusCounts] = useState<StatusCount[]>([]);

    useEffect(() => {
        // console.log("rate..", shipmentData);
        if (shipmentData?.data.length > 0) {
            const counts: Record<string, number> = shipmentData?.data.reduce((acc: any, shipment: any) => {
                const statusName = shipment.status?.name;
                if (statusName) {
                    acc[statusName] = (acc[statusName] || 0) + 1;
                }
                return acc;
            }, {} as Record<string, number>);

            // Convert counts into an array of objects
            const formattedCounts = Object.entries(counts).map(([name, count]) => ({
                name,
                count,
            }));

            setStatusCounts(formattedCounts);
        }
    }, [shipmentData]);


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
            // console.log("status code..", byStatusCodes, tabToStatusCodes.Pending);

            try {
                const response = await apiClient.get(`/api/v1/shipment/get-all-shipments`, {
                    params: {
                        associations: ['invoice', 'tracking', 'sla', 'insurance', 'items', 'logs'], // Specify the relationships to include
                        sortOrder: 'DESC',
                        sortBy: 'created_at',
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
        router.push(`/dashboard/admin/shipment?tab=${tab}`);
    };

    return (
        <div className="h-[100%] w-full">
            {/* BREADCRUMB */}
            <CustomBreadCrumb items={breadCrumb} className="bg-gray-200 font-[500] text-primary w-fit px-5 py-1 rounded-full" />
            <div className="my-[14px] flex lg:items-center justify-between lg:flex-row flex-col mb-[0px]">
                <H1 className="">Shipments</H1>
            </div>

            <div className="flex flex-col gap-4 my-[14px]">
                <ul className="grid lg:grid-cols-5 xs:grid-cols-1 gap-4 py-5 w-full justify-between">
                    {statusCounts.map((status, index) => (
                        <li key={index} className="flex justify-between items-center gap-2 rounded-md border-[1px] shadow-md border-gray-200 pb-2 px-3">

                            {/* <div className="text-xl text-gray-500"><TbFileInvoice /></div> */}
                            <BMiddleRegular className="my-[10px] text-xs text-gray-600 truncate">
                                {status.name}
                            </BMiddleRegular>
                            <BMiddleRegular className="my-[10px] text-xs text-primary truncate bg-plain rounded-full px-3 py-1 flex justify-center items-center">
                                {status.count}
                            </BMiddleRegular>
                        </li>
                    ))}
                </ul>
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
                        <div className="grid lg:grid-cols-3 gap-4">
                            {paginatedList?.map((activity: any, index: number) => (
                                <ShipmentCard {...activity} key={index} />
                            ))}
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
                        <div className="grid lg:grid-cols-3 gap-4">
                            {paginatedList?.map((activity: any, index: number) => (
                                <ShipmentCard {...activity} key={index} />
                            ))}
                        </div>
                    )}
                </PaginationV2>
            )}
        </div>
    );
}
