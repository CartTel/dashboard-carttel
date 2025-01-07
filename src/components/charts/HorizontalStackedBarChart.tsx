"use client"

import React, { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import type { HorizontalStackedBarChartData } from '@/libs/interfaces';
import { H1, BMiddle, BodySmallest } from '../custom-typography';
// import { useUtils } from '../custom-hooks';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface IBarChart {
    chartData: HorizontalStackedBarChartData;
    chartDetails: {
        title: string;
        period: string;
    }
}

export function HorizontalStackedBarChart({ chartData, chartDetails }: IBarChart) {
    const [series, setSeries] = useState<{ name: string; data: number[] }[]>([]);
    const [stackBar, setStackBar] = useState<{ label: string; color: string }[]>([]);
    const [totalStock, setTotalStock] = useState<number>(0);
    const [totalCost, setTotalCost] = useState<number>(0);
    // const { formatCurrency } = useUtils()
    


    const prepareSeriesData = useCallback(() => {
        const statusKeys = Object.keys(chartData) as (keyof HorizontalStackedBarChartData)[];

        const series = statusKeys.map(status => {
            const materialCount = chartData[status].items.length;
            return {
                name: status.charAt(0).toUpperCase() + status.slice(1),
                data: [materialCount]
            };
        });

        const stackBar = statusKeys.map(status => ({
            label: status.charAt(0).toUpperCase() + status.slice(1),
            color: chartData[status].bg_color
        }));

        const totalStock = statusKeys.reduce((acc, status) => acc + chartData[status].items.length, 0);

        const totalCost = statusKeys.reduce((acc, status) => {
            const statusTotal = chartData[status].items.reduce((statusAcc, item) => statusAcc + (item.stock * item.price), 0);
            return acc + statusTotal;
        }, 0);

        return { series, stackBar, totalStock, totalCost };
    }, [chartData]);

    useEffect(() => {
        const { series, stackBar, totalStock, totalCost } = prepareSeriesData();
        setSeries(series);
        setStackBar(stackBar);
        setTotalStock(totalStock);
        setTotalCost(totalCost);
    }, [prepareSeriesData]);

    const [options, setOptions] = useState<ApexCharts.ApexOptions>({
        chart: {
            type: 'bar',
            height: 400,
            stacked: true,
            toolbar: {
                show: false,
            }
        },
        colors: stackBar.map(item => item.color),
        plotOptions: {
            bar: {
                borderRadius: 4,
                horizontal: true,
                dataLabels: {
                    total: {
                        enabled: false,
                        offsetX: 0,
                        style: {
                            fontSize: '12px',
                            fontWeight: 600,
                        },
                    },
                },
            },
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            width: 0.3,
            colors: ['#fff'],
        },
        title: {
            // text: chartDetails.title,
            // align: 'left',
            style: {
                fontFamily: '"Neue Montreal", sans-serif',
                fontSize: '24px',
                fontWeight: '500',
                color: '#16161D'
            }
        },
        xaxis: {
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            },
            labels: {
                show: false
            },
        },
        yaxis: {
            show: false,
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return val + '';
                },
            },
        },
        fill: {
            opacity: 1,
        },
        legend: {
            show: false
        },
        grid: {
            show: false,
        },
    });

    useEffect(() => {
        setOptions(prevOptions => ({
            ...prevOptions,
            colors: stackBar.map(item => item.color)
        }));
    }, [stackBar]);

    return (
        <div className="flex flex-col items-start w-full">
            <div className="mb-2.5">
                <BMiddle className='!text-[#808080]'>Total Stock</BMiddle>
                <H1>{totalStock}</H1>
            </div>
            <div className='justify-between flex items-start gap-[12px] w-[90%] ml-2'>
                {stackBar.map((item, index) => (
                    <div key={index} className='flex items-center gap-[8px]'>
                        <div className='w-[12px] h-[12px] rounded-sm' style={{ background: item.color }} />
                        <BodySmallest className='!text-gray'>
                            {item.label}
                        </BodySmallest>
                    </div>
                ))}
            </div>
            <div id="chart" className="w-full">
                <Chart options={options} series={series} type="bar" height={150} width={'120%'} />
            </div>
            <div className="w-full h-px bg-gray-200 my-2"></div>
            <div className="w-full text-left">
                <BMiddle className='!text-[#808080] mb-2'>Low Stock</BMiddle>
                <ul className="list-none p-0">
                    {chartData.lowStock.items.map((item: { name: string, price: number }, index: number) => (
                        <li key={index} className="flex justify-between mb-1.5">
                            <span>{item.name}</span>
                            {/* <span>{formatCurrency(item.price)}</span> */}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
