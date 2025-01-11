"use client";

import {
    CustomBreadCrumb,
    CustomButton,
    CustomSelect,
} from "@/components/custom-components";
import { H2, H1 } from "@/components/custom-typography";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ShipmentCard } from "./shipment-card";
import CustomModal from "@/components/custom-components/custom-modal";
import PaginationV2 from "@/components/wrappers/pagination";

import apiClient from "@/config/api-clients";
import qs from 'qs';
import { useQuery } from "@tanstack/react-query";

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
    "Approved",
    "Started",
    "Arrival",
    "Intransit",
    "Arrived",
    "Completed"
];

const activities = [
    {
        name: "Servicing of Kitchen smoke extractor at B2",
        unit: "FUDIA APARTMENTS",
        status: "Pending",
    },
    {
        name: "Shower head replacement",
        unit: "FUDIA APARTMENTS",
        status: "Clarifying Request",
    },
    {
        name: "Servicing of Kitchen smoke extractor at B2",
        unit: "FUDIA APARTMENTS",
        status: "Pending",
    },
    {
        name: "Servicing of Kitchen smoke extractor at B2",
        unit: "FUDIA APARTMENTS",
        status: "Pending",
    },
    {
        name: "Shower head replacement",
        unit: "FUDIA APARTMENTS",
        status: "Clarifying Request",
    },
    {
        name: "Servicing of Kitchen smoke extractor at B2",
        unit: "FUDIA APARTMENTS",
        status: "Pending",
    },
    {
        name: "Servicing of Kitchen smoke extractor at B2",
        unit: "FUDIA APARTMENTS",
        status: "Pending",
    },
    {
        name: "Shower head replacement",
        unit: "FUDIA APARTMENTS",
        status: "Clarifying Request",
    },
    {
        name: "Servicing of Kitchen smoke extractor at B2",
        unit: "FUDIA APARTMENTS",
        status: "Pending",
    },
    // OTHERS
    {
        name: "Servicing of Kitchen smoke extractor at B2",
        unit: "FUDIA APARTMENTS",
        time_taken: "1hr:5d:42m",
        sla: "Water Supply",
    },
    {
        name: "Servicing of Kitchen smoke extractor at B2",
        unit: "FUDIA APARTMENTS",
        time_taken: "1hr:5d:42m",
        sla: "Water Supply",
    },
    {
        name: "Servicing of Kitchen smoke extractor at B2",
        unit: "FUDIA APARTMENTS",
        time_taken: "1hr:5d:42m",
        sla: "Water Supply",
    },
    {
        name: "Servicing of Kitchen smoke extractor at B2",
        unit: "FUDIA APARTMENTS",
        time_taken: "1hr:5d:42m",
        sla: "Water Supply",
    },
    {
        name: "Servicing of Kitchen smoke extractor at B2",
        unit: "FUDIA APARTMENTS",
        time_taken: "1hr:5d:42m",
        sla: "Water Supply",
    },
    {
        name: "Servicing of Kitchen smoke extractor at B2",
        unit: "FUDIA APARTMENTS",
        time_taken: "1hr:5d:42m",
        sla: "Water Supply",
    },
    {
        name: "Servicing of Kitchen smoke extractor at B2",
        unit: "FUDIA APARTMENTS",
        time_taken: "1hr:5d:42m",
        sla: "Water Supply",
    },
    {
        name: "Servicing of Kitchen smoke extractor at B2",
        unit: "FUDIA APARTMENTS",
        time_taken: "1hr:5d:42m",
        sla: "Water Supply",
    },
    {
        name: "Servicing of Kitchen smoke extractor at B2",
        unit: "FUDIA APARTMENTS",
        time_taken: "1hr:5d:42m",
        sla: "Water Supply",
    },
];

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
    const [shipmentReq, setShipmentReq] = useState(null)
    const queryParams = useSearchParams();
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [pagination, setPagination] = useState({
        perPage: 10,
        totalPages: 10,
        page: 1,
        lastPage: 10,
        links: [],
    });
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

    // useEffect(() => {
    //     const getShipments = async () => {
    //         try {

    //             const shipments = await fetchAllShipment();
    //             // Update the value of total shipments


    //         } catch (error) {
    //             console.error('Error in fetching or processing shipments:', error);
    //         }
    //     };
    //     getShipments();
    // }, []);



    const updateTab = (tab: string) => {
        router.push(`/dashboard/admin/shipment?tab=${tab}`);
    };

    const toggleCreateModal = () => {
        setShowCreateModal((prev) => !prev);
    };

    const onPageChange = (page: number) => {
        const pgn = pagination;
        pgn.page = page;
        setPagination((prev) => pgn);
    };

    return (
        <div className="h-[100%] w-full">
            {/* BREADCRUMB */}
            <CustomBreadCrumb items={breadCrumb} className="bg-gray-200 w-fit px-5 py-1 rounded-full" />
            <div className="mt-[14px] flex lg:items-center justify-between lg:flex-row flex-col mb-[36px]">
                <H1 className="">Shipments</H1>
                <div className="flex items-center gap-[24px] mt-4 lg:mt-0">


                    {/* <CustomButton
            onClick={toggleCreateModal}
            
            className={`!text-[0.875rem] !py-[0px] lg:!w-[139px] w-full h-[48px]`}
          >
            Create request
          </CustomButton> */}
                </div>
            </div>
            {/* my-0 flex border-b-[2px] border-gray-300 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 */}

            <ul className="flex items-center gap-[29px] border-b-[0.5px] border-b-gray mb-[33px] overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 scrollbar-hide lg:overflow-x-visible">
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
            

            {/* {currentTab !== "Pending Request" && (
                <PaginationV2
                    onPageChange={onPageChange}
                    list={activities.filter((a) => !a.sla)}
                    pagination={pagination}
                >
                    <div className="grid lg:grid-cols-3 gap-[23px] grid-cols-1">
                        {activities
                            .filter((a) => a.sla)
                            .map((activity, index) => (
                                <ShipmentCard
                                    {...activity}
                                    key={index}
                                    containerClass="!h-[157px]"
                                />
                            ))}
                    </div>
                </PaginationV2>
            )} */}


        </div>
    );
}
