import React from 'react';
import Link from 'next/link';
import { B1, H2, B2 } from "@/components/custom-typography";

import Image from 'next/image'



export default function Resources () {
    return (
        <div className="my-20">
            <B1 className='text-slate-700 text-center'>Helpful resources</B1>
            <div className="grid md:grid-cols-1 xs:grid-cols-1 gap-4 mt-5">
                <div className="rounded-lg border border-gray-100 bg-[#f9f9f9] flex justify-center items-center">
                    <div className="p-1">
                        <div className="card-body grid grid-cols-1 gap-7">
                            <div className="flex flex-row items-center h-full">
                                <div className="flex">
                                    <div className='flex md:flex-row xs:flex-col'>
                                        <div className="mt-1 flex item-center justify-center font-semibold mr-4 mb-2 text-slate-500">

                                            <Image
                                                src={'/images/Assets/shipping.svg'}
                                                alt="logo"
                                                width={40}
                                                height={40}
                                                priority
                                                className={`text-[1px] w-72 h-72`}
                                            />
                                        </div>
                                        <div className='flex flex-col justify-center'>
                                            <h3 className="mt-1 flex text-secondary text-sm mb-0 font-[600]">
                                                <div className='font-semibold'>Give the gift of free shipping, get $5</div>
                                            </h3>
                                            <h3 className="mt-4 flex text-gray-500 text-xs mb-0 font-[300]">
                                                <div className='font-[400]'>Earn up to $5 per referral when you invite <br /> your friend(s) to ship through CartTel.</div>
                                            </h3>
                                            <Link
                                                href='/dashboard/import/invite'
                                                className="bg-[#fbc41d] rounded-lg mt-7 text-sm font-[500] px-2 py-3 text-center text-primary"
                                            >
                                                Learn More
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid md:grid-cols-2 xs:grid-cols-1 gap-4 mt-5">
                <div className="rounded-lg border-none bg-white flex justify-center items-center">
                    <div className="p-5">
                        <div className="card-body grid grid-cols-1 gap-7">
                            <div className="flex flex-row items-center h-full">
                                <div className="flex">
                                    <div className='flex flex-col'>
                                        <div className="mt-1 flex item-center justify-center font-semibold mr-6 mb-2 text-slate-500 text-xl">

                                            <Image
                                                src={'/images/Assets/location.svg'}
                                                alt="logo"
                                                width={40}
                                                height={40}
                                                priority
                                                className={`text-[1px] w-60 h-60`}
                                            />
                                        </div>
                                        <div className='flex flex-col'>
                                            <h3 className="mt-1 flex text-secondary text-sm mb-0 font-[600]">
                                                <div className='font-semibold'>How to use your CartTel address</div>
                                            </h3>
                                            <h3 className="mt-4 flex text-gray-500 text-xs mb-0 font-[300] w-full">
                                                <div className='font-[400]'>Check out from online stores and get <br /> your items delivered to your CartTel address</div>
                                            </h3>
                                            <Link
                                                href='/dashboard/import/address-book'
                                                className="text-primary mt-7 text-sm font-[400] text-start mr-auto rounded-lg border-[1px] w-fit px-4 py-2 border-primary"
                                            >
                                                Learn More
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="rounded-lg border-none bg-white flex justify-center items-center">
                    <div className="p-5">
                        <div className="card-body grid grid-cols-1 gap-7">
                            <div className="flex flex-row items-center h-full">
                                <div className="flex">
                                    <div className='flex flex-col'>
                                        <div className="mt-1 flex item-center justify-center font-semibold mr-6 mb-2 text-slate-500 text-xl">

                                            <Image
                                                src={'/images/Assets/faqs.svg'}
                                                alt="logo"
                                                width={40}
                                                height={40}
                                                priority
                                                className={`text-[1px] w-60 h-60`}
                                            />

                                        </div>
                                        <div className='flex flex-col'>
                                            <h3 className="mt-1 flex text-secondary text-sm mb-0 font-[600]">
                                                <div className='font-semibold text-end ml-auto'>Frequently asked questions</div>
                                            </h3>
                                            <h3 className="mt-4 flex text-gray-500 text-xs mb-0 font-[300] text-end ml-auto">
                                                <div className='font-[400]'>Get answers to questions people commonly <br /> ask at CartTel</div>
                                            </h3>
                                        </div>
                                        <Link
                                            href='/dashboard/import/faqs'
                                            className="text-primary mt-7 text-sm font-[400] text-end ml-auto rounded-lg border-[1px] w-fit px-4 py-2 border-primary"
                                        >
                                            Learn More
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

