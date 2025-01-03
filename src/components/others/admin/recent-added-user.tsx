import React from "react";
import { B2, BMiddle, H2, H1, BMiddleRegular } from "@/components/custom-typography";

import { formatDate } from "@/helper/format";
import Image from "next/image";

interface User {
    profilePicture?: string;
    firstname: string;
    lastname: string;
    role?: string;
    email: string;
    dateAdded?: string;
    status?: string;
    active: boolean;
    code: string;
    created_at: Date | string;
    id: number;
}

export default function RecentlyAddedUserCard({ user }: { user: User }) {
    const {
        profilePicture,
        firstname,
        lastname,
        role = "Import",
        email,
        dateAdded = "N/A",
        status = "Pending",
        active,
        code,
        created_at,
        id
    } = user;

    return (
        <div 
            className="px-2 py-5 flex flex-wrap justify-between items-center gap-2 xs:gap-1 "
        >
            {/* <div>{id}</div> */}
            <div className="flex-shrink-0">
                <Image
                    alt="profile"
                    width={36}
                    height={36}
                    className="w-9 h-9 object-cover rounded-full border border-gray-600"
                    src={profilePicture || "/images/Home/man.svg"}
                />
            </div>

            {/* User Info */}
            <div className="flex flex-col flex-1 min-w-0">
                <B2 className="text-md font-semibold text-slate-700 truncate">
                    {firstname} {lastname}
                </B2>
                <BMiddle className="text-xs text-gray-500 text-start truncate">
                    {email}
                </BMiddle>
                <BMiddleRegular
                    className={`text-xs font-semibold ${active ? "text-green-600" : "text-red-600"
                        }`}
                >
                    {active ? "active" : "inactive"}
                </BMiddleRegular>
            </div>

            {/* Additional Info */}
            <div className="flex flex-col text-end flex-1 min-w-0">
                <B2 className="text-md font-normal text-orange-500 truncate">
                    {code}
                </B2>
                <BMiddle className="text-xs text-gray-500 truncate">{role}</BMiddle>
                <BMiddleRegular className="text-xs text-gray-400 truncate">
                    {formatDate(created_at)}
                </BMiddleRegular>
            </div>
        </div>

    );
}



