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



const breadCrumb = [
    {
        label: "Home",
        link: "/dashboard/import",
    },
    {
        label: "Procurement",
        link: "/dashboard/admin/procurement",
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

    // const formatValue = (value: string): string | number => {
    //     const valueFormat = parseInt(value)
    //     return valueFormat.toLocaleString("en-US");
    // };

    const [loading, setLoading] = useState(false);
    const [showShipmentModal, setShipmentModal] = useState(false);
    const [showShipmentDispatchModal, setShipmentDispatchModal] = useState(false);
    const [showShipmentRatedModal, setShipmentRatedModal] = useState(false);

    const [error, setError] = useState("");

    const formatValue = (value: number): string => {
        return value.toLocaleString("en-US");
    };

    const togglePayInvoiceModal = () => {
        // console.log("modal")
        setShipmentModal((prev) => !prev);
    };

    const toggleDispatchModal = () => {
        // console.log("modal")
        setShipmentDispatchModal((prev) => !prev);
    };

    const toggleRatedModal = () => {
        // console.log("modal")
        setShipmentRatedModal((prev) => !prev);
    };


    if (isLoadingShipment) {
        return <SkeletonLoader number={5} />
    }

    return (
        <div>
            {/* BREADCRUMB */}
            <div className="mb-[14px] flex items-center justify-between">
                <CustomBreadCrumb items={breadCrumb} className="bg-gray-200 font-[500] text-primary w-fit px-5 py-1 rounded-lg" />
            </div>
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

                                        {/* Code */}
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
