
"use client";

import { IAreaChartData } from "@/libs/interfaces";

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export const AreaChart = ({
  chartData,
  xAxis,
  chartDetails,
  criticalValue,
}: {
  chartData: any;
  xAxis: string[]
  chartDetails: {
    title: string;
    period: string;
    showXaxisLabel: boolean;
    unit: string;
    color: string;
    yAxisDetails?: {
      min: number;
      max: number;
      ticks: number;
      tickStep: number;
    };
  };
  criticalValue?: number; // Add criticalValue as an optional prop
}) => {
  const [options, setOptions] = useState<any>({
    chart: {
      id: "area-chart",
    },
    xaxis: {
      categories: xAxis,
      title: {
        text: chartDetails.showXaxisLabel ? "Shipment" : "",
      },
    },
    yaxis: chartDetails.yAxisDetails
      ? {
          min: chartDetails.yAxisDetails.min,
          max: chartDetails.yAxisDetails.max,
          tickAmount: chartDetails.yAxisDetails.ticks,
        }
      : {},
  
    dataLabels: {
      enabled: false, // Disable data labels on the chart
    },
    markers: {
      size: 0,
      customHTML: criticalValue
        ? (index: number) => {
            const value = chartData[index]?.value;
            if (value >= criticalValue) {
              return `<div style="color: red; font-size: 10px;">⬤</div>`;
            }
            return `<div style="color: purple; font-size: 10px;">⬤</div>`;
          }
        : undefined,
    },
    colors: [chartDetails.color],
    annotations: criticalValue
      ? {
          yaxis: [
            {
              y: criticalValue,
              borderColor: "red",
              label: {
                borderColor: "red",
                style: {
                  color: "#fff",
                  background: "red",
                },
              },
            },
          ],
        }
      : {},

  })

  // const series = [
  //   {
  //     name: chartDetails.title,
  //     data: chartData.map((data) => data.value),
  //   },
  // ];
  const [series, setSeries] = useState(chartData);

  useEffect(() => {
    // Update the series and options whenever the data or xAxis prop changes
    setSeries(chartData);
    setOptions((prevOptions: any) => ({
        ...prevOptions,
        xaxis: {
            categories: xAxis,
        },
    }));
}, [chartData, xAxis]);

  return (
    <div>
      <Chart options={options} series={series} type="area" height={400} />
    </div>
  );
};
