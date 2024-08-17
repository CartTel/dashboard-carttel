"use client";

import React, { useState } from "react";
import * as RPNInput from "react-phone-number-input";
import flags from "react-phone-number-input/flags";
import { LuChevronsUpDown } from "react-icons/lu";
import { getCountryCallingCode } from "react-phone-number-input"; // Ensure this is imported correctly

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string; // Optional className prop
}

type PhoneInputProps = Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "onChange" | "value"
> &
    Omit<RPNInput.Props<typeof RPNInput.default>, "onChange"> & {
        onChange?: (value: RPNInput.Value) => void;
    };

const PhoneInput: React.ForwardRefExoticComponent<PhoneInputProps> =
    React.forwardRef<React.ElementRef<typeof RPNInput.default>, PhoneInputProps>(
        ({ className, onChange, ...props }, ref) => {
            return (
                <RPNInput.default
                    ref={ref}
                    className="flex"
                    flagComponent={FlagComponent}
                    countrySelectComponent={CountrySelect}
                    inputComponent={InputComponent}
                    onChange={(value) => onChange?.(value || "")}
                    {...props}
                />
            );
        }
    );

PhoneInput.displayName = "PhoneInput";

const InputComponent = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, ...props }, ref) => (
        
        <input
            className="flex w-[100%] h-[58px] text-[1rem] outline-none border-[1px] border-gray-200 border-l-0 rounded-tr-lg rounded-br-lg px-2"
            {...props}
            ref={ref}
        />
        
    )
);
InputComponent.displayName = "InputComponent";

type CountrySelectOption = { label: string; value: RPNInput.Country };

type CountrySelectProps = {
    disabled?: boolean;
    value: RPNInput.Country;
    onChange: (value: RPNInput.Country) => void;
    options: CountrySelectOption[];
};

const CountrySelect = ({
    disabled,
    value,
    onChange,
    options,
}: CountrySelectProps) => {
    const handleSelect = React.useCallback(
        (country: RPNInput.Country) => {
            onChange(country);
        },
        [onChange]
    );

    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const filteredOptions = options.filter((option) =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="relative">
            <button
                type="button"
                className={`flex gap-1 rounded-l-lg rounded-r-none px-3 py-[20px] h-[58px] border border-gray-200 border-r-0 ${disabled ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                onClick={() => !disabled && setIsOpen((prev) => !prev)}
                disabled={disabled}
            >
                <FlagComponent country={value} countryName={value} />
                <LuChevronsUpDown className={`-mr-2 h-4 w-4 ${disabled ? "hidden rotate-180" : "opacity-100 rotate-0"}`} />
            </button>

            {isOpen && (
                <div className="absolute z-10 w-[300px] bg-white shadow-lg rounded-lg mt-1 p-0">
                    <input
                        type="text"
                        placeholder="Search country..."
                        className="w-full p-2 border-b border-gray-300 focus:outline-none"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div className="max-h-72 overflow-y-auto">
                        {filteredOptions.length === 0 ? (
                            <div className="p-2 text-center">No country found.</div>
                        ) : (
                            filteredOptions.map((option) => (
                                <div
                                    key={option.value}
                                    className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => {
                                        handleSelect(option.value);
                                        setIsOpen(false);
                                    }}
                                >
                                    <FlagComponent
                                        country={option.value}
                                        countryName={option.label}
                                    />
                                    <span className="flex-1 text-sm">{option.label}</span>
                                    {option.value && (
                                        <span className="text-gray-500 text-sm">
                                            {`+${getCountryCallingCode(option.value)}`}
                                        </span>
                                    )}
                                    {/* {option.value === value && (
                                        <span className="ml-auto h-4 w-4 text-green-500">
                                            ✔️
                                        </span>
                                    )} */}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

const FlagComponent = ({ country, countryName }: RPNInput.FlagProps) => {
    const Flag = flags[country];

    return (
        <span className="bg-foreground/20 flex h-4 w-6 overflow-hidden rounded-sm">
            {Flag && <Flag title={countryName} />}
        </span>
    );
};

FlagComponent.displayName = "FlagComponent";

// Default country set to Nigeria
const defaultCountry: RPNInput.Country = 'NG'; // Nigeria's country code

export { PhoneInput, defaultCountry };
