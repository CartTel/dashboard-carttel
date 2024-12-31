"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
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

import { B2, BMiddle, BodySmallestMedium } from "../custom-typography";
import { CustomButton, CustomSearch } from "../custom-components";
import { usePathname, useRouter } from "next/navigation";
import { primaryColor } from "@/libs/data";
// import { useAuthContext } from "@/context/auth-provider";
// import { Twirl as Hamburger } from "hamburger-react";
// import { useCurrentUser } from "@/utils/hooks";
// import { logout } from "@/redux/features/loginSlice";
// import { useDispatch } from "react-redux";

const SIDEBAR = [
  {
    title: "",
    links: [
      {
        Icon: DashboardIcon,
        ActiveIcon: DashboardFilledIcon,
        label: "Dashboard",
        link: "/dashboard/import",
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
        link: "/dashboard/import/shipment",
      },
      {
        Icon: WalletIcon,
        ActiveIcon: WalletFilledIcon,
        label: "Wallet",
        link: "/dashboard/import/wallet",
      },
      {
        Icon: PickupIcon,
        ActiveIcon: PickupFilledIcon,
        label: "Pickup",
        link: "/dashboard/import/pickup",
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
        link: "/dashboard/import/warehouse",
      },
      {
        Icon: DropOffIcon,
        ActiveIcon: DropoffFilledIcon,
        label: "Dropoff",
        link: "/dashboard/import/dropoff",
      },
      {
        Icon: ProcurementIcon,
        ActiveIcon: ProcurementFilledIcon,
        label: "Procurement",
        link: "/dashboard/import/procurement",
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
        link: "/dashboard/import/address-book",
      },
      {
        Icon: PlanIcon,
        ActiveIcon: PlanFilledIcon,
        label: "Upgrade Plan",
        link: "/dashboard/import/upgrade-plan",
      },
      {
        Icon: InviteIcon,
        ActiveIcon: InviteFilledIcon,
        label: "Invite & Earn",
        link: "/dashboard/import/invite",
      },
    ],
  },
  {
    title: "\t",
    links: [
      {
        Icon: HelpIcon,
        ActiveIcon: HelpFilledIcon,
        label: "FAQs",
        link: "/dashboard/import/faqs",
      },
    ],
  },
];


interface IDashboardWrapper {
  children: React.ReactNode;
}
export function DashboardWrapper({ children }: IDashboardWrapper) {
  const [isOpen, setOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const path = usePathname();
  const router = useRouter();
  // const { isLoading, user } = useAuthContext();
  // const { user } = useCurrentUser();
  // const dispatch = useDispatch();

  // console.log(user);

  // const getCurrentPage = (link: string) => {
  //   if (link === "/dashboard") {
  //     return path === link;
  //   } else {
  //     return path.includes(link);
  //   }
  // };

  // useEffect(() => {
  //   setIsClient(true);
  // }, []);
  // const { user } = useCurrentUser();
  return (
    // <>
    //   {isClient && (
    //     <main className="relative bg-off_white min-h-[100vh] ">
    //       {/* MOBILE SIDEBAR */}
    //       <nav className="bg-white flex justify-between items-center px-3 py-4 lg:hidden fixed top-0 right-0 left-0 w-full z-[999]">
    //         {/* <div>
    //           <Link href={"/dashboard"}>
    //             <Image
    //               src={"/images/filmo-logo.png"}
    //               height={21.04}
    //               width={100}
    //               alt="logo"
    //               style={{
    //                 width: "100px",
    //                 height: "auto",
    //               }}
    //             />
    //           </Link>
    //         </div> */}
    //         <div className="flex items-center gap-[8px]">
    //           <div onClick={() => setOpen(true)}>
    //             {/* <Hamburger toggled={isOpen} toggle={setOpen} size={18} /> */}
    //             <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
    //               {/* <!-- Hamburger Toggle BTN --> */}

    //               <button
    //                 aria-controls="sidebar"
    //                 // onClick={(e) => {
    //                 //   e.stopPropagation();
    //                 //   setSidebarOpen(!sidebarOpen);
    //                 // }}
    //                 className="z-50 block rounded-sm bg-white shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
    //               >
    //                 <div
    //                   className="flex items-center lg:hidden rounded p-2 mr-2 text-secondary text-2xl"
    //                 >
    //                   <svg
    //                     viewBox="64 64 896 896"
    //                     focusable="false"
    //                     data-icon="menu-unfold"
    //                     width="1em"
    //                     height="1em"
    //                     fill="currentColor"
    //                     aria-hidden="true"
    //                   >
    //                     <path d="M408 442h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm-8 204c0 4.4 3.6 8 8 8h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56zm504-486H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 632H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM142.4 642.1L298.7 519a8.84 8.84 0 000-13.9L142.4 381.9c-5.8-4.6-14.4-.5-14.4 6.9v246.3a8.9 8.9 0 0014.4 7z"></path>
    //                   </svg>
    //                 </div>
    //               </button>
    //               {/* <!-- Hamburger Toggle BTN --> */}
    //             </div>

    //             <svg
    //               width="24"
    //               height="24"
    //               viewBox="0 0 24 24"
    //               fill="none"
    //               xmlns="http://www.w3.org/2000/svg"
    //             >
    //               <path
    //                 d="M3 7H21"
    //                 stroke="#292D32"
    //                 strokeWidth="2"
    //                 strokeLinecap="round"
    //               />
    //               <path
    //                 d="M3 12H19"
    //                 stroke="#292D32"
    //                 strokeWidth="2"
    //                 strokeLinecap="round"
    //               />
    //               <path
    //                 d="M3 17H16"
    //                 stroke="#292D32"
    //                 strokeWidth="2"
    //                 strokeLinecap="round"
    //               />
    //             </svg>
    //           </div>
    //         </div>
    //         <div className="flex items-center gap-8 ">
    //           <div className="flex items-center gap-8">
    //             <button>
    //               <Image
    //                 src={"/images/search.svg"}
    //                 alt="search"
    //                 width={28}
    //                 height={28}
    //                 className="lg:w-[28px] lg:h-[28px] w-[24px] h-[24px]"
    //               />
    //             </button>
    //             <button>
    //               <Image
    //                 src={"/images/menu-dots.svg"}
    //                 width={28}
    //                 height={28}
    //                 alt="menu"
    //                 className="lg:w-[28px] lg:h-[28px] w-[24px] h-[24px]"
    //               />
    //             </button>
    //             <button>
    //               <Image
    //                 src={"/images/notification.svg"}
    //                 width={28}
    //                 height={28}
    //                 alt="notification"
    //                 className="lg:w-[28px] lg:h-[28px] w-[24px] h-[24px]"
    //               />
    //             </button>
    //           </div>
    //           <div>
    //             <svg
    //               width="1"
    //               height="28"
    //               viewBox="0 0 1 28"
    //               fill="none"
    //               xmlns="http://www.w3.org/2000/svg"
    //             >
    //               <line
    //                 opacity="0.4"
    //                 x1="0.5"
    //                 y1="2.18557e-08"
    //                 x2="0.499999"
    //                 y2="28"
    //                 stroke="#9E9E9E"
    //               />
    //             </svg>
    //           </div>
    //           <div>
    //             <Image
    //               // src={user.organizations[0]?.logo ?? "/images/man.jpeg"}
    //               src={"/images/man.jpeg"}
    //               alt="profile"
    //               width={48}
    //               height={48}
    //               className={`lg:w-[48px] lg:h-[48px] w-[28px] h-[28px] object-cover rounded-full border-[1px] border-[${primaryColor.theme}]`}
    //             />
    //           </div>
    //         </div>
    //       </nav>

    //       {isOpen && (
    //         <div
    //           className="fixed inset-0 bg-black opacity-50 z-[59999] w-full h-full"
    //           onClick={() => setOpen(false)}
    //         ></div>
    //       )}
    //       <section
    //         className={` ${isOpen ? "w-[280px] translate-x-0" : "-translate-x-full"
    //           } lg:hidden transition-all ease-in-out duration-150 fixed top-0 left-0 h-full bg-white py-[37px] px-[12px] overflow-y-auto z-[60000]`}
    //       >
    //         <div>
    //           {isOpen && (
    //             <div className="flex justify-end absolute right-4 top-8">
    //               <button onClick={() => setOpen(false)}>
    //                 <svg
    //                   width="32"
    //                   height="32"
    //                   viewBox="0 0 32 32"
    //                   fill="none"
    //                   xmlns="http://www.w3.org/2000/svg"
    //                 >
    //                   <rect
    //                     width="32"
    //                     height="32"
    //                     rx="16"
    //                     fill="#B7383C"
    //                     fill-opacity="0.16"
    //                   />
    //                   <path
    //                     d="M21.2499 10.7575C21.1728 10.6803 21.0813 10.619 20.9805 10.5772C20.8796 10.5354 20.7716 10.5138 20.6624 10.5138C20.5533 10.5138 20.4452 10.5354 20.3444 10.5772C20.2436 10.619 20.152 10.6803 20.0749 10.7575L15.9999 14.8242L11.9249 10.7492C11.8478 10.6721 11.7562 10.6109 11.6554 10.5691C11.5546 10.5273 11.4466 10.5059 11.3374 10.5059C11.2283 10.5059 11.1203 10.5273 11.0195 10.5691C10.9187 10.6109 10.8271 10.6721 10.7499 10.7492C10.6728 10.8264 10.6116 10.918 10.5698 11.0188C10.5281 11.1196 10.5066 11.2276 10.5066 11.3367C10.5066 11.4458 10.5281 11.5539 10.5698 11.6547C10.6116 11.7555 10.6728 11.8471 10.7499 11.9242L14.8249 15.9992L10.7499 20.0742C10.6728 20.1514 10.6116 20.243 10.5698 20.3438C10.5281 20.4446 10.5066 20.5526 10.5066 20.6617C10.5066 20.7708 10.5281 20.8789 10.5698 20.9797C10.6116 21.0805 10.6728 21.1721 10.7499 21.2492C10.8271 21.3264 10.9187 21.3876 11.0195 21.4293C11.1203 21.4711 11.2283 21.4926 11.3374 21.4926C11.4466 21.4926 11.5546 21.4711 11.6554 21.4293C11.7562 21.3876 11.8478 21.3264 11.9249 21.2492L15.9999 17.1742L20.0749 21.2492C20.1521 21.3264 20.2437 21.3876 20.3445 21.4293C20.4453 21.4711 20.5533 21.4926 20.6624 21.4926C20.7715 21.4926 20.8796 21.4711 20.9804 21.4293C21.0812 21.3876 21.1728 21.3264 21.2499 21.2492C21.3271 21.1721 21.3883 21.0805 21.43 20.9797C21.4718 20.8789 21.4933 20.7708 21.4933 20.6617C21.4933 20.5526 21.4718 20.4446 21.43 20.3438C21.3883 20.243 21.3271 20.1514 21.2499 20.0742L17.1749 15.9992L21.2499 11.9242C21.5666 11.6075 21.5666 11.0742 21.2499 10.7575Z"
    //                     fill="#B7383C"
    //                   />
    //                 </svg>
    //               </button>
    //             </div>
    //           )}
    //         </div>
    //         <Link href={"/dashboard"}>
    //           <Image
    //             src={"/images/filmo-logo.png"}
    //             height={21.04}
    //             width={100}
    //             alt="logo"
    //             style={{
    //               width: "100px",
    //               height: "auto",
    //             }}
    //             className="ml-[24px]"
    //           />
    //         </Link>

    //         <div className="mt-[25px] text-[0.875rem] font-[500] ">
    //           {SIDEBAR.map(({ title, links }, index) => (
    //             <div key={index}>
    //               <div className="px-[24px] my-[18px]">
    //                 {title && (
    //                   <BodySmallestMedium className="uppercase text-gray">
    //                     {title}
    //                   </BodySmallestMedium>
    //                 )}
    //               </div>
    //               <ul>
    //                 {links.map(({ Icon, ActiveIcon, label, link }, i) => {
    //                   return (
    //                     <li
    //                       onClick={() => {
    //                         if (label === "Logout") {
    //                           // dispatch(logout());
    //                           router.push(link);
    //                           return;
    //                         }
    //                         router.push(link);
    //                         setOpen(false);
    //                       }}
    //                       key={i}
    //                       className={`mb-[5px] sidebar-item text-gray  rounded-[10px] w-[100%] hover:text-[${primaryColor.theme
    //                         }] hover:bg-[#B7383C29] h-[50px] px-[24px] flex items-center gap-[8px] ${getCurrentPage(link)
    //                           ? `sidebar-active !text-[${primaryColor.theme}] !bg-[#B7383C29] `
    //                           : ""
    //                         }`}
    //                     >
    //                       <div className="item icon">
    //                         <Icon />
    //                       </div>
    //                       <div className="item active-icon">
    //                         <ActiveIcon />
    //                       </div>

    //                       {label}
    //                     </li>
    //                   );
    //                 })}
    //               </ul>
    //             </div>
    //           ))}

    //           <div className="ml-[24px] mt-[60px] mb-[100px]">
    //             <CustomButton
    //               style={{
    //                 backgroundColor: primaryColor.theme,
    //               }}
    //               className={`px-[12px] flex items-center gap-[8px] !w-[143px] !h-[44px]`}
    //             >
    //               <Image
    //                 src={"/images/profile-add.svg"}
    //                 alt="invite"
    //                 width={20}
    //                 height={20}
    //               />

    //               <B2 className="text-white">Invite Team</B2>
    //             </CustomButton>
    //           </div>
    //         </div>
    //       </section>
    //       {/* MOBILE SIDEBAR */}

    //       {/* SIDEBAR */}
    //       <section
    //         className={
    //           "lg:block hidden fixed top-[0] w-[251px] h-[100vh] bg-white py-[37px] px-[12px] overflow-y-auto z-[60000]"
    //         }
    //       >
    //         <Link href={"/dashboard"}>
    //           <Image
    //             src={"/images/filmo-logo.png"}
    //             height={21.04}
    //             width={100}
    //             alt="logo"
    //             style={{
    //               width: "100px",
    //               height: "auto",
    //             }}
    //             className="ml-[24px]"
    //           />
    //         </Link>

    //         <div className="mt-[25px] text-[0.875rem] font-[500] ">
    //           {SIDEBAR.map(({ title, links }, index) => (
    //             <div key={index}>
    //               <div className="px-[24px] my-[18px]">
    //                 {title && (
    //                   <BodySmallestMedium className="uppercase text-gray">
    //                     {title}
    //                   </BodySmallestMedium>
    //                 )}
    //               </div>
    //               <ul>
    //                 {links.map(({ Icon, ActiveIcon, label, link }, i) => {
    //                   return (
    //                     <li
    //                       onClick={() => {
    //                         router.push(link);
    //                         setOpen(false);

    //                         if (label === "Logout") {
    //                           // dispatch(logout());
    //                         }
    //                       }}
    //                       key={i}
    //                       className={`mb-[5px] sidebar-item text-gray  rounded-[10px] w-[100%] hover:text-[${primaryColor.theme
    //                         }] hover:bg-[#B7383C29] h-[50px] px-[24px] flex items-center gap-[8px] ${getCurrentPage(link)
    //                           ? `sidebar-active !text-[${primaryColor.theme}] !bg-[#B7383C29] `
    //                           : ""
    //                         }`}
    //                     >
    //                       <div className="item icon">
    //                         <Icon />
    //                       </div>
    //                       <div className="item active-icon">
    //                         <ActiveIcon />
    //                       </div>

    //                       {label}
    //                     </li>
    //                   );
    //                 })}
    //               </ul>
    //             </div>
    //           ))}

    //           <div className="ml-[24px] mt-[60px] mb-[100px]">
    //             <CustomButton
    //               style={{
    //                 backgroundColor: primaryColor.theme,
    //               }}
    //               className={`px-[12px] flex items-center gap-[8px] !w-[143px] !h-[44px]`}
    //             >
    //               <Image
    //                 src={"/images/profile-add.svg"}
    //                 alt="invite"
    //                 width={20}
    //                 height={20}
    //               />

    //               <B2 className="text-white">Invite Team</B2>
    //             </CustomButton>
    //           </div>
    //         </div>
    //       </section>

    //       <section className="lg:ml-[251px]  lg:w-[calc(100vw_-_251px)]">
    //         <div className="hidden z-[5000] w-[calc(100vw_-_253px)] left-[253px] fixed top-[0] h-[96px] px-[36px] lg:flex items-center justify-between bg-white">
    //           <div className="w-[432px]">
    //             <CustomSearch
    //               className="!mb-[0px] !h-[48px] text-[0.875rem]"
    //               placeholder="Start typing here to search"
    //             />
    //           </div>
    //           <div className="flex items-center gap-[30px]">
    //             <div className="flex items-center gap-[36px]">
    //               <Link href={"/dashboard/settings"}>
    //                 <Image
    //                   src={"/images/settings.svg"}
    //                   width={32}
    //                   height={32}
    //                   alt="settings"
    //                 />
    //               </Link>
    //               <button>
    //                 <Image
    //                   src={"/images/menu-dots.svg"}
    //                   width={32}
    //                   height={32}
    //                   alt="menu"
    //                 />
    //               </button>
    //               <button>
    //                 <Image
    //                   src={"/images/notification.svg"}
    //                   width={32}
    //                   height={32}
    //                   alt="notification"
    //                 />
    //               </button>
    //             </div>

    //             <div className="bg-gray w-[1px] h-[50px]" />

    //             <div className="flex items-center gap-[8px]">
    //               <Image
    //                 // src={user.organizations[0]?.logo ?? "/images/man.jpeg"}
    //                 src={"/images/man.jpeg"}
    //                 alt="profile"
    //                 width={48}
    //                 height={48}
    //                 className={`min-w-[48px] min-h-[48px] object-cover rounded-full border-[1px] border-[${primaryColor.theme}]`}
    //               />

    //               <div>
    //                 <BMiddle>{user?.firstname}</BMiddle>
    //                 <BodySmallestMedium className="text-gray mt-[2px]">
    //                   Facility Manager
    //                 </BodySmallestMedium>
    //               </div>
    //             </div>
    //           </div>
    //         </div>

    //         <div className="lg:mt-[96px] lg:p-[36px] p-4 flex justify-center">
    //           <div className="max-w-[1300px] w-[100%]">{children}</div>
    //         </div>
    //       </section>
    //     </main>
    //   )}
    // </>
    <div>
    <div>
        <div>Good</div>
        <div>{children}</div>
    </div>
</div>
  );
}
