"use client";

import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from 'next/navigation';
import {
    DashboardFilledIcon,
    DashboardIcon,
    AddressBookIcon,
    AddressBookFilledIcon,
    DropOffIcon,
    DropoffFilledIcon,
    InviteFilledIcon,
    InviteIcon,
    PickupFilledIcon,
    PickupIcon,
    PlanFilledIcon,
    PlanIcon,
    ProcurementFilledIcon,
    ProcurementIcon,
    WalletFilledIcon,
    WalletIcon,
    WarehouseFilledIcon,
    WarehouseIcon,
    ShipmentFilledIcon,
    ShipmentIcon,
    HelpFilledIcon,
    HelpIcon
} from "../custom-icons";
import { B2, BMiddle, BodySmallestMedium } from '../custom-typography';
import { CustomButton, CustomSearch } from '../custom-components';
import { primaryColor } from '@/libs/data';
import { useAuthContext } from "@/context/auth-provider";
// import { Twirl as Hamburger } from "hamburger-react";

const SIDEBAR = [
    {
        title: "",
        links: [
            {
                Icon: DashboardIcon,
                ActiveIcon: DashboardFilledIcon,
                label: "Dashboard",
                link: "/dashboard/manager",
            },
        ],
    },
    {
        title: "work",
        links: [
            {
                Icon: ShipmentIcon,
                ActiveIcon: ShipmentFilledIcon,
                label: "Shipment",
                link: "/dashboard/manager/shipment",
            },
            {
                Icon: WalletIcon,
                ActiveIcon: WalletFilledIcon,
                label: "Wallet",
                link: "/dashboard/manager/wallet",
            },
            {
                Icon: PickupIcon,
                ActiveIcon: PickupFilledIcon,
                label: "Pickup",
                link: "/dashboard/manager/pickup",
            },
        ],
    },
    {
        title: "manage",
        links: [
            {
                Icon: WarehouseIcon,
                ActiveIcon: WarehouseFilledIcon,
                label: "Warehousing",
                link: "/dashboard/manager/warehouse",
            },
            {
                Icon: DropOffIcon,
                ActiveIcon: DropoffFilledIcon,
                label: "Dropoff",
                link: "/dashboard/manager/dropoff",
            },
        ],
    },
    {
        title: "Home",
        links: [
            {
                Icon: AddressBookIcon,
                ActiveIcon: AddressBookFilledIcon,
                label: "Address Book",
                link: "/dashboard/manager/address-book",
            },
        ],
    },

];

interface IManagerDashboardWrapper {
    children: React.ReactNode;
}

export function ManagerDashboardWrapper({ children }: IManagerDashboardWrapper) {
    const [isOpen, setOpen] = useState(false);
    const [isClient, setIsClient] = useState(false);
    const path = usePathname();
    const router = useRouter();
    const { isLoading, user } = useAuthContext();


    const getCurrentPage = (link: string) => {
        if (link === '/hagul') {
            return path === link
        } else {
            return path.includes(link)
        }
    };

    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <>
            {isClient && (
                <main className="relative bg-off_white min-h-[100vh] ">
                    {/* MOBILE SIDEBAR */}
                    <nav className="bg-white flex justify-between items-center px-3 py-4 lg:hidden fixed top-0 right-0 left-0 w-full z-[999]">
                        <div className="flex items-center gap-8 ">
                            <div className="flex items-center gap-8">
                                <div className="flex items-center gap-[8px]">
                                    <Image
                                        src={"/images/man.jpeg"}
                                        alt="profile"
                                        width={48}
                                        height={48}
                                        className={`min-w-[48px] min-h-[48px] object-cover rounded-full border-[1px] border-[${primaryColor.theme}]`}
                                    />
                                </div>
                                <div className="bg-gray w-[1px] lg:h-[50px] h-10" />
                                <button>
                                    <Image
                                        src={"/images/search.svg"}
                                        alt="search"
                                        width={28}
                                        height={28}
                                    />
                                </button>
                                <button>
                                    <Image
                                        src={"/images/menu-dots.svg"}
                                        width={28}
                                        height={28}
                                        alt="menu"
                                    />
                                </button>
                                <button>
                                    <Image
                                        src={"/images/notification.svg"}
                                        width={28}
                                        height={28}
                                        alt="notification"
                                    />
                                </button>
                            </div>
                        </div>
                        {/* <div>
                            <Hamburger toggled={isOpen} toggle={setOpen} size={18} />
                        </div> */}
                        <div className="flex items-center gap-[8px]">
                            <div onClick={() => setOpen(true)}>
                                {/* <Hamburger toggled={isOpen} toggle={setOpen} size={18} /> */}
                                <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
                                    {/* <!-- Hamburger Toggle BTN --> */}

                                    <button
                                        aria-controls="sidebar"
                                        // onClick={(e) => {
                                        //   e.stopPropagation();
                                        //   setSidebarOpen(!sidebarOpen);
                                        // }}
                                        className="z-50 block rounded-sm bg-white shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
                                    >
                                        <div
                                            className="flex items-center lg:hidden rounded p-2 mr-2 text-secondary text-2xl"
                                        >
                                            <svg
                                                viewBox="64 64 896 896"
                                                focusable="false"
                                                data-icon="menu-unfold"
                                                width="1em"
                                                height="1em"
                                                fill="currentColor"
                                                aria-hidden="true"
                                            >
                                                <path d="M408 442h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm-8 204c0 4.4 3.6 8 8 8h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56zm504-486H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 632H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM142.4 642.1L298.7 519a8.84 8.84 0 000-13.9L142.4 381.9c-5.8-4.6-14.4-.5-14.4 6.9v246.3a8.9 8.9 0 0014.4 7z"></path>
                                            </svg>
                                        </div>
                                    </button>
                                    {/* <!-- Hamburger Toggle BTN --> */}
                                </div>

                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M3 7H21"
                                        stroke="#292D32"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                    />
                                    <path
                                        d="M3 12H19"
                                        stroke="#292D32"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                    />
                                    <path
                                        d="M3 17H16"
                                        stroke="#292D32"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            </div>
                        </div>

                    </nav>

                    <section
                        className={` ${isOpen ? "w-[300px] translate-x-0" : "-translate-x-full"
                            } lg:hidden transition-all ease-in-out duration-150 fixed top-0 left-0 h-full bg-white py-[37px] px-[12px] overflow-y-auto z-[60000]`}
                    >
                        <Link href={"/dashboard"}>
                            <Image
                                src={"/images/filmo-logo.png"}
                                height={21.04}
                                width={100}
                                alt="logo"
                                style={{
                                    width: "100px",
                                    height: "auto",
                                }}
                                className="ml-[24px]"
                            />
                        </Link>

                        <div className="mt-[25px] text-[0.875rem] font-[500] ">
                            {SIDEBAR.map(({ title, links }, index) => (
                                <div key={index}>
                                    <div className="px-[24px] my-[18px]">
                                        {title && (
                                            <BodySmallestMedium className="uppercase text-gray">
                                                {title}
                                            </BodySmallestMedium>
                                        )}
                                    </div>
                                    <ul>
                                        {links.map(({ Icon, ActiveIcon, label, link }, i) => {
                                            return (
                                                <li
                                                    onClick={() => {
                                                        router.push(link);
                                                        setOpen(false);
                                                    }}
                                                    key={i}
                                                    className={`mb-[5px] sidebar-item text-gray  rounded-[10px] w-[100%] hover:text-[${primaryColor.theme
                                                        }] hover:bg-[#B7383C29] h-[50px] px-[24px] flex items-center gap-[8px] ${getCurrentPage(link)
                                                            ? `sidebar-active !text-[${primaryColor.theme}] !bg-[#B7383C29] `
                                                            : ""
                                                        }`}
                                                >
                                                    <div className="item icon">
                                                        <Icon />
                                                    </div>
                                                    <div className="item active-icon">
                                                        <ActiveIcon />
                                                    </div>

                                                    {label}
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            ))}

                            <div className="ml-[24px] mt-[60px] mb-[100px]">
                                <CustomButton
                                    style={{
                                        backgroundColor: primaryColor.theme,
                                    }}
                                    className={`px-[12px] flex items-center gap-[8px] !w-[143px] !h-[44px]`}
                                >
                                    <Image
                                        src={"/images/profile-add.svg"}
                                        alt="invite"
                                        width={20}
                                        height={20}
                                    />

                                    <B2 className="text-white">Invite Team</B2>
                                </CustomButton>
                            </div>
                        </div>
                    </section>
                    {/* MOBILE SIDEBAR */}

                    {/* SIDEBAR */}
                    <section
                        className={
                            "lg:block hidden fixed top-[0] w-[251px] h-[100vh] bg-white py-[37px] px-[12px] overflow-y-auto z-[60000]"
                        }
                    >
                        <Link href={"/dashboard"}>
                            <Image
                                src={"/images/filmo-logo.png"}
                                height={21.04}
                                width={100}
                                alt="logo"
                                style={{
                                    width: "100px",
                                    height: "auto",
                                }}
                                className="ml-[24px]"
                            />
                        </Link>

                        <div className='mt-[25px] text-[0.875rem] font-[500]'>
                            {SIDEBAR.map(({ title, links }, index) => (
                                <div key={index}>
                                    <div className='px-[24px] my-[18px]'>
                                        {title && (
                                            <BodySmallestMedium className='uppercase text-gray'>
                                                {title}
                                            </BodySmallestMedium>
                                        )}
                                    </div>
                                    <ul>
                                        {links.map(({ Icon, ActiveIcon, label, link }, i) => {
                                            return (
                                                <li
                                                    onClick={() => router.push(link)}
                                                    key={i}
                                                    className={`mb-[5px] sidebar-item text-gray rounded-[10px] w-[100%] h-[50px] px-[24px] flex items-center gap-[8px] cursor-pointer ${getCurrentPage(link) ? `sidebar-active !text-[${primaryColor.theme}] !bg-[#B7383C29]` : 'hover:text-[${primaryColor.theme}] hover:bg-[#B7383C29]'}`}
                                                >
                                                    <div className='item icon'>
                                                        <Icon
                                                        />
                                                    </div>
                                                    <div className='item active-icon'>
                                                        <ActiveIcon

                                                        />
                                                    </div>


                                                    {label}
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            ))}
                            <div className='ml-[24px] mt-[60px] mb-[100px]'>
                                <CustomButton
                                    style={{ backgroundColor: primaryColor.theme }}
                                    className={`px-[12px] flex items-center gap-[8px] !w-[143px] !h-[44px]`}
                                >
                                    <Image
                                        src={'/images/profile-add.svg'}
                                        alt='invite'
                                        width={20}
                                        height={20}
                                    />
                                    <B2 className='text-white'>Invite Team</B2>
                                </CustomButton>
                            </div>
                        </div>
                    </section>

                    <section className="lg:ml-[251px]  lg:w-[calc(100vw_-_251px)] ">
                        <div className="hidden z-[5000] w-[calc(100vw_-_253px)] left-[253px]  fixed top-[0] h-[96px] px-[36px] lg:flex items-center justify-between bg-white">
                            <div className="w-[432px]">
                                <CustomSearch
                                    className="!mb-[0px] !h-[48px] text-[0.875rem]"
                                    placeholder="Start typing here to search"
                                />
                            </div>
                            <div className="flex items-center gap-[30px]">
                                <div className="flex items-center gap-[36px]">
                                    <Link href={"/dashboard/settings"}>
                                        <Image
                                            src={"/images/settings.svg"}
                                            width={32}
                                            height={32}
                                            alt="settings"
                                        />
                                    </Link>
                                    <button>
                                        <Image
                                            src={"/images/menu-dots.svg"}
                                            width={32}
                                            height={32}
                                            alt="menu"
                                        />
                                    </button>
                                    <button>
                                        <Image
                                            src={"/images/notification.svg"}
                                            width={32}
                                            height={32}
                                            alt="notification"
                                        />
                                    </button>
                                </div>

                                <div className="bg-gray w-[1px] h-[50px]" />

                                <div className="flex items-center gap-[8px]">
                                    <Image
                                        src={"/images/man.jpeg"}
                                        alt="profile"
                                        width={48}
                                        height={48}
                                        className={`min-w-[48px] min-h-[48px] object-cover rounded-full border-[1px] border-[${primaryColor.theme}]`}
                                    />

                                    <div>
                                        <BMiddle>Mo Salah</BMiddle>
                                        <BodySmallestMedium className="text-gray mt-[2px]">
                                            Facility Manager
                                        </BodySmallestMedium>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="lg:mt-[96px] lg:p-[36px] p-4 flex justify-center">
                            <div className="max-w-[1300px] w-[100%]">{children}</div>
                        </div>
                    </section>
                </main>
            )}
        </>


    );
}
