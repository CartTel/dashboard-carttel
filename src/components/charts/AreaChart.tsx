import { IAreaChartData } from "@/libs/interfaces";
import React from "react";
import Chart from "react-apexcharts";

export const AreaChart = ({
  chartData,
  chartDetails,
  criticalValue,
}: {
  chartData: IAreaChartData[];
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
  const options = {
    chart: {
      id: "area-chart",
    },
    xaxis: {
      categories: chartData.map((data) => data.label),
      title: {
        text: chartDetails.showXaxisLabel ? "Time Period" : "",
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
            return `<div style="color: green; font-size: 10px;">⬤</div>`;
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
  };

  const series = [
    {
      name: chartDetails.title,
      data: chartData.map((data) => data.value),
    },
  ];

  return (
    <div>
      <Chart options={options} series={series} type="area" height={400} />
    </div>
  );
};
