"use client";
import dynamic from "next/dynamic";
import { CustomButton } from "@/components/custom-components";
import { B1, H2, B2, H1 } from "@/components/custom-typography";
import React, { useState, useEffect, ComponentType } from "react";
import Image from "next/image";
import { BsThreeDots } from "react-icons/bs";
import { adminDashboardStatisitcs, AdminDashboardCharts, statistics } from "@/libs/data";
import { AdminstatCard } from "@/libs/interfaces";
import RecentlyAddedUsers from "./recent-added-user";
import RecentlyTranscationCard from "./recent-transaction";
import { useQuery } from "@tanstack/react-query";
import { fetchAllRecentUsers, fetchAllRecentTransaction } from "@/config/api";

import { SkeletonLoader } from "@/components/ui/skeletonCard";
import ShipmentRequests from "./shipment-request";

import { AllAdminStatCard } from "./admin-stats";
import apiClient from "@/config/api-clients";
import qs from 'qs';


type ChartComponents = {
    [key in ChartComponentKey]: ComponentType<any>;
};

type ChartComponentKey =
    | "shipment-create-paid"
    | "created-paid"

const chartComponents: ChartComponents = {
    "shipment-create-paid": dynamic(
        () => import("@/components/others/reports/shipment-paid-chart"),
        { ssr: false }
    ),
    "created-paid": dynamic(
        () => import("@/components/others/reports/created-paid-chart")
    ),
};

const fetchAllShipment = async () => {
    try {
        const response = await apiClient.get(`/api/v1/shipment/get-all-shipments`, {
            params: {
                associations: ['invoice', 'tracking', 'sla', 'insurance', 'items', 'logs'], // Specify the relationships to include
                sortOrder: 'DESC',
                sortBy: 'updated_at',
                page: 1,
                perPage: 1000,
            },
            paramsSerializer: (params) => {
                return qs.stringify(params, { arrayFormat: 'brackets' });
            },
        });
        console.log("all shipment..", response.data);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching shipment:', error);
        throw error; // Rethrow the error for handling in the component
    }
};

const fetchAllUsers = async () => {
    try {
        const response = await apiClient.get(`api/v1/users/get-all-users`, {
            params: {
                associations: ["roles"],
                byRoleId: 2,
                sortOrder: 'DESC',
            },
        });
        return response.data.data;
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error; // Rethrow the error for handling in the component
    }
};

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

    const [shipmentStatus, setShipmentStatus] = useState([
        {
            title: "Total Shipment Made",
            ref: "total-shipment-made",
            value: "",
            icon: "/images/Home/package.svg",
            color: "#ffe3cf",
            textColor: "#f9812d",
            percentage: "",
            count: "",
            status: true
        }
    ]
    );

    const [userStatus, setUserStatus] = useState([
        {
            title: "Total Number of Importers",
            ref: "total-importers",
            value: "",
            icon: "/images/Home/users.svg",
            color: "#EDE3FA",
            textColor: "#a967fe",
            percentage: "",
            count: "",
            status: true
        }
    ]
    );

    const [shipmentSuccess, setShipmentSuccess] = useState([
        {
            title: "Shipment Conversion Rate",
            ref: "shipment-conversion-rate",
            value: "",
            icon: "/images/Home/percentage.svg",
            color: "#E2FAF0",
            textColor: "#029B5B",
            percentage: "",
            count: "0",
            status: true
        }
    ]
    );

    const [status, setStatus] = useState<boolean>(false);

    const [statusImporter, setStatusImporter] = useState<boolean>(false);

    const [statusConversion, setStatusConversion] = useState<boolean>(false);

    const [selectedStats, setSelectedStats] = useState<string[]>([
        "total-shipment-made",
        "total-importers",
        "shipment-conversion-rate",
        "customer-satification-rating",
    ]);
    const [selectedCharts, setSelectedCharts] = useState<string[]>([
        "shipment-created-paid",
        "created-paid",
    ]);

    const [stats, setStats] = useState<AdminstatCard[]>([]);

    const [newArray, setNewArray] = useState<AdminstatCard[]>([]);
    const [graphs, setGraphs] = useState<
        { ref: string; Graph: any; position?: string; type?: string }[]
    >([]);

    const [showCreateModal, setShowCreateModal] = useState(false);

    useEffect(() => {
        const dashboardStats = adminDashboardStatisitcs.map((stats) => stats);
        const updatedGraphs = AdminDashboardCharts.map((chart) => ({
            ref: chart.ref,
            Graph: chartComponents[chart.ref as ChartComponentKey],
        }));
        const boardStats = statistics.map((stats) => stats);
        setNewArray(boardStats)
        setGraphs(updatedGraphs);
        setStats(dashboardStats);
    }, []);

    const formatPercentage = (countLastMonth: number, countCurrentMonth: number) => {
        const percentageChange = ((countCurrentMonth - countLastMonth) / countLastMonth) * 100;
        return percentageChange >= 0 ? `+${percentageChange.toFixed(1)}%` : `${percentageChange.toFixed(1)}%`;
    };

    useEffect(() => {
        const getShipments = async () => {
            try {
                setStatus(true)
                const shipments = await fetchAllShipment();
                // Update the value of total shipments
                setShipmentStatus((prev) => [
                    {
                        ...prev[0], // Spread the existing object
                        value: shipments.length // Update the value
                    }
                ]);

                // Get current date and previous month date
                const currentDate = new Date();
                const currentMonth = currentDate.getMonth() + 1;
                const previousMonth = currentMonth === 1 ? 12 : currentMonth - 1;

                // Count shipments for current and previous month
                let currentMonthCount = 0;
                let previousMonthCount = 0;

                shipments.forEach((shipment: any) => {
                    const createdAt = new Date(shipment.created_at);
                    const userMonth = createdAt.getMonth() + 1; // Convert to 1-12 format
    
                    if (userMonth === currentMonth && createdAt.getFullYear() === currentDate.getFullYear()) {
                        currentMonthCount++;
                    } else if (userMonth === previousMonth && createdAt.getFullYear() === currentDate.getFullYear()) {
                        previousMonthCount++;
                    }
                });
                // Update the count and percentage
                setShipmentStatus((prev: any) => [
                    {
                        ...prev[0],
                        count: currentMonthCount
                    }
                ]);

                let percentageChange = 0;
                let status = false;
    
                if (previousMonthCount === 0) {
                    // If there's no data for the previous month, assume 100% increase if currentMonthCount > 0
                    percentageChange = currentMonthCount > 0 ? 100 : 0;
                    status = currentMonthCount > 0;
                } else {
                    // Normal percentage calculation
                    percentageChange = ((currentMonthCount - previousMonthCount) / previousMonthCount) * 100;
                    status = currentMonthCount > previousMonthCount;
                }

                setShipmentStatus((prev: any) => [
                    {
                        ...prev[0],
                        percentage: percentageChange.toFixed(2), // Keep two decimal places
                        status
                    }
                ]);              
                setStatus(false)
            } catch (error) {
                console.error('Error in fetching or processing shipments:', error);
            }
        };
        getShipments();
    }, []);

    // useEffect(() => {
    //     const getUsers = async () => {
    //         try {
    //             setStatusImporter(true)
    //             const users = await fetchAllUsers();
    //             setUserStatus((prev) => [
    //                 {
    //                     ...prev[0], // Spread the existing object
    //                     value: users.length // Update the value
    //                 }
    //             ]);

    //             // Get current date and previous month date
    //             const currentDate = new Date();
    //             const currentMonth = currentDate.getMonth() + 1;

    //             const previousMonth = currentMonth === 13 ? 12 : 13 - currentMonth;

    //             // Count shipments for current and previous month
    //             let currentMonthCount = 0;
    //             let previousMonthCount = 0;

    //             users.forEach((user: any) => {
    //                 const createdAt = new Date(user.created_at);
    //                 const monthIndex = createdAt.getMonth(); // January is 0, February is 1, etc.
    //                 const month = monthIndex + 1; // Add 1 to convert to 1-12 format
    //                 console.log("time..", month);
    //                 if (month === currentMonth && createdAt.getFullYear() === currentDate.getFullYear()) {
    //                     console.log("first month ..", month, currentMonth)
    //                     currentMonthCount++;
    //                 } else if (month === previousMonth && createdAt.getFullYear()) {
    //                     console.log("second users  ..", month, currentMonth, currentMonthCount, monthIndex, createdAt )
    //                     previousMonthCount++;
    //                 }
    //             });
    //             // Update the count and percentage
    //             setUserStatus((prev: any) => [
    //                 {
    //                     ...prev[0],
    //                     count: currentMonthCount
    //                 }
    //             ]);

    //             if (currentMonthCount > previousMonthCount) {
    //                 console.log(" first percentage ..", currentMonthCount , previousMonthCount)

    //                 const change = ((currentMonthCount - previousMonthCount) / previousMonthCount) * 100;
    //                 const percentageChange = formatPercentage(previousMonthCount, currentMonthCount)

    //                 console.log("percentage ..", change, percentageChange);
    //                 setUserStatus((prev: any) => [
    //                     {
    //                         ...prev[0],
    //                         percentage: percentageChange,
    //                         status: true
    //                     }
    //                 ]);
    //             } else {
    //                 const change = ((currentMonthCount - previousMonthCount) / previousMonthCount) * 100;
    //                 const percentageChange = formatPercentage(previousMonthCount, currentMonthCount)

    //                 console.log(" offering percentage ..", currentMonthCount , previousMonthCount)

    //                 console.log("percentage adding ..", change, percentageChange);
    //                 setUserStatus((prev: any) => [
    //                     {
    //                         ...prev[0],
    //                         percentage: percentageChange,
    //                         status: false
    //                     }
    //                 ]);
    //             }
    //             setStatusImporter(false)
    //         } catch (error) {
    //             console.error('Error in fetching or processing importer:', error);
    //         }
    //     };
    //     getUsers();
    // }, []);

    useEffect(() => {
        const getUsers = async () => {
            try {
                setStatusImporter(true);
                const users = await fetchAllUsers();
                setUserStatus((prev) => [
                    {
                        ...prev[0],
                        value: users.length
                    }
                ]);
    
                // Get current date and previous month date
                const currentDate = new Date();
                const currentMonth = currentDate.getMonth() + 1;
                const previousMonth = currentMonth === 1 ? 12 : currentMonth - 1;
    
                let currentMonthCount = 0;
                let previousMonthCount = 0;
    
                users.forEach((user: any) => {
                    const createdAt = new Date(user.created_at);
                    const userMonth = createdAt.getMonth() + 1; // Convert to 1-12 format
    
                    if (userMonth === currentMonth && createdAt.getFullYear() === currentDate.getFullYear()) {
                        currentMonthCount++;
                    } else if (userMonth === previousMonth && createdAt.getFullYear() === currentDate.getFullYear()) {
                        previousMonthCount++;
                    }
                });
    
                // Update count in state
                setUserStatus((prev: any) => [
                    {
                        ...prev[0],
                        count: currentMonthCount
                    }
                ]);
    
                let percentageChange = 0;
                let status = false;
    
                if (previousMonthCount === 0) {
                    // If there's no data for the previous month, assume 100% increase if currentMonthCount > 0
                    percentageChange = currentMonthCount > 0 ? 100 : 0;
                    status = currentMonthCount > 0;
                } else {
                    // Normal percentage calculation
                    percentageChange = ((currentMonthCount - previousMonthCount) / previousMonthCount) * 100;
                    status = currentMonthCount > previousMonthCount;
                }
    
                console.log("Percentage Change:", percentageChange);
    
                setUserStatus((prev: any) => [
                    {
                        ...prev[0],
                        percentage: percentageChange.toFixed(2), // Keep two decimal places
                        status
                    }
                ]);
    
                setStatusImporter(false);
            } catch (error) {
                console.error("Error fetching or processing importer:", error);
            }
        };
    
        getUsers();
    }, []);
    
    useEffect(() => {
        const getShipmentConversion = async () => {
            try {
                setStatusConversion(true)
                const shipments = await fetchAllShipment();

                const shipmentLength = shipments.length

                let shipmentPaid = 0

                shipments.forEach((shipment: any) => {
                    if (shipment?.isPaid === true) {
                        shipmentPaid++
                    }
                });

                setShipmentSuccess((prev: any) => [
                    {
                        ...prev[0],
                        value: shipmentPaid
                    }
                ]);

                const change = (shipmentPaid / shipmentLength) * 100;

                let dividedRate = shipmentLength / 2

                if (dividedRate > shipmentPaid) {
                    setShipmentSuccess((prev: any) => [
                        {
                            ...prev[0],
                            status: false,
                            percentage: `+${change.toFixed(1)}%`
                        }
                    ]);
                } else {
                    setShipmentSuccess((prev: any) => [
                        {
                            ...prev[0],
                            status: true,
                            percentage: `${change.toFixed(1)}%`
                        }
                    ]);

                }

                setStatusConversion(false)
            } catch (error) {
                console.error('Error in fetching or processing shipments:', error);
            }
        };
        getShipmentConversion();
    }, []);

    const toggleCreateModal = () => {
        setShowCreateModal((prev) => !prev);
    };


    return (
        <div className="!w-full flex flex-col gap-16">
            <div className="">
                <B1 className='text-slate-700 '>Operational Overview</B1>
                <div className="mt-5">
                    <div className="grid xl:grid-cols-4 lg:grid-cols-4 gap-[15px] md:grid-cols-3 grid-cols-1 ">
                        <div>
                            {status ? (
                                <SkeletonLoader number={1} />
                            ) : (
                                <div>
                                    {
                                        Array.isArray(shipmentStatus) && shipmentStatus?.map(({ title, value, icon, color, textColor, status, count, percentage }, index) => (
                                            <AllAdminStatCard
                                                key={index}
                                                title={title}
                                                value={value}
                                                icon={icon}
                                                color={color}
                                                textColor={textColor}
                                                status={status}
                                                percentage={percentage}
                                                count={count}
                                            />
                                        ))

                                    }
                                </div>
                            )}

                        </div>

                        <div>
                            {statusImporter ? (
                                <SkeletonLoader number={1} />
                            ) : (
                                <div>
                                    {
                                        Array.isArray(userStatus) && userStatus?.map(({ title, value, icon, color, textColor, status, count, percentage }, index) => (
                                            <AllAdminStatCard
                                                key={index}
                                                title={title}
                                                value={value}
                                                icon={icon}
                                                color={color}
                                                textColor={textColor}
                                                status={status}
                                                percentage={percentage}
                                                count={count}
                                            />
                                        ))

                                    }
                                </div>
                            )}
                        </div>

                        <div>
                            {statusConversion ? (
                                <SkeletonLoader number={1} />
                            ) : (
                                <div>
                                    {
                                        Array.isArray(shipmentSuccess) && shipmentSuccess?.map(({ title, value, icon, color, textColor, status, count, percentage }, index) => (
                                            <AllAdminStatCard
                                                key={index}
                                                title={title}
                                                value={value}
                                                icon={icon}
                                                color={color}
                                                textColor={textColor}
                                                status={status}
                                                percentage={percentage}
                                                count={count}
                                            />
                                        ))

                                    }
                                </div>
                            )}

                        </div>
                        {selectedStats.length
                            ? stats.map(({ title, value, icon, color, textColor, status, count, percentage }, index) => (
                                <AllAdminStatCard
                                    key={index}
                                    title={title}
                                    value={value}
                                    icon={icon}
                                    color={color}
                                    textColor={textColor}
                                    status={status}
                                    percentage={percentage}
                                    count={count}
                                />
                            ))
                            : null}
                    </div>
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
                    <ShipmentRequests />
                </div>
            </div>


            <div className="mt-0">
                <B1 className='text-slate-700 '>Analytics Overview</B1>
                <div className=" mt-5">
                    <div className="mt-[24px] hidden gap-[25px] lg:flex-row flex-col items-stretch">
                        <div className="flex-[8] max-[1537px]:flex-[6] w-full">
                            {graphs
                                // .filter((g) => g.position === "left")
                                ?.map(({ Graph }, index) => (
                                    <Graph key={index} />
                                ))}
                        </div>
                        <div className="flex-[4]">
                            {graphs
                                // .filter((g) => g.position === "right")
                                ?.map(({ Graph }, index) => (
                                    <Graph key={index} />
                                ))}
                        </div>
                    </div>
                </div>
                <div className="grid md:grid-cols-2 xs:grid-cols-1 gap-4 h-full">
                    {Object.entries(chartComponents).map(([key, ChartComponent]) => (
                        <div key={key} className="flex h-full">
                            <div className="w-full flex-1">
                                <ChartComponent />
                            </div>
                        </div>
                    ))}
                </div>
            </div>


        </div>
    );
};

export default AdminDashboard;
