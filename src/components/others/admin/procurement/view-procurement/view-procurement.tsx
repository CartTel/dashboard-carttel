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
import { formatDateTime } from "@/helper/format";

import { PhoneInput, defaultCountry } from '@/components/custom-components/phone-input';
import React, { useEffect, useState } from "react";
import { getAllCountries, getAllCities, getAllStates } from '@/config/api';
import { fetchSingleShipmentRequest, fetchSingleProcurementRequest } from "@/config/api";
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
import { ApprovedProcess } from "@/components/actions/Procurement/approved-procurement";



const breadCrumb = [
    {
        label: "Home",
        link: "/dashboard/admin",
    },
    {
        label: "Procurement",
        link: "/dashboard/admin/procurement",
    },
    {
        label: "View Procurement",
    },
];

const breadCrumbArray = [
    {
        label: "Home",
        link: "/dashboard/import",
    },
    {
        label: "Procurement",
        link: "/dashboard/import/procurement",
    },
    {
        label: "View Procurement",
    },
];


interface EditShipmentDetailsProps {
    id: string;
}


export function ViewProcurement({ id }: EditShipmentDetailsProps) {

    const { data: procurementData, isLoading: isLoadingShipment, isError: isErrorUsers, error: shipmentsError } = useQuery({
        queryKey: ["singleProcurements", id],
        queryFn: () => fetchSingleProcurementRequest(parseInt(id)),
        refetchOnWindowFocus: false, // avoid refetching on window focus
        staleTime: 0, // data becomes stale immediately for refetching
    });

    const savedRole = localStorage.getItem("roles");

    // const formatValue = (value: string): string | number => {
    //     const valueFormat = parseInt(value)
    //     return valueFormat.toLocaleString("en-US");
    // };

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


    if (isLoadingShipment) {
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
                View Procurement
            </H2>

            <div>
                <div className="grid md:grid-cols-2 xs:grid-col-1 gap-0 w-full text-sm bg-[#edefee] p-2">
                    <div className="h-full row-span-2 col-span-2 bg-white p-3 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                        <div className='text-slate-800 text-[16px] md:item-center flex md:justify-start text-start mb-7'>Procurement Details</div>

                        <div className="grid md:grid-cols-2 xs:grid-cols-1 gap-5 ">
                            <div className="">

                                {/* Name */}
                                <div className="mb-[36px]">
                                    <BMiddleRegular className="mb-[8px] text-gray-800 font-medium">Name:</BMiddleRegular>
                                    <BodySmallestMedium className="!text-gray-400 uppercase">
                                        {procurementData?.name}
                                    </BodySmallestMedium>
                                </div>


                                <div className="mb-[36px]">
                                    {
                                        procurementData?.totalValue && (
                                            <div>

                                                <BMiddleRegular className="mb-[8px] text-gray-800 font-medium">Value:</BMiddleRegular>
                                                <BodySmallestMedium className="!text-gray-400 uppercase">
                                                    {/* formatValue{procurementData?.totalValue} */}
                                                    ${formatValue(procurementData?.totalValue)}
                                                </BodySmallestMedium>
                                            </div>

                                        )
                                    }

                                </div>

                                {
                                    (savedRole === 'manager' || savedRole === 'admin')
                                    && (procurementData?.status?.code === '01' || procurementData?.status?.code === '05')
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
                                }
                            </div>

                            {/* RIGHT */}
                            <div className="">
                                {/* Additional Info */}
                                <div className="mb-[36px]">

                                    <BMiddleRegular className="mb-[8px] text-gray-800 font-medium">Description:</BMiddleRegular>
                                    <BodySmallestMedium className="!text-gray-400 uppercase">
                                        {procurementData?.description}
                                    </BodySmallestMedium>
                                </div>

                                {/* Date */}
                                <div className="mb-[36px]">
                                    <BMiddleRegular className="mb-[8px] text-gray-800 font-medium">Date/Time:</BMiddleRegular>
                                    <BodySmallestMedium className="!text-gray-400 uppercase">
                                        {formatDateTime(procurementData?.created_at)}
                                    </BodySmallestMedium>
                                </div>

                                {/* Status */}
                                <div className="mb-[36px]">
                                    <BMiddleRegular className="mb-[8px] text-gray-800 font-medium">Status:</BMiddleRegular>
                                    <BodySmallestMedium className="!text-gray-400 uppercase">
                                        {procurementData?.status?.name}
                                    </BodySmallestMedium>
                                </div>

                                {/* Action */}
                                {(procurementData?.status?.code === '01' && procurementData.totalValue) && (savedRole === 'manager' || savedRole === 'admin') && (
                                    <div className="mb-[36px]">
                                        <B1 className="mb-[8px]">Action</B1>

                                        <div className="flex items-center gap-[16px] lg:flex-row flex-col">
                                            <CustomButton
                                                className="!text-[0.875rem] !py-[0] h-[40px] !bg-[#029B5B] lg:!w-[150px] w-full !rounded-[3px] flex justify-center items-center"
                                                onClick={toggleConfirmModal}
                                            >
                                                <Image
                                                    src={"/images/checked.svg"}
                                                    alt="checked"
                                                    width={20}
                                                    height={20}
                                                    className="z-[10] text-white"
                                                />
                                                <div className="ml-3">Confirm</div>
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
                                                <div className="ml-3">Restart</div>
                                            </CustomButton>

                                        </div>
                                    </div>
                                )}

                                {(procurementData?.status?.code === '50' && procurementData.totalValue) && (savedRole === 'manager' || savedRole === 'admin') && (
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

                                {/* <div className="mb-[36px]">
                                            {(procurementData?.status?.code === '20') && (
                                                <div>
                                                    <B1 className="mb-[8px]">Action</B1>
                                                    <CustomButton
                                                        className="!text-[0.875rem] !px-4 flex justify-center items-center h-[40px] !bg-[#029B5B] lg:!w-fit xs:!w-full !rounded-[3px]"
                                                        onClick={toggleApproveModal}
                                                    >
                                                        Approve Shipment
                                                    </CustomButton>
                                                </div>
                                            )}
                                        </div>

                                        <div className="mb-[36px]">
                                            {(procurementData?.status?.code === '30') && (
                                                <div>
                                                    <B1 className="mb-[8px]">Action</B1>
                                                    <CustomButton
                                                        className="!text-[0.875rem] !px-4 flex justify-center items-center h-[40px] !bg-cyan-400 !text-white lg:!w-fit xs:!w-full !rounded-[3px]"
                                                        onClick={toggleStartedModal}
                                                    >
                                                        Start Shipment
                                                    </CustomButton>
                                                </div>
                                            )}
                                        </div>

                                        <div className="mb-[36px]">
                                            {(procurementData?.status?.code === '40') && (
                                                <div>
                                                    <B1 className="mb-[8px]">Action</B1>
                                                    <CustomButton
                                                        className="!text-[0.875rem] !px-4 flex justify-center items-center h-[40px] !bg-purple-400 !text-white lg:!w-fit xs:!w-full !rounded-[3px]"
                                                        onClick={toggleArrivalModal}
                                                    >
                                                        Arrival at the warehouse
                                                    </CustomButton>
                                                </div>
                                            )}
                                        </div>

                                        <div className="mb-[36px]">
                                            {(procurementData?.status?.code === '60') && (
                                                <div>
                                                    <B1 className="mb-[8px]">Action</B1>
                                                    <CustomButton
                                                        className="!text-[0.875rem] !px-4 flex justify-center items-center h-[40px] !bg-[#F47F12] !text-white lg:!w-fit xs:!w-full !rounded-[3px]"
                                                        onClick={toggleIntransitModal}
                                                    >
                                                        Shipment Intransit
                                                    </CustomButton>
                                                </div>
                                            )}
                                        </div>
                                        <div className="mb-[36px]">
                                            {(procurementData?.status?.code === '135') && (
                                                <div>
                                                    <B1 className="mb-[8px]">Action</B1>
                                                    <CustomButton
                                                        className="!text-[0.875rem] !px-4 flex justify-center items-center h-[40px] !bg-rose-500 !text-white lg:!w-fit xs:!w-full !rounded-[3px]"
                                                        onClick={toggleArrivedModal}
                                                    >
                                                        Shipment Arrived 
                                                    </CustomButton>
                                                </div>
                                            )}
                                        </div>

                                        <div className="mb-[36px]">
                                            {(procurementData?.status?.code === '150') && (
                                                <div>
                                                    <B1 className="mb-[8px]">Action</B1>
                                                    <CustomButton
                                                        className="!text-[0.875rem] !px-4 flex justify-center items-center h-[40px] !bg-lime-500 !text-white lg:!w-fit xs:!w-full !rounded-[3px]"
                                                        onClick={toggleCompletedModal}
                                                    >
                                                        Complete Shipment
                                                    </CustomButton>
                                                </div>
                                            )}
                                        </div> */}


                                {/* {procurementData?.isPaid === true && (
                                            <div className="mb-[36px]">
                                                <B1 className="mb-[8px]">Action</B1>

                                                <div className="flex items-center gap-[16px] lg:flex-row flex-col">
                                                    <CustomButton
                                                        className="!text-[0.875rem] !py-[0] h-[40px] !bg-[#029B5B] lg:!w-[112px] w-full !rounded-[3px]"
                                                    //   onClick={toggleApproveModal}
                                                    >
                                                        Approve
                                                    </CustomButton>
                                                    <CustomButton
                                                        //   onClick={toggleSeekModal}
                                                        className="!text-[0.875rem] !py-[0] h-[40px] !bg-[#F47F12] lg:!w-[112px] w-full !rounded-[3px]"
                                                    >
                                                        Clarify
                                                    </CustomButton>
                                                    <CustomButton
                                                        //   onClick={toggleRejectModal}
                                                        className="!text-[0.875rem] !py-[0] h-[40px] !bg-[#EA363C] lg:!w-[112px] w-full !rounded-[3px]"
                                                    >
                                                        Reject
                                                    </CustomButton>
                                                </div>
                                            </div>
                                        )} */}
                            </div>
                        </div>
                        <div>
                            <div className='text-white bg-primary py-2 px-2 text-[16px] mt-14 mb-7 md:item-center flex md:justify-start text-start'>Procurement Logs</div>
                            <div>
                                <ShipmentLogs logs={procurementData?.logs} />
                            </div>

                        </div>


                    </div>


                </div>
            </div>

            {showRestartModal && (
                <CustomModal onClose={toggleRestartModal} backdrop={true}>
                    <RestartProcess onClose={toggleRestartModal} id={parseInt(id)} />
                </CustomModal>
            )}

            {showConfirmModal && (
                <CustomModal onClose={toggleConfirmModal} backdrop={true}>
                    <ConfirmProcess onClose={toggleConfirmModal} id={parseInt(id)} />
                </CustomModal>
            )}

{showApproveModal && (
                <CustomModal onClose={toggleApproveModal} backdrop={true}>
                    <ApprovedProcess onClose={toggleApproveModal} id={parseInt(id)} />
                </CustomModal>
            )}

            {/* {showShipmentApproveModal && (
                <CustomModal onClose={toggleApproveModal} backdrop={true}>
                    <ApproveShipment onClose={toggleApproveModal} id={parseInt(id)} />
                </CustomModal>
            )}

            {showShipmentStartModal && (
                <CustomModal onClose={toggleStartedModal} backdrop={true}>
                    <StartShipmentRequest onClose={toggleStartedModal} id={parseInt(id)} slaId={procurementData?.sla?.id} />
                </CustomModal>
            )}

            {showShipmentArrivalModal && (
                <CustomModal onClose={toggleArrivalModal} backdrop={true}>
                    <ArrivalShipmentRequest onClose={toggleArrivalModal} id={parseInt(id)} />
                </CustomModal>
            )}

            {showShipmentIntransitModal && (
                <CustomModal onClose={toggleIntransitModal} backdrop={true}>
                    <IntransitShipmentRequest onClose={toggleIntransitModal} id={parseInt(id)} />
                </CustomModal>
            )}

            {showShipmentArrivedModal && (
                <CustomModal onClose={toggleArrivedModal} backdrop={true}>
                    <ArrivedShipmentRequest onClose={toggleArrivedModal} id={parseInt(id)} slaId={procurementData?.sla?.id}/>
                </CustomModal>
            )}


            {showShipmentCompletedModal && (
                <CustomModal onClose={toggleCompletedModal} backdrop={true}>
                    <CompletedShipmentRequest onClose={toggleCompletedModal} id={parseInt(id)} />
                </CustomModal>
            )} */}

        </div>
    );
}
