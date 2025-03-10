"use client"


import { PhoneInput, defaultCountry } from '@/components/custom-components/phone-input';
import Image from 'next/image'
import { CustomButton, CustomSelect } from '@/components/custom-components';
import { CustomInput } from '@/components/custom-components';
import { B1, B2, H2, H1, BMiddle, B2Regular } from '@/components/custom-typography';
import Link from 'next/link';
import CountrySelector from '@/components/custom-components/country-selector';
import { useQuery } from "@tanstack/react-query";
import React from 'react'
import { useState, useEffect, useMemo } from 'react';

import Spinner from '@/components/ui/Spinner/Spinner';
import axios from "axios";
import { SkeletonLoader } from '@/components/ui/skeletonCard';


import { fetchAllCategories } from '@/config/api';

interface SenderInfoDetails {
    name: string,
    email: string,
    phone: string,
    address_line_1: string,
    address_line_2: string,
    postal_code: string,
    country: string,
    state: string,
    city: string
}

interface ReceiverInfoDetails {
    name: string,
    email: string,
    phone: string,
    address_line_1: string,
    address_line_2: string,
    postal_code: string,
    country: string,
    state: string,
    city: string
}

interface TrackingDetails {
    tracking_id: string,
    tracking_url: string,
    tracking_number: string,
    third_party_tracking_id: string,
    third_party_tracking_name: string
}

interface InsuranceDetails {
    insurance_type: "",
    policy_number: "",
    start_date: Date | null,
    end_date: Date | null
}

interface ItemDetails {
    name: string;
    quantity: number;
    value: number;
    description: string;
    weight: number;
    category: string;
    dimension: {
        length: number;
        width: number;
        height: number;
    };
}

interface ItemDetailArray {
    // id: number;
    name: string;
    quantity: number;
    value: number;
    description: string;
    weight: number;
    category: string;
    dimension: {
        length: number;
        width: number;
        height: number;
    };
}

interface SenderInfoForm {
    userId: number | any;
    name: string;
    description: string;
    senderInfo: SenderInfoDetails;
    receiverInfo: ReceiverInfoDetails;
    tracking: TrackingDetails
    insurance: InsuranceDetails
    items: ItemDetails[];
}

interface ItemInfoImportProps {
    items: ItemDetailArray[];
    setItems: (active: any) => void;
    isLoadingButton: boolean;
    active: number;
    setActive: (active: number) => void;
    formData: SenderInfoForm; // Use the SenderInfoForm interface
    setFormData: React.Dispatch<React.SetStateAction<SenderInfoForm>>;
}


const ItemImport = ({
    active,
    setActive,
    isLoadingButton,
    formData,
    items,
    setItems,
    setFormData
}: ItemInfoImportProps) => {

    const { data: categoriesData, isLoading: isLoadingCategories, isError: isErrorCategories, error: statesError } = useQuery({
        queryKey: ["categories"],
        queryFn: fetchAllCategories,
        staleTime: Infinity,
    });

    const [categoryInfo, setCategoryInfo] = useState<any>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            console.log("object", categoriesData);
            try {
                const transformedData: any = categoriesData?.map((user: any) => ({
                    label: user.name,
                    value: user.name,
                }));
                console.log("first", transformedData)
                setCategoryInfo(transformedData)
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        fetchCategories(); // Fetch data on component mount
    }, [categoriesData]);

    const [itemCount, setItemCount] = useState(1);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        if (!name) {
            console.error("Input element is missing the 'name' attribute.");
            return;
        }
        if (name.startsWith("items.")) {

            const key = name.split(".")[1];
            setFormData((prev: any) => ({
                ...prev,
                items: {
                    ...prev.items,
                    [key]: value,
                },
            }));
        }
    };

    const handleCategoriesChange = (value: string) => {
        const selectedCitiesObj = categoriesData?.data?.find(
            (state: any) => state.id === value
        );
        // Use the label if found; otherwise, fall back to the value.
        const selectedCitiesName = selectedCitiesObj ? selectedCitiesObj.name : value;

        setItems((prev: any) => ({
            ...prev,
            category: value
        }));
    };

    const handleRemoveItem = (index: number) => {
        setFormData((prev) => ({
            ...prev,
            items: prev.items.filter((_, i) => i !== index),
        }));
    };


    const handleAddNewItem = () => {
        setFormData((prev: any) => ({
            ...prev,
            items: [
                ...prev.items,
                {
                    name: "",
                    quantity: "",
                    value: null,
                    description: "",
                    weight: 0,
                    category: null,
                    dimension: {
                        length: 0,
                        width: 0,
                        height: 0,
                    },
                },
            ],
        }));
    };




    //   const handleChangeItem = (index, e) => {
    //     const updatedItems = [...items];
    //     updatedItems[index] = {
    //       ...updatedItems[index],
    //       [e.target.name]: e.target.value,
    //     };
    //     setItems(updatedItems);
    //   };
    const handleItemCategoryChange = (index: number, field: string, value: any) => {

        const timeArray: any = categoryInfo?.find((category: any) => category.value === value)?.label
        // console.log("first item", timeArray, field)
        setFormData((prev: any) => {
            // Copy the existing items array.
            const newItems = [...prev.items];

            {
                newItems[index] = {
                    ...newItems[index],
                    [field]: timeArray
                };
            }

            return { ...prev, items: newItems };
        });
    };

    const handleItemChange = (index: number, field: string, value: any) => {
        setFormData((prev: any) => {
            // Copy the existing items array.
            const newItems = [...prev.items];

            if (field.includes('.')) {
                const parts = field.split('.');
                const parentKey = parts[0];
                const childKey = parts[1];

                // Update the nested object, converting value to a number.
                newItems[index] = {
                    ...newItems[index],
                    [parentKey]: {
                        ...(newItems[index][parentKey] || {}),
                        [childKey]: parseFloat(value)
                    }
                };
            } else {
                newItems[index] = {
                    ...newItems[index],
                    [field]: parseFloat(value)
                };
            }

            return { ...prev, items: newItems };
        });
    };

    const handleDescriptionChange = (index: number, field: string, value: any) => {
        setFormData((prev: any) => {
            const newItems = [...prev.items];
            newItems[index] = { ...newItems[index], [field]: value };
            return { ...prev, items: newItems };
        });
    };

    const renderPreviousForm = () => {
        // console.log("all the prevoius data...", detailsData);
        setActive(active - 1);
    };

    const handleProviderFour = () => {
        console.log("all the prevoius data...", formData);
        setActive(active + 1);
    };

    // Helper to check if every item is complete
    const areItemsComplete = useMemo(() => {
        // Return false if no items are present
        if (!formData?.items || formData?.items.length === 0) return false;
        return formData?.items.every((item: any) => {
            // Check that text fields are non-empty
            const textComplete =
                item?.name?.trim() !== "" &&
                item?.category?.trim() !== "" &&
                item?.description?.trim() !== "";

            // Check that numeric fields are not null.
            // Adjust the condition if 0 should be considered incomplete.
            const numbersComplete =
                item?.value !== null &&
                item?.quantity !== null &&
                item?.weight !== null;

            // Check nested dimension fields
            const dimension = item?.dimension;
            const dimensionComplete =
                dimension &&
                dimension?.length !== null &&
                dimension?.width !== null &&
                dimension?.height !== null;

            return textComplete && numbersComplete && dimensionComplete;
        });
    }, [formData.items]);



    if (isLoadingCategories) {
        return <SkeletonLoader number={5} />
    }

    return (
        <div>
            <div className=' text-[16px] md:item-center flex md:justify-start text-start font-medium bg-primary text-white py-2 px-2 my-5'>Item Info</div>
            <div className='mt-5 flex justify-end w-full'>
                <div className="inline-flex items-center me-5 cursor-pointer"
                    onClick={handleAddNewItem}
                >
                    <button className="py-0 px-2 rounded-full bg-primary text-white text-xl">+</button>
                    <span className="ms-3 text-sm font-medium text-primary dark:text-gray-300">Add New Item</span>
                </div>
            </div>

            <div>
                <div>
                    {formData?.items?.map((item: any, index: number) => (
                        <div key={item.id || index} className="my-10">
                            <div className=" border-[1px] border-gray-300 block w-full pb-1 text-md font-semibold text-primary transition-all duration-200 ease-in-out group-focus-within:text-blue-400 md:mt-5 xs:mt-0 md:text-[15px] xs:text-[15px] bg-plain px-2">
                                Item {index + 1}
                            </div>

                            <div className="px-2 border-[1px] border-gray-200 ">
                                <div className=" grid items-center pb-5 lg:grid-cols-2 md:grid-cols-1 xs:gap-5 md:gap-5">
                                    <div className={`form-group flex w-[100%] text-[1rem] mt-2`}>

                                        <CustomInput
                                            id="name"
                                            name="name"
                                            type="text"
                                            label="Item Name"
                                            required
                                            value={item.name || ""}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                                                handleDescriptionChange(index, 'name', e.target.value)
                                            }
                                            showRequirement={true}
                                            className="px-0 mb-[0px] md:w-full xs:w-full text-[16px]"
                                        />
                                    </div>

                                    <div className="group relative mt-2">
                                        <CustomSelect
                                            wrapperClass="!border-[0.5px] !border-gray !h-[58px] md:w-full xs:w-full"
                                            labelClass="!text-[0.875rem] text-gray-500 w-full"
                                            optionsClass="!text-[0.875rem] !h-[48px] !w-[100%]"
                                            optionWrapperClass="border-[1px] border-gray-400 w-[100%] !w-full xl:left-[0px] !left-[0px] !h-[200px] !bottom-[-205px] overflow-y-auto"
                                            label="Item Category"
                                            setSelected={(value: string) =>
                                                handleItemCategoryChange(index, 'category', value)
                                            }
                                            selected={item?.category}
                                            options={categoryInfo}
                                        />

                                    </div>

                                </div>
                                <div className=" grid items-center pb-5 lg:grid-cols-2 md:grid-cols-1 xs:gap-5 md:gap-5">
                                    <div className={`form-group flex w-[100%] text-[1rem] mt-2`}>

                                        <CustomInput
                                            id="name"
                                            name="value"
                                            type="number"
                                            label="Item Value($)"
                                            required
                                            value={item.value || ""}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                                                handleItemChange(index, 'value', e.target.value)
                                            }
                                            min={1}
                                            showRequirement={true}
                                            className="px-0 mb-[0px] md:w-full xs:w-full text-[16px]"
                                        />
                                    </div>

                                    <div className={`form-group flex w-[100%] text-[1rem] mt-2`}>

                                        <CustomInput
                                            id="quantity"
                                            name="quantity"
                                            type="number"
                                            label="Quantity"
                                            required
                                            min={1}
                                            value={item.quantity || ""}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                                                handleItemChange(index, 'quantity', e.target.value)
                                            }
                                            showRequirement={true}
                                            className="px-0 mb-[0px] md:w-full xs:w-full text-[16px]"
                                        />
                                    </div>

                                </div>

                                <div className="grid pb-5 lg:grid-cols-2 md:grid-cols-1 xs:gap-5 md:gap-5">
                                    <div className={`form-group flex w-[100%] text-[1rem] my-0`}>

                                        <CustomInput
                                            id="weight"
                                            name="weight"
                                            type="number"
                                            min={1}
                                            label="Estimated Weight(KG)"
                                            required
                                            value={item.weight || ""}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                                                handleItemChange(index, 'weight', e.target.value)
                                            }
                                            showRequirement={true}
                                            className="px-0 mb-[0px] md:w-full xs:w-full text-[16px]"
                                        />
                                    </div>

                                    <div className="flex md:flex-row xs:flex-col gap-10 my-0">
                                        <CustomInput
                                            id="description"
                                            inputType="textarea"
                                            label="Item Description"
                                            className="!h-[150px] mb-[38px]"
                                            // setValue={(value) =>
                                            //     setFormData((prev: any) => ({ ...prev, description: value }))
                                            // }
                                            required
                                            value={item.description || ""}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                                                handleDescriptionChange(index, 'description', e.target.value)
                                            }
                                            showRequirement={true}
                                            type="text"
                                        />
                                    </div>
                                </div>

                                <div className="group relative my-2">
                                    <div className="block w-full pb-1 text-xs font-medium text-gray-800 transition-all duration-200 ease-in-out group-focus-within:text-blue-400 md:mt-10 xs:mt-0">Dimension</div>
                                    <div className="grid items-center pb-5 lg:grid-cols-3 md:grid-cols-1 xs:gap-5 md:gap-5">

                                        <div className={`form-group flex w-[100%] text-[1rem] my-0`}>
                                            <CustomInput
                                                id="length"
                                                name="dimension.length"
                                                type="number"
                                                label="Length"
                                                required
                                                min={1}
                                                value={item.dimension.length || ""}
                                                onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                                                    handleItemChange(index, 'dimension.length', e.target.value)
                                                }
                                                showRequirement={true}
                                                className="px-0 mb-[0px] md:w-full xs:w-full text-[16px]"
                                            />
                                        </div>

                                        <div className={`form-group flex w-[100%] text-[1rem] my-0`}>

                                            <CustomInput
                                                id="width"
                                                name="dimension.width"
                                                type="number"
                                                label="Width"
                                                required
                                                min={1}
                                                value={item.dimension.width || ""}
                                                onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                                                    handleItemChange(index, 'dimension.width', e.target.value)
                                                }
                                                showRequirement={true}
                                                className="px-0 mb-[0px] md:w-full xs:w-full text-[16px]"
                                            />
                                        </div>
                                        <div className={`form-group flex w-[100%] text-[1rem] my-0`}>
                                            <CustomInput
                                                id="height"
                                                name="dimension.height"
                                                type="number"
                                                label="Height"
                                                min={1}
                                                required
                                                value={item.dimension.height || ""}
                                                onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                                                    handleItemChange(index, 'dimension.height', e.target.value)
                                                }
                                                showRequirement={true}
                                                className="px-0 mb-[0px] md:w-full xs:w-full text-[16px]"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='mt-5 flex justify-end w-full'>
                                <button
                                    disabled={formData?.items.length <= 1}
                                    className={`${formData?.items.length <= 1
                                        ? "opacity-30 cursor-not-allowed"
                                        : ""
                                        } inline-flex items-center me-5 cursor-pointer`}
                                    onClick={() => handleRemoveItem(index)}
                                >

                                    <div className="w-fit flex justify-center items-center bg-slate-200 rounded-full p-2">
                                        <Image
                                            src={"/images/Home/trash.svg"}
                                            alt="check"
                                            width={20}
                                            height={20}
                                        />
                                    </div>
                                    <span className="ms-3 text-sm font-medium text-primary dark:text-gray-300">Delete Item</span>
                                </button>
                            </div>
                        </div>
                    ))}

                </div>

                <div className="flex justify-between pb-10">

                    <div className="flex">
                        <div className="flex justify-end z-10 relative mt-4 mr-3">
                            <button
                                onClick={handleProviderFour}
                                disabled={!areItemsComplete}
                                className={`${!areItemsComplete ? "bg-primary opacity-40" : "bg-primary"} flex text-center justify-center font-semibold z-10 relative md:text-[16px] rounded-lg md:py-2 md:px-16 xs:text-[15px] xs:py-4 xs:px-10 w-full !text-white`}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                    <div className="flex justify-end z-10 relative mt-4 ">
                        <button
                            onClick={renderPreviousForm}
                            className="flex justify-end z-10 relative bg-white border-[1px] border-primary text-primary md:text-sm rounded-lg md:py-3 md:px-16 xs:text-[15px] xs:py-3 xs:px-10"
                        >
                            <span className="font-semibold">Previous</span>
                        </button>
                    </div>

                </div>
            </div>


        </div>
    )


}

export default ItemImport