import { IIcon } from "@/libs/interfaces";
import React from "react";

export function ShipmentIcon({
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
                d="M23.0011 17.91C23.0211 18.66 22.8211 19.37 22.4611 19.98C22.2611 20.34 21.9912 20.6701 21.6912 20.9401C21.0012 21.5801 20.0911 21.9701 19.0811 22.0001C17.6211 22.0301 16.3311 21.2801 15.6211 20.1301C15.2411 19.5401 15.0111 18.8301 15.0011 18.0801C14.9711 16.8201 15.5311 15.6801 16.4311 14.9301C17.1111 14.3701 17.9712 14.0201 18.9112 14.0001C21.1212 13.9501 22.9511 15.7 23.0011 17.91Z"
                stroke={fillColor}
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M17.4414 18.0303L18.4514 18.9902L20.5414 16.9702"
                stroke={fillColor}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M3.1709 7.43994L12.0009 12.5499L20.7709 7.46991"
                stroke={fillColor}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M12.001 21.61V12.54"
                stroke={fillColor}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M21.6106 9.17V14.83C21.6106 14.88 21.6106 14.92 21.6006 14.97C20.9006 14.36 20.0006 14 19.0006 14C18.0606 14 17.1906 14.33 16.5006 14.88C15.5806 15.61 15.0006 16.74 15.0006 18C15.0006 18.75 15.2106 19.46 15.5806 20.06C15.6706 20.22 15.7806 20.37 15.9006 20.51L14.0706 21.52C12.9306 22.16 11.0706 22.16 9.9306 21.52L4.59061 18.56C3.38061 17.89 2.39062 16.21 2.39062 14.83V9.17C2.39062 7.79 3.38061 6.11002 4.59061 5.44002L9.9306 2.48C11.0706 1.84 12.9306 1.84 14.0706 2.48L19.4106 5.44002C20.6206 6.11002 21.6106 7.79 21.6106 9.17Z"
                stroke={fillColor}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
