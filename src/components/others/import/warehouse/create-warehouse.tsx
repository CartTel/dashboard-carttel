"use client";
import {
    CustomBreadCrumb,
    CustomButton,
    CustomInput,
} from "@/components/custom-components";
import { CustomInputDate } from "@/components/custom-components";
import { B1, BMiddle, H2, BMiddleRegular, BodySmallestMedium, B1Regular } from "@/components/custom-typography";

import React, { useEffect, useState, useMemo } from "react";
import { fetchSingleShipmentRequest, createInvoiceShipment } from "@/config/api";
import { useQuery } from "@tanstack/react-query";

import Link from 'next/link';
import { toast } from "@/hooks/use-toast";
import Image from 'next/image'
import { useSearchParams, useRouter } from "next/navigation";
import { createWarehouseRequest } from "@/config/api";

import { TiLocationOutline, TiClipboard } from "react-icons/ti";
import apiClient from "@/config/api-clients";
import qs from 'qs';
import { SkeletonLoader } from "@/components/ui/skeletonCard";


const breadCrumb = [
    {
        label: "Home",
        link: "/dashboard/import",
    },
    {
        label: "Warehouse",
        link: "/dashboard/import/warehouse",
    },
    {
        label: "Create Warehouse",
    },
];

interface CreateWarehouseDetailsProps {
    id: string;
}

export function CreateWarehouse({ id }: CreateWarehouseDetailsProps) {

    const [formData, setFormData] = useState<any>({
        shipment_id: null,
        startDate: null,
        endDate: null,
        warehouseAddress: "",
        plan_id: null,
        items: []
    });
    const router = useRouter();
    const [userId, setUserId] = useState<any>(null);
    const [userPlan, setUserPlan] = useState<any>([]);

    const { data: shipmentData, isLoading: isLoadingShipment, isError: isErrorUsers, error: shipmentsError } = useQuery({
        queryKey: ["singleShipments", id],
        queryFn: () => fetchSingleShipmentRequest(parseInt(id)),
        refetchOnWindowFocus: false, // avoid refetching on window focus
        staleTime: 0, // data becomes stale immediately for refetching
    });

    const userString = localStorage.getItem("user");
    const handleClientCostChange = () => {
        console.log("New value:", formData);
    };

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");


    const handleCreateWarehouse = async (e: React.FormEvent<HTMLFormElement>) => {
        e?.preventDefault();
        setLoading(true);
        // console.log("object food", formData);
        try {
            const { warehouse } = await createWarehouseRequest(formData);

            console.log("response for warehouse ..", warehouse);

            if (warehouse) {
                toast({
                    title: "Success",
                    description: `${warehouse?.message}🎉`,
                    variant: "destructive",
                });

                setLoading(false);
                router.push('/dashboard/import/warehouse');
                // Delay the page reload to allow the toast and onClose to complete
                // setTimeout(() => {
                //     window.location.reload();
                // }, 5000); 
            }
        } catch (error: any) {
            if (error) {
                console.error("An unexpected error occurred:", error);
                if (error.response.status == 404) {
                    toast({
                        title: "Error",
                        description: `${error?.response?.data?.message}`,
                        variant: "destructive",
                    });

                } else if (error.response.status == 401) {
                    toast({
                        title: "Error",
                        description: "Invalid Credentials",
                        variant: "destructive",
                    });

                } else if (error.request) {
                    toast({
                        title: "Error",
                        description: "Network appears to be slow, Check connection 😢",
                        variant: "destructive",
                    });

                } else {
                    toast({
                        title: "Error",
                        description: "An unexpected error occurred",
                        variant: "destructive",
                    });
                }
            }
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        if (userString) {
            if (!userString) {
                throw new Error("User not found in local storage");
            }
            let user: any;
            try {
                user = JSON.parse(userString); // Attempt to parse user data
            } catch (parseError) {
                console.log("Invalid user data format in local storage");
            }
            setUserId(user?.user?.id)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userString]);

    useEffect(() => {
        if (shipmentData) {
            console.log("shipment ..", shipmentData)

            const formattedItems = shipmentData?.items.map((item: any) => ({
                name: item.name,
                quantity: item.quantity,
                value: item.value,
                item_id: item.id
            }));
            setFormData((prevForm: any) => ({
                ...prevForm,
                shipment_id: shipmentData.id,
                plan_id: userPlan?.plan?.id,
                warehouseAddress: "Suite 004, Ground Floor, Right Wing. Airport Business Hub, Along Murtala Muhammad International Airport Road, Ikeja, Lagos",
                items: formattedItems
            }));
        }
    }, [shipmentData, userPlan]);

    useEffect(() => {
        const fetchUserPlan = async () => {
            if (userId) {
                try {
                    const response = await apiClient.get(`/api/v1/user-plan/get-all-user-plans`, {
                        params: {
                            associations: ['plan', 'user'], // Specify the relationships to include
                            sortOrder: 'ASC',
                            sortBy: 'created_at',
                            byUserId: parseInt(userId),
                            page: 1,
                            perPage: 100,
                        },
                        paramsSerializer: (params) => {
                            return qs.stringify(params, { arrayFormat: 'brackets' });
                        },
                    });

                    setUserPlan(response?.data?.data)

                    const lastItem = response?.data?.data?.[response?.data?.data.length - 1];

                    // console.log("data item ..", lastItem);
                    // console.log("all Request..", response?.data?.data);

                    setUserPlan(lastItem)
                    return response.data;
                } catch (error) {
                    console.error('Error fetching user plan:', error);
                    throw error; // Rethrow the error for handling in the component
                }
            }

        };
        fetchUserPlan(); // Fetch data when the component mounts
    }, [userId]);

    // LOGIC FOR THE CALENDAR FOR WAREHOUSE
    const areItemsComplete = useMemo(() => {
        const textComplete = formData.startDate !== null && formData.endDate !== null;
        return textComplete
    }, [formData]);

    if (isLoadingShipment) {
        return <SkeletonLoader number={4} />
    }


    return (
        <div>
            <div className="mb-[14px] flex items-center justify-between">
                <CustomBreadCrumb items={breadCrumb} className="bg-gray-200 font-[500] text-primary w-fit px-5 py-1 rounded-lg" />
            </div>
            <H2 className="my-[36px] font-semibold text-primary">
                Create Warehouse
            </H2>

            <div className="py-[30px]">
                <div className="">
                    <div className="relative ">

                        <div className=" relative flex flex-col  w-full">
                            <div className="px-2 bg-white flex items-center justify-center">
                                <div
                                    className="md:text-lg xs:text-[15px] text-primary font-[500] capitalize"
                                    style={{ width: "fit-content" }}
                                >
                                    Create Your Items into our warehouse
                                </div>

                            </div>

                            <div className=''>
                                <div className='text-center my-2 mx-2 block w-full pb-0 text-md font-medium text-gray-800 transition-all duration-200 ease-in-out group-focus-within:text-blue-400'>
                                    Select Your Warehouisng Date
                                </div>
                                <div className='flex items-center justify-center text-center my-4 mx-2 w-full pb-0 text-md font-medium text-gray-800 transition-all duration-200 ease-in-out group-focus-within:text-blue-400'>
                                    <span className='font-[400] ml-5 text-gray-600 '> Current Plan </span>
                                    {/* <span className='font-[600] ml-5 text-primary '>Pro Plan</span> */}
                                    <span className="font-semibold text-primary uppercase mx-1"> {userPlan?.isExpired === true ? "BASIC PLAN" : `${userPlan?.plan?.name} PLAN`} </span>
                                </div>

                                <div className="group relative mt-2 mx-2">
                                    <div className="flex md:flex-row xs:flex-col gap-10 md:h-[30vh] xs:h-[30vh]">
                                        <div className={`form-group flex w-[100%] text-[1rem] my-0`}>
                                            <CustomInputDate
                                                id="start_date"
                                                showLabel={true}
                                                type="date"
                                                value={formData?.startDate}
                                                setValue={(value) =>
                                                    setFormData((prev: any) => ({ ...prev, startDate: value }))
                                                }
                                                label="Start Date"
                                                required
                                                className=""
                                            />
                                        </div>
                                        <div className={`form-group flex w-[100%] text-[1rem] my-0`}>
                                            <CustomInputDate
                                                id="end_date"
                                                showLabel={true}
                                                type="date"
                                                value={formData?.endDate}
                                                setValue={(value) =>
                                                    setFormData((prev: any) => ({ ...prev, endDate: value }))
                                                }
                                                label="End Date"
                                                required
                                                className=""
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <CustomButton
                            onClick={handleCreateWarehouse}
                            disabled={loading || !areItemsComplete}
                            // loaderState={loading}
                            
                            className={`${loading || !areItemsComplete ? "!bg-[#029B5B] opacity-40" : "!bg-[#029B5B]"} !py-[0px] !h-[58px] lg:!w-full xs:!w-full !text-md`}
                        >
                            <div>
                                {loading ? ( // Display spinner if userLoading is true
                                    <div className="flex items-center justify-center px-6">
                                        <div>

                                            <Image
                                                src={'/images/Spinner.svg'}
                                                alt="logo"
                                                width={60}
                                                height={60}
                                                priority
                                                className="text-[1px] md:w-full md:h-full xs:w-full xs:h-full"
                                            />

                                        </div>

                                    </div>
                                ) : (
                                    <div className='flex items-center justify-center text-[13px]'>

                                        <span className="ml-0">Create Warehouse</span>
                                    </div>
                                )}


                            </div>
                        </CustomButton>
                    </div>
                </div>

            </div>

        </div>
    );
}
