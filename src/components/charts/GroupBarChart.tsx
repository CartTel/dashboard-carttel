"use client";

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { IGroupBarChart } from '@/libs/interfaces';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export function GroupBarChart({
    height = 400,
    colors = ['#103f69', '#fbc41d'], 
    xAxis,
    data,
    graphSuffix = ''
}: IGroupBarChart) {
    const [series, setSeries] = useState(data);
    const [options, setOptions] = useState<ApexCharts.ApexOptions | undefined>({
        chart: {
            type: 'bar',
            height,
        },
        colors,
        plotOptions: {
            bar: {
                borderRadius: 0,
                borderRadiusApplication: "end",
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
            categories: xAxis,
        },
        yaxis: {
            title: {
                text: undefined,
            },
            tickAmount: 5,
            labels: {
                formatter: function (val) {
                    return val + graphSuffix;
                },
            },
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return val + graphSuffix;
                },
            },
        },
        fill: {
            opacity: 1,
        },
        legend: {
            show: false,
        },
    });

    useEffect(() => {
        // Update the series and options whenever the data or xAxis prop changes
        setSeries(data);
        setOptions(prevOptions => ({
            ...prevOptions,
            xaxis: {
                categories: xAxis,
            },
        }));
    }, [data, xAxis]);

    return (
        <div>
            <div id="chart">
                <Chart options={options} series={series} type="bar" height={height} width={'100%'} />
            </div>
        </div>
    );
}
