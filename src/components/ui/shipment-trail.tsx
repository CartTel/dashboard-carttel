import { B1, BMiddle, BodySmallestMedium } from "@/components/custom-typography";
import { request } from "http";
import Image from "next/image";
import React from "react";
import { formatDate, formatDateTime, formatTime } from "@/helper/format";

interface IActivityLog {
    logs: {
        title: string;
        text: string;
        time: string;
        created_at: string;
    }[];
}

interface LogInterface {
    logs: {
        client_request_id?: number;
        client_request_status?: string;
        created_at?: Date | string;
        created_by?: number;
        id?: number
        title: string
    }[];
}

function ShipmentLogs({ logs = [] }: LogInterface) {
    return (
        <div>
            <ul className="relative w-[100%]">
                {logs?.map((log: any, index) => (
                    <li
                        key={index}
                        className="flex items-start lg:gap-[5px] gap-3 relative mb-[69px]"
                    >
                        {/* <B1 className="min-w-[96px] w-[96px] text-xs">{log?.user ? log?.user.name : 'N/A'}</B1> */}

                        <div className="rounded-full bg-[#029B5B] p-1 flex justify-center items-center ">
                            <Image
                                src={"/images/checked.svg"}
                                alt="checked"
                                width={20}
                                height={20}
                                className="z-[10] text-white"
                            />
                        </div>
                        <div className="">
                            <BodySmallestMedium className="mb-[8px] w-full text-xs ">{log?.comment?.title}</BodySmallestMedium>
                            <BodySmallestMedium className="!text-gray808 text-[10px] text-gray-400 max-w-[250px]">
                                {log?.comment?.text}
                            </BodySmallestMedium>
                        </div>

                        <BodySmallestMedium className="!text-gray808 ml-auto">
                            {log?.created_at ? formatDateTime(log?.created_at) : "N/A"}
                        </BodySmallestMedium>
                    </li>
                ))}

                <div className="absolute border-[1px] border-[#029B5B] h-[100%] top-[0px] lg:left-[15px] left-[15px] xs:left-[10px] border-dashed" />
            </ul>
        </div>
    );
}

export default ShipmentLogs;
