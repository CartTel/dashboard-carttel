"use client"

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { IBarChartData } from '@/libs/interfaces'
import { BodySmallest } from '@/components/custom-typography'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });


interface IBarChart {
    chartData: IBarChartData[];
    chartDetails: {
        title: string;
        period: string;
        showXaxisLabel: boolean;
        unit?: string;
    }
}


export function BarChart({ chartData, chartDetails }: IBarChart) {
    const [series, setSeries] = useState<any[]>([]);

    useEffect(() => {
        setSeries([
            {
                name: chartDetails.title,
                data: chartData.map(item => item.value)
            }
        ]);

    }, [chartDetails.title, chartData])

    const [options, setOptions] = useState<ApexCharts.ApexOptions | undefined>({
        chart: {
            type: 'bar',
            height: 409,
            width: '100%',
            stacked: true,
            toolbar: {
                show: false
            }
        },
        colors: chartData.map(item => item.color),
        plotOptions: {
            bar: {
                borderRadius: 4,
                horizontal: false,
                distributed: true,
                dataLabels: {
                    total: {
                        enabled: false,
                        offsetX: 0,
                        style: {
                            fontSize: '133px',
                            fontWeight: 900,
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
            text: '',
        },
        xaxis: {
            categories: chartData.map(item => item.label),
            labels: {
                show: chartDetails.showXaxisLabel,
                rotate: 0,
                rotateAlways: false,
                style: {
                    fontSize: '12px',
                    fontFamily: 'Arial, sans-serif',
                    cssClass: 'xaxis-labels',
                },
                formatter: function (value) {
                    if (chartData.length < 5) {
                        return value.slice(0) + ''
                    }
                    return value.length > 10 ? value.slice(0, 8) + '...' : value;
                },
            },
        },
        yaxis: {
            title: {
                text: undefined,
            },
            tickAmount: 7,
            min: 0,
            max: 28,
            labels: {
                formatter: function (val) {
                    return chartDetails.unit ? val + ` ${chartDetails.unit}` : val.toString()
                },
            },
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return val.toString();
                },
            },
        },
        fill: {
            opacity: 1,
        },
        legend: {
            show: false,
            // position: 'top',
            // horizontalAlign: 'left',
            // offsetX: 40,
        },
    });

    return (
        <div>
            <div id="chart">
                <Chart options={options} series={series} type="bar" height={409}
                    width={'100%'}
                />
            </div>
            <div className='justify-center flex flex-wrap items-center gap-[12px]'>
                {chartData.map(({ label, color }, index) => (
                    <div key={index} className='flex items-center gap-[8px]'>
                        <div className='w-[10px] h-[10px] rounded-full' style={{
                            background: color
                        }} />
                        <BodySmallest className='!text-gray'>
                            {label}
                        </BodySmallest>
                    </div>
                ))}
            </div>
        </div>
    );
};

