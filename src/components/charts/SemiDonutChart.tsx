"use client"

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { BMiddle, BodySmallest, H2 } from '../custom-typography';
import { ISemiDonutChart } from '@/libs/interfaces';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export function SemiDonutChart({ chartData, chartDetails }: { chartData: ISemiDonutChart[], chartDetails: { title: string } }) {
    const [series, setSeries] = useState<number[]>([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const values = chartData.map(item => item.value);
        setSeries(values);

        const newTotal = chartData.reduce((acc, prev) => acc + prev.value, 0);
        setTotal(newTotal);
    }, [chartData]);

    const [options, setOptions] = useState<ApexCharts.ApexOptions>({
        chart: {
            type: 'donut',
            height: 250,
        },
        colors: chartData.map(item => item.color),
        plotOptions: {
            pie: {
                startAngle: -90,
                endAngle: 90,
            }
        },
        dataLabels: {
            enabled: false,
        },
        legend: {
            show: false,
        },
        labels: chartData.map(item => item.label)
    });

    return (
        <div className='relative'>
            <div id="chart" className='relative'>
                <Chart options={options} series={series} type='donut' height={370} width={'100%'} />
                <div className='text-center absolute top-[30%] w-[100%]'>
                    <H2>{total}</H2>
                    <BMiddle className='!text-gray'>{ chartDetails.title }</BMiddle>
                </div>
            </div>
            <div className='justify-center flex items-center gap-[12px] !mt-4'>
                {chartData.map((item, index) => (
                    <div key={index} className='flex items-center gap-[8px]'>
                        <div className='w-[10px] h-[10px] rounded-full' style={{ background: item.color }} />
                        <BodySmallest className='!text-gray'>
                            {item.label}
                        </BodySmallest>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SemiDonutChart;
