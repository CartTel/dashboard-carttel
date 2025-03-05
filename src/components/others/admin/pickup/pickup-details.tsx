"use client";
import {
    CustomBreadCrumb,
    CustomButton,
    CustomInput,
    CustomSelect,
} from "@/components/custom-components";
import CustomModal from "@/components/custom-components/custom-modal";
import { B1, BMiddle, H2, BMiddleRegular, BodySmallestMedium, B1Regular } from "@/components/custom-typography";
import { PayInvoice } from "@/components/actions/pay-invoice";
import { formatDateTime, convertTime } from "@/helper/format";

import { PhoneInput, defaultCountry } from '@/components/custom-components/phone-input';
import React, { useEffect, useState } from "react";
import { getAllCountries, getAllCities, getAllStates } from '@/config/api';
import { fetchSingleShipmentRequest, fetchSingleProcurementRequest, fetchSinglePickupRequest } from "@/config/api";
import { useQuery } from "@tanstack/react-query";

import Link from 'next/link';
import { toast } from "@/hooks/use-toast";
import Image from 'next/image'
import { RiTimerLine } from "react-icons/ri";
import { SkeletonLoader } from '@/components/ui/skeletonCard';
import { DispatchRequest } from "@/components/actions/dispatch-shipment";
import { RateRequest } from "@/components/actions/rated-shipment";
import ShipmentLogs from "@/components/ui/shipment-trail";
import { RestartProcess } from "@/components/actions/Procurement/restart-process";
// import { ConfirmProcess } from "@/components/actions/Procurement/approved-procurement";
import { ConfirmProcess } from "@/components/actions/Procurement/confirmed-procurement";


import { ApprovePickup } from "@/components/actions/Pickup/approve-pickup";
import { RescheduledPickup } from "@/components/actions/Pickup/rescheduled-pickup";
import { CompletedPickup } from "@/components/actions/Pickup/completed-pickup";



const breadCrumb = [
    {
        label: "Home",
        link: "/dashboard/admin",
    },
    {
        label: "Pickup",
        link: "/dashboard/admin/pickup",
    },
    {
        label: "View Pickup",
    },
];

const breadCrumbArray = [
    {
        label: "Home",
        link: "/dashboard/import",
    },
    {
        label: "Pickup",
        link: "/dashboard/import/pickup",
    },
    {
        label: "View Pickup",
    },
];


interface PickupDetailsProps {
    id: string;
}


export function PickupDetails({ id }: PickupDetailsProps) {

    const { data: pickupData, isLoading: isLoadingPickup, isError: isErrorUsers, error: pickupError } = useQuery({
        queryKey: ["singlePickup", id],
        queryFn: () => fetchSinglePickupRequest(parseInt(id)),
        refetchOnWindowFocus: false, // avoid refetching on window focus
        staleTime: 0, // data becomes stale immediately for refetching
    });

    const savedRole = localStorage.getItem("roles");
    const [loading, setLoading] = useState(false);
    const [showApproveModal, setApproveModal] = useState(false);
    const [showConfirmModal, setConfirmModal] = useState(false);
    const [showRestartModal, setRestartModal] = useState(false);

    const [error, setError] = useState("");

    const formatValue = (value: number): string => {
        return value.toLocaleString("en-US");
    };

    const toggleRestartModal = () => {
        setRestartModal((prev) => !prev);
    };

    const toggleConfirmModal = () => {
        setConfirmModal((prev) => !prev);
    };

    const toggleApproveModal = () => {
        setApproveModal((prev) => !prev);
    };


    if (isLoadingPickup) {
        return <SkeletonLoader number={5} />
    }

    return (
        <div>
            {/* BREADCRUMB */}
            {savedRole === 'admin' &&
                <div className="mb-[14px] flex items-center justify-between">
                    <CustomBreadCrumb items={breadCrumb} className="bg-gray-200 font-[500] text-primary w-fit px-5 py-1 rounded-lg" />
                </div>
            }
            {savedRole === 'manager' &&
                <div className="mb-[14px] flex items-center justify-between">
                    <CustomBreadCrumb items={breadCrumb} className="bg-gray-200 font-[500] text-primary w-fit px-5 py-1 rounded-lg" />
                </div>
            }
            {savedRole === 'import' &&
                <div className="mb-[14px] flex items-center justify-between">
                    <CustomBreadCrumb items={breadCrumbArray} className="bg-gray-200 font-[500] text-primary w-fit px-5 py-1 rounded-lg" />
                </div>
            }
            <H2 className="my-[36px] font-semibold text-primary">
                View Pickup
            </H2>

            <div>
                <div className="grid md:grid-cols-2 xs:grid-col-1 gap-0 w-full text-sm bg-[#edefee] p-2">
                    <div className="h-full row-span-2 col-span-2 bg-white p-3 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                        <div className='text-slate-800 text-[16px] md:item-center flex md:justify-start text-start mb-7'>Procurement Details</div>

                        <div className="grid md:grid-cols-2 xs:grid-cols-1 gap-5 ">
                            <div className="">

                                {/* Name */}
                                <div className="mb-[36px]">
                                    <BMiddleRegular className="mb-[8px] text-gray-800 font-medium">Code:</BMiddleRegular>
                                    <BodySmallestMedium className="!text-gray-400 uppercase">
                                        {pickupData?.pickupCode}
                                    </BodySmallestMedium>
                                </div>

                                <div className="mb-[36px]">
                                    <BMiddleRegular className="mb-[8px] text-gray-800 font-medium">Pickup Time:</BMiddleRegular>
                                    <BodySmallestMedium className="!text-gray-400 uppercase">
                                        {convertTime(pickupData?.pickupTime)}
                                    </BodySmallestMedium>
                                </div>

                                <div className="mb-[36px]">
                                    <BMiddleRegular className="mb-[8px] text-gray-800 font-medium">Pickup Date:</BMiddleRegular>
                                    <BodySmallestMedium className="!text-gray-400 uppercase">
                                        {formatDateTime(pickupData?.pickupDate)}
                                    </BodySmallestMedium>
                                </div>

                                <div className="mb-[36px]">

                                    {
                                        pickupData?.actualpickupTime && (
                                            <div>

                                            <BMiddleRegular className="mb-[8px] text-gray-800 font-medium">Actual PickupTime:</BMiddleRegular>
                                            <BodySmallestMedium className="!text-gray-400 uppercase">
                                                {convertTime(pickupData?.actualpickupTime)}
                                            </BodySmallestMedium>
                                            </div>
                                        )
                                    }
                                </div>

                                {/* {
                                    (savedRole === 'manager' || savedRole === 'admin')
                                    && (["01", "05", "15"].includes(pickupData?.status?.code))
                                    && (
                                        <div>
                                            <BMiddleRegular className="mb-[18px] text-gray-800 font-medium">Items:</BMiddleRegular>

                                            <Link
                                                className="!text-[14px] text-white !bg-[#555454] w-fit !rounded-lg px-4 py-3"
                                                href={`/dashboard/admin/procurement/update-procurement/${procurementData?.id}`}
                                            >
                                                Update Procurement details
                                            </Link>
                                        </div>
                                    )
                                } */}
                            </div>

                            {/* RIGHT */}
                            <div className="">
                                {/* Additional Info */}
                                <div className="mb-[36px]">

                                    <BMiddleRegular className="mb-[8px] text-gray-800 font-medium">Address:</BMiddleRegular>
                                    <BodySmallestMedium className="!text-gray-400 uppercase">
                                        {pickupData?.pickupLocation}

                                    </BodySmallestMedium>
                                </div>

                                {/* Date */}
                                <div className="mb-[36px]">
                                    <BMiddleRegular className="mb-[8px] text-gray-800 font-medium">Created Date/Time:</BMiddleRegular>
                                    <BodySmallestMedium className="!text-gray-400 uppercase">
                                        {formatDateTime(pickupData?.created_at)}
                                    </BodySmallestMedium>
                                </div>

                                {/* Status */}
                                <div className="mb-[36px]">
                                    <BMiddleRegular className="mb-[8px] text-gray-800 font-medium">Status:</BMiddleRegular>
                                    <BodySmallestMedium className="!text-gray-400 uppercase">
                                        {pickupData?.status?.name}
                                    </BodySmallestMedium>
                                </div>

                                {/* Action */}
                                {((["01", "110", "130"].includes(pickupData?.status?.code))) && (savedRole === 'manager' || savedRole === 'admin') && (
                                    <div className="mb-[36px]">
                                        <B1 className="mb-[8px]">Action</B1>

                                        <div className="flex items-center gap-[16px] lg:flex-row flex-col">
                                            <CustomButton
                                                className="!text-[0.875rem] !py-[0] h-[40px] !bg-[#029B5B] lg:!w-[150px] w-full !rounded-[3px] flex justify-center items-center"
                                                onClick={toggleApproveModal}
                                            >
                                                <Image
                                                    src={"/images/checked.svg"}
                                                    alt="checked"
                                                    width={20}
                                                    height={20}
                                                    className="z-[10] text-white"
                                                />
                                                <div className="ml-3">Approve</div>
                                            </CustomButton>
                                            <CustomButton
                                                onClick={toggleRestartModal}
                                                className="!text-[0.875rem] !py-[0] h-[40px] !bg-[#F47F12] lg:!w-[150px] w-full !rounded-[3px] flex justify-center items-center"
                                            >
                                                <Image
                                                    src={"/images/restart.svg"}
                                                    alt="checked"
                                                    width={20}
                                                    height={20}
                                                    className="z-[10] text-white"
                                                />
                                                <div className="ml-3">Reschedule</div>
                                            </CustomButton>

                                        </div>
                                    </div>
                                )}
                                {((["01", "110", "130"].includes(pickupData?.status?.code))) && (savedRole === 'import') && (
                                    <div className="mb-[36px]">
                                        <B1 className="mb-[8px]">Action</B1>

                                        <div className="flex items-center gap-[16px] lg:flex-row flex-col">

                                            <CustomButton
                                                onClick={toggleRestartModal}
                                                className="!text-[0.875rem] !py-[0] h-[40px] !bg-[#F47F12] lg:!w-[150px] w-full !rounded-[3px] flex justify-center items-center"
                                            >
                                                <Image
                                                    src={"/images/restart.svg"}
                                                    alt="checked"
                                                    width={20}
                                                    height={20}
                                                    className="z-[10] text-white"
                                                />
                                                <div className="ml-3">Reschedule</div>
                                            </CustomButton>

                                        </div>
                                    </div>
                                )}

                                {((["10"].includes(pickupData?.status?.code))) && (savedRole === 'manager' || savedRole === 'admin') && (
                                    <div className="mb-[36px]">
                                        <B1 className="mb-[8px]">Action</B1>

                                        <div className="flex items-center gap-[16px] lg:flex-row flex-col">
                                            <CustomButton
                                                className="!text-[0.875rem] !py-[0] h-[40px] !bg-lime-600 lg:!w-[150px] w-full !rounded-[3px] flex justify-center items-center"
                                                onClick={toggleConfirmModal}
                                            >
                                                <Image
                                                    src={"/images/done.svg"}
                                                    alt="checked"
                                                    width={20}
                                                    height={20}
                                                    className="z-[10] text-white"
                                                />
                                                <div className="ml-3">Complete</div>
                                            </CustomButton>
                                            

                                        </div>
                                    </div>
                                )}

                                {/* {(procurementData?.status?.code === '50' && procurementData.totalValue) && (savedRole === 'manager' || savedRole === 'admin') && (
                                    <div className="mb-[36px]">
                                        <B1 className="mb-[8px]">Action</B1>

                                        <div className="flex items-center gap-[16px] lg:flex-row flex-col">
                                            <CustomButton
                                                className="!text-[0.875rem] !py-[0] h-[40px] !bg-purple-400 lg:!w-[150px] w-full !rounded-[3px] flex justify-center items-center"
                                                onClick={toggleApproveModal}
                                            >
                                                <Image
                                                    src={"/images/done.svg"}
                                                    alt="checked"
                                                    width={20}
                                                    height={20}
                                                    className="z-[10] text-white"
                                                />
                                                <div className="ml-3">Approve</div>
                                            </CustomButton>


                                        </div>
                                    </div>
                                )}

                                {(procurementData?.status?.code === '10' && procurementData.totalValue) && (savedRole === 'import') && (
                                    <div className="mb-[36px]">
                                        <B1 className="mb-[8px]">Action</B1>

                                        <div className="flex items-center gap-[16px] lg:flex-row flex-col lg:!w-[150px] xs:!w-full ">
                                            <Link href={`/dashboard/import/procurement/await/${id}`} className="ml-1 cursor-pointer lg:!w-[150px] xs:!w-full">
                                                <div
                                                    className="!text-[0.875rem] !py-[0] h-[40px] !bg-pink-400 !text-white lg:!w-[150px] xs:!w-full !rounded-[3px] flex justify-center items-center"
                                                >
                                                    <Image
                                                        src={"/images/awaiting.svg"}
                                                        alt="checked"
                                                        width={20}
                                                        height={20}
                                                        className="z-[10] text-white"
                                                    />
                                                    <div className="ml-3">Restart</div>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                )}

                                {(procurementData?.status?.code === '60' && procurementData.totalValue) && (savedRole === 'import') && (
                                    <div className="mb-[36px]">
                                        <B1 className="mb-[8px]">Action</B1>

                                        <div className="flex items-center gap-[16px] lg:flex-row flex-col lg:!w-fit xs:!w-full ">
                                            <Link href={`/dashboard/import/procurement/create-shipment/${id}`} className="ml-1 cursor-pointer lg:!w-fit xs:!w-full">
                                                <div
                                                    className="!text-[0.875rem] !py-[0] h-[40px] px-5 !bg-rose-500 !text-white lg:!w-fit xs:!w-full !rounded-[3px] flex justify-center items-center"
                                                >
                                                    <Image
                                                        src={"/images/Package/wrapped-box.svg"}
                                                        alt="checked"
                                                        width={20}
                                                        height={20}
                                                        className="z-[10] text-white"
                                                    />
                                                    <div className="ml-3">Create Shipment</div>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                )} */}

                            </div>
                        </div>
                        <div>
                            <div className='text-white bg-primary py-2 px-2 text-[16px] mt-14 mb-7 md:item-center flex md:justify-start text-start'>Procurement Logs</div>
                            <div>
                                <ShipmentLogs logs={pickupData?.logs} />
                            </div>

                        </div>


                    </div>


                </div>
            </div>

            {showRestartModal && (
                <CustomModal onClose={toggleRestartModal} backdrop={true}>
                    <RescheduledPickup onClose={toggleRestartModal} id={parseInt(id)} />
                </CustomModal>
            )}

            {showConfirmModal && (
                <CustomModal onClose={toggleConfirmModal} backdrop={true}>
                    <CompletedPickup onClose={toggleConfirmModal} id={parseInt(id)} />
                </CustomModal>
            )}

            {showApproveModal && (
                <CustomModal onClose={toggleApproveModal} backdrop={true}>
                    <ApprovePickup onClose={toggleApproveModal} id={parseInt(id)} />
                </CustomModal>
            )}



        </div>
    );
}
