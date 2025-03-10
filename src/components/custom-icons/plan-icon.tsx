import { IIcon } from "@/libs/interfaces";
import React from "react";

export function PlanIcon({
    fillColor = "#9E9E9E",
    size = 24,
    className,
}: IIcon) {
    return (
        <svg
            className={className}
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M17.0034 20.5H7.00342C4.00342 20.5 2.00342 19 2.00342 15.5V8.5C2.00342 5 4.00342 3.5 7.00342 3.5H17.0034C20.0034 3.5 22.0034 5 22.0034 8.5V15.5C22.0034 19 20.0034 20.5 17.0034 20.5Z"
                stroke={fillColor}
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M12.0034 15C13.6603 15 15.0034 13.6569 15.0034 12C15.0034 10.3431 13.6603 9 12.0034 9C10.3466 9 9.00342 10.3431 9.00342 12C9.00342 13.6569 10.3466 15 12.0034 15Z"
                stroke={fillColor}
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M8.50342 6H7.00342C5.62342 6 4.50342 7.12 4.50342 8.5V10"
                stroke={fillColor}
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M15.5034 6H17.0034C18.3834 6 19.5034 7.12 19.5034 8.5V10"
                stroke={fillColor}
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M8.50342 18H7.00342C5.62342 18 4.50342 16.88 4.50342 15.5V14"
                stroke={fillColor}
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M15.5034 18H17.0034C18.3834 18 19.5034 16.88 19.5034 15.5V14"
                stroke={fillColor}
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
