"use client";

import { IDonutChart } from "@/libs/interfaces";
import dynamic from "next/dynamic";
import React, { useState, useEffect } from "react";
import { BodySmallest } from "@/components/custom-typography";
// import { useUtils } from "../custom-hooks";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export function DonutChart({
  labels,
  data,
  colors,
  chartDetails,
}: IDonutChart & { chartDetails: { title: string } }) {
  const [series, setSeries] = useState(data);
  const [total, setTotal] = useState(0);
  // const { formatCurrency } = useUtils();

  useEffect(() => {
    const newTotal = series.reduce((acc, val) => acc + val, 0);
    setTotal(newTotal);
  }, [series]);

  const [options, setOptions] = useState<ApexCharts.ApexOptions | undefined>({
    chart: {
      height: 250,
      type: "donut",
    },
    labels,
    colors: colors,
    dataLabels: {
      enabled: true,
      style: {
        colors: ["#FFFFFF"],
        fontSize: "14px",
      },
      background: {
        enabled: true,
        foreColor: "#fff",
        padding: 4,
        borderRadius: 2,
        borderWidth: 1,
        borderColor: "#fff",
        opacity: 0.9,
        dropShadow: {
          enabled: false,
          top: 1,
          left: 1,
          blur: 1,
          color: "#000",
          opacity: 0.45,
        },
      },
      dropShadow: {
        enabled: false,
        top: 1,
        left: 1,
        blur: 1,
        color: "#000",
        opacity: 0.45,
      },
    },
    legend: {
      show: false,
    },
    plotOptions: {
      pie: {
        expandOnClick: true,

        donut: {
          size: "50%",
          background: "transparent",
        },
      },
    },
  });

  return (
    <div className="mb-[15px]">
      <div className="relative">
        <div id="chart" className="relative">
          <Chart
            options={options}
            series={series}
            type="donut"
            height={380}
            width={"100%"}
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center">
            {/* <h3 className="text-3xl mb-1">{formatCurrency(total)}</h3>
            <span className="text-[#808080]">{chartDetails.title}</span> */}
          </div>
        </div>
      </div>
      <div className="justify-center flex items-center gap-[12px] !mt-4">
        {labels.map((label, index) => (
          <div key={index} className="flex items-center gap-[8px]">
            <div
              className="w-[10px] h-[10px] rounded-full"
              style={{ background: colors![index] }}
            />
            <BodySmallest className="!text-gray">{label}</BodySmallest>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DonutChart;
