"use client";

import Image from "next/image";
import { B1 } from "../custom-typography";
import { useEffect, useRef, useState } from "react";
import { CustomSearch } from "./custom-search";


interface ICustomSelect {
    label: string;
    setSelected: (val: any) => void;
    selected: string | number;
    wrapperClass?: string;
    optionWrapperClass?: string;
    selectedClass?: string;
    searchClass?: string;
    optionsClass?: string;
    labelClass?: string;
    required?: boolean;
    search?: boolean;
    options: {
        value: string;
        label: string;
        image?: string;
    }[];

}
export function CustomSelect({ options, search, label, setSelected, selected, selectedClass, wrapperClass, optionWrapperClass, searchClass, optionsClass, labelClass, required }: ICustomSelect) {
    const [showOptions, setShowOptions] = useState(false)

    const selectRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
            setShowOptions(false);
        }
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            document.addEventListener('mousedown', handleClickOutside)
        }
        return () => {
            if (typeof window !== 'undefined')
                document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const toggleOptions = () => {
        setShowOptions(!showOptions);
    };



    // console.log(options, "OPTIONS")
    return (
        <div
            ref={selectRef}
            onClick={toggleOptions}
            className={`${selected ? `border-[1.5px] border-primary !text-black ${selectedClass}` : ''} text-gray relative cursor-pointer flex items-center justify-between w-[100%] bg-[#F6F6F6] px-[18px] h-[58px] rounded-[10px] select ${wrapperClass}`}>

            <B1 className={`text-[1rem] ${labelClass} ${selected ? '!text-black' : ''}`}>{selected ? options.find(o => o.value === selected)?.label : label}</B1>

            <input required={required} value={selected} className="w-[1px] h-[1px]" defaultValue={''} />

            <Image
                src={'/images/arrow-down.svg'}
                alt="arrow-down"
                width={20}
                height={20}
                className={`transition-all ease-in-out duration-300 ${showOptions ? 'rotate-[180deg]' : ''}`}
            />

            {showOptions && <div className={`transition-all ease-in-out duration-300 pt-[30px] pb-[10px] z-[300] overflow-y-auto options absolute w-[100%] min-h-[60px] rounded-[10px] left-[0] ${options?.length > 2 ? 'bottom-[-230px] h-[230px]' : options?.length > 0 ? 'bottom-[-180px] h-[180px]' : 'bottom-[-70px] h-[70px]'}  bg-white ${optionWrapperClass}`}>
                <div className="relative">
                    {search && <div className="px-[10px] sticky top-[0px] bg-white w-[100%]">
                        <CustomSearch
                            className={searchClass}

                            onClick={(e) => {
                                e.stopPropagation()
                            }}
                        />
                    </div>}
                    {options?.length ? options.map(({ label, value }, index) => (
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation()
                                console.log("HERE AND HERE")
                                setSelected(value)
                                toggleOptions()
                            }}
                            key={index} className={`transition-all ease-in-out duration-300 hover:bg-primary hover:text-white h-[58px] w-[100%] truncate flex items-center px-[18px] text-[1rem] font-[500] text-[#292D32] ${selected === value ? 'bg-primary !text-white' : ''} ${optionsClass}`}>
                            <span className="!text-left w-[100%] truncate">{label}</span>
                        </button>
                    )) : <span className="px-[18px] text-[1rem] font-[500] text-[#292D32]">No Data</span>}
                </div>
            </div>}
        </div>
    )
}