"use client"

import { IRadialBarChart } from '@/libs/interfaces';
import dynamic from 'next/dynamic';
import React, { useState, useEffect } from 'react';
import { BodySmallest } from '@/components/custom-typography';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export function RadialBarChart({ labels, data, colors, chartDetails }: IRadialBarChart & { chartDetails: { title: string } }) {
    const [series, setSeries] = useState(data);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const newTotal = series.reduce((acc, val) => acc + val, 0);
        setTotal(newTotal);
    }, [series]);

    const [options, setOptions] = useState<ApexCharts.ApexOptions | undefined>({
        chart: {
            height: 232,
            type: 'radialBar',
        },
        labels,
        colors: colors,
        dataLabels: {
            enabled: false,
        },
        legend: {
            show: false
        },
        plotOptions: {
            radialBar: {
                hollow: {
                    size: '30%',
                    background: 'transparent',
                },
                dataLabels: {
                    name: {
                        show: true,
                    },
                    value: {
                        show: true,
                        fontSize: '14px',
                        formatter: function (val) {
                            return val + '%';
                        }
                    },
                    // total: {
                    //   show: true,
                    //   label: 'Total'
                    // }
                }
            }
        },
        tooltip: {
            enabled: true,
            y: {
                formatter: function (val) {
                    return val + '';
                },
            },
        },
    });

    return (
        <div className='mb-[15px]'>
            <div className="relative">
                <div id="chart" className='p-6'>
                    <Chart options={options} series={series} type='radialBar' height={380} width={'100%'} />
                    <div className="absolute inset-0 flex flex-col justify-center items-center">
                    </div>
                </div>
            </div>
            <div className='justify-center grid md:grid-cols-4 xs:grid-cols-2 items-center gap-[12px] !mt-4'>
                {labels.map((label, index) => (
                    <div key={index} className='flex items-center gap-[8px]'>
                        <div className='w-[10px] h-[10px] rounded-full' style={{ background: colors![index] }} />
                        <BodySmallest className='!text-gray'>
                            {label}
                        </BodySmallest>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default RadialBarChart;
