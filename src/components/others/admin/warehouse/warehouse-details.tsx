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

import { fetchSingleWarehouseRequest } from "@/config/api";
import { useQuery } from "@tanstack/react-query";

import Link from 'next/link';
import { toast } from "@/hooks/use-toast";
import Image from 'next/image'
import { SkeletonLoader } from '@/components/ui/skeletonCard';
import ShipmentLogs from "@/components/ui/shipment-trail";

import { ApproveWarehouse } from "@/components/actions/Warehouse/approve-warehouse";
import { CompleteWarehouse } from "@/components/actions/Warehouse/complete-warehouse";


import { DropoffWarehouse } from "@/components/actions/Warehouse/dropoff-warehouse";
import { PickupWarehouse } from "@/components/actions/Warehouse/pickup-warehouse";




const breadCrumb = [
    {
        label: "Home",
        link: "/dashboard/admin",
    },
    {
        label: "Warehouse",
        link: "/dashboard/admin/warehouse",
    },
    {
        label: "View Warehouse",
    },
];

const breadCrumbArray = [
    {
        label: "Home",
        link: "/dashboard/import",
    },
    {
        label: "Warehouse",
        link: "/dashboard/import/warehouse",
    },
    {
        label: "View Warehouse",
    },
];


interface WarehouseDetailsProps {
    id: string;
}


export function WarehouseDetails({ id }: WarehouseDetailsProps) {

    const { data: warehouseData, isLoading: isLoadingWarehouse, isError: isErrorUsers, error: warehouseError } = useQuery({
        queryKey: ["singleWarehouse", id],
        queryFn: () => fetchSingleWarehouseRequest(parseInt(id)),
        refetchOnWindowFocus: false, // avoid refetching on window focus
        staleTime: 0, // data becomes stale immediately for refetching
    });

    const savedRole = localStorage.getItem("roles");
    const [loading, setLoading] = useState(false);
    const [showApproveModal, setApproveModal] = useState(false);
    const [showConfirmModal, setConfirmModal] = useState(false);
    const [showPickupModal, setPickupModal] = useState(false);
    const [showDropoffModal, setDropoffModal] = useState(false);

    const [error, setError] = useState("");

    const formatValue = (value: number): string => {
        return value.toLocaleString("en-US");
    };

    const togglePickupModal = () => {
        setPickupModal((prev) => !prev);
    };

    const toggleDropoffModal = () => {
        setDropoffModal((prev) => !prev);
    };

    const toggleConfirmModal = () => {
        setConfirmModal((prev) => !prev);
    };

    const toggleApproveModal = () => {
        setApproveModal((prev) => !prev);
    };


    if (isLoadingWarehouse) {
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
                Warehouse
            </H2>

            <div>
                <div className="grid md:grid-cols-2 xs:grid-col-1 gap-0 w-full text-sm bg-[#edefee] p-2">
                    <div className="h-full row-span-2 col-span-2 bg-white p-3 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                        <div className='text-slate-800 text-[16px] md:item-center flex md:justify-start text-start mb-7'>Warehouse Details</div>

                        <div className="grid md:grid-cols-2 xs:grid-cols-1 gap-5 ">
                            <div className="">

                                {/* Name */}
                                <div className="mb-[36px]">
                                    <BMiddleRegular className="mb-[8px] text-gray-800 font-medium">Code:</BMiddleRegular>
                                    <BodySmallestMedium className="!text-gray-400 uppercase">
                                        {warehouseData?.warehouseCode}
                                    </BodySmallestMedium>
                                </div>

                                {
                                    warehouseData?.plan && (
                                        <div className="mb-[36px]">
                                            <BMiddleRegular className="mb-[8px] text-gray-800 font-medium">Plan:</BMiddleRegular>
                                            <BodySmallestMedium className="!text-gray-400 uppercase">
                                                Plan: {warehouseData?.plan?.name}
                                            </BodySmallestMedium>
                                        </div>
                                    )
                                }
                            </div>

                            {/* RIGHT */}
                            <div className="">
                                {/* Additional Info */}
                                <div className="mb-[36px]">

                                    <BMiddleRegular className="mb-[8px] text-gray-800 font-medium">Address:</BMiddleRegular>
                                    <BodySmallestMedium className="!text-gray-400 uppercase">
                                        {warehouseData?.warehouseAddress}

                                    </BodySmallestMedium>
                                </div>

                                {/* Date */}
                                <div className="mb-[36px]">
                                    <BMiddleRegular className="mb-[8px] text-gray-800 font-medium">Created Date/Time:</BMiddleRegular>
                                    <BodySmallestMedium className="!text-gray-400 uppercase">
                                        {formatDateTime(warehouseData?.created_at)}
                                    </BodySmallestMedium>
                                </div>

                                {/* Status */}
                                <div className="mb-[36px]">
                                    <BMiddleRegular className="mb-[8px] text-gray-800 font-medium">Status:</BMiddleRegular>
                                    <BodySmallestMedium className="!text-gray-400 uppercase">
                                        {warehouseData?.status?.name}
                                    </BodySmallestMedium>
                                </div>

                                {/* Action */}
                                {(((warehouseData?.status?.code === '01'))) && (savedRole === 'manager' || savedRole === 'admin') && (
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
                                        </div>
                                    </div>
                                )}


                                {(((warehouseData?.status?.code === "10"))) && (savedRole === 'manager' || savedRole === 'admin') && (
                                    <div className="mb-[36px]">
                                        <B1 className="mb-[8px]">Action</B1>

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
                                                <div className="ml-3">Complete</div>
                                            </CustomButton>
                                        </div>
                                    </div>
                                )}

                                {(((warehouseData?.status?.code === '50'))) && (savedRole === 'manager' || savedRole === 'admin') && (
                                    <div className="mb-[36px]">
                                        <B1 className="mb-[8px]">Action</B1>

                                        <div className="flex items-center gap-[16px] lg:flex-row flex-col">
                                            <CustomButton
                                                className="!text-[0.875rem] !py-[0] h-[40px] !bg-pink-500 lg:!w-[150px] w-full !rounded-[3px] flex justify-center items-center"
                                                onClick={togglePickupModal}
                                            >
                                                <Image
                                                    src={"/images/Package/delivered-box.svg"}
                                                    alt="checked"
                                                    width={20}
                                                    height={20}
                                                    className="z-[10] text-white"
                                                />
                                                <div className="ml-3">Pickup</div>
                                            </CustomButton>
                                            <CustomButton
                                                onClick={toggleDropoffModal}
                                                className="!text-[0.875rem] !py-[0] h-[40px] !bg-[#F47F12] lg:!w-[150px] w-full !rounded-[3px] flex justify-center items-center"
                                            >
                                                <Image
                                                    src={"/images/Package/sealed-box.svg"}
                                                    alt="checked"
                                                    width={25}
                                                    height={25}
                                                    className="z-[10] text-white"
                                                />
                                                <div className="ml-3">Dropoff</div>
                                            </CustomButton>

                                        </div>
                                    </div>
                                )}



                            </div>
                        </div>
                        <div>
                            <div className='text-white bg-primary py-2 px-2 text-[16px] mt-14 mb-7 md:item-center flex md:justify-start text-start'>Procurement Logs</div>
                            <div>
                                <ShipmentLogs logs={warehouseData?.logs} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {showPickupModal && (
                <CustomModal onClose={togglePickupModal} backdrop={true}>
                    <PickupWarehouse onClose={togglePickupModal} id={parseInt(id)} />
                </CustomModal>
            )}

            {showDropoffModal && (
                <CustomModal onClose={toggleDropoffModal} backdrop={true}>
                    <DropoffWarehouse onClose={toggleDropoffModal} id={parseInt(id)} />
                </CustomModal>
            )}

            {showConfirmModal && (
                <CustomModal onClose={toggleConfirmModal} backdrop={true}>
                    <CompleteWarehouse onClose={toggleConfirmModal} id={parseInt(id)} />
                </CustomModal>
            )}

            {showApproveModal && (
                <CustomModal onClose={toggleApproveModal} backdrop={true}>
                    <ApproveWarehouse onClose={toggleApproveModal} id={parseInt(id)} />
                </CustomModal>
            )}



        </div>
    );
}
