"use client"

import Link from 'next/link';
import { useState, useEffect, useRef } from "react";

import {
    CustomBreadCrumb,
    CustomButton,
    CustomSelect,
    CustomInput
} from "@/components/custom-components";
import { H2, H1, BMiddleRegular, BodySmallestMedium } from "@/components/custom-typography";


import { SlEnvolopeLetter } from "react-icons/sl";
import { MdOutlineAppRegistration } from "react-icons/md";
import { ImGift } from "react-icons/im";
import { LuTicket } from "react-icons/lu";
import Image from 'next/image';


import { MdOutlineContentCopy } from "react-icons/md";
import { toast } from "@/hooks/use-toast";


// import X from "../../../assets/Referral/x.svg";
// import Whatsapp from "../../../assets/Referral/whatsapp.svg";
// import Instagram from "../../../assets/Referral/instagram.svg";
// import Package from '../../../assets/Referral/package.svg';

// import { getUser } from '../../../features/auth/authSlice';
// import { useSelector, useDispatch } from "react-redux";
// import { CURRENT_BASE_URL } from '../../../features/api/axios';

import { RiArrowRightSLine } from "react-icons/ri";

const breadCrumb = [
    {
        label: "Home",
        link: "/dashboard/import=",
    },
    {
        label: "Invite",
        link: "/dashboard/import/invite",
    }
];

const Referral = () => {
    const CURRENT_BASE_URL = "http://localhost:4545/"
    // const dispatch = useDispatch();
    // const user = useSelector((state) => state.auth.user);
    const referralRef = useRef(null);
    const [inputValue, setInputValue] = useState('');

    const [refValue, setRefValue] = useState(`${CURRENT_BASE_URL}/ref`);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(refValue)
            .then(() => {
                toast({
                    title: "Success",
                    description: "Copied Text",
                    variant: "default",
                });
            })
            .catch((error) => {
                console.error('Failed to copy text to clipboard: ', error);
            });
    };


    useEffect(() => {
        const handleResize = () => {
            const value = window.innerWidth > 768 ? refValue : `${CURRENT_BASE_URL}/ref/....`;
            setInputValue(value);
        };

        // Set initial value based on screen size
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [refValue]);

    // useEffect(() => {
    //     dispatch(getUser());
    // }, [dispatch]);

    // useEffect(() => {
    //     if (user && user?.referralCode) {
    //         setRefValue(`${CURRENT_BASE_URL}/ref/${user?.referralCode}`);
    //         setInputValue(`${CURRENT_BASE_URL}/ref/${user?.referralCode}`);
    //     }
    // }, [user]);

    // Ensure refValue is set to a default value if user or referralCode is null
    // useEffect(() => {
    //     if (!user || !user?.referralCode) {
    //         setRefValue(`${CURRENT_BASE_URL}/ref/${user?.referralCode}`);
    //         setInputValue(`${CURRENT_BASE_URL}/ref/${user?.referralCode}`);
    //     }
    // }, [user]);



    return (
        <div className='mt-0'>
            <CustomBreadCrumb items={breadCrumb} className="bg-gray-200 font-[500] text-primary w-fit px-5 py-1 rounded-lg" />
            <div className="my-[20px] flex lg:items-center justify-between lg:flex-row flex-col mb-[0px]">
                <H1 className="">Invite Your Friend</H1>
            </div>

            <div className="grid grid-cols-5 lg:gap-2 md:gap-2 xs:gap-1">
                <div className="md:col-span-3 xs:col-span-5 ">
                    <div className='font-medium md:text-lg xs:text-md my-5 w-full'>
                        {/* <div className="my-10 w-full">
                            <div className='text-slate-700 text-lg font-semibold w-fit z-0 relative'>Invite & Earn</div>
                        </div> */}
                        <div className='font-medium md:text-[17px] xs:text-[14px] w-full'>Refer a Business and Earn $5</div>
                        <BodySmallestMedium className='font-light w-full md:text-[13px] xs:text-xs'>
                            Share your referral Link with a business and earn <b className='font-bold'>$5</b> when they sign up & book a shipment
                        </BodySmallestMedium>
                    </div>

                    <div className='font-medium md:text-lg xs:text-md my-5 w-full'>
                        <div className='font-medium md:text-[17px] xs:text-[14px] w-full'>Share the referral Link</div>
                        <BodySmallestMedium className='font-light w-full md:text-[13px] xs:text-xs'>
                            Share the referral Link by copying or sharing before on social Media
                        </BodySmallestMedium>
                    </div>

                    <div className='font-medium md:text-lg xs:text-md w-full'>
                        <div className='font-medium md:text-[17px] xs:text-[14px] w-full my-5'>Your Referral Link</div>

                        <div className='grid md:grid-cols-5 xs:grid-cols-1 gap-4 items-center '>
                            <div className='md:col-span-3 xs:col-span-5 font-light w-full md:text-[15px] xs:text-xs'>
                                <div className="md:w-full xs:w-full">
                                    <div className="relative">
                                        <input
                                            ref={referralRef}
                                            className="indent-3 w-full rounded-md border text-gray-500 font-light outline-none text-[15px] py-3 bg-gray-200"
                                            value={'https://carttel.africa/ref/1ZA5RW6L'}
                                            // value={inputValue}
                                            readOnly
                                        />
                                        <button onClick={copyToClipboard} className="absolute md:right-0 xs:right-0 md:top-2 xs:top-2 cursor z-0 text-lg flex mr-1 w-10 h-10 justify-center text-gray-600">
                                            <MdOutlineContentCopy />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className='md:col-span-2 xs:col-span-5 my-3 flex md:px-2 xs:px-0 w-full items-center'>
                                <div className='flex mr-4'>
                                    <Image
                                        src={'/images/Referral/x.svg'}
                                        alt="logo"
                                        width={60}
                                        height={60}
                                        priority
                                        className="text-[1px] w-8 h-8"
                                    />
                                </div>
                                <div className='flex mr-4'>
                                    <Image
                                        src={'/images/Referral/whatsapp.svg'}
                                        alt="logo"
                                        width={60}
                                        height={60}
                                        priority
                                        className="text-[1px] w-8 h-8"
                                    />
                                </div>
                                <div className='flex '>
                                    <Image
                                        src={'/images/Referral/instagram.svg'}
                                        alt="logo"
                                        width={60}
                                        height={60}
                                        priority
                                        className="text-[1px] w-8 h-8"
                                    />
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className='my-20 flex md:px-5 xs:px-0 w-full justify-center items-center  '>
                        <div className='flex flex-col bg-[#f6f6f7] justify-center items-center my-8 rounded-lg xs:px-5 md:px-20'>
                            {/* <img alt="" src={Package} className="text-[1px] w-40 h-40 flex justify-center items-center" /> */}
                            <Image
                                src={'/images/Referral/package.svg'}
                                alt="logo"
                                width={60}
                                height={60}
                                priority
                                className="text-[1px] w-40 h-40 flex justify-center items-center"
                            />
                            <div className='font-medium md:text-lg xs:text-md my-5 w-full'>
                                <div className='font-semibold md:text-[17px] xs:text-[14px] w-full flex justify-center items-center'>
                                    Nothing to show for now
                                </div>
                                <div className='font-medium w-full md:text-[13px] xs:text-xs flex justify-center items-center my-5'>
                                    You have no vouchers. Check back later
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="md:col-span-2 xs:col-span-5 border-[1px] px-1 py-4 border-slate-400 h-fit ">
                    <div className='text-sm flex justify-center font-semibold'>How Referrals Works</div>
                    <ul className='font-light text-sm mt-7 w-full'>
                        <li className='my-4 flex'>
                            <div className='text-2xl mx-3'><SlEnvolopeLetter /></div>
                            <div className='ml-2'>
                                <div className='font-bold'>Send Invitation</div>
                                <div className='text-[11px] text-gray-500 mr-2'>
                                    Send your referral link to your friends and enter link into your url
                                </div>
                            </div>
                        </li>
                        <li className='my-4 flex '>
                            <div className='text-2xl mx-3'><MdOutlineAppRegistration /></div>
                            <div className='ml-2'>
                                <div className='font-bold'>Registration</div>
                                <div className='text-[11px] text-gray-500 mr-2'>
                                    Get your friend to register on CarTtel using your referral link.
                                </div>
                            </div>
                        </li>
                        <li className='my-4 flex '>
                            <div className='text-2xl mx-3'><ImGift /></div>
                            <div className='ml-2'>
                                <div className='font-bold'>Ship a package</div>
                                <div className='text-[11px] text-gray-500 mr-2'>
                                    You receive a voucher when your friend pays for a shipment.
                                </div>
                            </div>
                        </li>
                        <li className='my-4 flex '>
                            <div className='text-2xl mx-3'><LuTicket /></div>
                            <div className='ml-2'>
                                <div className='font-bold'>Redeem Voucher</div>
                                <div className='text-[11px] text-gray-500 mr-2'>
                                    You and your friend both receive $5 vouchers
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

        </div>
    )
}

export default Referral