"use client";

import { AreaChart } from "@/components/charts";
import { ArrowIcon } from "@/components/custom-icons";

import { B2, BMiddle, H2 } from "@/components/custom-typography";
import Image from "next/image";
import { graphFilters, spendAnalysisData } from "@/libs/data";
import { IIncidentReportChart, IAreaChartData } from "@/libs/interfaces";
import { CustomSelect } from "@/components/custom-components";
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






function ShipmentCreationChartAnalysis({
  value = "₦65,854,431.00",
  growth = "34.3%",
}: IIncidentReportChart) {

  const currentYear = new Date().getFullYear();

  // Generate years array
  const years = Array.from({ length: 5 }, (_, index) => ({
    value: `${currentYear - index}`,
    label: `${currentYear - index}`,
  }));

  const [selectedDuration, setSelectedDuration] = useState(currentYear);

  // const [chartData] = useState<IAreaChartData[]>(spendAnalysisData);
  const [selectedFilter, setSelectedFilter] = useState("monthly");
  //   console.log(chartData);

  const [selectedTimeFrame, setSelectedTimeFrame] = useState('week'); // Default to year
  const [chartData, setChartData] = useState<any>(null);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // Default to current year
  const [shipments, setShipments] = useState([]);
  const [xAxis, setXAxis] = useState<string[]>([]);



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
        data: monthlyCounts,
      },
    ];
  };

  const processShipmentDataForWeek = (shipments: any) => {
    const weeklyCounts = Array(7).fill(0);
    const weeklyPaidCounts = Array(7).fill(0);
    const today = new Date();
    const startOfWeek = today.getDate() - today.getDay(); // Sunday is the first day of the week

    // console.log("setting..", startOfWeek);

    shipments.forEach((shipment: any) => {
      const createdAt = new Date(shipment.created_at);
      const dayOfWeek = createdAt.getDay(); // 0-6 (Sunday-Saturday)

      // console.log("wait ..", dayOfWeek);

      // Check if the shipment was created in the current week
      if (createdAt >= new Date(today.setDate(startOfWeek)) && createdAt <= new Date()) {
        // console.log("time after time ..", today.setDate(startOfWeek), createdAt)
        weeklyCounts[dayOfWeek] += 1; // Count all shipments
        if (shipment.isPaid === true) {
          weeklyPaidCounts[dayOfWeek] += 1; // Count paid shipments
        }
      }
    });

    return [
      {
        data: weeklyCounts,
      }
    ];
  };

  const handleSetWeek = () => {
    setSelectedTimeFrame("week");
    updateChartData(shipments, selectedYear, "week");
  };

  const handleSetYear = () => {
    setSelectedTimeFrame("year");
    updateChartData(shipments, selectedYear, "year");
  };

  const handleDurationChange = (value: string) => {
    // console.log("object", value);
    setSelectedYear(parseInt(value));
    setSelectedDuration(parseInt(value))
    updateChartData(shipments, parseInt(value), "year");
  };


  if (!chartData || chartData[0]?.data.length === 0) {
    return <SkeletonLoader number={2} />; // Or a loading spinner/message
  }


  return (
    <div className="shadow bg-white md:p-[30px] xs:p-[15px] rounded-[16px] mb-[30px] ">
      <div className='flex items-center justify-between mb-[10px]'>
        {/* <SecondaryText className='!text-[#16161D]'></SecondaryText> */}
        <div className=''>

          <BMiddle className="!text-slate-400 md:text-[15px] xs:text-xs">Shipment Chart</BMiddle>
        </div>

        <div className='flex md:flex-row xs:flex-col justify-center items-center gap-3'>
          <div className=" md:px-4 xs:px-0 text-black flex-col font-normal flex flex-wrap justify-center items-center text-center">

            <div className=" w-fit ">
              <div className="rounded-full border-[1px] p-1 gap-3 border-[#029b5b] flex justify-center items-center w-fit">
                <button
                  onClick={handleSetYear}

                  className={`${selectedTimeFrame === 'year' ? "bg-[#029b5b] text-white rounded-full xs:px-[21px] md:px-[21px] py-[1px] text-center" : "text-primary"
                    } flex justify-between items-center xs:px-[21px] md:px-[21px] group text-primary`}

                >
                  <div className="flex justify-center">
                    <div className="xs:text-lg md:hidden flex  justify-center ">Y</div>
                  </div>
                  <div className="md:flex xs:hidden justify-center items-center text-center ">
                    Year
                  </div>
                </button>

                <button
                  className={`${selectedTimeFrame === 'week' ? "bg-[#029b5b] text-white rounded-full xs:px-[21px] md:px-[21px] py-[1px] text-center" : "text-primary"
                    } flex justify-between items-center xs:px-[21px] md:px-[21px] group text-primary`}

                  onClick={handleSetWeek}
                >
                  <div className="flex justify-center">
                    <div className="xs:text-lg md:hidden flex  justify-center">W</div>
                  </div>
                  <div className="md:flex xs:hidden justify-center items-center text-center">
                    Week
                  </div>

                </button>

              </div>
            </div>
          </div>

          {selectedTimeFrame === 'year' && (
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
      </div>
      <div className="gap-[6px] mb-[43px] hidden">
        <H2 className="mb-[8px]">{value}</H2>
        <div className="flex items-center">
          <B2
            className={`${growth.includes("-") ? "text-[#DA415C]" : "text-[#42BD53]"
              }`}
          >
            {growth.replace("-", "")}
          </B2>
          <div>
            <ArrowIcon
              fillColor={growth.includes("-") ? "#DA415C" : "#42BD53"}
            />
          </div>
        </div>
      </div>

      <AreaChart
        chartData={chartData}
        xAxis={xAxis}
        chartDetails={{
          title: "Shipment",
          period: "Last 12 months",
          showXaxisLabel: true,
          unit: "M",
          color: "#029B5B",
        }}
      />
    </div>
  );
}

export default ShipmentCreationChartAnalysis;
