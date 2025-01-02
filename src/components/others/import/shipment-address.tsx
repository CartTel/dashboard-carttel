"use client"

import React, { useRef } from 'react';
import { MdOutlineContentCopy } from 'react-icons/md';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

import { toast } from "@/hooks/use-toast";


export default function ShipmentAddress () {
    const textRef = useRef<HTMLInputElement | null>(null);
    const countryRef = useRef<HTMLInputElement | null>(null);
    const zipRef = useRef<HTMLInputElement | null>(null);
    const phoneRef = useRef<HTMLInputElement | null>(null);
    const cityRef = useRef<HTMLInputElement | null>(null);
    const addressOneRef = useRef<HTMLInputElement | null>(null);
    const addressTwoRef = useRef<HTMLInputElement | null>(null);
    const stateRef = useRef<HTMLInputElement | null>(null);

    const copyText = (ref: React.RefObject<HTMLInputElement>) => {
        if (ref.current) {
            ref.current.select();
            document.execCommand('copy');
            //   toast.success('Copied Text', {
            //     autoClose: 2000,
            //   });

            toast({
                title: "Success",
                description: "Copied Text",
                variant: "default",
            });


        }
    };

    return (
        <div className="text-lg font-semibold w-full z-0 relative px-0">
            <div>
                <div>
                    <div className="text-gray-500 px-3 py-2 font-medium text-sm mt-3">
                        Use the information below as your shipping address when shopping online. We’ll receive and process the package in your name
                    </div>
                </div>
                <div className="px-3 py-2 font-medium text-sm mt-3 flex flex-row">
                    <div className="text-[10px] uppercase mr-2">us</div>
                    <div className="text-sm font-semibold flex justify-center items-center">USA - Houston - Texas</div>
                </div>
                <div>
                    <div className="text-gray-500 px-3 py-2 font-medium text-sm mt-3">
                        Use this address to ship your items with us from the United States.
                    </div>
                </div>
                <div className="flex md:flex-row xs:flex-col md:py-4 md:px-6 xs:py-2 xs:px-2 w-full justify-center items-center gap-5">
                    <div className="flex w-full flex-col gap-7">
                        <div className="w-full">
                            <div className="text-sm font-[400]">Full Name</div>
                            <div className="relative">
                                <input
                                    ref={textRef}
                                    className="indent-3 w-full rounded-md border text-gray-500 font-light outline-none text-[15px] py-1 bg-gray-200"
                                    value={'Folajimi Henry'}
                                    readOnly
                                />
                                <button
                                    onClick={() => copyText(textRef)}
                                    className="absolute md:right-0 xs:right-0 md:top-2 xs:top-2 cursor z-10 text-lg flex mr-1 w-10 h-10 justify-center text-gray-600"
                                >
                                    <MdOutlineContentCopy />
                                </button>
                            </div>
                        </div>

                        <div className="w-full">
                            <div className="text-sm font-[400]">Address Line 1</div>
                            <div className="relative">
                                <input
                                    ref={addressOneRef}
                                    className="indent-3 w-full rounded-md border text-gray-500 font-light outline-none text-[15px] py-1 bg-gray-200"
                                    value={'17939 Kieth Harrow Blvd'}
                                    readOnly
                                />
                                <button
                                    onClick={() => copyText(addressOneRef)}
                                    className="absolute md:right-0 xs:right-0 md:top-2 xs:top-2 cursor z-10 text-lg flex mr-1 w-10 h-10 justify-center text-gray-600"
                                >
                                    <MdOutlineContentCopy />
                                </button>
                            </div>
                        </div>

                        <div className="w-full">
                            <div className="text-sm font-[400]">Address Line 2</div>
                            <div className="relative">
                                <input
                                    ref={addressTwoRef}
                                    className="indent-3 w-full rounded-md border text-gray-500 font-light outline-none text-[15px] py-1 bg-gray-200"
                                    value={'Suite 106'}
                                    readOnly
                                />
                                <button
                                    onClick={() => copyText(addressTwoRef)}
                                    className="absolute md:right-0 xs:right-0 md:top-2 xs:top-2 cursor z-10 text-lg flex mr-1 w-10 h-10 justify-center text-gray-600"
                                >
                                    <MdOutlineContentCopy />
                                </button>
                            </div>
                        </div>

                        <div className="w-full">
                            <div className="text-sm font-[400]">City</div>
                            <div className="relative">
                                <input
                                    ref={cityRef}
                                    className="indent-3 w-full rounded-md border text-gray-500 font-light outline-none text-[15px] py-1 bg-gray-200"
                                    value={'Houston'}
                                    readOnly
                                />
                                <button
                                    onClick={() => copyText(cityRef)}
                                    className="absolute md:right-0 xs:right-0 md:top-2 xs:top-2 cursor z-10 text-lg flex mr-1 w-10 h-10 justify-center text-gray-600"
                                >
                                    <MdOutlineContentCopy />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="flex w-full flex-col gap-7">
                        <div className="w-full">
                            <div className="text-sm font-[400]">Phone Number</div>
                            <div className="relative">
                                <input
                                    ref={phoneRef}
                                    className="indent-3 w-full rounded-md border text-gray-500 font-light outline-none text-[15px] py-1 bg-gray-200"
                                    value={'+1-832-220-3511'}
                                    readOnly
                                />
                                <button
                                    onClick={() => copyText(phoneRef)}
                                    className="absolute md:right-0 xs:right-0 md:top-2 xs:top-2 cursor z-10 text-lg flex mr-1 w-10 h-10 justify-center text-gray-600"
                                >
                                    <MdOutlineContentCopy />
                                </button>
                            </div>
                        </div>

                        <div className="w-full">
                            <div className="text-sm font-[400]">ZIP</div>
                            <div className="relative">
                                <input
                                    ref={zipRef}
                                    className="indent-3 w-full rounded-md border text-gray-500 font-light outline-none text-[15px] py-1 bg-gray-200"
                                    value={'77084-5724'}
                                    readOnly
                                />
                                <button
                                    onClick={() => copyText(zipRef)}
                                    className="absolute md:right-0 xs:right-0 md:top-2 xs:top-2 cursor z-10 text-lg flex mr-1 w-10 h-10 justify-center text-gray-600"
                                >
                                    <MdOutlineContentCopy />
                                </button>
                            </div>
                        </div>

                        <div className="w-full">
                            <div className="text-sm font-[400]">Country</div>
                            <div className="relative">
                                <input
                                    ref={countryRef}
                                    className="indent-3 w-full rounded-md border text-gray-500 font-light outline-none text-[15px] py-1 bg-gray-200"
                                    value={'United States'}
                                    readOnly
                                />
                                <button
                                    onClick={() => copyText(countryRef)}
                                    className="absolute md:right-0 xs:right-0 md:top-2 xs:top-2 cursor z-10 text-lg flex mr-1 w-10 h-10 justify-center text-gray-600"
                                >
                                    <MdOutlineContentCopy />
                                </button>
                            </div>
                        </div>

                        <div className="w-full">
                            <div className="text-sm font-[400]">State/Province/Region</div>
                            <div className="relative">
                                <input
                                    ref={stateRef}
                                    className="indent-3 w-full rounded-md border text-gray-500 font-light outline-none text-[15px] py-1 bg-gray-200"
                                    value={'Texas (TX)'}
                                    readOnly
                                />
                                <button
                                    onClick={() => copyText(stateRef)}
                                    className="absolute md:right-0 xs:right-0 md:top-2 xs:top-2 cursor z-10 text-lg flex mr-1 w-10 h-10 justify-center text-gray-600"
                                >
                                    <MdOutlineContentCopy />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

