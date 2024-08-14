"use client"

import Image from 'next/image'
import React from 'react'

interface ICustomSearch {
    placeholder?: string;
    className?: string;
    onClick?: (param: any) => void;
    searchValue?: string;
    setSearchValue?: (param: any) => void;
}
export function CustomSearch({ onClick, searchValue, setSearchValue, placeholder = "Search", className }: ICustomSearch) {
    return (
        <form
            onClick={
                (e) => {
                    if (onClick) {
                        onClick(e)
                    }
                }
            }
            className={`text-[1rem] text-black mb-[24px] bg-[#f6f6f6] flex items-center h-[58px] rounded-[10px] w-[100%] px-[18px] gap-[10px] ${className}`}>

            <Image
                src={'/images/search.svg'}
                alt='search'
                width={20}
                height={20}
            />

            <input className='h-[100%] w-[100%] bg-[transparent] outline-none '
                placeholder={placeholder}
                value={searchValue}
                defaultValue={''}
                onChange={(e) => {
                    if (setSearchValue) {
                        setSearchValue(e.target.value)
                    }
                }}

            />

        </form>
    )
}
