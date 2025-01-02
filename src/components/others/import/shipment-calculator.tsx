"use client"


import React, { useState, useRef } from "react";
import { MdOutlineContentCopy } from "react-icons/md";
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

import { toast } from "@/hooks/use-toast";


interface BusinessData {
    businesssize: string;
}

export default function ShipmentCalculator (){
    const textRef = useRef<HTMLInputElement | null>(null);
    const phoneRef = useRef<HTMLInputElement | null>(null);

    const [value, setValue] = useState<number>(0);
    const [weight, setWeight] = useState<number>(0);
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [businessData, setBusinessData] = useState<BusinessData>({ businesssize: "low" });
    const [textValue, setTextValue] = useState<string>("");
    const [totalValue, setTotalValue] = useState<number>(0);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseFloat(e.target.value);
        let valuePoint = 0;
        const decimalNumber = 0.454.toFixed(3);
        const weightValue = (newValue * parseFloat(decimalNumber)).toFixed(2);
        
        setValue(newValue);
        setWeight(parseFloat(weightValue));

        if (businessData.businesssize.includes("low")) {
            setTextValue("");
            valuePoint = newValue;
        } else if (businessData.businesssize.includes("medium")) {
            setTextValue("$15");
            valuePoint = 15 + newValue;
        } else if (businessData.businesssize.includes("high")) {
            setTextValue("$20");
            valuePoint = 20 + newValue;
        }

        const totalPrice = 8;
        const totalAmount = totalPrice + valuePoint;
        setTotalValue(totalAmount);


        toast({
            title: "Success",
            description: "Estimated calculated",
            variant: "default",
        });
    };

    const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let newValue = parseFloat(e.target.value);
        const constantValue = 0.454;

        if (newValue < constantValue) {
            newValue = constantValue;
        }

        setWeight(newValue);
        const decimalNumber = 0.453592.toFixed(3);
        const weightValue = (newValue / parseFloat(decimalNumber)).toFixed(2);
        setValue(parseFloat(weightValue));
    };

    const handleChangeValue = (selectedValue: string) => {
        let valuePoint = 0;

        if (value === 0) return;

        if (selectedValue.includes("low")) {
            setTextValue("");
            const totalPrice = value + 8;
            setTotalValue(totalPrice);
        } else if (selectedValue.includes("medium")) {
            setTextValue("$15");
            valuePoint = 15;
            const totalPrice = value + 8;
            const totalAmount = totalPrice + valuePoint;
            setTotalValue(totalAmount);
        } else if (selectedValue.includes("high")) {
            setTextValue("$20");
            valuePoint = 20;
            const totalPrice = value + 8;
            const totalAmount = totalPrice + valuePoint;
            setTotalValue(totalAmount);
        }
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let newValue = value;
        let valuePoint = 0;
        const decimalNumber = 0.454.toFixed(3);
        const weightValue = (newValue * parseFloat(decimalNumber)).toFixed(2);
        
        setValue(newValue);
        setWeight(parseFloat(weightValue));

        if (businessData.businesssize.includes("low")) {
            setTextValue("");
            valuePoint = newValue;
        } else if (businessData.businesssize.includes("medium")) {
            setTextValue("$15");
            valuePoint = 15 + newValue;
        } else if (businessData.businesssize.includes("high")) {
            setTextValue("$20");
            valuePoint = 20 + newValue;
        }

        const totalPrice = 8;
        const totalAmount = totalPrice + valuePoint;
        setTotalValue(totalAmount);
        setIsChecked(e.target.checked);
        setTotalValue(e.target.checked ? totalAmount + 10 : totalAmount);
    };

    const handleBusinessSize = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value === "Select an option" ? null : event.target.value;
        setBusinessData(prevBusinessData => ({
            ...prevBusinessData,
            businesssize: selectedValue || "low",
        }));

        if (selectedValue) {
            handleChangeValue(selectedValue);
        }
    };

    const businessOptions = [
        { value: "low", label: "Lagos Pickup", index: 0 },
        { value: "medium", label: "Home Delivery - Lagos", index: 1 },
        { value: "high", label: "Home Delivery - Outside Lagos", index: 2 },
    ];

    return (
        <div className="w-full z-0 relative px-0">
            <div>
                <div className="text-slate-800 px-3 py-2 font-semibold text-sm mt-3">Calculate your shipping cost here</div>
                <div className="md:py-4 md:px-6 xs:py-2 xs:px-2 w-full">
                    <div className="flex md:flex-row xs:flex-col w-full justify-center items-center gap-5 md:my-7 xs:my-7">
                        <div className="w-full">
                            <div className="text-sm font-[400]">Origin Country</div>
                            <div className="relative">
                                <input
                                    ref={textRef}
                                    className="indent-3 w-full rounded-md border text-gray-700 font-light outline-none text-[15px] py-1 bg-gray-200"
                                    value={'United States'}
                                    readOnly
                                />
                            </div>
                        </div>
                        <div className="w-full">
                            <div className="text-sm font-[400]">Destination Country</div>
                            <div className="relative">
                                <input
                                    ref={phoneRef}
                                    className="indent-3 w-full rounded-md border text-gray-700 font-light outline-none text-[15px] py-1 bg-gray-200"
                                    value={'Nigeria'}
                                    readOnly
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex md:flex-row xs:flex-col w-full justify-center items-center gap-5 md:my-7 xs:my-7 relative">
                        <div className="w-full">
                            <div className="text-sm font-[400]">Weight of shipment (lbs)</div>
                            <div className="relative">
                                <input
                                    value={value}
                                    type="number"
                                    className="indent-3 w-full rounded-md border text-slate-700 font-light outline-none text-[15px] py-1 bg-white"
                                    onChange={handleInputChange}
                                    step="0.01"
                                    min="1.00"
                                />
                            </div>
                        </div>
                        <div className="flex justify-center items-center h-full font-light md:mt-5 xs:mt-0">=</div>
                        <div className="w-full">
                            <div className="text-sm font-[400]">Weight of shipment (Kg)</div>
                            <div className="relative">
                                <input
                                    value={weight}
                                    type="number"
                                    className="indent-3 w-full rounded-md border text-slate-700 font-light outline-none text-[15px] py-1 bg-white"
                                    onChange={handleWeightChange}
                                    step="0.01"
                                    min="0.454"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="group relative md:my-7 xs:my-7">
                        <label className="text-sm font-[400]">Delivery Type</label>
                        <select
                            onChange={handleBusinessSize}
                            className="peer h-10 text-base font-light w-full rounded-md border border-gray-200 bg-gray-50 px-4 outline-none transition-all duration-200 ease-in-out focus:bg-white"
                            required
                        >
                            {businessOptions.map((businessOption) => (
                                <option key={businessOption.index} value={businessOption.value}>
                                    {businessOption.label}
                                </option>
                            ))}
                        </select>
                        <div className="flex justify-between w-full mt-2 font-light text-[15px]">
                            <div>
                                {textValue && <p>Delivery Fee</p>}
                            </div>
                            <div>
                                {textValue && <p>+{textValue}</p>}
                            </div>
                        </div>
                    </div>
                    <div className="group relative mt-5 md:my-7 xs:my-7">
                        <div className="text-sm font-[400]">Total Price to Shipment</div>
                        <div className="indent-3 w-full rounded-md border text-slate-700 font-light outline-none text-[15px] py-1 bg-gray-300">
                            <p>${totalValue || 0}</p>
                        </div>
                    </div>
                    <div className="text-xs font-[400] flex md:flex-row xs:flex-col justify-between w-full gap-5">
                        <div className="flex items-center">
                            <div>
                                <input
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={handleCheckboxChange}
                                    className="text-lg w-3 h-3 mt-1"
                                />
                            </div>
                            <div className="ml-2">This shipment contains an extra large shipment</div>
                        </div>
                        <div className="flex items-center">Extra large items require a different mode of delivery</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

