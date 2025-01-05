"use client";
import dynamic from "next/dynamic";
import { CustomButton } from "@/components/custom-components";
import { B1, H2, B2, H1 } from "@/components/custom-typography";
import React, { useState, useEffect, ComponentType } from "react";
import Image from "next/image";
import { BsThreeDots } from "react-icons/bs";
// import {
//   fmaasDashboardStatisitcs,
//   FmaasDashboardCharts,
//   company2,
// } from "@/libs/data";

import { adminDashboardStatisitcs, AdminDashboardCharts } from "@/libs/data";
import { AdminstatCard } from "@/libs/interfaces";
import RecentlyAddedUsers from "./recent-added-user";
import RecentlyTranscationCard from "./recent-transaction";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
// import { Skeleton } from "@/components/ui/skeleton";
import { fetchAllRecentUsers, fetchAllRecentTransaction } from "@/config/api";

import { SkeletonLoader } from "@/components/ui/skeletonCard";
import ShipmentRequests from "./shipment-request";

import { AllAdminStatCard } from "./admin-stats";


// type ChartComponents = {
//   [key in ChartComponentKey]: ComponentType<any>;
// };

// type ChartComponentKey =
//   | "spend-analysis"
//   | "request-trend"
//   | "transaction-history"
//   | "invoice-management";

// const chartComponents: ChartComponents = {
//   "spend-analysis": dynamic(
//     () => import("@/components/others/fmass/spend-analysis-chart"),
//     { ssr: false }
//   ),
//   "request-trend": dynamic(
//     () => import("@/components/others/fmass/request-trend-chart")
//   ),
//   "transaction-history": dynamic(
//     () => import("@/components/others/fmass/transaction-history")
//   ),
//   "invoice-management": dynamic(
//     () => import("@/components/others/fmass/invoice-management-chart")
//   ),
// };

const AdminDashboard = () => {
    const { data: usersData, isLoading: isLoadingUsers, isError: isErrorUsers, error: usersError } = useQuery({
        queryKey: ["recentUsers"],
        queryFn: fetchAllRecentUsers,
        staleTime: Infinity, // Data is always stale
        retry: false,
    });

    const { data: transactionData, isLoading: isLoadingTransactions } = useQuery({
        queryKey: ["recentTransactions"],
        queryFn: fetchAllRecentTransaction,
        staleTime: Infinity, // Data is always stale
        retry: false,  // Disable retries on failure
    });

    const [selectedStats, setSelectedStats] = useState<string[]>([
        "total-shipment-made",
        "total-importers",
        "avg-shipment-completion-time",
        "customer-satification-rating",
    ]);
    const [selectedCharts, setSelectedCharts] = useState<string[]>([
        "spend-analysis",
        "request-trend",
        "transaction-history",
        "invoice-management",
    ]);

    const [stats, setStats] = useState<AdminstatCard[]>([]);
    const [graphs, setGraphs] = useState<
        { ref: string; Graph: any; position: string; type: string }[]
    >([]);
    const [showCreateModal, setShowCreateModal] = useState(false);

    useEffect(() => {
        const dashboardStats = adminDashboardStatisitcs.map((stats) => stats);
        // const updatedGraphs = AdminDashboardCharts.map((chart) => ({
        //   ref: chart.ref,
        //   Graph: chartComponents[chart.ref as ChartComponentKey],
        //   position: chart.position || "left",
        //   type: chart.type,
        // }));

        // setGraphs(updatedGraphs);
        // console.log(dashboardStats);

        setStats(dashboardStats);
    }, []);

    const toggleCreateModal = () => {
        setShowCreateModal((prev) => !prev);
    };

    return (
        <div className="!w-full flex flex-col gap-16">
            <div className="">
                <B1 className='text-slate-700 '>Operational Overview</B1>
                <div className="mt-5">
                    <div className="grid lg:grid-cols-4 gap-[15px] md:grid-cols-2 grid-cols-1 ">
                        {selectedStats.length
                            ? stats.map(({ title, value, icon, color, textColor, status }, index) => (
                                <AllAdminStatCard
                                    key={index}
                                    title={title}
                                    value={value}
                                    icon={icon}
                                    color={color}
                                    textColor={textColor}
                                    status={status}
                                />
                            ))
                            : null}
                    </div>
                    {/* <div className="mt-[24px] flex gap-[25px] lg:flex-row flex-col items-stretch">
                        <div className="flex-[8] max-[1537px]:flex-[6] w-full">
                            {graphs
                                .filter((g) => g.position === "left")
                                ?.map(({ Graph }, index) => (
                                    <Graph key={index} />
                                ))}
                        </div>
                        <div className="flex-[4]">
                            {graphs
                                .filter((g) => g.position === "right")
                                ?.map(({ Graph }, index) => (
                                    <Graph key={index} />
                                ))}
                        </div>
                    </div> */}
                </div>

            </div>
            <div className="mt-5">
                <B1 className='text-slate-700 '>Recent Activities Feed</B1>
                <div className="grid lg:grid-cols-2 gap-4 md:grid-cols-2 xs:grid-cols-1 mt-5">
                    <div>

                        {isLoadingUsers ? (
                            // <Skeleton className="w-[160px] h-[160px]" />
                            <SkeletonLoader number={4} />
                            // <div>hello</div>
                        ) : (
                            <div className="bg-white relative lg:min-w-[268px] xs:w-full shadow-md rounded-2xl border border-gray-200 mb-10">
                                <div className="flex justify-between items-center px-4">
                                    <H1 className="!md:text-[14px] !xs:text-[12px] text-secondary  py-2 pt-5 mb-4">
                                        Recently Added User
                                    </H1>

                                    <div className="text-lg text-secondary">
                                        <BsThreeDots />
                                    </div>

                                </div>

                                {usersData?.map((user: any, index: number) => (
                                    <div key={user.id}
                                        className={`border-b-slate-200 border-b-[1px] ${index === usersData.length - 1 ? "border-none pb-[30px]" : ""
                                            }`}
                                    >
                                        <RecentlyAddedUsers user={user} />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div>
                        {isLoadingTransactions ? (
                            // <Skeleton className="w-[160px] h-[160px]" />
                            <SkeletonLoader number={4} />
                            // <div>hello</div>
                        ) : (
                            <div className="bg-white relative lg:min-w-[268px] xs:w-full shadow-md rounded-2xl border border-gray-200 mb-10">
                                <div className="flex justify-between items-center px-4">
                                    <H1 className="!md:text-[14px] !xs:text-[12px] text-secondary  py-2 pt-5 mb-4">
                                        Recent Transactions
                                    </H1>

                                    <div className="text-lg text-secondary">
                                        <BsThreeDots />
                                    </div>

                                </div>

                                {transactionData?.map((transactions: any, index: number) => (
                                    <div key={transactions.id}
                                        className={`border-b-slate-200 border-b-[1px] ${index === transactionData.length - 1 ? "border-none pb-[30px]" : ""
                                            }`}
                                    >
                                        <RecentlyTranscationCard transaction={transactions} />
                                    </div>
                                ))}
                            </div>
                        )}

                    </div>
                </div>

            </div>

            <div className="mt-0">
                <B1 className='text-slate-700 '>Shipment Overview</B1>
                <div className=" mt-5">

                    {/* <Skeleton className="w-[160px] h-[160px] bg-[#e9e1e1] border-[1px] border-gray-200" /> */}

                    <ShipmentRequests />
                </div>

            </div>


        </div>
    );
};

export default AdminDashboard;
