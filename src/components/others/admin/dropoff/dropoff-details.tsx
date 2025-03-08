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
import { fetchSingleDropoffRequest, fetchSinglePickupRequest } from "@/config/api";
import { useQuery } from "@tanstack/react-query";

import Link from 'next/link';
import { toast } from "@/hooks/use-toast";
import Image from 'next/image'
import { RiTimerLine } from "react-icons/ri";
import { SkeletonLoader } from '@/components/ui/skeletonCard';
import ShipmentLogs from "@/components/ui/shipment-trail";


import { ApproveDropoff } from "@/components/actions/Dropoff/approve-dropoff";
import { IntransitDropoff } from "@/components/actions/Dropoff/intransit-dropoff";
import { DeliveredDropoff } from "@/components/actions/Dropoff/delivered-dropoff";

import { PayDropoff } from "@/components/actions/Dropoff/pay-dropoff";



const breadCrumb = [
    {
        label: "Home",
        link: "/dashboard/admin",
    },
    {
        label: "Dropoff",
        link: "/dashboard/admin/dropoff",
    },
    {
        label: "View Dropoff",
    },
];

const breadCrumbArray = [
    {
        label: "Home",
        link: "/dashboard/import",
    },
    {
        label: "Dropoff",
        link: "/dashboard/import/dropoff",
    },
    {
        label: "View Dropoff",
    },
];


interface DropoffDetailsProps {
    id: string;
}


export function DropoffDetails({ id }: DropoffDetailsProps) {

    const { data: dropoffData, isLoading: isLoadingDropoff, isError: isErrorUsers, error: dropoffError } = useQuery({
        queryKey: ["singleDropoff", id],
        queryFn: () => fetchSingleDropoffRequest(parseInt(id)),
        refetchOnWindowFocus: false, // avoid refetching on window focus
        staleTime: 0, // data becomes stale immediately for refetching
    });

    const savedRole = localStorage.getItem("roles");
    const [loading, setLoading] = useState(false);
    const [showApproveModal, setApproveModal] = useState(false);
    const [showConfirmModal, setConfirmModal] = useState(false);
    const [showIntransitModal, setIntransitModal] = useState(false);
    const [showShipmentModal, setShipmentModal] = useState(false);

    const [error, setError] = useState("");

    const formatValue = (value: number): string => {
        return value.toLocaleString("en-US");
    };

    const togglePayInvoiceModal = () => {
        // console.log("modal")
        setShipmentModal((prev) => !prev);
    };

    const toggleIntransitModal = () => {
        setIntransitModal((prev) => !prev);
    };

    const toggleConfirmModal = () => {
        setConfirmModal((prev) => !prev);
    };

    const toggleApproveModal = () => {
        setApproveModal((prev) => !prev);
    };


    if (isLoadingDropoff) {
        return <SkeletonLoader number={5} />
    }

    // console.log("paid .", dropoffData);

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
                View Dropoff
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
                                        {dropoffData?.shipment?.code}
                                    </BodySmallestMedium>
                                </div>

                                <div className="mb-[36px]">
                                    <BMiddleRegular className="mb-[8px] text-gray-800 font-medium">Delivery To:</BMiddleRegular>
                                    <BodySmallestMedium className="!text-gray-400 uppercase">
                                        {dropoffData?.deliveryTo}
                                    </BodySmallestMedium>
                                </div>

                                <div className="mb-[36px]">
                                    <BMiddleRegular className="mb-[8px] text-gray-800 font-medium">Delivery Plan:</BMiddleRegular>
                                    <BodySmallestMedium className="!text-gray-400 uppercase">
                                        {dropoffData?.deliveryPlan}
                                    </BodySmallestMedium>
                                </div>

                                

                                {
                                    (savedRole === 'manager' || savedRole === 'admin')
                                    && (["01", "05", "15"].includes(dropoffData?.status?.code))
                                    && (
                                        <div>
                                            <BMiddleRegular className="mb-[18px] text-gray-800 font-medium">Invoice:</BMiddleRegular>

                                            <Link
                                                className="!text-[14px] text-white !bg-[#555454] w-fit !rounded-lg px-4 py-3"
                                                href={`/dashboard/admin/dropoff/create-invoice/${dropoffData?.id}`}
                                            >
                                                Generate Invoice
                                            </Link>
                                        </div>
                                    )
                                }
                            </div>

                            {/* RIGHT */}
                            <div className="">
                                {/* Additional Info */}
                                <div className="mb-[36px]">

                                    <BMiddleRegular className="mb-[8px] text-gray-800 font-medium">Delivery From:</BMiddleRegular>
                                    <BodySmallestMedium className="!text-gray-400 uppercase">
                                        {dropoffData?.deliveryFrom}
                                    </BodySmallestMedium>
                                </div>

                                {/* Date */}
                                <div className="mb-[36px]">
                                    <BMiddleRegular className="mb-[8px] text-gray-800 font-medium">Created Date/Time:</BMiddleRegular>
                                    <BodySmallestMedium className="!text-gray-400 uppercase">
                                        {formatDateTime(dropoffData?.created_at)}
                                    </BodySmallestMedium>
                                </div>

                                {/* Status */}
                                <div className="mb-[36px]">
                                    <BMiddleRegular className="mb-[8px] text-gray-800 font-medium">Status:</BMiddleRegular>
                                    <BodySmallestMedium className="!text-gray-400 uppercase">
                                        {dropoffData?.status?.name}
                                    </BodySmallestMedium>
                                </div>

                                {/* Action */}


                                <div className="mb-[36px]">
                                    {(dropoffData?.status?.code === '20') && (savedRole === 'import') && (
                                        <div>
                                            <div className="flex items-center gap-[16px] lg:flex-row flex-col">
                                                <CustomButton
                                                    className="!text-[0.875rem] !py-[0] h-[40px] !bg-[#f87316] lg:!w-[150px] w-full !rounded-[3px]"
                                                onClick={togglePayInvoiceModal}
                                                >
                                                    Pay Invoice
                                                </CustomButton>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="mb-[36px]">
                                    {(dropoffData?.status?.code === '40') && (savedRole === 'manager' || savedRole === 'admin') && (
                                        <div>
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
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="mb-[36px]">
                                    {(dropoffData?.status?.code === '50') && (savedRole === 'manager' || savedRole === 'admin') && (
                                        <div>
                                            <div className="flex items-center gap-[16px] lg:flex-row flex-col">
                                            <CustomButton
                                                className="!text-[0.875rem] !py-[0] h-[40px] !bg-purple-500 lg:!w-[150px] w-full !rounded-[3px] flex justify-center items-center"
                                                onClick={toggleIntransitModal}
                                            >
                                                <Image
                                                    src={"/images/Package/delivery.svg"}
                                                    alt="checked"
                                                    width={20}
                                                    height={20}
                                                    className="z-[10] text-white"
                                                />
                                                <div className="ml-3">Intransit</div>
                                            </CustomButton>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="mb-[36px]">
                                    {(dropoffData?.status?.code === '65') && (savedRole === 'manager' || savedRole === 'admin') && (
                                        <div>
                                            <div className="flex items-center gap-[16px] lg:flex-row flex-col">
                                            <CustomButton
                                                className="!text-[0.875rem] !py-[0] h-[40px] !bg-sky-500 lg:!w-[150px] w-full !rounded-[3px] flex justify-center items-center"
                                                onClick={toggleConfirmModal}
                                            >
                                                <Image
                                                    src={"/images/done.svg"}
                                                    alt="checked"
                                                    width={20}
                                                    height={20}
                                                    className="z-[10] text-white"
                                                />
                                                <div className="ml-3">Delivered</div>
                                            </CustomButton>
                                            </div>
                                        </div>
                                    )}
                                </div>

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
                                <ShipmentLogs logs={dropoffData?.logs} />
                            </div>

                        </div>


                    </div>


                </div>
            </div>


            {showShipmentModal && (
                <CustomModal onClose={togglePayInvoiceModal} backdrop={true}>
                    <PayDropoff onClose={togglePayInvoiceModal} dropoffId={parseInt(dropoffData?.id)} shipmentId={parseInt(dropoffData?.shipment?.id)} />
                </CustomModal>
            )}

            {showApproveModal && (
                <CustomModal onClose={toggleApproveModal} backdrop={true}>
                    <ApproveDropoff onClose={toggleApproveModal} id={parseInt(id)} />
                </CustomModal>
            )}

            {showIntransitModal && (
                <CustomModal onClose={toggleIntransitModal} backdrop={true}>
                    <IntransitDropoff onClose={toggleIntransitModal} id={parseInt(id)} />
                </CustomModal>
            )}

            {showConfirmModal && (
                <CustomModal onClose={toggleConfirmModal} backdrop={true}>
                    <DeliveredDropoff onClose={toggleConfirmModal} id={parseInt(id)} />
                </CustomModal>
            )}




        </div>
    );
}
