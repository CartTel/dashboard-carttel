"use client";

import Image from "next/image";
import { B1 } from "../custom-typography";
import { useEffect, useRef, useState } from "react";


interface ICustomSelect {
    label: string;
    setSelected: (val: any) => void;
    selected: string | number;
    wrapperClass?: string;
    optionWrapperClass?: string;
    optionsClass?: string;
    required?: boolean;
    options: {
        value: string;
        label: string;
    }[]
}
export function CustomSelectTwo({ options, label, setSelected, selected, wrapperClass, optionWrapperClass, optionsClass, required }: ICustomSelect) {
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




    return (
        <div
            ref={selectRef}
            onClick={toggleOptions}
            className={`${selected ? 'border-[1.5px] border-primary !text-black' : ''} text-gray relative cursor-pointer flex items-center justify-between md:w-[500px] xs:w-full bg-[#F6F6F6] px-[18px] h-[58px] rounded-[10px] select ${wrapperClass}`}
        >
            <div className="flex w-full justify-between">

                <B1 className="text-[1rem] ">{selected ? options.find(o => o.value === selected)?.label : label}</B1>

                <B1 className={`${selected ? 'flex' : 'hidden'} text-gray text-[1rem]`}>{selected ? options.find(o => o.value === selected)?.label : label}</B1>
            </div>

            <input required={required} value={selected} className="w-[1px] h-[1px]" />

            <Image
                src={'/images/arrow-down.svg'}
                alt="arrow-down"
                width={20}
                height={20}
                className={`w-fit transition-all ease-in-out duration-300 ${showOptions ? 'rotate-[180deg]' : ''}`}
            />

            {showOptions && <div className={`transition-all ease-in-out duration-300 pt-[30px] pb-[10px] z-[300] overflow-y-auto options absolute w-[60%] min-h-[60px] rounded-[10px] right-[0] ${options.length > 2 ? 'bottom-[-215px] h-[230px]' : options.length > 0 ? 'bottom-[-180px] h-[180px]' : 'bottom-[-70px] h-[70px]'}  bg-white`}>

                {options.length ? options.map(({ label, value }, index) => (
                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            setSelected(value)
                            toggleOptions()
                        }}
                        key={index} className={`transition-all ease-in-out duration-300 hover:bg-primary hover:text-white h-[58px] w-[100%] flex items-center px-[18px] text-[1rem] font-[500] text-[#292D32] ${selected === value ? 'bg-primary !text-white' : ''}`}>{label}</button>
                )) : <span className="px-[18px] text-[1rem] font-[500] text-[#292D32]">No Data</span>}

            </div>}
        </div>
    )
}