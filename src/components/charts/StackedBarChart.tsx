"use client"

import React, { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { StackedChartData } from '@/libs/interfaces'
import { BodySmallest } from '@/components/custom-typography'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface IBarChart {
    chartData: StackedChartData[];
    chartDetails: {
        title: string;
        period: string;
    }
}


export function StackedBarChart({ chartData, chartDetails }: IBarChart) {
    const [series, setSeries] = useState<{ name: string; data: number[] }[]>([]);
    const [stackBar, setStackBar] = useState<{ label: string; color: string }[]>([]);

    const prepareSeriesData = useCallback(() => {
        const seriesNames = chartData[0].value.map(v => v.name);

        const series = seriesNames.map(name => ({
            name: name,
            data: chartData.map(item => {
                const valueObject = item.value.find(v => v.name === name);
                return valueObject ? valueObject.data : 0;
            })
        }));

        const stackBar = seriesNames.map(name => {
            const valueObject = chartData[0].value.find(v => v.name === name);
            return {
                label: name,
                color: valueObject ? valueObject.bg_color : '#000000'
            };
        });

        return { series, stackBar };
    }, [chartData]);

    useEffect(() => {
        const { series, stackBar } = prepareSeriesData();
        setSeries(series);
        setStackBar(stackBar);
    }, [prepareSeriesData]);

    const [options, setOptions] = useState<ApexCharts.ApexOptions | undefined>({
        chart: {
            type: 'bar',
            height: 409,
            stacked: true,
            toolbar: {
                show: false
            }
        },
        colors: stackBar.map(item => item.color),
        plotOptions: {
            bar: {

                borderRadius: 4,
                horizontal: false,
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
                rotate: 0,
                rotateAlways: false,
                style: {
                    fontSize: '12px',
                    fontFamily: 'Arial, sans-serif',
                    cssClass: 'xaxis-labels',
                },
                formatter: function (value) {
                    const maxLength = chartData.map(item => item.label).length > 10 ? 5 : 10;
                    if (value.length > maxLength) {
                        return value.slice(0, maxLength) + '...';
                    }
                    return value;
                },
            },
        },
        yaxis: {
            title: {
                text: undefined,

            },
            tickAmount: 5,
            labels: {
                formatter: function (val) {
                    return val + '%';
                },
            },
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return val + '%';
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

    useEffect(() => {
        setOptions(prevOptions => ({
            ...prevOptions,
            colors: stackBar.map(item => item.color)
        }));
    }, [stackBar]);

    return (
        <div>
            <div id="chart">
                <Chart options={options} series={series} type="bar" height={409}
                    width={'100%'}
                />
                <div className='justify-center flex flex-wrap items-center gap-[12px]'>
                    {stackBar.map(({ label, color }, index) => (
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
        </div>
    );
};
