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

import { MdOutlineArrowBackIos, MdOutlineArrowForwardIos, MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";





interface IPaginationV2 {
  list: any[];
  pagination: {
    perPage: number;
    totalPages: number;
    total: number;
    page: number;
    links?: string[];
  };
  onPageChange: (page: number) => void;
  // children: React.ReactNode;
  children: (paginatedList: any[]) => React.ReactNode;
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


  const [currentPage, setCurrentPage] = useState(pagination.page || 1);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const totalItems = pagination.total;
  const totalPages = Math.ceil(totalItems / 5); // Fixed 5 items per page



  useEffect(() => {
    const pageParam = searchParams.get("page");
    const pageNumber = pageParam ? parseInt(pageParam) : 1;
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  }, [searchParams, totalPages]);

  // Slice the list to get only the items for the current page
  const startIndex = (currentPage - 1) * 5;
  const paginatedList = list?.slice(startIndex, startIndex + 5);

  const searchParam = useSearchParams();

  const getPaginationLinks = () => {
    var currPage = currentPage || 1,
      last = pagination.totalPages || 1,
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
          : (action === "last" && pagination?.total) || page;

    if (searchParam.size >= 1) {
      const currentQueryParams = Object.fromEntries(searchParam.entries());

      const newQueryParams = { ...currentQueryParams, page: newPage };

      // @ts-ignore
      const newQueryString = new URLSearchParams(newQueryParams).toString();
      router.push(`?${newQueryString}`);
    } else router.push(`${pathname}?page=${newPage}`);

    onPageChange(newPage);
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);

    // Update URL with the new page number
    const currentQueryParams = Object.fromEntries(searchParams.entries());
    const newQueryParams = { ...currentQueryParams, page: page.toString() };
    const newQueryString = new URLSearchParams(newQueryParams).toString();
    router.push(`${pathname}?${newQueryString}`);

    onPageChange(page);
  };

  useEffect(() => {
    const page = searchParam.get("page");

    if (page && parseInt(page) < pagination?.total)
      setCurrentPage(parseInt(page));
    else setCurrentPage(pagination?.page || 1);
  }, [pagination?.page, searchParam, pagination?.total]);

  return (
    <div className=" flex flex-col">
      {/* {children} */}
      {children(paginatedList)}
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
          className={`flex lg:flex-row flex-col items-center justify-between mt-[48px] p-4 gap-10  ${rowStatus ? "w-fit" : "w-full"
            }`}
        >
          <div className="md:flex xs:hidden items-center justify-center  h-full">
            <BMiddle className="!text-gray808">
              {/* {(currentPage - 1) + 1} */}
              Showing {" "}
              {(currentPage - 1) + 1} to{" "}
              {pagination?.page * pagination?.perPage} of{" "}
              {pagination?.perPage * pagination?.totalPages} records
            </BMiddle>
          </div>
          <div className="flex flex-wrap items-center gap-[33px]  h-full justify-center">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage <= 1}
              className={`w-fit px-3 flex justify-center items-center h-[37px] rounded-full border-[1px] border-gray-400 text-[0.875rem] font-[500] text-[#050505] ${currentPage <= 1 ? "opacity-50" : ""
                }`}
            >
              <MdOutlineArrowBackIos />
              {/* Prev */}
              {/* <div>Prev</div> */}
            </button>

            <ul className="md:flex xs:hidden items-center gap-[9px]">
              {getPaginationLinks().map((pg, index) => (
                <li key={index}>
                  <button
                    disabled={!parseInt(pg.toString())}
                    onClick={() => onClickLinks({ page: pg as number })}
                    type="button"
                    className="px-[15px] h-[37px] rounded-full border-[1px] border-gray-200 text-[0.875rem] font-[500] min-w-[40px]"
                    style={{
                      background:
                        currentPage === pg
                          ? `${!["dashboard"].some(item => pathname.split("/").includes(item))
                            ? primaryColor.theme
                            : secondaryColor.theme
                          }`
                          : "#fff",
                      borderColor:
                        currentPage === pg
                          ? `${!["dashboard"].some(item => pathname.split("/").includes(item))
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

              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage >= totalPages}
              type="button"
              className={`w-fit px-3 h-[37px] flex justify-center items-center rounded-full border-[1px] border-gray-400 text-[0.875rem] font-[500] text-[#050505] ${currentPage >= totalPages ? "opacity-50" : ""
                }`}
            >
              {/* <div>Next</div> */}
              <MdOutlineArrowForwardIos />

            </button>

            <button
              onClick={() => handlePageChange(totalPages)}
              type="button"
              className="w-fit px-3 h-[37px] flex justify-center items-center rounded-full border-[1px] border-gray-400 text-[0.875rem] font-[500] text-[#050505]"
            >
              <MdOutlineKeyboardDoubleArrowRight />
              {/* Last */}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaginationV2;
