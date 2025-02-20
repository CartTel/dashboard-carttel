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
import { fetchSingleShipmentRequest, createInvoiceShipment, fetchAllCategories } from "@/config/api";
import { useQuery } from "@tanstack/react-query";

import Link from 'next/link';
import { toast } from "@/hooks/use-toast";
import Image from 'next/image'
import { RiTimerLine } from "react-icons/ri";
import { SkeletonLoader } from '@/components/ui/skeletonCard';



const breadCrumb = [
    {
        label: "Home",
        link: "/dashboard/import",
    },
    {
        label: "Shipment",
        link: "/dashboard/import/shipment",
    },
    {
        label: "View Shipment",
    },
];

interface EditShipmentDetailsProps {
    id: string;
}


export function ViewShipment({ id }: EditShipmentDetailsProps) {

    const { data: shipmentData, isLoading: isLoadingShipment, isError: isErrorUsers, error: shipmentsError } = useQuery({
        queryKey: ["singleShipments", id],
        queryFn: () => fetchSingleShipmentRequest(parseInt(id)),
        refetchOnWindowFocus: false, // avoid refetching on window focus
        staleTime: 0, // data becomes stale immediately for refetching
    });

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
        <div className="">

            <div className="mb-[14px] flex items-center justify-between">
                <CustomBreadCrumb items={breadCrumb} className="bg-gray-200 font-[500] text-primary w-fit px-5 py-1 rounded-lg" />
            </div>
            <H2 className="my-[36px] font-semibold text-primary">
                View Shipment
            </H2>

            <div className="grid md:grid-rows-2 md:grid-flow-col xs:grid-col-1 gap-4 w-full text-sm bg-[#edefee] p-2">
                <div className="h-full row-span-2 col-span-2 bg-white p-3 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                    <div className='text-slate-800 text-[16px] md:item-center flex md:justify-start text-start mb-7'>Shipment Item</div>

                    <div className="grid md:grid-cols-1 xs:grid-cols-1 gap-5 ">
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
                            {/* <div className="mb-[36px]">
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
                            </div> */}
                            <div className="mb-[36px]">
                                {shipmentData?.status?.code !== '01' && (
                                    <div>
                                        <BMiddleRegular className="mb-[18px] text-gray-800 font-medium">Invoice:</BMiddleRegular>

                                        <Link
                                            className="!text-[14px] text-white !bg-[#555454] w-fit !rounded-lg px-4 py-3"
                                            href={`/dashboard/import/shipment/create-invoice/${shipmentData?.id}`}
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
                                {(shipmentData?.status?.code === '05') && (
                                    <div>
                                        {/* <BMiddleRegular className="mb-[18px] text-gray-800 font-medium">Invoice:</BMiddleRegular> */}

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
                                {(shipmentData?.status?.code === '160') && (
                                    <div className="">
                                        <B1 className="mb-[8px]">Action</B1>
                                        <CustomButton
                                            className="!text-[0.875rem] !px-4 flex justify-center items-center h-[40px] !bg-indigo-500 !text-white lg:!w-fit xs:!w-full !rounded-[3px]"
                                            onClick={toggleRatedModal}
                                        >
                                            Rate Shipment
                                        </CustomButton>
                                    </div>
                                )}
                            </div>
                            {shipmentData?.isPaid === true && (
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
                            )}
                        </div>
                    </div>
                    <div>
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
                    <div className="mb-[36px]">
                        {(shipmentData?.status?.code === '160') && (
                            <div className="flex w-full justify-center items-center my-5">
                                {/* <B1 className="mb-[8px]">Action</B1> */}
                                <CustomButton
                                    className="w-fit !bg-plain font-semibold rounded-lg !text-primary md:px-6 md:py-3 xs:px-4 xs:py-2 md:!text-[15px] xs:!text-[13px] "
                                    onClick={toggleDispatchModal}
                                >
                                    Package Ready For Dispatch
                                </CustomButton>
                            </div>
                        )}
                    </div>
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

                    </div>

                    {/* <div className='text-slate-800 text-[16px] md:item-center flex  md:justify-start text-start'>Summary</div> */}

                </div>
            </div>

            {showShipmentModal && (
                <CustomModal onClose={togglePayInvoiceModal} backdrop={true}>
                    <PayInvoice onClose={togglePayInvoiceModal} id={parseInt(id)} />
                </CustomModal>
            )}

            {showShipmentDispatchModal && (
                <CustomModal onClose={toggleDispatchModal} backdrop={true}>
                    <PayInvoice onClose={toggleDispatchModal} id={parseInt(id)} />
                </CustomModal>
            )}

            {showShipmentRatedModal && (
                <CustomModal onClose={toggleRatedModal} backdrop={true}>
                    <PayInvoice onClose={toggleRatedModal} id={parseInt(id)} />
                </CustomModal>
            )}
        </div>
    )
}
