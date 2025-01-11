"use client"


import { GroupBarChart } from '@/components/charts'
import { CustomSelect } from '@/components/custom-components'
import { BMiddle, SecondaryText } from '@/components/custom-typography'
import { graphFilters } from '@/libs/data'
import React, { useState, useEffect } from 'react'
import apiClient from "@/config/api-clients";
import qs from 'qs';
import { SkeletonLoader } from "@/components/ui/skeletonCard";


const fetchAllShipment = async () => {
    try {
        const response = await apiClient.get(`/api/v1/shipment/get-all-shipments`, {
            params: {
                associations: ['invoice', 'tracking', 'sla', 'insurance', 'items', 'logs'],
                sortOrder: 'DESC',
                sortBy: 'created_at',
                page: 1,
                perPage: 1000,
            },
            paramsSerializer: (params) => {
                return qs.stringify(params, { arrayFormat: 'brackets' });
            },
        });
        return response.data.data;
    } catch (error) {
        console.error('Error fetching shipment:', error);
        throw error; // Rethrow the error for handling in the component
    }
};

function CreatedPaidChart() {
    const currentYear = new Date().getFullYear();

    // Generate years array
    const years = Array.from({ length: 5 }, (_, index) => ({
        value: `${currentYear - index}`,
        label: `${currentYear - index}`,
    }));

    const [selectedDuration, setSelectedDuration] = useState(currentYear);
    // const [selectedFilter, setSelectedFilter] = useState("monthly")
    const [selectedTimeFrame, setSelectedTimeFrame] = useState('year'); // Default to year
    const [chartData, setChartData] = useState<any>(null);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // Default to current year
    const [shipments, setShipments] = useState([]);
    const [xAxis, setXAxis] = useState<string[]>([]);
    // const [factor, setFactor] = useState<string>("year");

    useEffect(() => {
        const getShipmentData = async () => {
            try {
                const fetchedShipments = await fetchAllShipment();
                setShipments(fetchedShipments);
                updateChartData(fetchedShipments, selectedYear, selectedTimeFrame); // Use the default value
            } catch (error) {
                console.error('Error fetching shipment data:', error);
            }
        };

        getShipmentData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Dependency array includes selectedTimeFrame

    const updateChartData = (shipments: any, year: number, timeFrame: string) => {
        let monthlyData;
        // console.log("object", year, selectedTimeFrame, timeFrame, typeof timeFrame, timeFrame === 'year', timeFrame === "week" );
        if (timeFrame === 'year') {
            // console.log("year long..");
            monthlyData = processShipmentData(shipments, year);
            setXAxis(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']);
        }
        if (timeFrame === 'week') {
            // console.log("week long..")
            monthlyData = processShipmentDataForWeek(shipments);
            setXAxis(['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']);
        }
        // console.log("all the item..", monthlyData, xAxis)
        setChartData(monthlyData);
    };

    const processShipmentData = (shipments: any, year: number) => {
        const monthlyCounts = Array(12).fill(0);
        const monthlyPaidCounts = Array(12).fill(0);

        shipments.forEach((shipment: any) => {
            const createdAt = new Date(shipment.created_at);
            const month = createdAt.getMonth(); // 0-11

            // Filter by selected year
            if (createdAt.getFullYear() === year) {
                monthlyCounts[month] += 1; // Count all shipments
                if (shipment.isPaid === true) {
                    monthlyPaidCounts[month] += 1; // Count paid shipments
                }
            }
        });

        return [
            {
                name: 'Shipment Created',
                data: monthlyCounts,
            },
            {
                name: 'Shipment Paid',
                data: monthlyPaidCounts,
            },
        ];
    };

    const processShipmentDataForWeek = (shipments: any[]) => {
        const weeklyCounts = Array(7).fill(0);
        const weeklyPaidCounts = Array(7).fill(0);
    
        const today = new Date();
        const currentYear = today.getFullYear();
    
        // Get the start and end of the current week (Sunday to Saturday)
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay()); // Sunday
        startOfWeek.setHours(0, 0, 0, 0);
    
        const endOfWeek = new Date(today);
        endOfWeek.setDate(today.getDate() - today.getDay() + 6); // Saturday
        endOfWeek.setHours(23, 59, 59, 999);
    
        shipments.forEach((shipment: any) => {
            const createdAt = new Date(shipment.created_at);
            const year = createdAt.getFullYear();
    
            // Check if the shipment was created this week and matches the current year
            if (year === currentYear && createdAt >= startOfWeek && createdAt <= endOfWeek) {
                const dayOfWeek = createdAt.getDay(); // 0-6 (Sunday-Saturday)
                weeklyCounts[dayOfWeek] += 1; // Count all shipments
                if (shipment.isPaid === true) {
                    weeklyPaidCounts[dayOfWeek] += 1; // Count paid shipments
                }
            }
        });
    
        return [
            {
                name: "Shipment Created",
                data: weeklyCounts,
            },
            {
                name: "Shipment Paid",
                data: weeklyPaidCounts,
            },
        ];
    };
    

    const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {

        const year = parseInt(event.target.value, 10);
        // console.log("select year..", year, value);
        setSelectedYear(year);
        setSelectedDuration(year)
        // updateChartData(shipments, year, "year");
    };

    const handleTimeFrameChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        const year = parseInt(event.target.value, 10);
        // console.log("select week..", value, year);
        setSelectedTimeFrame(value);
        updateChartData(shipments, selectedYear, value); // Recalculate chart data based on the new time frame
    };

    const handleSetWeek = () => {
        setSelectedTimeFrame("week");
        updateChartData(shipments, selectedYear, "week");
    };

    const handleSetYear = () => {
        setSelectedTimeFrame("year");
        updateChartData(shipments, selectedYear, "year");
    };


    if (!chartData || chartData[0]?.data.length === 0) {
        return <SkeletonLoader number={2} />; // Or a loading spinner/message
    }

    const handleDurationChange = (value: string) => {
        // console.log("object", value);
        setSelectedYear(parseInt(value));
        setSelectedDuration(parseInt(value))
        updateChartData(shipments, parseInt(value), "year");
    };


    return (
        <div>

            <div
                className='shadow bg-white md:p-[30px] xs:p-[15px] rounded-[16px] mb-[30px]'
            >
                <div className='flex items-center justify-between mb-[10px]'>
                    {/* <SecondaryText className='!text-[#16161D]'></SecondaryText> */}
                    <div className=''>

                        <BMiddle className="!text-slate-400 md:text-[15px] xs:text-xs">Shipment Conversion Analysis</BMiddle>
                    </div>

                    <div className='flex lg:flex-row md:flex-col xs:flex-col justify-center items-center gap-3'>
                        <div className=" md:px-4 xs:px-0 text-black flex-col font-normal flex flex-wrap justify-center items-center text-center">

                            <div className=" w-fit ">
                                <div className="rounded-full border-[1px] p-1 gap-3 border-primary flex justify-center items-center w-fit">
                                    <button
                                        onClick={handleSetYear}

                                        className={`${selectedTimeFrame === 'year' ? "bg-plain text-primary rounded-full xs:px-[21px] md:px-[21px] py-[1px] text-center" : ""
                                            } flex justify-between items-center xs:px-[21px] md:px-[21px] group`}

                                    >
                                        <div className="flex justify-center">
                                            <div className="xs:text-lg md:hidden flex  justify-center text-primary">Y</div>
                                        </div>
                                        <div className="md:flex xs:hidden justify-center items-center text-center text-primary">
                                            Year
                                        </div>
                                    </button>

                                    <button
                                        className={`${selectedTimeFrame === 'week' ? "bg-plain text-primary rounded-full xs:px-[21px] md:px-[21px] py-[1px] text-center" : ""
                                            } flex justify-between items-center xs:px-[21px] md:px-[21px] group`}

                                        onClick={handleSetWeek}
                                    >
                                        <div className="flex justify-center">
                                            <div className="xs:text-lg md:hidden flex  justify-center text-primary">W</div>
                                        </div>
                                        <div className="md:flex xs:hidden justify-center items-center text-center text-primary">
                                            Week
                                        </div>

                                    </button>

                                </div>
                            </div>
                        </div>

                        {selectedTimeFrame === 'year' && (
                            // <div className="mb-4">
                            //     <label htmlFor="year-select" className="mr-2">Select Year:</label>
                            //     <select id="year-select" value={selectedYear} onChange={handleYearChange}>
                            //         <option value={new Date().getFullYear()}>{new Date().getFullYear()}</option>
                            //         <option value={new Date().getFullYear() - 1}>{new Date().getFullYear() - 1}</option>
                            //     </select>
                            // </div>
                            <div className='w-fit p-1 '>
                                <CustomSelect
                                    label={selectedDuration.toString()}
                                    labelClass='!text-[0.875rem] !text-gray'
                                    optionsClass='!text-[0.875rem] !h-[40px]'
                                    optionWrapperClass='!pt-[10px]  !h-[140px] !top-[45px] border border-gray-500'
                                    wrapperClass='!h-[44px] !border-[1px] !border-[#C5C5D3] bg-[#fff] rounded-[12px]' setSelected={handleDurationChange} selected={selectedDuration} options={years}
                                />

                            </div>
                        )}
                    </div>

                    {/* <div className="mb-4">
                        <label htmlFor="year-select" className="mr-2">
                            Select Year:
                        </label>
                        <select
                            id="year-select"
                            value={selectedYear}
                            onChange={handleYearChange}
                            className="border px-2 py-1 rounded"
                        >
                            {years.map((year) => (
                                <option key={year.value} value={year.value}>
                                    {year.label}
                                </option>
                            ))}
                        </select>
                    </div> */}
                </div>

                <div>
                    <GroupBarChart
                        data={chartData}
                        xAxis={xAxis} // Pass the dynamic xAxis
                        graphSuffix=''
                    />

                    <div className='justify-center flex items-center gap-[12px]'>
                        {[
                            {
                                label: 'Shipment Created',
                                color: '#103f69'
                            },
                            {
                                label: 'Shipment Paid',
                                color: '#fbc41d'
                            },
                        ].map(({ label, color }, index) => (
                            <div key={index} className='flex items-center gap-[8px]'>
                                <div className='w-[10px] h-[10px] rounded-full' style={{
                                    background: color
                                }} />
                                <span className='!text-gray-500 text-xs'>
                                    {label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}


export default CreatedPaidChart;
