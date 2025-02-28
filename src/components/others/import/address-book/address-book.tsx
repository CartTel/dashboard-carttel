"use client";

import {
    CustomBreadCrumb,
    CustomButton,
    CustomSelect,
} from "@/components/custom-components";
import CustomModal from "@/components/custom-components/custom-modal";
import { H2, H1, BMiddleRegular, BodySmallestMedium } from "@/components/custom-typography";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from 'next/image'
import PaginationV2 from "@/components/wrappers/pagination";
import apiClient from "@/config/api-clients";
import qs from 'qs';
import { useQuery } from "@tanstack/react-query";
import Link from 'next/link';
import { LuPackagePlus } from "react-icons/lu";
import { SkeletonLoader } from '@/components/ui/skeletonCard';
import { MdModeEditOutline } from "react-icons/md";
import { deleteAddress } from "@/config/api";
import { toast } from "@/hooks/use-toast";



const breadCrumb = [
    {
        label: "Home",
        link: "/dashboard/import",
    },
    {
        label: "Address-Book",
    },
];


export function AddressBook() {
    const userString = localStorage.getItem("user");
    const [userId, setUserId] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [userPlan, setUserPlan] = useState<any>([]);
    const [error, setError] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    const [userAddress, setUserAddress] = useState<any>([]);
    const [userDeleteAddressId, setDeleteUserAddressId] = useState<any>(null);

    const router = useRouter();
    const queryParams = useSearchParams();
    const [showAddressModal, setShowAddressModal] = useState(false);

    const toggleAddressModal = (addressId: number) => {
        // console.log("number id..", addressId);
        setDeleteUserAddressId(addressId)
        setShowAddressModal((prev) => !prev);
    };

    const toggleDeleteAddressModal = () => {
        // console.log("number id..", addressId);
        setShowAddressModal((prev) => !prev);
    };

    const handleDeleteAddress = async () => {

        if (userDeleteAddressId) {
            setIsLoading(true);
            try {
                // Call the API to approve the request
                // console.log("all the ID", userDeleteAddressId)

                const result = await deleteAddress(userDeleteAddressId);

                if (result) {
                    toast({
                        title: "Success",
                        description: `Address Deleted successfully! 🎉`,
                        variant: "destructive",
                    });

                    toggleDeleteAddressModal()
                    setIsLoading(false);
                    // Delay the page reload to allow the toast and onClose to complete
                    setTimeout(() => {
                        window.location.reload();
                    }, 5000); // 1000ms = 1 second delay
                }
            } catch (err: any) {
                console.log("first", err)

                toggleDeleteAddressModal()
                toast({
                    title: "Error",
                    description: `${err?.response?.data?.message}`,
                    variant: "destructive",
                });

                // Handle error
                setError(err.message || "An error occurred while approving the request.");
            } finally {
                setIsLoading(false);
            }
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
        const fetchUserPlan = async () => {
            // console.log("good plan..", userId)
            setLoading(true);
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
                    const idPlan = response?.data?.data?.length - 1
                    const lastItem = response?.data?.data?.[response?.data?.data?.length - 1];
                    // console.log("data item ..", lastItem);
                    // console.log("all Request..", response?.data?.data, idPlan);
                    setLoading(false);
                    setUserPlan(lastItem)
                    return response.data;
                } catch (error) {
                    console.error('Error fetching user plan:', error);
                    throw error; // Rethrow the error for handling in the component
                } finally {
                    setLoading(false);
                }
            }
        };
        // Fetch data when the component mounts
        const fetchAddressList = async () => {

            // console.log("good plan..", userId)
            setLoading(true);
            if (userId) {
                try {
                    const response = await apiClient.get(`/api/v1/get-all-address`, {
                        params: {
                            associations: ['user'], // Specify the relationships to include
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
                    // console.log("all Address..", response?.data);

                    setLoading(false);
                    setUserAddress(response?.data)
                    return response.data.data;
                } catch (error) {
                    console.error('Error fetching user address:', error);
                    throw error; // Rethrow the error for handling in the component
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchAddressList();
        fetchUserPlan();
    }, [userId]);



    if (loading && userPlan && userAddress) {
        return <SkeletonLoader number={5} />
    }

    return (
        <div className="h-[100%] w-full">
            {/* BREADCRUMB */}
            <CustomBreadCrumb items={breadCrumb} className="bg-gray-200 font-[500] text-primary w-fit px-5 py-1 rounded-lg" />

            <div className="my-16 flex justify-between md:items-center gap-10  md:flex-row xs:flex-col ">
                <H1 className="">Address Book</H1>
            </div>


            <div className="grid md:grid-rows-3 md:grid-flow-col xs:grid-col-1 gap-8">
                <div className="col-span-2">
                    <div className="block font-light text-md mt-7 w-full md:text-sm xs:text-xs">
                        <span className=""> Your current plan is the </span>
                        <span className="font-semibold text-black uppercase"> {userPlan?.isExpired === true ? "BASIC PLAN" : `${userPlan?.plan?.name} PLAN`} </span>
                        <span className=""> and You have a limit of {userPlan?.isExpired === false && userPlan?.plan?.name == "Pro" ? " 15 " : userPlan?.isExpired === false && userPlan?.plan?.name == "Premium" ? " 20 " : "5"} Addresses</span>
                        <span className=""> {userPlan?.isExpired === true ? " To Increase your address Limit upgrade your Plan " : ""}</span>
                    </div>

                    <div className='font-light text-md mt-7 md:text-sm xs:text-xs'>
                        You have <b className='font-bold'>{userAddress?.data?.length}</b> Saved {userAddress?.data?.length > 1 ? "Addresses" : "Address"}
                    </div>

                    <Link
                        href="/dashboard/import/address-book/create-address"
                        className='text-secondary flex justify-center items-center rounded-md font-medium text-md mt-7 px-10 py-3 border-[1px] border-gray-200 hover:border-[#fbc645] md:text-lg xs:text-xs'
                    >
                        <div className='mr-1 text-lg'><LuPackagePlus /></div> <span className='text-sm'>Add Another Address</span>
                    </Link>
                </div>

                <div className="h-fit row-span-2 col-span-2 font-medium text-md md:text-base xs:text-xs">
                    {
                        userAddress?.data ? (
                            <PaginationV2
                                list={userAddress?.data}
                                pagination={{
                                    perPage: 5,
                                    totalPages: Math.ceil(userAddress?.pagination.total / 5),
                                    total: userAddress?.pagination.total,
                                    page: userAddress?.pagination.page,
                                }}
                                onPageChange={(page) => console.log("Page changed to:", page)}
                                show={false}
                            >
                                {(paginatedList) => (
                                    <div>
                                        {
                                            paginatedList?.length > 0 ?
                                                <div className="grid lg:grid-cols-1 gap-4">
                                                    {paginatedList?.map((address: any, index: number) => (
                                                        <div key={index} className='my-7 grid md:grid-cols-2 xs:grid-cols-1 gap-10 w-full border-[1px] border-[#fbc645] rounded-sm px-3 py-3'>
                                                            <div>
                                                                <div className='font-medium text-sm my-1 text-gray-500'>{address.address}, {address.city} {address.state}, {address.country} </div>
                                                                <div className='font-medium text-sm my-1 text-gray-500'>{address.phone}</div>

                                                            </div>
                                                            <div className='w-full ml-auto flex justify-center items-center'>
                                                                <button
                                                                    onClick={() => toggleAddressModal(address.id)}
                                                                    className='text-rose-600 text-xl font-semibold text-start w-40 mr-auto flex justify-center items-center'>
                                                                    <div className="w-fit flex justify-center items-center bg-slate-200 rounded-full p-2">
                                                                        <Image
                                                                            src={"/images/Home/trash.svg"}
                                                                            alt="check"
                                                                            width={20}
                                                                            height={20}
                                                                        />
                                                                    </div>
                                                                    <span className='text-sm ml-5'>Delete</span>
                                                                </button>
                                                                <Link
                                                                    href={`/dashboard/import/address-book/edit-address/${address.id}`}
                                                                    className='text-green-600 text-xl font-semibold text-start w-40 mr-auto flex justify-center items-center'
                                                                >
                                                                    <span><MdModeEditOutline /></span>

                                                                    <span className='text-sm ml-5'>Edit</span>
                                                                </Link>
                                                            </div>

                                                        </div>
                                                    ))}
                                                </div>
                                                :
                                                <div className="flex w-full justify-center items-center h-full">
                                                    <div>
                                                        <div className="w-full flex flex-col justify-center items-center p-2">
                                                            <Image
                                                                src={"/images/Assets/location-indicator.svg"}
                                                                alt="check"
                                                                width={200}
                                                                height={200}
                                                            />
                                                            <div className="capitalize">No Address created Yet</div>
                                                        </div>
                                                    </div>
                                                </div>
                                        }

                                    </div>
                                )}
                            </PaginationV2>
                        ) : (
                            <div className='w-full flex justify-center items-center'>
                                <div className="loader"></div>
                            </div>
                        )
                    }

                    {
                        userAddress?.data?.length < 1 && (
                            <div>
                                <div className="w-full flex flex-col justify-center items-center p-2">
                                    <Image
                                        src={"/images/Assets/location-indicator.svg"}
                                        alt="check"
                                        width={200}
                                        height={200}
                                    />
                                    <div className="capitalize">No Address created Yet</div>
                                </div>
                            </div>
                        )
                    }
                </div>

                <div className=" md:row-span-2 md:col-span-1 xs:col-span-2 border-[1px] p-3 border-slate-400">
                    <div className='text-sm flex justify-center font-semibold'>Reasons Why You Need To Create An Address</div>
                    <ul className='font-light text-sm mt-7 w-full'>
                        <li className='my-4'>
                            <b className='font-bold'>  Delivery:</b> The primary reason for providing an address is to ensure that the package reaches the intended recipient at the correct location.
                        </li>
                        <li className='my-4'>
                            <b className='font-bold'>Accuracy:</b> An accurate address helps in avoiding delivery errors and ensures that the package is delivered to the right person.
                        </li>
                        <li className='my-4'>
                            <b className='font-bold'>Verification:</b> The address is used to verify the identity of the recipient and confirm their location.
                        </li>
                        <li className='my-4'>
                            <b className='font-bold'>Tracking:</b> An address is essential for tracking the shipments progress and providing updates on its status.
                        </li>
                        <li className='my-4'>
                            <b className='font-bold'>Contact:</b> In case of any delivery issues or questions, the address serves as a point of contact for the shipping company to reach out to the recipient
                        </li>
                        <li className='my-4'>
                            <b className='font-bold'>Legal Requirements:</b> Providing an address may be necessary for legal and tax purposes, especially for international shipments.
                        </li>
                        <li className='my-4'>
                            <b className='font-bold'>Customs:</b> When shipping internationally, the address is required for customs clearance and compliance with import/export regulations.
                        </li>
                        <li className='my-4'>
                            <b className='font-bold'>Security:</b> Having a verified address helps in preventing fraud and ensuring the security of the delivery process
                        </li>
                    </ul>
                </div>
            </div>

            {
                showAddressModal && (
                    <CustomModal onClose={toggleDeleteAddressModal} backdrop={true}>
                        <div className="bg-white p-8 rounded-lg mx-4">

                            <div className="w-full flex justify-center items-center mb-3">
                                <Image
                                    src={"/images/Assets/trash-empty.svg"}
                                    alt="trash-empty"
                                    width={96}
                                    height={96}
                                />
                            </div>
                            <BodySmallestMedium className="text-sm text-gray-800 mb-4">Are you sure you want to remove this address from your address book?</BodySmallestMedium>
                            <div className="flex justify-center md:flex-row xs:flex-col gap-5">

                                {
                                    <CustomButton

                                        onClick={toggleDeleteAddressModal}
                                        className="!text-[#292D32] border-gray !bg-white border-[1px] !py-[0px] !h-[58px] lg:!w-[175px] xs:!w-full !text-[13px]"
                                    >
                                        Cancel
                                    </CustomButton>
                                }
                                <CustomButton
                                    disabled={loading}
                                    onClick={handleDeleteAddress}
                                    // loaderState={loading}
                                    className={`!bg-red-500 !py-[0px] !h-[58px] lg:!w-[175px] xs:!w-full !text-md`}
                                >
                                    <div>
                                        {isLoading ? ( // Display spinner if userLoading is true
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

                                                <span className="ml-0">Remove Address</span>
                                            </div>
                                        )}


                                    </div>
                                </CustomButton>
                            </div>
                        </div>
                    </CustomModal>
                )
            }

        </div >
    );
}
