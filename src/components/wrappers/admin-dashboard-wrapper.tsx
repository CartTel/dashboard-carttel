"use client";

import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect, useRef } from "react";
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
  HelpIcon, 
  ReportsFilledIcon,
  ReportsIcon,
  UsersFilledIcon,
  UsersIcon
} from "../custom-icons";
import { B2, BMiddle, BodySmallestMedium, B1 } from '../custom-typography';
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
        link: "/dashboard/admin",
      },
    ],
  },
  {
    title: "Main Menu",
    links: [
      {
        Icon: ShipmentIcon,
        ActiveIcon: ShipmentFilledIcon,
        label: "Shipment",
        link: "/dashboard/admin/shipment",
      },
      {
        Icon: WalletIcon,
        ActiveIcon: WalletFilledIcon,
        label: "Wallet & Transactions",
        link: "/dashboard/admin/wallet",
      },
      {
        Icon: PickupIcon,
        ActiveIcon: PickupFilledIcon,
        label: "Pickups",
        link: "/dashboard/admin/pickup",
      },
    ],
  },
  {
    title: "Logistics",
    links: [
      {
        Icon: WarehouseIcon,
        ActiveIcon: WarehouseFilledIcon,
        label: "Warehousing",
        link: "/dashboard/admin/warehouse",
      },
      {
        Icon: DropOffIcon,
        ActiveIcon: DropoffFilledIcon,
        label: "Dropoff",
        link: "/dashboard/admin/dropoff",
      },
      {
        Icon: ProcurementIcon,
        ActiveIcon: ProcurementFilledIcon,
        label: "Procurement",
        link: "/dashboard/admin/procurement",
      },
      {
        Icon: AddressBookIcon,
        ActiveIcon: AddressBookFilledIcon,
        label: "Address Book",
        link: "/dashboard/admin/address-book",
      },
    ],
  },
  {
    title: "Analytics",
    links: [

      {
        Icon: PlanIcon,
        ActiveIcon: PlanFilledIcon,
        label: "Plans",
        link: "/dashboard/admin/plan",
      },
      {
        Icon: ReportsIcon,
        ActiveIcon: ReportsFilledIcon,
        label: "Reports & Analytics",
        link: "/dashboard/admin/reports",
      },
      {
        Icon: UsersIcon,
        ActiveIcon: UsersFilledIcon,
        label: "Users",
        link: "/dashboard/admin/users",
      },
    ],
    
  },
];

interface IAdminDashboardWrapper {
  children: React.ReactNode;
}

export function AdminDashboardWrapper({ children }: IAdminDashboardWrapper) {
  const [isOpen, setOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const path = usePathname();
  const router = useRouter();
  const { isLoading, user } = useAuthContext();
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  const dropdown = useRef<HTMLDivElement | null>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);


  const getCurrentPage = (link: string) => {
    if (link === '/dashboard/admin') {
      return path === link
    } else {
      return path.includes(link)
    }
  };

  useEffect(() => {
    // console.log("all the user..", user);
    setIsClient(true);
  }, [user]);

  // Handle click events
  useEffect(() => {
    const clickHandler = (event: MouseEvent) => {
      const target = event.target as HTMLElement; // Type the target as HTMLElement
      if (!dropdown.current) return;

      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        (trigger.current && trigger.current.contains(target))
      ) {
        return;
      }

      setDropdownOpen(false);
    };

    document.addEventListener('click', clickHandler);
    return () => {
      document.removeEventListener('click', clickHandler);
    };
  }, [dropdownOpen]); // Add dependency on dropdownOpen

  // Handle keydown events
  useEffect(() => {
    const keyHandler = (event: KeyboardEvent) => {
      if (!dropdownOpen || event.key !== 'Escape') return; // Use 'Escape' instead of keyCode
      setDropdownOpen(false);
    };

    document.addEventListener('keydown', keyHandler);
    return () => {
      document.removeEventListener('keydown', keyHandler);
    };
  }, [dropdownOpen]);

  return (
    <>
      {isClient && (
        <main className="relative bg-off_white min-h-[100vh] ">
          {/* MOBILE SIDEBAR */}
          <nav className="bg-white flex flex-row-reverse justify-between items-center border-[1px] border-b-gray-100 shadow-md px-3 py-2 lg:hidden fixed top-0 right-0 left-0 w-full z-[20]">
            <div className="flex items-center gap-8 ">
              <div className="flex items-center gap-8">
                {/* <div className="flex items-center gap-[8px]">
                                    <Image
                                        src={"/images/man.jpeg"}
                                        alt="profile"
                                        width={48}
                                        height={48}
                                        className={`min-w-[48px] min-h-[48px] object-cover rounded-full border-[1px] border-[${primaryColor.theme}]`}
                                    />
                                </div>
                                <div className="bg-gray w-[1px] lg:h-[50px] h-10" /> */}

                <div className='relative '>
                  <button>
                    <Image
                      src={"/images/home/notification.svg"}
                      width={32}
                      height={32}
                      alt="notification"
                    />
                    <div className='rounded-full h-[10px] w-[10px] bg-red-600 top-0 absolute left-4 text-white p-[10px] flex justify-center items-center'>
                      <span className='text-white text-[10px] px-[2px] py-[2px]'>5</span>
                    </div>
                  </button>

                </div>
              </div>

              <Link
                href={"/dashboard/admin"}
                // ref={trigger}
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-4 "
              // to="#"
              >
                <span className="h-12 w-12 rounded-full flex items-center">
                  {
                    !user?.photo ? (
                      //   <img src={user?.photo} className='h-10 w-10 object-cover rounded-full' alt="User" />
                      <Image
                        src={"/images/Home/man.svg"}
                        alt="profile"
                        width={20}
                        height={20}
                        className={`min-w-[36px] min-h-[36px] object-cover rounded-full border-[1px] border-gray-600`}
                      />
                    ) : (
                      //   <img src={user?.photo?.secure_url} className='h-10 w-10 object-cover rounded-full' alt="User" />
                      <Image
                        src={"/images/Home/man.svg"}
                        alt="profile"
                        width={20}
                        height={20}
                        className={`min-w-[48px] min-h-[48px] object-cover rounded-full border-[1px] border-[${primaryColor.theme}]`}
                      />

                    )
                  }
                </span>

                <span className="hidden text-right lg:block">
                  <span className="block text-sm font-medium text-black dark:text-white">
                    {user?.firstname} {user?.lastname}
                  </span>
                  <span className="block text-xs">Business</span>
                </span>


                <svg
                  className={`hidden fill-current sm:block ${dropdownOpen ? 'rotate-180' : ''
                    }`}
                  width="12"
                  height="8"
                  viewBox="0 0 12 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0.410765 0.910734C0.736202 0.585297 1.26384 0.585297 1.58928 0.910734L6.00002 5.32148L10.4108 0.910734C10.7362 0.585297 11.2638 0.585297 11.5893 0.910734C11.9147 1.23617 11.9147 1.76381 11.5893 2.08924L6.58928 7.08924C6.26384 7.41468 5.7362 7.41468 5.41077 7.08924L0.410765 2.08924C0.0853277 1.76381 0.0853277 1.23617 0.410765 0.910734Z"
                    fill=""
                  />
                </svg>
              </Link>

              <div
                ref={dropdown}
                onFocus={() => setDropdownOpen(true)}
                onClick={() => setDropdownOpen(!dropdownOpen)}
                onBlur={() => setDropdownOpen(false)}
                className={`md:w-fit xs:w-fit absolute right-2 mt-48 flex flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark  ${dropdownOpen === true ? 'block' : 'hidden'
                  }`}
              >
                <ul className="w-fit flex flex-col gap-5 border-b border-stroke px-2 py-2 dark:border-strokedark">
                  <li className=''>
                    <Link
                      href="/dashboard/admin/profile"
                      className="pt-3 flex items-center gap-3 text-xs font-medium duration-300 ease-in-out hover:text-primary lg:text-md w-full"
                    >
                      <div className='text-xs'>

                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12.1596 10.87C12.0596 10.86 11.9396 10.86 11.8296 10.87C9.44957 10.79 7.55957 8.84 7.55957 6.44C7.55957 3.99 9.53957 2 11.9996 2C14.4496 2 16.4396 3.99 16.4396 6.44C16.4296 8.84 14.5396 10.79 12.1596 10.87Z" stroke="#292D32" strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round" />
                          <path d="M7.15973 14.56C4.73973 16.18 4.73973 18.82 7.15973 20.43C9.90973 22.27 14.4197 22.27 17.1697 20.43C19.5897 18.81 19.5897 16.17 17.1697 14.56C14.4297 12.73 9.91973 12.73 7.15973 14.56Z" stroke="#292D32" strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round" />
                        </svg>
                      </div>
                      <div className='w-full whitespace-nowrap'>My Profile</div>
                      {/* My Profile */}
                    </Link>
                  </li>
                  <li className='w-full'>
                    <Link
                      href="/dashboard/admin/settings"
                      className="w-full flex items-center gap-3 text-xs font-medium duration-300 ease-in-out hover:text-primary lg:text-md"
                    >

                      <div className='text-xs'>

                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 15.75C9.93 15.75 8.25 14.07 8.25 12C8.25 9.93 9.93 8.25 12 8.25C14.07 8.25 15.75 9.93 15.75 12C15.75 14.07 14.07 15.75 12 15.75ZM12 9.75C10.76 9.75 9.75 10.76 9.75 12C9.75 13.24 10.76 14.25 12 14.25C13.24 14.25 14.25 13.24 14.25 12C14.25 10.76 13.24 9.75 12 9.75Z" fill="#292D32" />
                          <path d="M15.21 22.1898C15 22.1898 14.79 22.1598 14.58 22.1098C13.96 21.9398 13.44 21.5498 13.11 20.9998L12.99 20.7998C12.4 19.7798 11.59 19.7798 11 20.7998L10.89 20.9898C10.56 21.5498 10.04 21.9498 9.42 22.1098C8.79 22.2798 8.14 22.1898 7.59 21.8598L5.87 20.8698C5.26 20.5198 4.82 19.9498 4.63 19.2598C4.45 18.5698 4.54 17.8598 4.89 17.2498C5.18 16.7398 5.26 16.2798 5.09 15.9898C4.92 15.6998 4.49 15.5298 3.9 15.5298C2.44 15.5298 1.25 14.3398 1.25 12.8798V11.1198C1.25 9.6598 2.44 8.4698 3.9 8.4698C4.49 8.4698 4.92 8.2998 5.09 8.0098C5.26 7.7198 5.19 7.2598 4.89 6.7498C4.54 6.1398 4.45 5.4198 4.63 4.7398C4.81 4.0498 5.25 3.4798 5.87 3.1298L7.6 2.1398C8.73 1.4698 10.22 1.8598 10.9 3.0098L11.02 3.2098C11.61 4.2298 12.42 4.2298 13.01 3.2098L13.12 3.0198C13.8 1.8598 15.29 1.4698 16.43 2.1498L18.15 3.1398C18.76 3.4898 19.2 4.0598 19.39 4.7498C19.57 5.4398 19.48 6.1498 19.13 6.7598C18.84 7.2698 18.76 7.7298 18.93 8.0198C19.1 8.3098 19.53 8.4798 20.12 8.4798C21.58 8.4798 22.77 9.6698 22.77 11.1298V12.8898C22.77 14.3498 21.58 15.5398 20.12 15.5398C19.53 15.5398 19.1 15.7098 18.93 15.9998C18.76 16.2898 18.83 16.7498 19.13 17.2598C19.48 17.8698 19.58 18.5898 19.39 19.2698C19.21 19.9598 18.77 20.5298 18.15 20.8798L16.42 21.8698C16.04 22.0798 15.63 22.1898 15.21 22.1898ZM12 18.4898C12.89 18.4898 13.72 19.0498 14.29 20.0398L14.4 20.2298C14.52 20.4398 14.72 20.5898 14.96 20.6498C15.2 20.7098 15.44 20.6798 15.64 20.5598L17.37 19.5598C17.63 19.4098 17.83 19.1598 17.91 18.8598C17.99 18.5598 17.95 18.2498 17.8 17.9898C17.23 17.0098 17.16 15.9998 17.6 15.2298C18.04 14.4598 18.95 14.0198 20.09 14.0198C20.73 14.0198 21.24 13.5098 21.24 12.8698V11.1098C21.24 10.4798 20.73 9.9598 20.09 9.9598C18.95 9.9598 18.04 9.5198 17.6 8.7498C17.16 7.9798 17.23 6.9698 17.8 5.9898C17.95 5.7298 17.99 5.4198 17.91 5.1198C17.83 4.8198 17.64 4.5798 17.38 4.4198L15.65 3.4298C15.22 3.1698 14.65 3.3198 14.39 3.7598L14.28 3.9498C13.71 4.9398 12.88 5.4998 11.99 5.4998C11.1 5.4998 10.27 4.9398 9.7 3.9498L9.59 3.7498C9.34 3.3298 8.78 3.1798 8.35 3.4298L6.62 4.4298C6.36 4.5798 6.16 4.8298 6.08 5.1298C6 5.4298 6.04 5.7398 6.19 5.9998C6.76 6.9798 6.83 7.9898 6.39 8.7598C5.95 9.5298 5.04 9.9698 3.9 9.9698C3.26 9.9698 2.75 10.4798 2.75 11.1198V12.8798C2.75 13.5098 3.26 14.0298 3.9 14.0298C5.04 14.0298 5.95 14.4698 6.39 15.2398C6.83 16.0098 6.76 17.0198 6.19 17.9998C6.04 18.2598 6 18.5698 6.08 18.8698C6.16 19.1698 6.35 19.4098 6.61 19.5698L8.34 20.5598C8.55 20.6898 8.8 20.7198 9.03 20.6598C9.27 20.5998 9.47 20.4398 9.6 20.2298L9.71 20.0398C10.28 19.0598 11.11 18.4898 12 18.4898Z" fill="#292D32" />
                        </svg>
                      </div>
                      <div className='w-full whitespace-nowrap'>Advanced Settings</div>
                    </Link>
                  </li>
                </ul>

                <button
                  //   onClick={handleClickUser}
                  className="w-fit flex items-center gap-3 py-2 px-2 text-xs font-[500] duration-300 ease-in-out hover:text-primary lg:text-md"
                >
                  <div className='text-xs'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M15.2395 22.27H15.1095C10.6695 22.27 8.52953 20.52 8.15953 16.6C8.11953 16.19 8.41953 15.82 8.83953 15.78C9.23953 15.74 9.61953 16.05 9.65953 16.46C9.94953 19.6 11.4295 20.77 15.1195 20.77H15.2495C19.3195 20.77 20.7595 19.33 20.7595 15.26V8.73998C20.7595 4.66998 19.3195 3.22998 15.2495 3.22998H15.1195C11.4095 3.22998 9.92953 4.41998 9.65953 7.61998C9.60953 8.02998 9.25953 8.33998 8.83953 8.29998C8.41953 8.26998 8.11953 7.89998 8.14953 7.48998C8.48953 3.50998 10.6395 1.72998 15.1095 1.72998H15.2395C20.1495 1.72998 22.2495 3.82998 22.2495 8.73998V15.26C22.2495 20.17 20.1495 22.27 15.2395 22.27Z" fill="#292D32" />
                      <path d="M15.0001 12.75H3.62012C3.21012 12.75 2.87012 12.41 2.87012 12C2.87012 11.59 3.21012 11.25 3.62012 11.25H15.0001C15.4101 11.25 15.7501 11.59 15.7501 12C15.7501 12.41 15.4101 12.75 15.0001 12.75Z" fill="#292D32" />
                      <path d="M5.85043 16.1001C5.66043 16.1001 5.47043 16.0301 5.32043 15.8801L1.97043 12.5301C1.68043 12.2401 1.68043 11.7601 1.97043 11.4701L5.32043 8.12009C5.61043 7.83009 6.09043 7.83009 6.38043 8.12009C6.67043 8.41009 6.67043 8.89009 6.38043 9.18009L3.56043 12.0001L6.38043 14.8201C6.67043 15.1101 6.67043 15.5901 6.38043 15.8801C6.24043 16.0301 6.04043 16.1001 5.85043 16.1001Z" fill="#292D32" />
                    </svg>
                  </div>

                  <div className='w-full whitespace-nowrap'>Log Out</div>
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

                {/* <svg
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
                                </svg> */}
              </div>
            </div>

          </nav>

          {isOpen && (
            <div
              className="fixed inset-0 bg-black opacity-50 z-[59999] w-full h-full overflow-y-auto left-0 top-0  min-h-screen"
              onClick={() => setOpen(false)}
            ></div>
          )}

          <section
            className={` ${isOpen ? "w-[280px] translate-x-0" : "-translate-x-full"
              } lg:hidden transition-all border-[1px] border-r-gray-300 duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 fixed top-0 left-0 h-full bg-white py-[37px] px-[12px] overflow-y-auto z-[60000]`}
          >
            <Link href={"/dashboard/admin"}>
              <div className=''>
                <Image
                  src={'/images/Logo/cartTel.svg'}
                  height={100}
                  width={100}
                  alt="logo"
                  // style={{
                  //     width: "100px",
                  //     height: "auto",
                  // }}
                  className="text-[1px] w-fit h-fit"
                />

              </div>
            </Link>

            <div className="mt-[25px] text-[0.875rem] font-[500] ">
              {SIDEBAR.map(({ title, links }, index) => (
                <div key={index}>
                  <div className="px-[24px] my-[18px]">
                    {title && (
                      <BodySmallestMedium className="uppercase text-primary">
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
                          className={`mb-[5px] sidebar-item text-gray-500  rounded-[10px] w-[100%] hover:text-[#1d4188] hover:bg-[#fcd25e] h-[50px] px-[24px] flex items-center gap-[8px] ${getCurrentPage(link)
                            ? `sidebar-active !text-[#1d4188] !bg-[#fcd25e] `
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

              {/* <div className="ml-[24px] mt-[60px] mb-[100px]">
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
                            </div> */}
            </div>
          </section>
          {/* MOBILE SIDEBAR */}

          {/* SIDEBAR */}
          <section
            className={
              "lg:block hidden fixed top-[0] w-[251px] h-[100vh] bg-white border-r-[1px] border-gray-100 shadow-md py-[37px] px-[12px] overflow-y-auto z-[60000]"
            }
          >
            <Link href={"/dashboard/admin"}>
              <div className=''>
                <Image
                  src={'/images/Logo/cartTel.svg'}
                  height={100}
                  width={100}
                  alt="logo"
                  className="text-[1px] w-fit h-fit"
                />

              </div>
            </Link>

            <div className='mt-[25px] text-[0.875rem] font-[500]'>
              {SIDEBAR.map(({ title, links }, index) => (
                <div key={index}>
                  <div className='px-[24px] my-[18px]'>
                    {title && (
                      <BodySmallestMedium className='uppercase text-primary'>
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
                          className={`mb-[5px] sidebar-item text-gray-500 rounded-[10px] w-[100%] h-[50px] px-[24px] flex items-center gap-[8px] cursor-pointer ${getCurrentPage(link) ? `sidebar-active !text-[#1d4188] !bg-[#fcd25e]` : `hover:text-[#1d4188] hover:bg-[#fcd25e]`}`}
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
              {/* <div className='ml-[24px] mt-[60px] mb-[100px]'>
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
                            </div> */}
            </div>
          </section>

          <section className="lg:ml-[251px]  lg:w-[calc(100vw_-_251px)] ">
            <div className="hidden z-[5000] w-[calc(100vw_-_253px)] left-[253px]  fixed top-[0] h-[80px] px-[36px] lg:flex items-center justify-between bg-white shadow-md">
              <div className="w-[432px]">
                {/* <CustomSearch
                                    className="!mb-[0px] !h-[48px] text-[0.875rem]"
                                    placeholder="Start typing here to search"
                                /> */}
                {/* <B2></B2> */}
                <B1 className='uppercase text-primary'>
                  Welcome Back, {user.firstname}
                </B1>
              </div>
              <div className="flex items-center gap-[30px]">
                <div className="flex items-center gap-[36px]">
                  <div className='relative '>
                    <button>
                      <Image
                        src={"/images/home/notification.svg"}
                        width={32}
                        height={32}
                        alt="notification"
                      />
                      <div className='rounded-full h-[10px] w-[10px] bg-red-600 top-0 absolute left-4 text-white p-[10px] flex justify-center items-center'>
                        <span className='text-white text-[10px] px-[2px] py-[2px]'>5</span>
                      </div>
                    </button>

                  </div>
                </div>

                {/* <div className="bg-gray w-[1px] h-[50px]" /> */}

                {/* <div className="flex items-center gap-[8px]">
                                    <Image
                                        src={"/images/Home/man.svg"}
                                        alt="profile"
                                        width={48}
                                        height={48}
                                        className={`min-w-[48px] min-h-[48px] object-cover rounded-full border-[1px] border-[${primaryColor.theme}]`}
                                    />

                                    <span className="hidden text-right lg:block">
                                        <BMiddle className="block text-sm font-medium text-black dark:text-white">
                                            {user?.firstname} {user?.lastname}
                                        </BMiddle>
                                        <BodySmallestMedium className="block text-xs">Business</BodySmallestMedium>
                                    </span>
                                </div> */}

                <Link
                  href={"/dashboard/admin"}
                  // ref={trigger}
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-4 "
                // to="#"
                >
                  <span className="h-12 w-12 rounded-full flex items-center">
                    {
                      !user?.photo ? (
                        //   <img src={user?.photo} className='h-10 w-10 object-cover rounded-full' alt="User" />
                        <Image
                          src={"/images/Home/man.svg"}
                          alt="profile"
                          width={20}
                          height={20}
                          className={`min-w-[36px] min-h-[36px] object-cover rounded-full border-[1px] border-gray-600`}
                        />
                      ) : (
                        //   <img src={user?.photo?.secure_url} className='h-10 w-10 object-cover rounded-full' alt="User" />
                        <Image
                          src={"/images/Home/man.svg"}
                          alt="profile"
                          width={20}
                          height={20}
                          className={`min-w-[48px] min-h-[48px] object-cover rounded-full border-[1px] border-[${primaryColor.theme}]`}
                        />

                      )
                    }
                  </span>

                  <span className="hidden text-right lg:block">
                    <span className="block text-sm font-medium text-black dark:text-white">
                      {user?.firstname} {user?.lastname}
                    </span>
                    <span className="block text-xs">Business</span>
                  </span>


                  <svg
                    className={`hidden fill-current sm:block ${dropdownOpen ? 'rotate-180' : ''
                      }`}
                    width="12"
                    height="8"
                    viewBox="0 0 12 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M0.410765 0.910734C0.736202 0.585297 1.26384 0.585297 1.58928 0.910734L6.00002 5.32148L10.4108 0.910734C10.7362 0.585297 11.2638 0.585297 11.5893 0.910734C11.9147 1.23617 11.9147 1.76381 11.5893 2.08924L6.58928 7.08924C6.26384 7.41468 5.7362 7.41468 5.41077 7.08924L0.410765 2.08924C0.0853277 1.76381 0.0853277 1.23617 0.410765 0.910734Z"
                      fill=""
                    />
                  </svg>
                </Link>

                <div
                  ref={dropdown}
                  onFocus={() => setDropdownOpen(true)}
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  onBlur={() => setDropdownOpen(false)}
                  className={`md:w-fit xs:w-fit absolute right-4 mt-48 flex flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark  ${dropdownOpen === true ? 'block' : 'hidden'
                    }`}
                >
                  <ul className="w-fit flex flex-col gap-5 border-b border-stroke px-2 py-2 dark:border-strokedark">
                    <li className=''>
                      <Link
                        href="/dashboard/admin/profile"
                        className="pt-3 flex items-center gap-3 text-xs font-medium duration-300 ease-in-out hover:text-primary lg:text-md w-full"
                      >
                        <div className='text-xs'>

                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.1596 10.87C12.0596 10.86 11.9396 10.86 11.8296 10.87C9.44957 10.79 7.55957 8.84 7.55957 6.44C7.55957 3.99 9.53957 2 11.9996 2C14.4496 2 16.4396 3.99 16.4396 6.44C16.4296 8.84 14.5396 10.79 12.1596 10.87Z" stroke="#292D32" strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round" />
                            <path d="M7.15973 14.56C4.73973 16.18 4.73973 18.82 7.15973 20.43C9.90973 22.27 14.4197 22.27 17.1697 20.43C19.5897 18.81 19.5897 16.17 17.1697 14.56C14.4297 12.73 9.91973 12.73 7.15973 14.56Z" stroke="#292D32" strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round" />
                          </svg>
                        </div>
                        <div className='w-full whitespace-nowrap'>My Profile</div>
                        {/* My Profile */}
                      </Link>
                    </li>
                    <li className='w-full'>
                      <Link
                        href="/dashboard/admin/settings"
                        className="w-full flex items-center gap-3 text-xs font-medium duration-300 ease-in-out hover:text-primary lg:text-md"
                      >

                        <div className='text-xs'>

                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 15.75C9.93 15.75 8.25 14.07 8.25 12C8.25 9.93 9.93 8.25 12 8.25C14.07 8.25 15.75 9.93 15.75 12C15.75 14.07 14.07 15.75 12 15.75ZM12 9.75C10.76 9.75 9.75 10.76 9.75 12C9.75 13.24 10.76 14.25 12 14.25C13.24 14.25 14.25 13.24 14.25 12C14.25 10.76 13.24 9.75 12 9.75Z" fill="#292D32" />
                            <path d="M15.21 22.1898C15 22.1898 14.79 22.1598 14.58 22.1098C13.96 21.9398 13.44 21.5498 13.11 20.9998L12.99 20.7998C12.4 19.7798 11.59 19.7798 11 20.7998L10.89 20.9898C10.56 21.5498 10.04 21.9498 9.42 22.1098C8.79 22.2798 8.14 22.1898 7.59 21.8598L5.87 20.8698C5.26 20.5198 4.82 19.9498 4.63 19.2598C4.45 18.5698 4.54 17.8598 4.89 17.2498C5.18 16.7398 5.26 16.2798 5.09 15.9898C4.92 15.6998 4.49 15.5298 3.9 15.5298C2.44 15.5298 1.25 14.3398 1.25 12.8798V11.1198C1.25 9.6598 2.44 8.4698 3.9 8.4698C4.49 8.4698 4.92 8.2998 5.09 8.0098C5.26 7.7198 5.19 7.2598 4.89 6.7498C4.54 6.1398 4.45 5.4198 4.63 4.7398C4.81 4.0498 5.25 3.4798 5.87 3.1298L7.6 2.1398C8.73 1.4698 10.22 1.8598 10.9 3.0098L11.02 3.2098C11.61 4.2298 12.42 4.2298 13.01 3.2098L13.12 3.0198C13.8 1.8598 15.29 1.4698 16.43 2.1498L18.15 3.1398C18.76 3.4898 19.2 4.0598 19.39 4.7498C19.57 5.4398 19.48 6.1498 19.13 6.7598C18.84 7.2698 18.76 7.7298 18.93 8.0198C19.1 8.3098 19.53 8.4798 20.12 8.4798C21.58 8.4798 22.77 9.6698 22.77 11.1298V12.8898C22.77 14.3498 21.58 15.5398 20.12 15.5398C19.53 15.5398 19.1 15.7098 18.93 15.9998C18.76 16.2898 18.83 16.7498 19.13 17.2598C19.48 17.8698 19.58 18.5898 19.39 19.2698C19.21 19.9598 18.77 20.5298 18.15 20.8798L16.42 21.8698C16.04 22.0798 15.63 22.1898 15.21 22.1898ZM12 18.4898C12.89 18.4898 13.72 19.0498 14.29 20.0398L14.4 20.2298C14.52 20.4398 14.72 20.5898 14.96 20.6498C15.2 20.7098 15.44 20.6798 15.64 20.5598L17.37 19.5598C17.63 19.4098 17.83 19.1598 17.91 18.8598C17.99 18.5598 17.95 18.2498 17.8 17.9898C17.23 17.0098 17.16 15.9998 17.6 15.2298C18.04 14.4598 18.95 14.0198 20.09 14.0198C20.73 14.0198 21.24 13.5098 21.24 12.8698V11.1098C21.24 10.4798 20.73 9.9598 20.09 9.9598C18.95 9.9598 18.04 9.5198 17.6 8.7498C17.16 7.9798 17.23 6.9698 17.8 5.9898C17.95 5.7298 17.99 5.4198 17.91 5.1198C17.83 4.8198 17.64 4.5798 17.38 4.4198L15.65 3.4298C15.22 3.1698 14.65 3.3198 14.39 3.7598L14.28 3.9498C13.71 4.9398 12.88 5.4998 11.99 5.4998C11.1 5.4998 10.27 4.9398 9.7 3.9498L9.59 3.7498C9.34 3.3298 8.78 3.1798 8.35 3.4298L6.62 4.4298C6.36 4.5798 6.16 4.8298 6.08 5.1298C6 5.4298 6.04 5.7398 6.19 5.9998C6.76 6.9798 6.83 7.9898 6.39 8.7598C5.95 9.5298 5.04 9.9698 3.9 9.9698C3.26 9.9698 2.75 10.4798 2.75 11.1198V12.8798C2.75 13.5098 3.26 14.0298 3.9 14.0298C5.04 14.0298 5.95 14.4698 6.39 15.2398C6.83 16.0098 6.76 17.0198 6.19 17.9998C6.04 18.2598 6 18.5698 6.08 18.8698C6.16 19.1698 6.35 19.4098 6.61 19.5698L8.34 20.5598C8.55 20.6898 8.8 20.7198 9.03 20.6598C9.27 20.5998 9.47 20.4398 9.6 20.2298L9.71 20.0398C10.28 19.0598 11.11 18.4898 12 18.4898Z" fill="#292D32" />
                          </svg>
                        </div>
                        <div className='w-full whitespace-nowrap'>Advanced Settings</div>
                      </Link>
                    </li>
                  </ul>

                  <button
                    //   onClick={handleClickUser}
                    className="w-fit flex items-center gap-3 py-2 px-2 text-xs font-[500] duration-300 ease-in-out hover:text-primary lg:text-md"
                  >
                    <div className='text-xs'>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M15.2395 22.27H15.1095C10.6695 22.27 8.52953 20.52 8.15953 16.6C8.11953 16.19 8.41953 15.82 8.83953 15.78C9.23953 15.74 9.61953 16.05 9.65953 16.46C9.94953 19.6 11.4295 20.77 15.1195 20.77H15.2495C19.3195 20.77 20.7595 19.33 20.7595 15.26V8.73998C20.7595 4.66998 19.3195 3.22998 15.2495 3.22998H15.1195C11.4095 3.22998 9.92953 4.41998 9.65953 7.61998C9.60953 8.02998 9.25953 8.33998 8.83953 8.29998C8.41953 8.26998 8.11953 7.89998 8.14953 7.48998C8.48953 3.50998 10.6395 1.72998 15.1095 1.72998H15.2395C20.1495 1.72998 22.2495 3.82998 22.2495 8.73998V15.26C22.2495 20.17 20.1495 22.27 15.2395 22.27Z" fill="#292D32" />
                        <path d="M15.0001 12.75H3.62012C3.21012 12.75 2.87012 12.41 2.87012 12C2.87012 11.59 3.21012 11.25 3.62012 11.25H15.0001C15.4101 11.25 15.7501 11.59 15.7501 12C15.7501 12.41 15.4101 12.75 15.0001 12.75Z" fill="#292D32" />
                        <path d="M5.85043 16.1001C5.66043 16.1001 5.47043 16.0301 5.32043 15.8801L1.97043 12.5301C1.68043 12.2401 1.68043 11.7601 1.97043 11.4701L5.32043 8.12009C5.61043 7.83009 6.09043 7.83009 6.38043 8.12009C6.67043 8.41009 6.67043 8.89009 6.38043 9.18009L3.56043 12.0001L6.38043 14.8201C6.67043 15.1101 6.67043 15.5901 6.38043 15.8801C6.24043 16.0301 6.04043 16.1001 5.85043 16.1001Z" fill="#292D32" />
                      </svg>
                    </div>

                    <div className='w-full whitespace-nowrap'>Log Out</div>
                  </button>
                </div>
              </div>
            </div>

            <div className="lg:mt-[80px] lg:p-[36px] p-4 flex justify-center bg-[#f9f9f9]">
              <div className="max-w-[1300px] w-[100%]">{children}</div>
            </div>
          </section>
        </main>
      )}
    </>
    // <div>
    //     <div>
    //         <div>Good</div>
    //         <div>{children}</div>
    //     </div>
    // </div>


  );
}
