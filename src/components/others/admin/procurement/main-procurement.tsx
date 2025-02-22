"use client";

import {
    CustomBreadCrumb,
    CustomButton,
    CustomSelect,
} from "@/components/custom-components";
import { H2, H1, BMiddleRegular, BodySmallestMedium } from "@/components/custom-typography";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
// import { ShipmentCard } from "../shipment";
import { ProcurementCard } from "./procurement-card";
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
        label: "Procurement",
    },
];


const activityTabs = [
    "All Request",
    "Pending",
    "Restart",
    "Awaiting",
    "Confirmed",
    "Approved",
    "Completed"
];

interface StatusCount {
    name: string;
    count: number;
}



const fetchAllProcurement = async () => {
    try {
        const response = await apiClient.get(`/api/v1/procurement/get-all-procurements`, {
            params: {
                associations: ['items', 'logs'],
                sortOrder: 'DESC',
                sortBy: 'updated_at',
                page: 1,
                perPage: 1000,
            },
            paramsSerializer: (params) => {
                return qs.stringify(params, { arrayFormat: 'brackets' });
            },
        });
        console.log("all procurement Request..", response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching procurement:', error);
        throw error; // Rethrow the error for handling in the component
    }
};

export function MainProcurement() {
    const [currentTab, setCurrentTab] = useState("");

    const router = useRouter();
    const queryParams = useSearchParams();

    const [currentActivityTab, setCurrentActivityTab] = useState("Pending"); // Default tab
    const [procurement, setProcurement] = useState<any>([]);

    const { data: procurementData, isLoading: isLoadingprocurement, isError: isErrorUsers, error: procurementError } = useQuery({
        queryKey: ["allProcurement"],
        queryFn: fetchAllProcurement,
        staleTime: Infinity, 
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
        const fetchAllProcurementData = async () => {
            // console.log("current tab..", currentActivityTab);

            // Map tab names to corresponding status codes
            const tabToStatusCodes: Record<string, string[]> = {
                Pending: ["01"],
                Restart: ["10"],
                Awaiting: ["15"],
                Confirmed: ["50"],
                Approved: ["60"],
                Completed: ["80"]
            };

            const byStatusCodes = tabToStatusCodes[currentActivityTab] || [];
            // console.log("status code..", byStatusCodes, tabToStatusCodes.Pending);

            try {
                const response = await apiClient.get(`/api/v1/procurement/get-all-procurements`, {
                    params: {
                        associations: ['items', 'logs'],
                        sortOrder: 'DESC',
                        sortBy: 'updated_at',
                        // byStatusCodes: ["05"],
                        byStatusCodes,
                        page: 1,
                        perPage: 1000,
                    },
                    paramsSerializer: (params) => {
                        return qs.stringify(params, { arrayFormat: 'brackets' });
                    },
                });

                setProcurement(response.data)
                // console.log("all Request..", response.data);
                return response.data;
            } catch (error) {
                console.error('Error fetching procurement:', error);
                throw error; // Rethrow the error for handling in the component
            }
        };
        fetchAllProcurementData(); // Fetch data when the component mounts
    }, [currentActivityTab]);

    const updateTab = (tab: string) => {
        // console.log("current string..", tab);
        setCurrentActivityTab(tab)
        router.push(`/dashboard/admin/procurement?tab=${tab}`);
    };

    return (
        <div className="h-[100%] w-full">
            {/* BREADCRUMB */}
            <CustomBreadCrumb items={breadCrumb} className="bg-gray-200 font-[500] text-primary w-fit px-5 py-1 rounded-lg" />
            <div className="my-[14px] flex lg:items-center justify-between lg:flex-row flex-col mb-[0px]">
                <H1 className="">Procurements</H1>
            </div>

            <ul className="my-[14px] mt-16 flex items-center gap-[29px] border-b-[0.5px] border-b-gray mb-[33px] overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 scrollbar-hide lg:overflow-x-visible">
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
                    list={procurementData?.data}
                    pagination={{
                        perPage: 5,
                        totalPages: Math.ceil(procurementData?.pagination.total / 5),
                        total: procurementData?.pagination.total,
                        page: procurementData?.pagination.page,
                    }}
                    onPageChange={(page) => console.log("Page changed to:", page)}
                >
                    {(paginatedList) => (
                        <div>
                            {
                               paginatedList?.length > 0 ? 
                                <div className="grid lg:grid-cols-3 gap-4">
                                    {paginatedList?.map((activity: any, index: number) => (
                                        <ProcurementCard {...activity} key={index} />
                                    ))}
                                </div>
                               : 
                               <div className="flex w-full justify-center items-center h-full">No Data Found!</div>
                            }

                        </div>
                    )}
                </PaginationV2>
            )}

            {currentTab !== "All Request" && (
                <PaginationV2
                    list={procurement?.data}
                    pagination={{
                        perPage: 5,
                        totalPages: Math.ceil(procurement?.pagination?.total / 5),
                        total: procurement?.pagination?.total,
                        page: procurement?.pagination?.page,
                    }}
                    onPageChange={(page) => console.log("Page changed to:", page)}
                >
                    {(paginatedList) => (
                        <div>
                            {
                               paginatedList?.length > 0 ? 
                                <div className="grid lg:grid-cols-3 gap-4">
                                    {paginatedList?.map((activity: any, index: number) => (
                                        <ProcurementCard {...activity} key={index} />
                                    ))}
                                </div>
                               : 
                               <div className="flex w-full justify-center items-center h-full">No Data Found!</div>
                            }

                        </div>
                    )}
                </PaginationV2>
            )}

        </div>
    );
}
