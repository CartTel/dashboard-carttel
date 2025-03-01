"use client"


import React, { useState } from 'react';
import { IoReorderThreeOutline } from "react-icons/io5";
import { TfiWallet } from "react-icons/tfi";
import Link from 'next/link';
import { PiPackageBold } from "react-icons/pi";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaEye } from "react-icons/fa";
import Image from 'next/image'
import { B1, B2, H2, H1, BMiddle } from '@/components/custom-typography';



const FinancialOverview = () => {
    const [startDate, setStartDate] = useState<Date | any>(null);
    const [endDate, setEndDate] = useState<Date | any>(null);
    const [isToggle, setIsToggle] = useState<boolean>(true);
    const [isBalance, setIsBalance] = useState<boolean>(false);
    const [showCalendar, setShowCalendar] = useState<boolean>(false);
    
    const changeToggle = () => setIsToggle(!isToggle);
    const changeBalance = () => setIsBalance(!isBalance);

    const handleStartDateChange = (date: Date | null) => {
        setStartDate(date);
    };

    const handleEndDateChange = (date: Date | null) => {
        setEndDate(date);
    };

    const [selectionRange, setSelectionRange] = useState<{
        startDate: Date;
        endDate: Date;
        key: string;
    }>({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    });

    const handleSelect = (ranges: any) => {
        setSelectionRange(ranges.selection);
    };

    return (
        <div className="my-20">
            <B1 className='text-slate-700 '>Financial Overview</B1>
            <div className="grid md:grid-cols-3 xs:grid-cols-1 gap-4 mt-5">
                <div className="rounded-lg shadow-md border bg-purple-600">
                    <div className="p-5">
                        <div className="card-body grid grid-cols-1 gap-7">
                            <div className="flex flex-row items-center h-full">
                                <div className="flex">
                                    <div className="mb-5 text-[1.5rem] border-none text-white flex justify-center items-center">
                                        <TfiWallet />
                                    </div>
                                    <div className='flex flex-col'>
                                        <div className="mt-1 flex item-center justify-center font-semibold ml-6 mb-2 text-white text-sm">Your Account Balance</div>
                                        <div className='flex justify-center items-center'>
                                            <h3 className="mt-1 flex text-white ml-6 text-lg mb-0 font-[600]">
                                                {isBalance ? (
                                                    <div>***********</div>
                                                ) : (
                                                    <div>&#8358;1,730,900</div>
                                                )}
                                            </h3>
                                            <div
                                                className="flex mt-2 flex-col h-6 ml-4 cursor"
                                                onClick={changeBalance}
                                            >
                                                {isBalance ? (
                                                    <div className="cursor-pointer">
                                                        <svg
                                                            aria-hidden="true"
                                                            focusable="false"
                                                            data-prefix="fas"
                                                            data-icon="eye-slash"
                                                            className="w-5 h-5 text-white"
                                                            role="img"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 576 512"
                                                        >
                                                            <path
                                                                fill="currentColor"
                                                                d="M286.693 391.984l32.579 46.542A333.958 333.958 0 0 1 288 440C168.19 440 63.031 376.051 6.646 280.369a47.999 47.999 0 0 1 0-48.739c24.023-40.766 56.913-75.775 96.024-102.537l57.077 81.539C154.736 224.82 152 240.087 152 256c0 74.736 60.135 135.282 134.693 135.984zm282.661-111.615c-31.667 53.737-78.747 97.46-135.175 125.475l.011.015 41.47 59.2c7.6 10.86 4.96 25.82-5.9 33.42l-13.11 9.18c-10.86 7.6-25.82 4.96-33.42-5.9L100.34 46.94c-7.6-10.86-4.96-25.82 5.9-33.42l13.11-9.18c10.86-7.6 25.82-4.96 33.42 5.9l51.038 72.617C230.68 75.776 258.905 72 288 72c119.81 0 224.969 63.949 281.354 159.631a48.002 48.002 0 0 1 0 48.738zM424 256c0-75.174-60.838-136-136-136-17.939 0-35.056 3.473-50.729 9.772l19.299 27.058c25.869-8.171 55.044-6.163 80.4 7.41h-.03c-23.65 0-42.82 19.17-42.82 42.82 0 23.626 19.147 42.82 42.82 42.82 23.65 0 42.82-19.17 42.82-42.82v-.03c18.462 34.49 16.312 77.914-8.25 110.95v.01l19.314 27.061C411.496 321.2 424 290.074 424 256zM262.014 356.727l-77.53-110.757c-5.014 52.387 29.314 98.354 77.53 110.757z"
                                                            />
                                                        </svg>
                                                    </div>
                                                ) : (
                                                    <div className="cursor-pointer">
                                                        <svg
                                                            aria-hidden="true"
                                                            focusable="false"
                                                            data-prefix="fas"
                                                            data-icon="eye"
                                                            className="w-5 h-5 text-white"
                                                            role="img"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 576 512"
                                                        >
                                                            <path
                                                                fill="currentColor"
                                                                d="M569.354 231.631C512.969 135.949 407.81 72 288 72 168.14 72 63.004 135.994 6.646 231.631a47.999 47.999 0 0 0 0 48.739C63.031 376.051 168.19 440 288 440c119.86 0 224.996-63.994 281.354-159.631a47.997 47.997 0 0 0 0-48.738zM288 392c-75.162 0-136-60.827-136-136 0-75.162 60.826-136 136-136 75.162 0 136 60.826 136 136 0 75.162-60.826 136-136 136zm104-136c0 57.438-46.562 104-104 104s-104-46.562-104-104c0-17.708 4.431-34.379 12.236-48.973l-.001.032c0 23.651 19.173 42.823 42.824 42.823s42.824-19.173 42.824-42.823c0-23.651-19.173-42.824-42.824-42.824l-.032.001C253.621 156.431 270.292 152 288 152c57.438 0 104 46.562 104 104z"
                                                            />
                                                        </svg>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between items-center ml-auto">
                                <Link href='/dashboard/import/wallet' className="bg-purple-400 rounded-lg py-3 px-3 text-white text-xs flex items-center">
                                    <div>Fund Your Wallet</div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="rounded-lg shadow-md border bg-secondary">
                    <div className="p-5">
                        <div className="card-body grid grid-cols-1 gap-7">
                            <div className="flex flex-row items-center h-full">
                                <div className="">

                                    <Image
                                src={'/images/Home/medal.png'}
                                alt="logo"
                                width={40}
                                height={40}
                                priority
                                className={`w-10 h-10 cursor-pointer duration-500`}
                            />
                                </div>
                                <span className="mt-1 flex item-center justify-center font-semibold ml-6 mb-2 text-white text-xs">Enjoy Lower Prices, Faster Shipping and Advanced Features</span>
                            </div>
                            <div className="flex w-full">
                                <div className="ml-auto">
                                    <Link href='/dashboard/import/plan' className="bg-indigo-900 rounded-lg py-3 px-3 text-white text-xs">
                                        Upgrade Your Plan
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="rounded-lg shadow-md border bg-[#fbc41d]">
                    <div className="p-5">
                        <div className="card-body grid grid-cols-1 gap-7">
                            <div className="flex flex-row items-center h-full">
                                <div className="flex">
                                    <div className="bg-[#f7d367] rounded-full py-2 px-2 mb-5 text-[1.5rem] border-none text-secondary flex justify-center items-center">
                                        <PiPackageBold />
                                    </div>
                                    <div className='flex flex-col'>
                                        <span className="mt-1 flex item-center justify-center font-semibold ml-6 mb-2 text-secondary text-sm">Total Shipment Value</span>
                                        <div className='flex justify-center items-center'>
                                            <h3 className="mt-1 flex text-secondary ml-6 text-lg mb-0 font-[600]">
                                                {isToggle ? (
                                                    <div>***********</div>
                                                ) : (
                                                    <div>&#8358;1,568,690</div>
                                                )}
                                            </h3>
                                            <div
                                                className="flex mt-2 flex-col h-6 ml-4 cursor"
                                                onClick={changeToggle}
                                            >
                                                {isToggle ? (
                                                    <div className="cursor-pointer">
                                                        <svg
                                                            aria-hidden="true"
                                                            focusable="false"
                                                            data-prefix="fas"
                                                            data-icon="eye-slash"
                                                            className="w-5 h-5 text-secondary"
                                                            role="img"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 576 512"
                                                        >
                                                            <path
                                                                fill="currentColor"
                                                                d="M286.693 391.984l32.579 46.542A333.958 333.958 0 0 1 288 440C168.19 440 63.031 376.051 6.646 280.369a47.999 47.999 0 0 1 0-48.739c24.023-40.766 56.913-75.775 96.024-102.537l57.077 81.539C154.736 224.82 152 240.087 152 256c0 74.736 60.135 135.282 134.693 135.984zm282.661-111.615c-31.667 53.737-78.747 97.46-135.175 125.475l.011.015 41.47 59.2c7.6 10.86 4.96 25.82-5.9 33.42l-13.11 9.18c-10.86 7.6-25.82 4.96-33.42-5.9L100.34 46.94c-7.6-10.86-4.96-25.82 5.9-33.42l13.11-9.18c10.86-7.6 25.82-4.96 33.42 5.9l51.038 72.617C230.68 75.776 258.905 72 288 72c119.81 0 224.969 63.949 281.354 159.631a48.002 48.002 0 0 1 0 48.738zM424 256c0-75.174-60.838-136-136-136-17.939 0-35.056 3.473-50.729 9.772l19.299 27.058c25.869-8.171 55.044-6.163 80.4 7.41h-.03c-23.65 0-42.82 19.17-42.82 42.82 0 23.626 19.147 42.82 42.82 42.82 23.65 0 42.82-19.17 42.82-42.82v-.03c18.462 34.49 16.312 77.914-8.25 110.95v.01l19.314 27.061C411.496 321.2 424 290.074 424 256zM262.014 356.727l-77.53-110.757c-5.014 52.387 29.314 98.354 77.53 110.757z"
                                                            />
                                                        </svg>
                                                    </div>
                                                ) : (
                                                    <div className="cursor-pointer">
                                                        <svg
                                                            aria-hidden="true"
                                                            focusable="false"
                                                            data-prefix="fas"
                                                            data-icon="eye"
                                                            className="w-5 h-5 text-secondary"
                                                            role="img"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 576 512"
                                                        >
                                                            <path
                                                                fill="currentColor"
                                                                d="M569.354 231.631C512.969 135.949 407.81 72 288 72 168.14 72 63.004 135.994 6.646 231.631a47.999 47.999 0 0 0 0 48.739C63.031 376.051 168.19 440 288 440c119.86 0 224.996-63.994 281.354-159.631a47.997 47.997 0 0 0 0-48.738zM288 392c-75.162 0-136-60.827-136-136 0-75.162 60.826-136 136-136 75.162 0 136 60.826 136 136 0 75.162-60.826 136-136 136zm104-136c0 57.438-46.562 104-104 104s-104-46.562-104-104c0-17.708 4.431-34.379 12.236-48.973l-.001.032c0 23.651 19.173 42.823 42.824 42.823s42.824-19.173 42.824-42.823c0-23.651-19.173-42.824-42.824-42.824l-.032.001C253.621 156.431 270.292 152 288 152c57.438 0 104 46.562 104 104z"
                                                            />
                                                        </svg>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-between items-center relative">
                                <div className="flex justify-center items-center relative w-full">
                                    <div className="mr-3 grid md:grid-cols-1 xs:grid-cols-1">
                                        <DatePicker
                                            selected={startDate}
                                            onChange={handleStartDateChange}
                                            selectsStart
                                            startDate={startDate}
                                            endDate={endDate}
                                            placeholderText="Start Date"
                                            className="bg-[#f7d367] w-28 border-none rounded-md px-1 py-1 focus:outline-none focus:ring focus:border-blue-300"
                                        />
                                    </div>
                                    <div className=''>
                                        <DatePicker
                                            selected={endDate}
                                            onChange={handleEndDateChange}
                                            selectsEnd
                                            startDate={startDate}
                                            endDate={endDate}
                                            minDate={startDate}
                                            placeholderText="End Date"
                                            className="bg-[#f7d367] w-28 border-none border rounded-md px-1 py-1 focus:outline-none focus:ring focus:border-blue-300"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FinancialOverview;


