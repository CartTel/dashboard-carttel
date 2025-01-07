"use client"


import { GroupBarChart } from '@/components/charts'
import { CustomSelect } from '@/components/custom-components'
import { BMiddle, SecondaryText } from '@/components/custom-typography'
import { graphFilters } from '@/libs/data'
import React, { useState } from 'react'

function CreatedPaidChart() {
    const [selectedFilter, setSelectedFilter] = useState('monthly')
    return (
        <div
            className='shadow bg-white md:p-[30px] xs:p-[15px] rounded-[16px] mb-[30px]'
        >
            <div className='flex items-center justify-between mb-[10px]'>
                {/* <SecondaryText className='!text-[#16161D]'></SecondaryText> */}
                <BMiddle className="!text-slate-400">Shipment Conversion Analysis</BMiddle>

                <div className='w-[115px]'>
                    <CustomSelect label={''}
                        labelClass='!text-[0.875rem] !text-gray'
                        optionsClass='!text-[0.875rem] !h-[40px]'
                        optionWrapperClass='!pt-[10px]  !h-[140px] !top-[45px] border border-gray-500'
                        wrapperClass='!h-[44px] !border-[1px] !border-[#C5C5D3] bg-[#fff] rounded-[12px]' setSelected={setSelectedFilter} selected={selectedFilter} options={graphFilters}
                    />
                </div>
            </div>


            <GroupBarChart
                data={
                    [{
                        name: 'Shipment Created',
                        data: [90, 45, 80, 70, 52, 63, 80, 90, 95, 20, 17, 12],
                    },
                    {
                        name: 'Shipment Paid',
                        data: [50, 72, 50, 92, 33, 53, 62, 50, 72, 70, 52, 30],
                    }]
                }
                graphSuffix='%'

            />

            <div className='justify-center flex items-center gap-[12px]'>
                {[
                    {
                        label: 'Shipment Created',
                        color: '#103f69'
                    },
                    {
                        label: 'Shipment Paid',
                        color: '#fbc41d'
                    },
                ].map(({ label, color }, index) => (
                    <div key={index} className='flex items-center gap-[8px]'>
                        <div className='w-[10px] h-[10px] rounded-full' style={{
                            background: color
                        }} />
                        <BMiddle className='!text-gray-500 text-xs'>
                            {label}
                        </BMiddle>
                    </div>
                ))}
            </div>
        </div>
    )
}


export default CreatedPaidChart;
