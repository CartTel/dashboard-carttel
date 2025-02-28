"use client"


import { PhoneInput, defaultCountry } from '@/components/custom-components/phone-input';
import Image from 'next/image'
import { CustomButton, CustomSelect, CustomBreadCrumb } from '@/components/custom-components';
import { CustomInput } from '@/components/custom-components';
import { B1, B2, H2, H1, BMiddle, B2Regular } from '@/components/custom-typography';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
import { getAllCountries, getAllCities, getAllStates, createAddress } from '@/config/api';

const breadCrumb = [
    {
        label: "Home",
        link: "/dashboard/import",
    },
    {
        label: "Address",
        link: "/dashboard/import/address-book",
    },
    {
        label: "Create Address",

    },
];

interface CreateAddressDetails {
    userId: number | null;
    phone: string,
    address: string,
    additionalInformation: string,
    country: string,
    state: string,
    city: string
}

const CreateAddress = () => {
    const [formData, setFormData] = useState<CreateAddressDetails>({
        userId: null,
        phone: "",
        address: "",
        additionalInformation: "",
        country: "",
        state: "",
        city: ""
    });

    const router = useRouter()
    const [countryInfo, setCountryInfo] = useState([]);
    const [statesInfo, setStatesInfo] = useState([]);
    const [citiesInfo, setCitiesInfo] = useState([]);
    const userString = localStorage.getItem("user");
    const [loading, setLoading] = useState(false);

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

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        if (!name) {
            console.error("Input element is missing the 'name' attribute.");
            return;
        }

        setFormData((prev: any) => ({
            ...prev,
            [name]: value,
        }));
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
            country: selectedCountryName
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
            state: selectedStateName,

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
            city: selectedCitiesName,
        }));
    };

    const validateForm = () => {
        // Validate form fields and set validation errors
        if (!formData.address) {
            toast({
                title: "Error",
                description: 'Address is required!',
                variant: "destructive",
            });
            return false;
        }
        if (!formData.additionalInformation) {
            toast({
                title: "Error",
                description: 'Additional Information is required!',
                variant: "destructive",
            });
            return false;
        }
        return true;

    };

    const handleProviderOne = async () => {
        // console.log("form data..", formData);
        const valid = validateForm();
        if (valid) {
            // setActive(2)
            // console.log("first", formData)
            setLoading(true);
            try {
                const result = await createAddress(formData);
                if (result) {
                    toast({
                        title: "Success",
                        description: `Address Creation Successfully 🎉`,
                        variant: "destructive",
                    });
                    setLoading(false);
                    router.push("/dashboard/import/address-book");
                    // setTimeout(() => {
                    //     window.location.reload();
                    // }, 4000); // 1000ms = 1 second delay
                }
            } catch (err: any) {
                console.log("first", err)
                toast({
                    title: "Error",
                    description: `${err?.response?.data?.message}`,
                    variant: "destructive",
                });
            } finally {
                setLoading(false);
            }
        }
    };

    const handleInputCitiesChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev: any) => ({
            ...prev,
            city: value,
        }));
    };

    // This useMemo recalculates every time receiverInfo changes.
    const isReceiverInfoComplete = useMemo(() => {
        const receiver = formData;

        // Check that every value is a non-empty string or non-null value.
        return Object.values(receiver).every((field) => {
            if (field === null || field === undefined) {
                return false; // If the field is null or undefined, it's invalid.
            }
            if (typeof field === 'string') {
                return field.trim() !== ""; // Check if the string is not empty after trimming.
            }
            return true; // For non-string fields (e.g., userId), assume they are valid if not null/undefined.
        });
    }, [formData]);

    if (isLoadingStates || isLoadingCountries || isLoadingCities) {
        return <SkeletonLoader number={5} />
    }


    return (
        <div>
            <div>
                <CustomBreadCrumb items={breadCrumb} className="bg-gray-200 font-[500] text-primary w-fit px-5 py-1 rounded-lg" />
                <div className="my-[20px] flex lg:items-center justify-between lg:flex-row flex-col mb-[0px]">
                    <H1 className="">Create Address</H1>
                </div>
                <div className=' text-[16px] md:item-center flex md:justify-start text-start font-medium bg-primary text-white py-2 px-2 my-10'>Create New Address</div>

                <div className=' text-[16px] md:item-center flex md:justify-start text-start font-medium py-2  my-3 text-slate-600'>Add a New Address</div>

                <div className="px-0">
                    <div className="flex md:flex-row xs:flex-col gap-10 my-10">
                        <div className={`form-group flex w-[100%] text-[1rem] my-0`}>
                            <CustomInput
                                id="address"
                                name="address"
                                type="text"
                                label="Address"
                                required
                                value={formData?.address}
                                onChange={handleChange}
                                showRequirement={true}
                                className="px-0 mb-[5px] md:w-full xs:w-full text-[16px]"
                            />
                        </div>
                        <div className={` w-[100%] text-[1rem] my-0`}>
                            <PhoneInput
                                value={formData?.phone}
                                onChange={(value: string | undefined) => {
                                    setFormData((prev: any) => ({
                                        ...prev,
                                        phone: value || ""
                                    }));
                                }}
                                defaultCountry={defaultCountry} // Set the default country to Nigeria
                                international
                            />
                        </div>
                    </div>

                    <div className="flex md:flex-row xs:flex-col gap-10 my-10">
                        <div className={` w-[100%] text-[1rem] my-0`}>
                            <CustomSelect
                                wrapperClass='!border-[0.5px] !border-gray !h-[58px] md:w-full xs:w-full'
                                labelClass='!text-[0.875rem] text-gray-500 w-full'
                                optionsClass='!text-[0.875rem] !h-[48px] !w-[100%]'
                                optionWrapperClass=' border-[1px] border-gray-400 w-[100%] !w-full xl:left-[0px] !left-[0px] !h-[200px] !bottom-[-205px] overflow-y-auto'
                                label='Select Country?'
                                setSelected={handleCountryChange}
                                selected={formData?.country?.toString()}
                                options={countryInfo}
                            />
                        </div>
                        <div className={`form-group flex w-[100%] text-[1rem] my-0`}>
                            {
                                formData?.country && (
                                    <CustomSelect
                                        wrapperClass='!border-[0.5px] !border-gray !h-[58px] md:w-full xs:w-full'
                                        labelClass='!text-[0.875rem] text-gray-500 w-full'
                                        optionsClass='!text-[0.875rem] !h-[48px] !w-[100%]'
                                        optionWrapperClass=' border-[1px] border-gray-400 w-[100%] !w-full xl:left-[0px] !left-[0px] !h-[200px] !bottom-[-205px] overflow-y-auto'
                                        label='Select State?'
                                        setSelected={handleStateChange}
                                        selected={formData?.state}
                                        options={statesCountry}
                                    />
                                )
                            }
                        </div>
                        <div className={`form-group flex w-[100%] text-[1rem] my-0`}>
                            {
                                formData?.state && (
                                    citiesState.length > 0 ?
                                        <CustomSelect
                                            wrapperClass='!border-[0.5px] !border-gray !h-[58px] md:w-full xs:w-full'
                                            labelClass='!text-[0.875rem] text-gray-500 w-full'
                                            optionsClass='!text-[0.875rem] !h-[48px] !w-[100%]'
                                            optionWrapperClass=' border-[1px] border-gray-400 w-[100%] !w-full xl:left-[0px] !left-[0px] !h-[200px] !bottom-[-205px] overflow-y-auto'
                                            label='Select City?'
                                            setSelected={handleCitiesChange}
                                            selected={formData?.city}
                                            options={citiesState}
                                        />
                                        :
                                        <CustomInput
                                            id="city"
                                            name="city"
                                            type="text"
                                            label="Type City?"
                                            required
                                            value={formData?.city}
                                            onChange={handleInputCitiesChange}
                                            className="px-0 mb-[5px] md:w-full xs:w-full text-[16px]"
                                        />
                                )
                            }
                        </div>
                    </div>
                    <div className="flex md:flex-row xs:flex-col gap-10 my-10">
                        <CustomInput
                            id="additionalInformation"
                            inputType="textarea"
                            label="Additional Information"
                            className="!h-[150px] mb-[38px]"
                            setValue={(value) =>
                                setFormData((prev: any) => ({ ...prev, additionalInformation: value }))
                            }
                            value={formData?.additionalInformation}
                        />
                    </div>

                    <CustomButton
                        // disabled={loading}
                        // loaderState={loading}
                        onClick={handleProviderOne}
                        disabled={!isReceiverInfoComplete && loading}
                        className={`${!isReceiverInfoComplete ? "bg-primary opacity-40" : "bg-primary"} flex text-center justify-center font-semibold z-10 relative md:text-[16px] rounded-lg md:py-3 md:px-16 xs:text-[15px] xs:py-4 xs:px-10 w-full !text-white`}
                    >
                        <div>
                            {loading ? ( // Display spinner if userLoading is true
                                <div className="flex items-center justify-center px-6">
                                    <div>

                                        <Image
                                            src={'/images/Spinner.svg'}
                                            alt="logo"
                                            width={60}
                                            height={60}
                                            priority
                                            className="text-[1px] md:w-full md:h-full xs:w-full xs:h-full"
                                        />

                                    </div>

                                </div>
                            ) : (
                                <div className='flex items-center justify-center text-[13px]'>

                                    <span className="ml-0">Create Address</span>
                                </div>
                            )}
                        </div>
                    </CustomButton>
                </div>
            </div>
        </div>
    )
}

export default CreateAddress