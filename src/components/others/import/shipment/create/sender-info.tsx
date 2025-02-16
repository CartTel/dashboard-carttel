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
// import "react-phone-input-2/lib/style.css";
// import PhoneInput from "react-phone-input-2";
import Spinner from '@/components/ui/Spinner/Spinner';
import axios from "axios";
import { toast } from "@/hooks/use-toast";
import { SkeletonLoader } from '@/components/ui/skeletonCard';


import { getAllCountries, getAllCities, getAllStates } from '@/config/api';

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

interface SenderInfoImportProps {
    active: number;
    setActive: (active: number) => void;
    isLoadingButton: boolean;
    formData: SenderInfoForm; // Use the SenderInfoForm interface
    setFormData: React.Dispatch<React.SetStateAction<SenderInfoForm>>;
}


const SenderInfoImport = ({
    active,
    setActive,
    isLoadingButton,
    formData,
    setFormData
}: SenderInfoImportProps) => {


    const [countryInfo, setCountryInfo] = useState([]);
    const [statesInfo, setStatesInfo] = useState([]);
    const [citiesInfo, setCitiesInfo] = useState([]);
    const userString = localStorage.getItem("user");

    const [statesCountry, setStatesCountry] = useState([]);
    const [citiesState, setCitiesState] = useState([]);

    const { data: statesData, isLoading: isLoadingStates, isError: isErrorStates, error: statesError } = useQuery({
        queryKey: ["states"],
        queryFn: getAllStates,
        staleTime: Infinity,
    });

    const { data: countriesData, isLoading: isLoadingCountries, isError: isErrorCountries, error: countriesError } = useQuery({
        queryKey: ["countries"],
        queryFn: getAllCountries,
        staleTime: Infinity,
    });

    const { data: citiesData, isLoading: isLoadingCities, isError: isErrorCities, error: citiesError } = useQuery({
        queryKey: ["cities"],
        queryFn: getAllCities,
        staleTime: Infinity,
    });

    useEffect(() => {
        if (userString) {
            if (!userString) {
                throw new Error("User not found in local storage");
            }
            let user: any;
            try {
                user = JSON.parse(userString); // Attempt to parse user data
            } catch (parseError) {
                console.log("Invalid user data format in local storage");
            }

            setFormData((prev: any) => {
                const newData = {
                    ...prev,
                    userId: user.user.id,
                    senderInfo: {
                        ...prev.senderInfo,
                        name: `${user.user.firstname} ${user.user.lastname}`,
                    },
                };
                return newData;
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userString]);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const transformedData: any = countriesData?.data?.map((state: any) => ({
                    label: state.name,
                    // code: state.id,
                    value: state.id,
                })).sort((a: any, b: any) => a.label.localeCompare(b.label));;

                setCountryInfo(transformedData)
                // console.log("data transformed ..", transformedData);
            } catch (error) {
                console.error("Error fetching countries:", error);
            }
        };
        fetchCountries(); // Fetch data on component mount
    }, [countriesData]);

    useEffect(() => {
        const fetchStates = async () => {
            try {
                const transformedData: any = statesData?.data?.map((user: any) => ({
                    label: user.name,
                    value: user.id,
                }));
                setStatesInfo(transformedData)
            } catch (error) {
                console.error("Error fetching states:", error);
            }
        };
        fetchStates(); // Fetch data on component mount
    }, [statesData]);

    useEffect(() => {
        const fetchCities = async () => {
            try {
                const transformedData: any = citiesData?.data?.map((user: any) => ({
                    label: user.name,
                    value: user.id,
                }));
                setCitiesInfo(transformedData)
            } catch (error) {
                console.error("Error fetching states:", error);
            }
        };
        fetchCities(); // Fetch data on component mount
    }, [citiesData]);

    // Local state for states data.
    const [states, setStates] = useState<any[]>([]);
    const [filterStates, setFilterStates] = useState<any[]>([]);
    const [filterCities, setFilterCities] = useState<any[]>([]);

    // const filteredStates = useMemo(() => {
    //     console.log("states data ..", statesData, formData.senderInfo.country)
    //     if (!statesData || !formData.senderInfo.country) return [];
    //     return statesData?.data?.filter((state: any) => state.country_id === formData.senderInfo.country);
    // }, [statesData, formData?.senderInfo?.country]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        if (!name) {
            console.error("Input element is missing the 'name' attribute.");
            return;
        }

        // Check if the field is nested under senderInfo (e.g. "senderInfo.phone")
        if (name.startsWith("senderInfo.")) {
            // Extract the property key from the input name
            const key = name.split(".")[1];
            setFormData((prev: any) => ({
                ...prev,
                senderInfo: {
                    ...prev.senderInfo,
                    [key]: value,
                },
            }));
        } else {
            // For top-level properties
            setFormData((prev: any) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleCountryChange = (value: string) => {
        const selectedCountryObj = countriesData?.data?.find(
            (country: any) => country.id === Number(value)
        );
        const selectedCountryName = selectedCountryObj ? selectedCountryObj.name : value;
        const levels = statesData?.data?.filter((data: any) => data?.country_id == value).sort((a: any, b: any) => a.name.localeCompare(b.name));
        const transformedData: any = levels?.map((state: any) => ({
            label: state.name,
            value: state.id,
        }));
        setStatesCountry(transformedData)
        setFormData((prev: any) => ({
            ...prev,
            senderInfo: {
                ...prev.senderInfo,
                country: selectedCountryName
            },
        }));
    };

    const handleStateChange = (value: string) => {
        const selectedStateObj = statesData?.data?.find(
            (state: any) => state.id === Number(value)
        );
        const selectedStateName = selectedStateObj ? selectedStateObj.name : value;
        const levels = citiesData?.data?.filter((data: any) => data?.state_id == value).sort((a: any, b: any) => a.name.localeCompare(b.name));
        const transformedData: any = levels?.map((city: any) => ({
            label: city.name,
            value: city.id,
        }));
        setCitiesState(transformedData)
        setFormData((prev: any) => ({
            ...prev,
            senderInfo: {
                ...prev.senderInfo,
                state: selectedStateName,
            },
        }));
    };

    const handleCitiesChange = (value: string) => {
        const selectedCitiesObj = citiesData?.data?.find(
            (state: any) => state.id === value
        );
        // Use the label if found; otherwise, fall back to the value.
        const selectedCitiesName = selectedCitiesObj ? selectedCitiesObj.name : value;
        setFormData((prev: any) => ({
            ...prev,
            senderInfo: {
                ...prev.senderInfo,
                city: selectedCitiesName,
            },
        }));
    };

    const validateForm = () => {
        // Validate form fields and set validation errors
        if (!formData.name) {
            toast({
                title: "Error",
                description: 'Name is required!',
                variant: "destructive",
            });
            return false;
        }
        if (!formData.description) {
            toast({
                title: "Error",
                description: 'Description is required!',
                variant: "destructive",
            });
            return false;
        }
        return true;

    };

    const handleProviderOne = () => {
        console.log("form data..", formData);
        const valid = validateForm();
        if (valid) {
            setActive(2)
        }
    };

    const handleInputCitiesChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev: any) => ({
            ...prev,
            senderInfo: {
                ...prev.senderInfo,
                city: value,
            },
        }));
    };

    // This useMemo recalculates every time receiverInfo changes.
    const isReceiverInfoComplete = useMemo(() => {
        const receiver = formData.senderInfo;
        // Check that every value is a non-empty string.
        return Object.values(receiver).every(
            (field) => typeof field === 'string' && field.trim() !== ""
        );
    }, [formData.senderInfo]);

    if (isLoadingStates || isLoadingCountries || isLoadingCities) {
        // return <div className='w-full flex justify-center items-center'>
        //                     <div className="loader"></div>
        //                 </div>
        return <SkeletonLoader number={5} />
    }

    return (
        <div>
            <div>
                <div className=' text-[16px] md:item-center flex md:justify-start text-start font-medium bg-primary text-white py-2 px-2 my-10'>Sender Info</div>

                <div className=' text-[16px] md:item-center flex md:justify-start text-start font-medium py-2  my-3 text-slate-600'>Add a new sender</div>

                <div className="px-0">
                    <div className="flex md:flex-row xs:flex-col gap-10 my-10">
                        <div className={`form-group flex w-[100%] text-[1rem] my-0`}>

                            <CustomInput
                                id="name"
                                name="name"
                                type="text"
                                label="Shipment Name"
                                required
                                value={formData?.name}
                                onChange={handleChange}
                                showRequirement={true}
                                className="px-0 mb-[5px] md:w-full xs:w-full text-[16px]"
                            />
                        </div>
                        <div className={`form-group flex w-[100%] text-[1rem] my-0`}>
                            <CustomInput
                                id="email"
                                name="senderInfo.email"
                                type="email"
                                label="Email Address"
                                required
                                value={formData?.senderInfo?.email}
                                onChange={handleChange}
                                showRequirement={true}
                                className="px-0 mb-[5px] md:w-full xs:w-full text-[16px]"
                            />
                        </div>
                    </div>

                    <div className="flex md:flex-row xs:flex-col gap-10 my-10">
                        <div className={`form-group flex w-[100%] text-[1rem] my-0`}>
                            <CustomInput
                                id="address_line_1"
                                name="senderInfo.address_line_1" // Updated name to match nested property
                                type="text"
                                label="Address Line 1"
                                required
                                value={formData?.senderInfo?.address_line_1}
                                onChange={handleChange}
                                showRequirement={true}
                                className="px-0 mb-[5px] md:w-full xs:w-full text-[16px]"
                            />

                        </div>
                        <div className={`form-group flex w-[100%] text-[1rem] my-0`}>
                            <CustomInput
                                id="address_line_2"
                                name="senderInfo.address_line_2" // Updated name to match nested property
                                type="text"
                                label="Address Line 2"
                                required
                                value={formData?.senderInfo?.address_line_2}
                                onChange={handleChange}
                                className="px-0 mb-[5px] md:w-full xs:w-full text-[16px]"
                            />
                        </div>
                    </div>

                    <div className="flex md:flex-row xs:flex-col gap-10 my-10">
                        <div className={` w-[100%] text-[1rem] my-0`}>
                            {/* <PhoneInput/> */}

                            <PhoneInput
                                value={formData?.senderInfo?.phone}
                                onChange={(value: string | undefined) => {
                                    setFormData((prev: any) => ({
                                        ...prev,
                                        senderInfo: {
                                            ...prev.senderInfo,
                                            phone: value || ""
                                        }
                                    }));
                                }}
                                defaultCountry={defaultCountry} // Set the default country to Nigeria
                                international
                            />

                        </div>
                        <div className={`form-group flex w-[100%] text-[1rem] my-0`}>
                            <CustomInput
                                id="postal_code"
                                name="senderInfo.postal_code" // Updated name to match nested property
                                type="number"
                                label="Postal Code"
                                required
                                value={formData?.senderInfo?.postal_code}
                                onChange={handleChange}
                                className="px-0 mb-[5px] md:w-full xs:w-full text-[16px]"
                            />
                        </div>
                    </div>

                    <div className="flex md:flex-row xs:flex-col gap-10 my-10">
                        <div className={` w-[100%] text-[1rem] my-0`}>
                            {/* <CountrySelector
                                onChange={handleCountryChange} // Pass the handleChange function
                                value={formData.senderInfo.country} // Control the value if needed
                            /> */}
                            <CustomSelect
                                wrapperClass='!border-[0.5px] !border-gray !h-[58px] md:w-full xs:w-full'
                                labelClass='!text-[0.875rem] text-gray-500 w-full'
                                optionsClass='!text-[0.875rem] !h-[48px] !w-[100%]'
                                optionWrapperClass=' border-[1px] border-gray-400 w-[100%] !w-full xl:left-[0px] !left-[0px] !h-[200px] !bottom-[-205px] overflow-y-auto'
                                label='Select Country?'
                                setSelected={handleCountryChange}
                                selected={formData?.senderInfo?.country?.toString()}
                                options={countryInfo}
                            />
                        </div>
                        <div className={`form-group flex w-[100%] text-[1rem] my-0`}>
                            {/* {formData?.senderInfo?.country}
                            {formData?.senderInfo?.state} */}
                            {
                                formData?.senderInfo?.country && (
                                    <CustomSelect
                                        wrapperClass='!border-[0.5px] !border-gray !h-[58px] md:w-full xs:w-full'
                                        labelClass='!text-[0.875rem] text-gray-500 w-full'
                                        optionsClass='!text-[0.875rem] !h-[48px] !w-[100%]'
                                        optionWrapperClass=' border-[1px] border-gray-400 w-[100%] !w-full xl:left-[0px] !left-[0px] !h-[200px] !bottom-[-205px] overflow-y-auto'
                                        label='Select State?'
                                        setSelected={handleStateChange}
                                        selected={formData?.senderInfo?.state}
                                        options={statesCountry}
                                    />
                                )
                            }
                        </div>
                        <div className={`form-group flex w-[100%] text-[1rem] my-0`}>
                            {
                                formData?.senderInfo?.state && (

                                    citiesState.length > 0 ?
                                        <CustomSelect
                                            wrapperClass='!border-[0.5px] !border-gray !h-[58px] md:w-full xs:w-full'
                                            labelClass='!text-[0.875rem] text-gray-500 w-full'
                                            optionsClass='!text-[0.875rem] !h-[48px] !w-[100%]'
                                            optionWrapperClass=' border-[1px] border-gray-400 w-[100%] !w-full xl:left-[0px] !left-[0px] !h-[200px] !bottom-[-205px] overflow-y-auto'
                                            label='Select City?'
                                            setSelected={handleCitiesChange}
                                            selected={formData?.senderInfo?.city}
                                            options={citiesState}
                                        />
                                        :
                                        <CustomInput
                                            id="city"
                                            name="city"
                                            type="text"
                                            label="Type City?"
                                            required
                                            value={formData?.senderInfo?.city}
                                            onChange={handleInputCitiesChange}
                                            className="px-0 mb-[5px] md:w-full xs:w-full text-[16px]"
                                        />
                                )

                            }
                        </div>
                    </div>
                    <div className="flex md:flex-row xs:flex-col gap-10 my-10">
                        <CustomInput
                            id="description"
                            inputType="textarea"
                            label="Description"
                            className="!h-[150px] mb-[38px]"
                            setValue={(value) =>
                                setFormData((prev: any) => ({ ...prev, description: value }))
                            }
                            value={formData?.description}
                        />
                    </div>

                    <div className='mt-5 flex justify-end w-full'>
                        <label className="inline-flex items-center me-5 cursor-pointer">
                            <input type="checkbox" value="" className="sr-only peer" />
                            <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-[#acbbf2] dark:peer-focus:ring-primary peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Save Address</span>
                        </label>

                    </div>

                    <div className="my-10 xs:text-[10px] md:text-[13px] text-primary bg-sky-200 rounded-lg px-2 py-2 bg-opacity-50 font-[500] md:leading-7 xs:leading-5">
                        Please note that when toggle the button to save address and you click on the continue button. it will automatically add this saved address to your address Book. But when you have exceeded your limit due to your current plan, You would have to change plans to save the address.
                    </div>


                    <div className="flex pb-10">
                        <div className="flex z-10 relative mt-4 w-full text-center justify-center">
                            <button
                                onClick={handleProviderOne}
                                disabled={!isReceiverInfoComplete}
                                className={`${!isReceiverInfoComplete ? "bg-primary opacity-40" : "bg-primary"} flex text-center justify-center font-semibold z-10 relative md:text-[16px] rounded-lg md:py-2 md:px-16 xs:text-[15px] xs:py-4 xs:px-10 w-full !text-white`}
                            >
                                Continue
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default SenderInfoImport