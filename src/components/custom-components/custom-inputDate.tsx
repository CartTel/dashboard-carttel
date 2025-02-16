"use client";

import { ICustomInput, ICustomInputDate } from "@/libs/interfaces";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Calendar from "./calender";

export function CustomInputDate({
    value,
    wrapperClass,
    calendar,
    setValue,
    inputIndex,
    inputClass,
    className,
    label,
    type,
    id,
    showToggle,
    isToggle,
    changeToggle,
    showLabel = true,
    inputType = "input",
    required = false,
    disabled = false,
    onChange,
    inputName,
}: ICustomInputDate) {
    const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | any>(null);
    const [showCalendar, setShowCalendar] = useState(false);

    useEffect(() => {
        const input = inputRef.current;
        if (input) {
            if (input.value) {
                input.classList.add("has-value");
            } else {
                input.classList.remove("has-value");
            }
            const handleInput = () => {
                if (input.value) {
                    input.classList.add("has-value");
                } else {
                    input.classList.remove("has-value");
                }
            };

            input.addEventListener("input", handleInput);

            return () => {
                input.removeEventListener("input", handleInput);
            };
        }
    }, []);


    const handleCalendarToggle = () => {
        setShowCalendar((prev) => !prev);
    };
    const handleChange = (
        e:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        const newValue = e;
        if (onChange) {
            onChange(newValue);
        }
        if (setValue) {
            setValue(newValue.target.value);
        }
    };

    return (
        <div
            className={`form-group flex w-[100%] lg:h-[58px] text-[1rem] ${className} ${wrapperClass} ${showLabel ? "" : "unlabeled"
                }`}
        >
            <>
                <input
                    disabled={disabled}
                    defaultValue={""}
                    placeholder={showLabel ? "" : label}
                    value={Array.isArray(value) ? value[inputIndex as number] : value}
                    onChange={handleChange}
                    id={id}
                    type={type}
                    required={required}
                    className={inputClass}
                    ref={inputRef}
                    name={inputName == " " ? "address" : inputName}
                />
                {calendar && (
                    <>
                        {showCalendar && <Calendar></Calendar>}
                        <Image
                            src={"/images/calendar.svg"}
                            alt="calender-logo"
                            width={24}
                            height={24}
                            className="absolute right-4 bg-white top-1/2 -translate-y-1/2 cursor-pointer"
                            onClick={() => {
                                setShowCalendar((prev) => !prev);
                            }}
                        ></Image>
                    </>
                )}
            </>
            {
                showLabel && (
                    // !(Array.isArray(value) ? value[inputIndex as number] : value) && (
                    <label htmlFor={id}>{label}</label>
                )
                // )}
            }
            
        </div>
    );
}
