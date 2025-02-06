// import { ArrowIcon } from "@/components/custom-icons";
import { B2, BMiddle, H2, H1 } from "@/components/custom-typography";

import { HiArrowSmUp, HiArrowSmDown } from "react-icons/hi";
import { AdminstatCard } from "@/libs/interfaces";
import Image from "next/image";
import React from "react";

export function AllAdminStatCard({
  color,
  value,
  icon,
  title,
  textColor,
  status,
  percentage,
  count,
  wrapperClassName,
  titleClassName,
  iconClassName,
  iconWrapperClassName,
  valueClassName,
  actionComponent,
  onClick,
}: AdminstatCard) {
  return (
    <div
      className={`relative lg:min-w-[200px] shadow-md min-h-[120px] p-[14px] bg-white border-[1px] border-gray-200 rounded-[15px] ${wrapperClassName}`}
    >
      <div
        onClick={() => {
          if (onClick) {
            onClick();
          }
        }}
        className={`flex justify-between flex-col-reverse items-center w-[100%] border-b border-[#E8E8E8] pb-1`}
      >
        {actionComponent ? actionComponent : null}

        <div className="flex justify-start w-full">
          <BMiddle className={`font-normal text-start mt-5 block mb-2 text-slate-500 md:text-sm whitespace-nowrap xs:text-[15px] ${titleClassName}`}>
            {title}
          </BMiddle>
        </div>
        <div className="flex w-full justify-start">

        <div
          className={`w-[36px] h-[36px] rounded-full flex items-center justify-center ${iconWrapperClassName}`}
          style={{
            background: color,
            color: textColor
          }}
        >
          <Image
            src={icon}
            alt="icon"
            width={20}
            height={20}
            className={`min-w-[20px] min-h-[20px] text-[#bfccf8] ${iconClassName}`}
          />
        </div>
        </div>

      </div>
      <div className="flex justify-between items-center">
        <H1 className={`md:text-[32px] xs:text-[20px] pt-3 ${valueClassName}`} style={{
          color: textColor,
        }}>{value}
          {/* {count} {percentage} */}
        </H1>
        <div className="pt-3">

          {
            status === true ? (
              <div className="bg-green-200 rounded-lg p-1 text-green-600 text-sm flex items-center">
                <HiArrowSmUp />
                <div>
                  {percentage}
                </div>
              </div>

            ) : (
              <div className="bg-red-200 rounded-lg p-1 text-rose-600 text-sm flex items-center">
                <HiArrowSmDown />
                <div>
                  {percentage}
                </div>
              </div>
            )
          }
        </div>

      </div>
    </div>
  );
}
