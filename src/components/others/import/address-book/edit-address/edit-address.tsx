"use client";
import {
    CustomBreadCrumb,
    CustomButton,
    CustomInput,
    CustomSelect,
    CustomInputDate
} from "@/components/custom-components";
import { B1, BMiddle, H2, BMiddleRegular, BodySmallestMedium, B1Regular } from "@/components/custom-typography";
import { PhoneInput, defaultCountry } from '@/components/custom-components/phone-input';
import React, { useEffect, useState } from "react";
import { getAllCountries, getAllCities, getAllStates, fetchSingleAddress , updateAddressRequest } from '@/config/api';

import { useQuery } from "@tanstack/react-query";

import Link from 'next/link';
import { toast } from "@/hooks/use-toast";
import Image from 'next/image'
import { RiTimerLine } from "react-icons/ri";
import { SkeletonLoader } from '@/components/ui/skeletonCard';
import { useRouter } from 'next/navigation';


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
        label: "Edit Address",
    },
];

interface EditAddressDetailsProps {
    id: string;
}

interface EditAddressDetails {
    userId: number | null;
    phone: string,
    address: string,
    additionalInformation: string,
    country: string,
    state: string,
    city: string
}

export function EditAddress({ id }: EditAddressDetailsProps) {
    const [formData, setFormData] = useState<EditAddressDetails>({
        userId: null,
        phone: "",
        address: "",
        additionalInformation: "",
        country: "",
        state: "",
        city: ""
    });

    const { data: adddressData, isLoading: isLoadingAddress, isError: isErrorUsers, error: shipmentsError } = useQuery({
        queryKey: ["singleAddress", id],
        queryFn: () => fetchSingleAddress(parseInt(id)),
        refetchOnWindowFocus: false, // avoid refetching on window focus
        staleTime: 0, // data becomes stale immediately for refetching
    });

    const router = useRouter()
    const [countryInfo, setCountryInfo] = useState([]);
    const [statesInfo, setStatesInfo] = useState([]);
    const [citiesInfo, setCitiesInfo] = useState([]);
    const userString = localStorage.getItem("user");
    const [loading, setLoading] = useState(false);

    const [editLoading, setEditLoading] = useState(false);

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

    const [error, setError] = useState("");

    const formatValue = (value: number): string => {
        return value.toLocaleString("en-US");
    };

    useEffect(() => {
        const fetchAddressData = async () => {
            console.log("address..", adddressData);
            try {
                // Check if shipmentData exists
                if (adddressData) {
                    // Update the client request form in a single call
                    setFormData((prev: any) => ({
                        ...prev,
                        phone: adddressData.phone || "",
                        address: adddressData.address|| "",
                        additionalInformation: adddressData.additionalInformation || "",
                        country: adddressData.country || "",
                        state: adddressData.state || "",
                        city: adddressData.city || ""
                    }));
                }
            } catch (err: any) {
                console.error("Error fetching address data:", err);
                setError(err.message || "Failed to fetch adddress data.");
            } finally {
                setLoading(false);
            }
        };

        fetchAddressData();
    }, [adddressData]);

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

    const handleInputCitiesChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev: any) => ({
            ...prev,
            city: value,
        }));
    };

    const handleEditAddress = async () => {
        console.log("form data..", formData, id);
        setEditLoading(true);
        try {
            const result = await updateAddressRequest(parseInt(id) ,formData);
            if (result) {
                toast({
                    title: "Success",
                    description: `Address Updated Successfully 🎉`,
                    variant: "destructive",
                });
                setEditLoading(false);
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
            setEditLoading(false);
        }
    };
    
    if (isLoadingStates || isLoadingCountries || isLoadingCities || isLoadingAddress) {
        return <SkeletonLoader number={5} />
    }




    return (
        <div className="text-lg font-semibold w-full z-0 relative">

            <div className="mb-[14px] flex items-center justify-between">
                <CustomBreadCrumb items={breadCrumb} className="bg-gray-200 font-[500] text-primary w-fit px-5 py-1 rounded-lg" />
            </div>
            <H2 className="my-[36px] font-semibold text-primary">
                Edit Shipment
            </H2>

            <div className="px-0">
                    <div className="flex md:flex-row xs:flex-col gap-10 my-10">
                        <div className={`edit-group flex w-[100%] text-[1rem] my-0`}>
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
                        onClick={handleEditAddress}
                        disabled={editLoading}
                        className={`flex text-center justify-center font-semibold z-10 relative md:text-[16px] rounded-lg md:py-3 md:px-16 xs:text-[15px] xs:py-4 xs:px-10 w-full !text-white`}
                    >
                        <div>
                            {editLoading ? ( // Display spinner if userLoading is true
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

                                    <span className="ml-0">Save Address</span>
                                </div>
                            )}
                        </div>
                    </CustomButton>
                </div>


        </div>
    )
}
