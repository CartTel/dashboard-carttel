import React from "react";
import { B2, BMiddle, H2, H1, BMiddleRegular } from "@/components/custom-typography";

import { formatDate } from "@/helper/format";
import Image from "next/image";

interface Currency {
    code: string;
    name: string;
    unicode: string;
}

interface Transactions {
    amount?: string;
    currency: Currency;
    type: string;
    walletBalance?: string;
    created_at: Date | string;
    wallet: any;
    status: string;
}


export default function RecentlyTranscationCard({ transaction }: { transaction: Transactions }) {
    const {
        amount,
        currency,
        type,
        walletBalance,
        created_at,
        wallet,
        status
    } = transaction;

    const formatValue = (value: string): string | number => {
        const valueFormat = parseInt(value)
        return valueFormat.toLocaleString("en-US");
    };

    return (
        <div 
            className="px-2 py-5 flex flex-wrap justify-between items-center gap-2 xs:gap-1 "
        >
            {/* <div>{id}</div> */}
            

            {/* User Info */}
            <div className="flex flex-col flex-1 min-w-0">
                <B2 className="text-md font-semibold text-slate-700 truncate">
                    {wallet.account.user.firstname} {wallet.account.user.lastname}
                </B2>
                <BMiddle className="text-xs text-gray-500 text-start ">
                    {type === "Transfer" ? "Transferred" : type == "Convert" ? "Converted": type == "Debit" ? "Debited" : "Deposited"}: {currency?.code === "NGN" ? "₦": "$"}{formatValue(amount as string)}
                </BMiddle>
                <BMiddleRegular
                    className={`text-xs font-semibold ${status ? "text-green-600" : "text-red-600"
                        }`}
                >
                    {status ? "Completed" : "Pending"}
                </BMiddleRegular>
            </div>

            {/* Additional Info */}
            <div className="flex flex-col text-end flex-1 min-w-0">
                <B2 className="text-md font-[500] text-primary truncate">
                    {type}
                </B2>
                {/* <BMiddle className="text-xs truncate text-rose-700">{currency?.code}</BMiddle> */}
                <div
                
            
                          
                >
                    {
                        currency?.code === "NGN" ?
                            <BMiddle className={`text-xs font-semibold ${
                                (currency?.code === 'NGN' && (parseInt(walletBalance as string) > 50000)) ? "text-green-600" 
                                : "text-red-600"   
                                }`}
                            >

walletBalance: ₦{formatValue(walletBalance as string)}
                            </BMiddle>
                        :
                        <BMiddle className={`text-xs font-semibold ${
                            (currency?.code === 'USD' &&(parseInt(walletBalance as string) > 50)) ? "text-green-600" 
                            : "text-red-600"  
                            }`}>
                            walletBalance: ${formatValue(walletBalance as string)}
                        </BMiddle>
                    }
                    {/* {currency?.code === "NGN" ? "₦": "$"}{formatValue(walletBalance as string)} */}
                </div>




                <BMiddleRegular className="text-xs text-gray-600 truncate">
                    {formatDate(created_at)}
                </BMiddleRegular>
            </div>
        </div>

    );
}



