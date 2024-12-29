"use client";
import React, { useEffect, useState } from "react";
import { BMiddle } from "../custom-typography";
import { primaryColor, secondaryColor } from "@/libs/data";
import Image from "next/image";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

interface IPaginationV2 {
  list: any[];
  pagination: {
    perPage: number;
    totalPages: number;
    lastPage: number;
    page: number;
    links?: string[];
  };
  onPageChange: (page: number) => void;
  children: React.ReactNode;
  rowStatus?: boolean;
  color?: boolean;
}
export function PaginationV2({
  list,
  pagination,
  onPageChange,
  children,
  rowStatus = false,
  color = false
}: IPaginationV2) {
  const [currentPage, setCurrentPage] = useState(pagination.page);
  const router = useRouter();
  const pathname = usePathname();

  const searchParam = useSearchParams();

  const getPaginationLinks = () => {
    var currPage = currentPage || 1,
      last = pagination.lastPage || 1,
      delta = 2,
      left = currPage - delta,
      right = currPage + delta + 1,
      range = [],
      rangeWithDots = [],
      l;

    // console.log(currentPage, "CURENT PAGE")
    for (let i = 1; i <= last; i++) {
      if (i == 1 || i == last || (i >= left && i < right)) {
        range.push(i);
      }
    }
    for (let i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push("...");
        }
      }
      rangeWithDots.push(i);
      l = i;
    }
    return rangeWithDots;
  };

  const onClickLinks = ({
    page,
    action,
  }: {
    page: number;
    action?: "prev" | "next" | "last";
  }) => {
    const newPage =
      action === "next"
        ? page + 1
        : action === "prev"
        ? page - 1
        : (action === "last" && pagination.lastPage) || page;

    if (searchParam.size >= 1) {
      const currentQueryParams = Object.fromEntries(searchParam.entries());

      const newQueryParams = { ...currentQueryParams, page: newPage };

      // @ts-ignore
      const newQueryString = new URLSearchParams(newQueryParams).toString();
      router.push(`?${newQueryString}`);
    } else router.push(`${pathname}?page=${newPage}`);

    onPageChange(newPage);
  };

  useEffect(() => {
    const page = searchParam.get("page");

    if (page && parseInt(page) < pagination.lastPage)
      setCurrentPage(parseInt(page));
    else setCurrentPage(pagination.page || 1);
  }, [pagination.page, searchParam, pagination.lastPage]);

  return (
    <div className=" flex flex-col">
      {children}
      <div className={`flex w-full ${rowStatus ? "justify-between" : ""}`}>
        {rowStatus && (
          <div className="md:flex xs:hidden items-center justify-center gap-3">
            <div className=" flex items-center justify-between mt-[48px] p-0 !text-gray808 font-normal">
              Rows per page: 10
            </div>
            <Image
              src={"/images/arrow-down-grey.svg"}
              height={24}
              width={24}
              alt="logo"
              className=" h-fit mt-[48px]"
            />
          </div>
        )}
        <div
          className={`flex lg:flex-row flex-col items-center justify-between mt-[48px] p-4 gap-10  ${
            rowStatus ? "w-fit" : "w-full"
          }`}
        >
          <div className="md:flex xs:hidden items-center justify-center  h-full">
            <BMiddle className="!text-gray808">
              {pagination.perPage * (pagination.page - 1) + 1} to{" "}
              {pagination.page * pagination.perPage} of{" "}
              {pagination.perPage * pagination.totalPages} records
            </BMiddle>
          </div>
          <div className="flex flex-wrap items-center gap-[33px]  h-full justify-center">
            <button
              disabled={pagination.page <= 1}
              onClick={() =>
                onClickLinks({ page: pagination.page, action: "prev" })
              }
              className={`w-[58px] h-[37px] rounded-[6px] border-[1px] border-gray text-[0.875rem] font-[500] text-[#050505] ${
                pagination.page <= 1 ? "opacity-50" : ""
              }`}
            >
              Prev
            </button>
            <ul className="md:flex xs:hidden items-center gap-[9px]">
              {getPaginationLinks().map((pg, index) => (
                <li key={index}>
                  <button
                    disabled={!parseInt(pg.toString())}
                    onClick={() => onClickLinks({ page: pg as number })}
                    type="button"
                    className="px-[15px] h-[37px] rounded-[6px] border-[1px] border-gray text-[0.875rem] font-[500] min-w-[40px]"
                    style={{
                      background:
                        currentPage === pg
                          ? `${
                            !["fmaas", "paas"].some(item => pathname.split("/").includes(item))
                              ? primaryColor.theme
                              : secondaryColor.theme
                          }`
                          : "#fff",
                      borderColor:
                        currentPage === pg
                          ? `${
                            !["fmaas", "paas"].some(item => pathname.split("/").includes(item))
                              ? primaryColor.theme
                              : secondaryColor.theme
                          }`
                          : "#9E9E9E",
                      color: currentPage === pg ? "#fff" : "#050505",
                    }}
                  >
                    {pg}
                  </button>
                </li>
              ))}
            </ul>
            <button
              disabled={pagination.page >= pagination.lastPage}
              onClick={() =>
                onClickLinks({ page: pagination.page, action: "next" })
              }
              type="button"
              className={`w-[58px] h-[37px] rounded-[6px] border-[1px] border-gray text-[0.875rem] font-[500] text-[#050505] ${
                pagination.page >= pagination.lastPage ? "opacity-50" : ""
              }`}
            >
              Next
            </button>
            <button
              onClick={() =>
                onClickLinks({ page: pagination.page, action: "last" })
              }
              type="button"
              className="w-[58px] h-[37px] rounded-[6px] border-[1px] border-gray text-[0.875rem] font-[500] text-[#050505]"
            >
              Last
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaginationV2;
