"use client";
import { CustomBreadCrumb, CustomButton } from "@/components/custom-components";
import { B1, BMiddle, H2, BMiddleRegular, BodySmallestMedium, B1Regular } from "@/components/custom-typography";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchSingleShipmentRequest } from "@/config/api";
import { getAdapter } from "axios";
import { formatDateTime } from "@/helper/format";
import Link from 'next/link';
import { SkeletonLoader } from '@/components/ui/skeletonCard';
import CustomModal from "@/components/custom-components/custom-modal";

import { ApproveShipment } from "@/components/actions/approve-shipment";
import { StartShipmentRequest } from "@/components/actions/started-shipment";
import { ArrivalShipmentRequest } from "@/components/actions/arrival-shipment";
import { IntransitShipmentRequest } from "@/components/actions/intransit-shipment";
import { ArrivedShipmentRequest } from "@/components/actions/arrived-shipment";
import { CompletedShipmentRequest } from "@/components/actions/completed-shipment";

import ShipmentLogs from "@/components/ui/shipment-trail";

interface ShipmentRequestDetailsProps {
    id: string;
}



export function ShipmentRequestDetails({ id }: ShipmentRequestDetailsProps) {
    const [showShipmentStartModal, setShipmentStartModal] = useState(false);
    const [showShipmentApproveModal, setShipmentApproveModal] = useState(false);
    const [showShipmentArrivalModal, setShipmentArrivalModal] = useState(false);
    const [showShipmentIntransitModal, setShipmentIntransitModal] = useState(false);
    const [showShipmentArrivedModal, setShipmentArrivedModal] = useState(false);
    const [showShipmentCompletedModal, setShipmentCompletedModal] = useState(false);

    const toggleStartedModal = () => {
        setShipmentStartModal((prev) => !prev);
    };

    const toggleApproveModal = () => {
        setShipmentApproveModal((prev) => !prev);
    };

    const toggleArrivalModal = () => {
        setShipmentArrivalModal((prev) => !prev);
    };

    const toggleArrivedModal = () => {
        setShipmentArrivedModal((prev) => !prev);
    };

    const toggleCompletedModal = () => {
        setShipmentCompletedModal((prev) => !prev);
    };

    const toggleIntransitModal = () => {
        setShipmentIntransitModal((prev) => !prev);
    };

    const [breadCrumbArray, setBreabCrumbArray] = useState(
        [
            {
                label: "Home",
                link: "/dashboard/admin",
            },
            {
                label: "Shipment",
                link: "/dashboard/admin/shipment",
            },
        ]
    )

    const { data: shipmentData, isLoading: isLoadingShipment, isError: isErrorUsers, error: shipmentsError } = useQuery({
        queryKey: ["singleShipments", id],
        queryFn: () => fetchSingleShipmentRequest(parseInt(id)),
        refetchOnWindowFocus: false, // avoid refetching on window focus
        staleTime: 0, // data becomes stale immediately for refetching
    });

    // console.log("all shipment..", shipmentData)

    useEffect(() => {
        const getBreadcrumb = () => {
            const breadCrumb = [
                {
                    label: "Home",
                    link: "/dashboard/admin",
                },
                {
                    label: "Shipment",
                    link: "/dashboard/admin/shipment",
                },
            ];

            if (shipmentData) {
                breadCrumb.push({
                    link: `/dashboard/admin/shipment/${shipmentData?.id}`,
                    label: `${shipmentData?.code}`,
                });
            }

            setBreabCrumbArray(breadCrumb);
        };

        getBreadcrumb();
    }, [shipmentData]);

    if (isLoadingShipment) {
        return <SkeletonLoader number={5} />
    }


    return (
        <div>
            {/* BREADCRUMB */}
            <div className="mb-[14px] flex items-center justify-between">
                <CustomBreadCrumb items={breadCrumbArray} className="bg-gray-200 font-[500] text-primary w-fit px-5 py-1 rounded-lg" />
            </div>
            <H2 className="my-[36px] font-semibold text-primary">
                {shipmentData?.status?.code === '01' ? "Create Shipment Requests" : "View Shipment Requests"}
            </H2>

            <div>
                {
                    (shipmentData?.status?.code === '01' || shipmentData?.status?.code === '05') ?
                        <div className="grid md:grid-rows-2 md:grid-flow-col xs:grid-col-1 gap-0 w-full text-sm bg-[#edefee] p-2">
                            <div className="h-full row-span-2 col-span-2 bg-white p-3 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                                <div className='text-slate-800 text-[16px] md:item-center flex md:justify-start text-start mb-7'>Shipment Item</div>

                                <div className="grid md:grid-cols-2 xs:grid-cols-1 gap-5 ">
                                    <div className="">

                                        {/* Name */}
                                        <div className="mb-[36px]">
                                            <BMiddleRegular className="mb-[8px] text-gray-800 font-medium">Name:</BMiddleRegular>
                                            <BodySmallestMedium className="!text-gray-400 uppercase">
                                                {shipmentData?.name}
                                            </BodySmallestMedium>
                                        </div>

                                        {/* Code */}
                                        <div className="mb-[36px]">

                                            <BMiddleRegular className="mb-[8px] text-gray-800 font-medium">Code:</BMiddleRegular>
                                            <BodySmallestMedium className="!text-gray-400 uppercase">
                                                {shipmentData?.code}
                                            </BodySmallestMedium>
                                        </div>
                                        <div className="mb-[36px]">
                                            <BMiddleRegular className="mb-[8px] text-gray-800 font-medium">Requested By:</BMiddleRegular>
                                            <BodySmallestMedium className="!text-gray-400 uppercase">
                                                {shipmentData?.requested_by}
                                            </BodySmallestMedium>
                                        </div>


                                        {/* Attachment */}
                                        <div className="mb-[36px]">
                                            {!shipmentData?.invoice && (
                                                <div>
                                                    <BMiddleRegular className="mb-[18px] text-gray-800 font-medium">Invoice:</BMiddleRegular>

                                                    <Link
                                                        className="!text-[14px] text-white !bg-[#555454] w-fit !rounded-lg px-4 py-3"
                                                        href={`/dashboard/admin/shipment/create-invoice/${shipmentData?.id}`}
                                                    >
                                                        Generate Invoice
                                                    </Link>
                                                </div>
                                            )}
                                        </div>
                                        <div className="mb-[36px]">
                                            {shipmentData?.status?.code === '05' && (
                                                <div>
                                                    <BMiddleRegular className="mb-[18px] text-gray-800 font-medium">Invoice:</BMiddleRegular>

                                                    <Link
                                                        className="!text-[14px] text-white !bg-[#555454] w-fit !rounded-lg px-4 py-3"
                                                        href={`/dashboard/admin/shipment/create-invoice/${shipmentData?.id}`}
                                                    >
                                                        Sent Client Invoice
                                                    </Link>
                                                </div>
                                            )}
                                        </div>
                                        <div className="mb-[36px]">
                                            {(shipmentData?.status?.code !== '01' && shipmentData?.status?.code !== '05') && (
                                                <div>
                                                    <BMiddleRegular className="mb-[18px] text-gray-800 font-medium">Invoice:</BMiddleRegular>

                                                    <Link
                                                        className="!text-[14px] text-white !bg-[#555454] w-fit !rounded-lg px-4 py-3"
                                                        href={`/dashboard/admin/shipment/create-invoice/${shipmentData?.id}`}
                                                    >
                                                        View Invoice
                                                    </Link>
                                                </div>
                                            )}
                                        </div>

                                    </div>

                                    {/* RIGHT */}
                                    <div className="">
                                        {/* Additional Info */}
                                        <div className="mb-[36px]">

                                            <BMiddleRegular className="mb-[8px] text-gray-800 font-medium">Description:</BMiddleRegular>
                                            <BodySmallestMedium className="!text-gray-400 uppercase">
                                                {shipmentData?.description}
                                            </BodySmallestMedium>
                                        </div>

                                        {/* Date */}
                                        <div className="mb-[36px]">
                                            <BMiddleRegular className="mb-[8px] text-gray-800 font-medium">Date/Time:</BMiddleRegular>
                                            <BodySmallestMedium className="!text-gray-400 uppercase">
                                                {formatDateTime(shipmentData?.created_at)}
                                            </BodySmallestMedium>
                                        </div>

                                        {/* Status */}
                                        <div className="mb-[36px]">
                                            <BMiddleRegular className="mb-[8px] text-gray-800 font-medium">Status:</BMiddleRegular>
                                            <BodySmallestMedium className="!text-gray-400 uppercase">
                                                {shipmentData?.status?.name}
                                            </BodySmallestMedium>
                                        </div>

                                        {/* Action */}
                                        {/* {shipmentData?.isPaid === true && (
                                            <div className="mb-[36px]">
                                                <B1 className="mb-[8px]">Action</B1>

                                                <div className="flex items-center gap-[16px] lg:flex-row flex-col">
                                                    <CustomButton
                                                        className="!text-[0.875rem] !py-[0] h-[40px] !bg-[#029B5B] lg:!w-[112px] w-full !rounded-[3px]"
                                                    //   onClick={toggleApproveModal}
                                                    >
                                    Start                                                    </CustomButton>
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
                                <div >
                                    <div className='text-white bg-primary py-2 px-2 text-[16px] mt-14 md:item-center flex md:justify-start text-start mb-0'>Shipment Item</div>
                                    <div className=" p-0 gap-10 w-full">

                                        {shipmentData?.items?.map((item: any, index: number) => (
                                            <div key={item.id} className="px-1 mb-4">
                                                <div className="bg-plain py-2 w-full px-2 my-3 font-semibold text-primary">Items {(index) + 1}</div>
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-10">
                                                    <div>
                                                        <BMiddleRegular className="mb-1 text-gray-800 font-medium">
                                                            Name:
                                                        </BMiddleRegular>
                                                        <BodySmallestMedium className="text-gray-600 uppercase">
                                                            {item?.name}
                                                        </BodySmallestMedium>
                                                    </div>
                                                    <div>
                                                        <BMiddleRegular className="mb-1 text-gray-800 font-medium">
                                                            Quantity:
                                                        </BMiddleRegular>
                                                        <BodySmallestMedium className="text-gray-600 uppercase">
                                                            {item?.quantity}
                                                        </BodySmallestMedium>
                                                    </div>
                                                    <div>
                                                        <BMiddleRegular className="mb-1 text-gray-800 font-medium">
                                                            Description:
                                                        </BMiddleRegular>
                                                        <BodySmallestMedium className="text-gray-600 uppercase">
                                                            {item?.description}
                                                        </BodySmallestMedium>
                                                    </div>
                                                    <div>
                                                        <BMiddleRegular className="mb-1 text-gray-800 font-medium">
                                                            Weight:
                                                        </BMiddleRegular>
                                                        <BodySmallestMedium className="text-gray-600 uppercase">
                                                            {item?.weight}kg
                                                        </BodySmallestMedium>
                                                    </div>
                                                    <div>
                                                        <BMiddleRegular className="mb-1 text-gray-800 font-medium">
                                                            Value:
                                                        </BMiddleRegular>
                                                        <BodySmallestMedium className="text-gray-600 uppercase">
                                                            ${item?.value}
                                                        </BodySmallestMedium>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>


                            </div>

                            <div className="h-full md:row-span-2 md:col-span-1 xs:col-span-2 md:border-l-[1px] md:px-1 xs:px-0 bg-white  border-gray-300">
                                <div className="h-fit md:row-span-2 md:col-span-1 xs:col-span-2 border-[1px] p-2 border-white bg-white rounded-lg">

                                    <div className='text-slate-800 text-[16px] md:item-center flex md:justify-start text-start'>Summary</div>
                                    <div className='font-light text-sm mt-7 w-full bg-white px-0 py-3 '>


                                        <div className="group relative mt-2 flex md:flex-row xs:flex-col gap-1 justify-between w-full my-3">
                                            <div className='text-slate-600  font-[400] text-start text-md'>Tracking ID</div>
                                            <div className='text-slate-600 font-[400] text-start text-md'>{shipmentData?.tracking?.tracking_id}</div>
                                        </div>

                                        <div className="group relative mt-2 flex md:flex-row xs:flex-col gap-1 justify-between w-full my-3 ">
                                            <div className='text-slate-600 font-[400] text-start text-md'>Shipment Request</div>
                                            <div className='text-slate-600 font-[400] text-start text-md'>{shipmentData?.code}</div>
                                        </div>


                                    </div>
                                    <div className='font-light text-sm mt-7 w-full bg-[#edefee] rounded-lg px-2 py-3'>

                                        <div className='text-slate-900 text-[16px] font-[500] text-start'>Importer Info</div>

                                        <div className="">
                                            <div className='my-4'>
                                                <div className='font-semibold text-gray-800'> Name:</div>
                                                <div className="text-gray-600 font-[400]">
                                                    {shipmentData?.senderInfo?.name}
                                                </div>
                                            </div>

                                            <div className='my-4'>
                                                <div className='font-semibold text-gray-800'>From address:</div>
                                                <div className="text-gray-600 font-[400]">
                                                    {shipmentData?.receiverInfo?.address_line_1}, {shipmentData?.receiverInfo?.city}, {shipmentData?.receiverInfo?.country}
                                                </div>
                                            </div>
                                            <div className='my-4'>
                                                <div className='font-semibold text-gray-800'>To address:</div>
                                                <div className="text-gray-600 font-[400]">
                                                    {shipmentData?.senderInfo?.address_line_1}, {shipmentData?.senderInfo?.city}, {shipmentData?.senderInfo?.country}
                                                </div>
                                            </div>


                                            <div className='my-4'>
                                                <div className='font-semibold text-gray-800'> Tracking ID:</div>
                                                <div className="text-gray-600 font-[400] uppercase">
                                                    {shipmentData?.tracking?.tracking_id}
                                                </div>
                                            </div>

                                            <div className='my-4'>
                                                <div className='font-semibold text-gray-800'> Tracking Number:</div>
                                                <div className="text-gray-600 font-[400] uppercase">
                                                    {shipmentData?.tracking?.tracking_number}
                                                </div>
                                            </div>





                                        </div>
                                    </div>

                                    <div className='font-light text-sm mt-7 w-full bg-[#edefee] rounded-lg px-2 py-3'>

                                        <div className='text-slate-900 text-[16px] font-[500] text-start'>Insurance</div>

                                        <div className="">
                                            <div className='my-4'>
                                                <div className='font-semibold text-gray-800'> Type:</div>
                                                <div className="text-gray-600 font-[400]">
                                                    {shipmentData?.insurance?.insurance_type}
                                                </div>
                                            </div>

                                            <div className='my-4'>
                                                <div className='font-semibold text-gray-800'> Policy Number</div>
                                                <div className="text-gray-600 font-[400]">
                                                    {shipmentData?.insurance?.policy_number}
                                                </div>
                                            </div>


                                        </div>
                                    </div>



                                    <div className='my-6 flex justify-between md:flex-row xs:flex-col w-full'>
                                        <button className="w-full flex justify-center items-center cursor rounded-md bg-primary font-medium px-4 md:py-3 xs:py-2 text-white sm:text-xs xs:text-[12px] md:text-[0.75rem]">
                                            <span className="w-full whitespace-nowrap">Save & Continue</span>
                                        </button>

                                    </div>
                                    <div className='my-6 flex justify-between md:flex-row xs:flex-col gap-5'>

                                        <button className="w-full flex justify-center items-center cursor rounded-md bg-white border border-gray-400 font-medium px-4 md:py-3 xs:py-2 text-gray-700 sm:text-xs xs:text-[12px] md:text-[0.75rem]">
                                            <span className="w-full whitespace-nowrap">Cancel</span>
                                        </button>

                                        <button className="w-full flex justify-center items-center cursor rounded-md bg-white border border-red-500 font-medium px-4 md:py-3 xs:py-2 text-red-500 sm:text-xs xs:text-[12px] md:text-[0.75rem]">
                                            <span className="w-full whitespace-nowrap">Delete</span>
                                        </button>

                                    </div>
                                </div>

                                {/* <div className='text-slate-800 text-[16px] md:item-center flex  md:justify-start text-start'>Summary</div> */}

                            </div>
                        </div>

                        :
                        <div className="grid md:grid-cols-2 xs:grid-col-1 gap-0 w-full text-sm bg-[#edefee] p-2">
                            <div className="h-full row-span-2 col-span-2 bg-white p-3 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                                <div className='text-slate-800 text-[16px] md:item-center flex md:justify-start text-start mb-7'>Shipment Item</div>

                                <div className="grid md:grid-cols-2 xs:grid-cols-1 gap-5 ">
                                    <div className="">

                                        {/* Name */}
                                        <div className="mb-[36px]">
                                            <BMiddleRegular className="mb-[8px] text-gray-800 font-medium">Name:</BMiddleRegular>
                                            <BodySmallestMedium className="!text-gray-400 uppercase">
                                                {shipmentData?.name}
                                            </BodySmallestMedium>
                                        </div>

                                        {/* Code */}
                                        <div className="mb-[36px]">

                                            <BMiddleRegular className="mb-[8px] text-gray-800 font-medium">Code:</BMiddleRegular>
                                            <BodySmallestMedium className="!text-gray-400 uppercase">
                                                {shipmentData?.code}
                                            </BodySmallestMedium>
                                        </div>
                                        <div className="mb-[36px]">
                                            <BMiddleRegular className="mb-[8px] text-gray-800 font-medium">Requested By:</BMiddleRegular>
                                            <BodySmallestMedium className="!text-gray-400 uppercase">
                                                {shipmentData?.requested_by}
                                            </BodySmallestMedium>
                                        </div>

                                        {/* Attachment */}
                                        <div className="mb-[36px]">
                                            {!shipmentData?.invoice && (
                                                <div>
                                                    <BMiddleRegular className="mb-[18px] text-gray-800 font-medium">Invoice:</BMiddleRegular>

                                                    <Link
                                                        className="!text-[14px] text-white !bg-[#555454] w-fit !rounded-lg px-4 py-3"
                                                        href={`/dashboard/admin/shipment/create-invoice/${shipmentData?.id}`}
                                                    >
                                                        Generate Invoice
                                                    </Link>
                                                </div>
                                            )}
                                        </div>
                                        <div className="mb-[36px]">
                                            {shipmentData?.status?.code === '05' && (
                                                <div>
                                                    <BMiddleRegular className="mb-[18px] text-gray-800 font-medium">Invoice:</BMiddleRegular>

                                                    <Link
                                                        className="!text-[14px] text-white !bg-[#555454] w-fit !rounded-lg px-4 py-3"
                                                        href={`/dashboard/admin/shipment/create-invoice/${shipmentData?.id}`}
                                                    >
                                                        Sent Client Invoice
                                                    </Link>
                                                </div>
                                            )}
                                        </div>
                                        <div className="mb-[36px]">
                                            {(shipmentData?.status?.code !== '01' && shipmentData?.status?.code !== '05') && (
                                                <div>
                                                    <BMiddleRegular className="mb-[18px] text-gray-800 font-medium">Invoice:</BMiddleRegular>

                                                    <Link
                                                        className="!text-[14px] text-white !bg-[#555454] w-fit !rounded-lg px-4 py-3"
                                                        href={`/dashboard/admin/shipment/create-invoice/${shipmentData?.id}`}
                                                    >
                                                        View Invoice
                                                    </Link>
                                                </div>
                                            )}
                                        </div>

                                    </div>

                                    {/* RIGHT */}
                                    <div className="">
                                        {/* Additional Info */}
                                        <div className="mb-[36px]">

                                            <BMiddleRegular className="mb-[8px] text-gray-800 font-medium">Description:</BMiddleRegular>
                                            <BodySmallestMedium className="!text-gray-400 uppercase">
                                                {shipmentData?.description}
                                            </BodySmallestMedium>
                                        </div>

                                        {/* Date */}
                                        <div className="mb-[36px]">
                                            <BMiddleRegular className="mb-[8px] text-gray-800 font-medium">Date/Time:</BMiddleRegular>
                                            <BodySmallestMedium className="!text-gray-400 uppercase">
                                                {formatDateTime(shipmentData?.created_at)}
                                            </BodySmallestMedium>
                                        </div>

                                        {/* Status */}
                                        <div className="mb-[36px]">
                                            <BMiddleRegular className="mb-[8px] text-gray-800 font-medium">Status:</BMiddleRegular>
                                            <BodySmallestMedium className="!text-gray-400 uppercase">
                                                {shipmentData?.status?.name}
                                            </BodySmallestMedium>
                                        </div>

                                        {/* Action */}

                                        <div className="mb-[36px]">
                                            {(shipmentData?.status?.code === '20') && (
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
                                            {(shipmentData?.status?.code === '30') && (
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
                                            {(shipmentData?.status?.code === '40') && (
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
                                            {(shipmentData?.status?.code === '60') && (
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
                                            {(shipmentData?.status?.code === '135') && (
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
                                            {(shipmentData?.status?.code === '150') && (
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
                                        </div>


                                        {/* {shipmentData?.isPaid === true && (
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
                        <div className='text-white bg-primary py-2 px-2 text-[16px] mt-14 mb-7 md:item-center flex md:justify-start text-start'>{(shipmentData?.status?.code === '01' || shipmentData?.status?.code === '05') ? "Shipment Item" : "Shipment Logs"}</div>

                        {(shipmentData?.status?.code === '01' || shipmentData?.status?.code === '05') ? (
                            <div className=" p-0 gap-10 w-full">

                                {shipmentData?.items?.map((item: any, index: number) => (
                                    <div key={item.id} className="px-1 mb-4">
                                        <div className="bg-plain py-2 w-full px-2 my-3 font-semibold text-primary">Items {(index) + 1}</div>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-10">
                                            <div>
                                                <BMiddleRegular className="mb-1 text-gray-800 font-medium">
                                                    Name:
                                                </BMiddleRegular>
                                                <BodySmallestMedium className="text-gray-600 uppercase">
                                                    {item?.name}
                                                </BodySmallestMedium>
                                            </div>
                                            <div>
                                                <BMiddleRegular className="mb-1 text-gray-800 font-medium">
                                                    Quantity:
                                                </BMiddleRegular>
                                                <BodySmallestMedium className="text-gray-600 uppercase">
                                                    {item?.quantity}
                                                </BodySmallestMedium>
                                            </div>
                                            <div>
                                                <BMiddleRegular className="mb-1 text-gray-800 font-medium">
                                                    Description:
                                                </BMiddleRegular>
                                                <BodySmallestMedium className="text-gray-600 uppercase">
                                                    {item?.description}
                                                </BodySmallestMedium>
                                            </div>
                                            <div>
                                                <BMiddleRegular className="mb-1 text-gray-800 font-medium">
                                                    Weight:
                                                </BMiddleRegular>
                                                <BodySmallestMedium className="text-gray-600 uppercase">
                                                    {item?.weight}kg
                                                </BodySmallestMedium>
                                            </div>
                                            <div>
                                                <BMiddleRegular className="mb-1 text-gray-800 font-medium">
                                                    Value:
                                                </BMiddleRegular>
                                                <BodySmallestMedium className="text-gray-600 uppercase">
                                                    ${item?.value}
                                                </BodySmallestMedium>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div>
                                <ShipmentLogs logs={shipmentData?.logs} />
                            </div>
                        )

                        }
                    </div>


                            </div>


                        </div>
                }
            </div>

            {showShipmentApproveModal && (
                <CustomModal onClose={toggleApproveModal} backdrop={true}>
                    <ApproveShipment onClose={toggleApproveModal} id={parseInt(id)} />
                </CustomModal>
            )}

            {showShipmentStartModal && (
                <CustomModal onClose={toggleStartedModal} backdrop={true}>
                    <StartShipmentRequest onClose={toggleStartedModal} id={parseInt(id)} slaId={shipmentData?.sla?.id} />
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
                    <ArrivedShipmentRequest onClose={toggleArrivedModal} id={parseInt(id)} slaId={shipmentData?.sla?.id}/>
                </CustomModal>
            )}


            {showShipmentCompletedModal && (
                <CustomModal onClose={toggleCompletedModal} backdrop={true}>
                    <CompletedShipmentRequest onClose={toggleCompletedModal} id={parseInt(id)} />
                </CustomModal>
            )}

        </div>
    );
}
