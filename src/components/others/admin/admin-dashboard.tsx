"use client";
import dynamic from "next/dynamic";
import { CustomButton } from "@/components/custom-components";
import { B1, H2 } from "@/components/custom-typography";
import React, { useState, useEffect, ComponentType } from "react";
import Image from "next/image";
// import {
//   fmaasDashboardStatisitcs,
//   FmaasDashboardCharts,
//   company2,
// } from "@/libs/data";

import { adminDashboardStatisitcs, AdminDashboardCharts } from "@/libs/data";
import { AdminstatCard } from "@/libs/interfaces";


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
        console.log(dashboardStats);

        setStats(dashboardStats);
    }, []);

    const toggleCreateModal = () => {
        setShowCreateModal((prev) => !prev);
    };

    return (
        <div className="!w-full">
            <B1 className='text-slate-700 '>Operational Overview</B1>
            <div>
                <div className="grid lg:grid-cols-4 gap-[15px] md:grid-cols-2 grid-cols-1 mt-5">
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
                <div className="mt-[24px] flex gap-[25px] lg:flex-row flex-col items-stretch">
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
                </div>
            </div>
            <div className="mt-5">
                <B1 className='text-slate-700 '>Recent Activities Feed</B1>

            </div>


        </div>
    );
};

export default AdminDashboard;
