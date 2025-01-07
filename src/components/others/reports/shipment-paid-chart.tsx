"use client";

import { AreaChart } from "@/components/charts";
import { ArrowIcon } from "@/components/custom-icons";

import { B2, BMiddle, H2 } from "@/components/custom-typography";
import Image from "next/image";
import React, { useState } from "react";
import { graphFilters, spendAnalysisData } from "@/libs/data";
import { IIncidentReportChart, IAreaChartData } from "@/libs/interfaces";
import { CustomSelect } from "@/components/custom-components";

function ShipmentCreationChartAnalysis({
  value = "₦65,854,431.00",
  growth = "34.3%",
}: IIncidentReportChart) {
  const [chartData] = useState<IAreaChartData[]>(spendAnalysisData);
  const [selectedFilter, setSelectedFilter] = useState("monthly");
  console.log(chartData);

  return (
    <div className="shadow bg-white md:p-[30px] xs:p-[15px] rounded-[16px] mb-[30px] ">
      <div className="flex items-center justify-between mb-[10px]">
        <BMiddle className="!text-slate-400">Shipment Chart</BMiddle>
        <div className="w-[115px]">
          <CustomSelect
            label={""}
            labelClass="!text-[0.875rem] !text-gray"
            optionsClass="!text-[0.875rem] !h-[40px]"
            optionWrapperClass="!pt-[10px]  !h-[140px] !top-[45px] border border-gray-500"
            wrapperClass="!h-[44px] !border-[1px] !border-[#C5C5D3] bg-[#fff] rounded-[12px]"
            setSelected={setSelectedFilter}
            selected={selectedFilter}
            options={graphFilters}
          />
        </div>
      </div>
      <div className="gap-[6px] mb-[43px] hidden">
        <H2 className="mb-[8px]">{value}</H2>
        <div className="flex items-center">
          <B2
            className={`${
              growth.includes("-") ? "text-[#DA415C]" : "text-[#42BD53]"
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
        chartDetails={{
          title: "Expenditure",
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
