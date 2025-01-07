"use client";

import { IPieChart } from "@/libs/interfaces";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import { BodySmallest } from "@/components/custom-typography";
import { useUtils } from "../custom-hooks";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export function PieChart({ labels, data, colors }: IPieChart) {
  const [series, setSeries] = useState(data);

  const [options, setOptions] = useState<ApexCharts.ApexOptions | undefined>({
    chart: {
      height: 232,
      type: "pie",
    },
    labels,
    colors: colors,
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
  });
  return (
    <div className="mb-[15px]">
      <div className="relative">
        <div id="chart" className="relative">
          <Chart
            options={options}
            series={series}
            type="pie"
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

export default PieChart;
