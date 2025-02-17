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
import { getAllCountries, getAllCities, getAllStates } from '@/config/api';
import { fetchSingleShipmentRequest, createInvoiceShipment, fetchAllCategories } from "@/config/api";
import { useQuery } from "@tanstack/react-query";

import Link from 'next/link';
import { toast } from "@/hooks/use-toast";
import Image from 'next/image'
import { RiTimerLine } from "react-icons/ri";
import { SkeletonLoader } from '@/components/ui/skeletonCard';



const breadCrumb = [
    {
        label: "Home",
        link: "/dashboard/import",
    },
    {
        label: "Shipment",
        link: "/dashboard/import/shipment",
    },
    {
        label: "Edit Shipment",
    },
];

interface EditShipmentDetailsProps {
    id: string;
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
    policy_number?: "",
    start_date: Date | any,
    end_date?: Date | null
}

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
    userId?: number | null;
    name: string;
    description: string;
    senderInfo: SenderInfoDetails;
    tracking: TrackingDetails;
    insurance: InsuranceDetails;
    items: ItemDetails[];
}

export function EditShipment({ id }: EditShipmentDetailsProps) {
    const [editTab, setEditTab] = useState<string>("Sender Info");


    const [linkEdit, setLinkEdit] = useState({
        nameOne: "Sender Info",
        nameTwo: "Items",
        nameThree: "Shipment Details",
        // nameFour: "Payment Details",
    });

    const [countryInfo, setCountryInfo] = useState([]);
    const [statesInfo, setStatesInfo] = useState([]);
    const [citiesInfo, setCitiesInfo] = useState([]);
    const userString = localStorage.getItem("user");

    const [statesCountry, setStatesCountry] = useState([]);
    const [citiesState, setCitiesState] = useState([]);

    const { data: categoriesData, isLoading: isLoadingCategories, isError: isErrorCategories, error: statesCategoryError } = useQuery({
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

    const { data: shipmentData, isLoading: isLoadingShipment, isError: isErrorUsers, error: shipmentsError } = useQuery({
        queryKey: ["singleShipments", id],
        queryFn: () => fetchSingleShipmentRequest(parseInt(id)),
        refetchOnWindowFocus: false, // avoid refetching on window focus
        staleTime: 0, // data becomes stale immediately for refetching
    });

    const [shipmentRequestForm, setShipmentRequestForm] = useState<SenderInfoForm>(
        {
            name: "",
            description: "",
            senderInfo: {
                name: "",
                email: "",
                phone: "",
                address_line_1: "",
                address_line_2: "",
                postal_code: "",
                country: "",
                state: "",
                city: ""
            },
            tracking: {
                tracking_id: "",
                tracking_url: "",
                tracking_number: "",
                third_party_tracking_id: "",
                third_party_tracking_name: ""
            },
            insurance: {
                insurance_type: "",
                policy_number: "",
                start_date: null,
                end_date: null
            },
            items: [{
                // id: 1, 
                name: '',
                category: '',
                value: 0,
                quantity: 0,
                weight: 0,
                description: '',
                dimension: {
                    length: 0,
                    width: 0,
                    height: 0
                }
            }]
        }
    );

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





    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");


    const formatValue = (value: number): string => {
        return value.toLocaleString("en-US");
    };

    useEffect(() => {
        const fetchShipmentData = async () => {
            try {
                // Check if shipmentData exists
                if (shipmentData) {
                    // Update the client request form in a single call
                    setShipmentRequestForm((prev) => ({
                        ...prev,
                        name: shipmentData.name || "",
                        description: shipmentData.description || "",
                        senderInfo: {
                            ...prev.senderInfo, // Preserve existing senderInfo fields
                            name: shipmentData.senderInfo?.name || "",
                            email: shipmentData.senderInfo?.email || "",
                            phone: shipmentData.senderInfo?.phone || "",
                            address_line_1: shipmentData.senderInfo?.address_line_1 || "",
                            address_line_2: shipmentData.senderInfo?.address_line_2 || "",
                            postal_code: shipmentData.senderInfo?.postal_code || "",
                            country: shipmentData.senderInfo?.country || "",
                            state: shipmentData.senderInfo?.state || "",
                            city: shipmentData.senderInfo?.city || "",
                        },
                        tracking: {
                            ...prev.tracking, // Preserve existing senderInfo fields
                            tracking_id: shipmentData.tracking?.tracking_id || "",
                            tracking_number: shipmentData.tracking?.tracking_number || "",
                            tracking_url: shipmentData.tracking?.tracking_url || "",
                            third_party_tracking_id: shipmentData.tracking?.third_party_tracking_id || "",
                            third_party_tracking_name: shipmentData.tracking?.third_party_tracking_name || ""
                        },
                        insuarnce: {
                            ...prev.insurance, // Preserve existing senderInfo fields
                            insurance_type: shipmentData.insurance?.insurance_type || "",
                            start_date: shipmentData.insurance?.start_date || ""
                        },
                        items: shipmentData.items?.map((item: any) => ({
                            name: item.name || "",
                            quantity: item.quantity || 0,
                            value: item.value || 0,
                            description: item.description || "",
                            weight: item.weight || 0,
                            category: item.category || "",
                            dimension: {
                                length: item.dimension?.length || 0,
                                width: item.dimension?.width || 0,
                                height: item.dimension?.height || 0,
                            },
                        })) || [],
                    }));
                }
            } catch (err: any) {
                console.error("Error fetching shipment data:", err);
                setError(err.message || "Failed to fetch shipment data.");
            } finally {
                setLoading(false);
            }
        };

        fetchShipmentData();
    }, [shipmentData]);

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
        setShipmentRequestForm((prev: any) => ({
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
        setShipmentRequestForm((prev: any) => ({
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
        setShipmentRequestForm((prev: any) => ({
            ...prev,
            senderInfo: {
                ...prev.senderInfo,
                city: selectedCitiesName,
            },
        }));
    };

    const handleInputCitiesChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setShipmentRequestForm((prev: any) => ({
            ...prev,
            senderInfo: {
                ...prev.senderInfo,
                city: value,
            },
        }));
    };

    const handleInsuranceChange = (value: string) => {

        setShipmentRequestForm((prev: any) => ({
            ...prev,
            insurance: {
                ...prev.insurance,
                insurance_type: value
            },
        }));
    };

    const handleInsuranceDateChange = (value: string) => {

        console.log("date ..", value);
        setShipmentRequestForm((prev: any) => ({
            ...prev,
            insurance: {
                ...prev.insurance,
                start_date: value
            },
        }));
    };

    const handleDescriptionChange = (index: number, field: string, value: any) => {
        setShipmentRequestForm((prev: any) => {
            const newItems = [...prev.items];
            newItems[index] = { ...newItems[index], [field]: value };
            return { ...prev, items: newItems };
        });
    };

    const handleItemCategoryChange = (index: number, field: string, value: any) => {

        const timeArray: any = categoryInfo?.find((category: any) => category.value === value)?.label
        // console.log("first item", timeArray, field)
        setShipmentRequestForm((prev: any) => {
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
        setShipmentRequestForm((prev: any) => {
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







    if (isLoadingStates || isLoadingCountries || isLoadingCities) {
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

            <div className="grid md:grid-rows-2 md:grid-flow-col xs:grid-col-1 gap-4 w-full text-sm bg-[#edefee] p-2">
                <div className="h-fit row-span-2 col-span-2 bg-white rounded-lg p-3 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                    <div className='text-slate-800 text-[16px] md:item-center flex md:justify-start text-start'>Shipment Item</div>

                    <div className="my-0 flex border-b-[2px] border-gray-300 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                        <div className="mt-5 ">
                            <div className=" w-full">
                                <div
                                    className={`${editTab === linkEdit.nameOne ||
                                        linkEdit.nameTwo ||
                                        linkEdit.nameThree
                                        ? ""
                                        : ""
                                        } w-full px-0 md:cursor-pointer group py-0  border-none`}
                                >
                                    <div className="w-full justify-start items-center  ">
                                        <div className="text-center flex gap-0 md:w-full xs:w-full text-sm border-none outline-none">
                                            <h1
                                                className={`${editTab === linkEdit.nameOne ? "border-b-[2px] border-secondary" : ""
                                                    } py-4 flex items-center justify-center group w-40  px-10 text-center`}
                                                onClick={() => {
                                                    editTab !== linkEdit.nameOne
                                                        ? setEditTab(linkEdit.nameOne)
                                                        : setEditTab(linkEdit.nameOne);
                                                }}
                                            >
                                                <div className="flex justify-center items-center w-full text-xs ">

                                                    <div className="flex justify-center items-center text-start text-gray-600 w-full whitespace-nowrap">
                                                        {linkEdit.nameOne}
                                                    </div>

                                                </div>
                                            </h1>

                                            <h1
                                                className={`${editTab === linkEdit.nameTwo ? "border-b-[2px] border-secondary" : ""
                                                    } py-4 flex items-center justify-center group w-40  px-10 text-center`}
                                                onClick={() => {
                                                    editTab !== linkEdit.nameTwo
                                                        ? setEditTab(linkEdit.nameTwo)
                                                        : setEditTab(linkEdit.nameTwo)
                                                }}
                                            >
                                                <div className="flex justify-center items-center w-full text-xs">

                                                    <div className="flex justify-center items-center text-center text-gray-600 whitespace-nowrap">
                                                        {linkEdit.nameTwo}
                                                    </div>

                                                </div>
                                            </h1>


                                            <h1
                                                className={`${editTab === linkEdit.nameThree ? "border-b-[2px] border-secondary" : ""
                                                    }  py-4 flex items-center justify-center group w-40  px-10 text-center `}
                                                onClick={() => {
                                                    editTab !== linkEdit.nameThree
                                                        ? setEditTab(linkEdit.nameThree)
                                                        : setEditTab(linkEdit.nameThree)
                                                }}
                                            >
                                                <div className="flex justify-center items-center w-full text-xs">

                                                    <div className="flex justify-center items-center text-center text-gray-600 whitespace-nowrap">
                                                        {linkEdit.nameThree}
                                                    </div>

                                                </div>
                                            </h1>

                                            {/* <h1
                                                className={`${editTab === linkEdit.nameFour ? "border-b-[2px] border-secondary" : ""
                                                    }  py-4 flex items-center justify-center group w-full  px-10 text-center `}
                                                onClick={() => {
                                                    editTab !== linkEdit.nameFour
                                                        ? setEditTab(linkEdit.nameFour)
                                                        : setEditTab(linkEdit.nameFour)

                                                }}
                                            >
                                                <div className="flex justify-center items-center w-full text-xs">

                                                    <div className="flex justify-center items-center text-center text-gray-600 whitespace-nowrap">
                                                        {linkEdit.nameFour}
                                                    </div>

                                                </div>
                                            </h1> */}



                                        </div>

                                    </div>

                                </div>
                            </div>

                        </div>

                    </div>

                    <div className="w-full my-3">
                        <div className=" bg-white overflow-hidden w-full font-normal">
                            {editTab === "Sender Info" && (
                                <>
                                    <div className="mt-5">
                                        <div className="px-0">
                                            <div className="flex md:flex-row xs:flex-col gap-2 my-5">
                                                <div className={`edit-group flex w-[100%] text-[1rem] my-0`}>

                                                    <CustomInput
                                                        id="name"
                                                        label="Shipment Name"
                                                        showLabel={true}
                                                        setValue={(value: any) =>
                                                            setShipmentRequestForm((prev) => ({ ...prev, name: value }))
                                                        }
                                                        value={shipmentRequestForm.name}
                                                        className="px-0 mb-[5px] md:w-full xs:w-full text-[16px]"
                                                    />
                                                </div>
                                                <div className={`edit-group flex w-[100%] text-[1rem] my-0`}>
                                                    <CustomInput
                                                        id="email"
                                                        name="senderInfo.email"
                                                        type="email"
                                                        label="Email Address"
                                                        // showRequirement={true}
                                                        className="px-0 mb-[5px] md:w-full xs:w-full text-[16px]"
                                                        showLabel={true}
                                                        setValue={(value: any) =>
                                                            setShipmentRequestForm((prev) => ({
                                                                ...prev,
                                                                senderInfo: {
                                                                    ...prev.senderInfo,
                                                                    email: value,
                                                                },
                                                            }))
                                                        }
                                                        value={shipmentRequestForm.senderInfo?.email}
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex md:flex-row xs:flex-col gap-2 my-5">
                                                <div className={`edit-group flex w-[100%] text-[1rem] my-0`}>
                                                    <CustomInput
                                                        id="address_line_1"
                                                        name="senderInfo.address_line_1" // Updated name to match nested property
                                                        type="text"
                                                        label="Address Line 1"
                                                        required
                                                        className="px-0 mb-[5px] md:w-full xs:w-full text-[16px]"
                                                        showLabel={true}
                                                        setValue={(value: any) =>
                                                            setShipmentRequestForm((prev) => ({
                                                                ...prev,
                                                                senderInfo: {
                                                                    ...prev.senderInfo,
                                                                    address_line_1: value,
                                                                },
                                                            }))
                                                        }
                                                        value={shipmentRequestForm.senderInfo?.address_line_1}
                                                    />

                                                </div>
                                                <div className={`edit-group flex w-[100%] text-[1rem] my-0`}>
                                                    <CustomInput
                                                        id="address_line_2"
                                                        name="senderInfo.address_line_2" // Updated name to match nested property
                                                        type="text"
                                                        label="Address Line 2"
                                                        required
                                                        className="px-0 mb-[5px] md:w-full xs:w-full text-[16px]"
                                                        showLabel={true}
                                                        setValue={(value: any) =>
                                                            setShipmentRequestForm((prev) => ({
                                                                ...prev,
                                                                senderInfo: {
                                                                    ...prev.senderInfo,
                                                                    address_line_2: value,
                                                                },
                                                            }))
                                                        }
                                                        value={shipmentRequestForm.senderInfo?.address_line_2}
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex md:flex-row xs:flex-col gap-2 my-5">
                                                <div className={` w-[100%] text-[1rem] my-0`}>
                                                    {/* <PhoneInput/> */}

                                                    <PhoneInput
                                                        value={shipmentRequestForm?.senderInfo?.phone}
                                                        onChange={(value: string | undefined) => {
                                                            setShipmentRequestForm((prev: any) => ({
                                                                ...prev,
                                                                senderInfo: {
                                                                    ...prev.senderInfo,
                                                                    phone: value,
                                                                },
                                                            }))
                                                        }}
                                                        defaultCountry={defaultCountry} // Set the default country to Nigeria
                                                        international
                                                    />

                                                </div>
                                                <div className={`edit-group flex w-[100%] text-[1rem] my-0`}>
                                                    <CustomInput
                                                        id="postal_code"
                                                        name="senderInfo.postal_code" // Updated name to match nested property
                                                        type="text"
                                                        label="Postal Code"
                                                        required
                                                        className="px-0 mb-[5px] md:w-full xs:w-full text-[16px]"
                                                        showLabel={true}
                                                        setValue={(value: any) =>
                                                            setShipmentRequestForm((prev) => ({
                                                                ...prev,
                                                                senderInfo: {
                                                                    ...prev.senderInfo,
                                                                    postal_code: value,
                                                                },
                                                            }))
                                                        }
                                                        value={shipmentRequestForm.senderInfo?.postal_code}

                                                    />
                                                </div>
                                            </div>

                                            <div className="flex md:flex-row xs:flex-col gap-2 my-5">
                                                <div className={` w-[100%] text-[1rem] my-0`}>

                                                    <CustomSelect
                                                        wrapperClass='!border-[0.5px] !border-gray !h-[58px] md:w-full xs:w-full'
                                                        labelClass='!text-[0.875rem] text-gray-500 w-full'
                                                        optionsClass='!text-[0.875rem] !h-[48px] !w-[100%]'
                                                        optionWrapperClass=' border-[1px] border-gray-400 w-[100%] !w-full xl:left-[0px] !left-[0px] !h-[200px] !bottom-[-205px] overflow-y-auto'
                                                        label='Select Country?'
                                                        setSelected={handleCountryChange}
                                                        selected={shipmentData?.senderInfo?.country?.toString()}
                                                        options={countryInfo}
                                                    />
                                                </div>
                                                <div className={`form-group flex w-[100%] text-[1rem] my-0`}>

                                                    {
                                                        shipmentData?.senderInfo?.country && (
                                                            <CustomSelect
                                                                wrapperClass='!border-[0.5px] !border-gray !h-[58px] md:w-full xs:w-full'
                                                                labelClass='!text-[0.875rem] text-gray-500 w-full'
                                                                optionsClass='!text-[0.875rem] !h-[48px] !w-[100%]'
                                                                optionWrapperClass=' border-[1px] border-gray-400 w-[100%] !w-full xl:left-[0px] !left-[0px] !h-[200px] !bottom-[-205px] overflow-y-auto'
                                                                label='Select State?'
                                                                setSelected={handleStateChange}
                                                                selected={shipmentData?.senderInfo?.state}
                                                                options={statesCountry}
                                                            />
                                                        )
                                                    }
                                                </div>
                                                <div className={`form-group flex w-[100%] text-[1rem] my-0`}>
                                                    {
                                                        shipmentData?.senderInfo?.state && (

                                                            citiesState.length > 0 ?
                                                                <CustomSelect
                                                                    wrapperClass='!border-[0.5px] !border-gray !h-[58px] md:w-full xs:w-full'
                                                                    labelClass='!text-[0.875rem] text-gray-500 w-full'
                                                                    optionsClass='!text-[0.875rem] !h-[48px] !w-[100%]'
                                                                    optionWrapperClass=' border-[1px] border-gray-400 w-[100%] !w-full xl:left-[0px] !left-[0px] !h-[200px] !bottom-[-205px] overflow-y-auto'
                                                                    label='Select City?'
                                                                    setSelected={handleCitiesChange}
                                                                    selected={shipmentData?.senderInfo?.city}
                                                                    options={citiesState}
                                                                />
                                                                :
                                                                <CustomInput
                                                                    id="city"
                                                                    name="city"
                                                                    type="text"
                                                                    label="Type City?"
                                                                    required
                                                                    value={shipmentData?.senderInfo?.city}
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
                                                    showLabel={true}
                                                    setValue={(value: any) =>
                                                        setShipmentRequestForm((prev) => ({ ...prev, description: value }))
                                                    }
                                                    value={shipmentRequestForm?.description}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>


                        <div className=" bg-white overflow-hidden w-full font-normal">
                            {editTab === "Items" && (
                                <>
                                    <div className="mt-5">
                                        <div>
                                            {shipmentRequestForm?.items?.map((item: any, index: number) => (
                                                <div key={item.id || index} className="my-10">
                                                    <div className=" border-[1px] border-gray-300 block w-full pb-1 text-md font-semibold text-primary transition-all duration-200 ease-in-out group-focus-within:text-blue-400 md:mt-5 xs:mt-0 md:text-[15px] xs:text-[15px] bg-plain px-2">
                                                        Item {index + 1}
                                                    </div>

                                                    <div className="px-2 border-[1px] border-gray-200 ">
                                                        <div className=" grid items-center pb-5 lg:grid-cols-2 md:grid-cols-1 xs:gap-5 md:gap-5">
                                                            <div className={`edit-group flex w-[100%] text-[1rem] mt-2`}>

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
                                                            <div className={`edit-group flex w-[100%] text-[1rem] mt-2`}>

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

                                                                <div className={`edit-group flex w-[100%] text-[1rem] my-0`}>
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

                                                                <div className={`edit-group flex w-[100%] text-[1rem] my-0`}>

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
                                                                <div className={`edit-group flex w-[100%] text-[1rem] my-0`}>
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
                                                    
                                                </div>
                                            ))}

                                        </div>
                                    </div>

                                </>
                            )}
                        </div>

                        <div className="w-full bg-white overflow-hidden font-normal">
                            {editTab === "Shipment Details" && (
                                <>
                                    <div className="mt-5">
                                        <div className=" border-[1px] border-gray-300 block w-full pb-1 text-md font-semibold text-primary transition-all duration-200 ease-in-out group-focus-within:text-blue-400 md:mt-5 xs:mt-0 md:text-[15px] xs:text-[15px] bg-plain px-2">
                                            Insurance
                                        </div>

                                        <div className="px-0">
                                            <div>
                                                <div className="flex md:flex-row xs:flex-col gap-2 my-5">
                                                    <div className={` w-[100%] text-[1rem] my-0`}>

                                                        <CustomSelect
                                                            wrapperClass='!border-[0.5px] !border-gray !h-[58px] md:w-full xs:w-full'
                                                            labelClass='!text-[0.875rem] text-gray-500 w-full'
                                                            optionsClass='!text-[0.875rem] !h-[48px] !w-[100%]'
                                                            optionWrapperClass=' border-[1px] border-gray-400 w-[100%] !w-full xl:left-[0px] !left-[0px] !h-[200px] !bottom-[-205px] overflow-y-auto'
                                                            label='Select Insurance Plan'
                                                            setSelected={handleInsuranceChange}
                                                            selected={shipmentRequestForm?.insurance?.insurance_type}
                                                            options={[
                                                                {
                                                                    label: 'Premium',
                                                                    value: 'Premium'
                                                                },
                                                                {
                                                                    label: 'Pro',
                                                                    value: 'Pro'
                                                                },
                                                                {
                                                                    label: 'Basic',
                                                                    value: 'Basic'
                                                                }
                                                            ]}
                                                        />
                                                    </div>
                                                    <div className={`form-group flex w-[100%] text-[1rem] my-0`}>
                                                        <CustomInputDate
                                                            id="start_date"
                                                            showLabel={true}
                                                            type="date"
                                                            value={shipmentRequestForm?.insurance?.start_date}
                                                            setValue={handleInsuranceDateChange}
                                                            label="Start Date"
                                                            required
                                                            className=""
                                                        />
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                        <div className=" border-[1px] border-gray-300 block w-full pb-1 text-md font-semibold text-primary transition-all duration-200 ease-in-out group-focus-within:text-blue-400 md:mt-5 xs:mt-0 md:text-[15px] xs:text-[15px] bg-plain px-2">
                                            Tracking
                                        </div>

                                        <div className="px-0">
                                            <div>
                                                <div className="grid md:grid-cols-1 xs:grid-cols-1 gap-2 my-5">
                                                    <div className="flex md:flex-row xs:flex-col gap-2">
                                                        <div className={`edit-group flex w-[100%] text-[1rem] my-0`}>
                                                            <CustomInput
                                                                id="tracking_id"
                                                                name="tracking.tracking_id"
                                                                label="Tracking ID"
                                                                // showRequirement={true}
                                                                className="px-0 mb-[5px] md:w-full xs:w-full text-[16px]"
                                                                showLabel={true}
                                                                setValue={(value: any) =>
                                                                    setShipmentRequestForm((prev) => ({
                                                                        ...prev,
                                                                        tracking: {
                                                                            ...prev.tracking,
                                                                            tracking_id: value,
                                                                        },
                                                                    }))
                                                                }
                                                                value={shipmentRequestForm.tracking?.tracking_id}
                                                            />
                                                        </div>

                                                        <div className={`edit-group flex w-[100%] text-[1rem] my-0`}>
                                                            <CustomInput
                                                                id="tracking_url"
                                                                name="tracking.tracking_url"
                                                                label="Tracking URL"
                                                                // showRequirement={true}
                                                                className="px-0 mb-[5px] md:w-full xs:w-full text-[16px]"
                                                                showLabel={true}
                                                                setValue={(value: any) =>
                                                                    setShipmentRequestForm((prev) => ({
                                                                        ...prev,
                                                                        tracking: {
                                                                            ...prev.tracking,
                                                                            tracking_url: value,
                                                                        },
                                                                    }))
                                                                }
                                                                value={shipmentRequestForm.tracking?.tracking_url}
                                                            />
                                                        </div>

                                                        <div className={`edit-group flex w-[100%] text-[1rem] my-0`}>
                                                            <CustomInput
                                                                id="tracking_number"
                                                                name="tracking.tracking_number"
                                                                label="Tracking Name"
                                                                // showRequirement={true}
                                                                className="px-0 mb-[5px] md:w-full xs:w-full text-[16px]"
                                                                showLabel={true}
                                                                setValue={(value: any) =>
                                                                    setShipmentRequestForm((prev) => ({
                                                                        ...prev,
                                                                        tracking: {
                                                                            ...prev.tracking,
                                                                            tracking_number: value,
                                                                        },
                                                                    }))
                                                                }
                                                                value={shipmentRequestForm.tracking?.tracking_number}
                                                            />
                                                        </div>

                                                    </div>
                                                    <div >
                                                        <div className="flex md:flex-row xs:flex-col gap-2 my-5">
                                                            <div className={`edit-group flex w-[100%] text-[1rem] my-0`}>
                                                                <CustomInput
                                                                    id="third_party_tracking_id"
                                                                    name="tracking.third_party_tracking_id"
                                                                    label="Tracking Name"
                                                                    // showRequirement={true}
                                                                    className="px-0 mb-[5px] md:w-full xs:w-full text-[16px]"
                                                                    showLabel={true}
                                                                    setValue={(value: any) =>
                                                                        setShipmentRequestForm((prev) => ({
                                                                            ...prev,
                                                                            tracking: {
                                                                                ...prev.tracking,
                                                                                third_party_tracking_id: value,
                                                                            },
                                                                        }))
                                                                    }
                                                                    value={shipmentRequestForm.tracking?.third_party_tracking_id}
                                                                />
                                                            </div>

                                                            <div className={`edit-group flex w-[100%] text-[1rem] my-0`}>
                                                                <CustomInput
                                                                    id="third_party_tracking_name"
                                                                    name="tracking.third_party_tracking_name"
                                                                    label="Tracking Name"
                                                                    // showRequirement={true}
                                                                    className="px-0 mb-[5px] md:w-full xs:w-full text-[16px]"
                                                                    showLabel={true}
                                                                    setValue={(value: any) =>
                                                                        setShipmentRequestForm((prev) => ({
                                                                            ...prev,
                                                                            tracking: {
                                                                                ...prev.tracking,
                                                                                third_party_tracking_name: value,
                                                                            },
                                                                        }))
                                                                    }
                                                                    value={shipmentRequestForm.tracking?.third_party_tracking_name}
                                                                />
                                                            </div>
                                                        </div>

                                                    </div>

                                                </div>
                                            </div>


                                        </div>
                                    </div>
                                </>
                            )}
                        </div>

                        {/* <div className="w-full bg-white overflow-hidden font-normal">
                            {editTab === "Payment Details" && (
                                <>
                                    <div className="mt-5">
                                        <PaymentMethod />
                                    </div>
                                </>
                            )}
                        </div> */}

                    </div>

                </div>



                <div className="h-full md:row-span-2 md:col-span-1 xs:col-span-2 md:border-l-[1px] md:px-1 xs:px-0 bg-white  border-gray-300">
                    <div className="h-fit md:row-span-2 md:col-span-1 xs:col-span-2 border-[1px] p-2 border-white bg-white rounded-lg">

                        <div className='text-slate-800 text-[16px] md:item-center flex md:justify-start text-start'>Summary</div>
                        <div className='font-light text-sm mt-7 w-full bg-white px-0 py-3 '>


                            <div className="group relative mt-2 flex md:flex-row xs:flex-col gap-1 justify-between w-full my-3">
                                <div className='text-slate-600  font-[400] text-start text-md'>Tracking ID</div>
                                <div className='text-slate-600 font-[400] text-start text-md'>{shipmentData?.tracking?.tracking_id}</div>
                            </div>

                            <div className="group relative mt-2 flex md:flex-row xs:flex-col gap-1 justify-between w-full my-3 ">
                                <div className='text-slate-600 font-[400] text-start text-md'>Shipment Request</div>
                                <div className='text-slate-600 font-[400] text-start text-md'>{shipmentData?.code}</div>
                            </div>


                        </div>
                        <div className='font-light text-sm mt-7 w-full bg-[#edefee] rounded-lg px-2 py-3'>

                            <div className='text-slate-900 text-[16px] font-[500] text-start'>Importer Info</div>

                            <div className="">
                                <div className='my-4'>
                                    <div className='font-semibold text-gray-800'> Name:</div>
                                    <div className="text-gray-600 font-[400]">
                                        {shipmentData?.senderInfo?.name}
                                    </div>
                                </div>

                                <div className='my-4'>
                                    <div className='font-semibold text-gray-800'>From address:</div>
                                    <div className="text-gray-600 font-[400]">
                                        {shipmentData?.receiverInfo?.address_line_1}, {shipmentData?.receiverInfo?.city}, {shipmentData?.receiverInfo?.country}
                                    </div>
                                </div>
                                <div className='my-4'>
                                    <div className='font-semibold text-gray-800'>To address:</div>
                                    <div className="text-gray-600 font-[400]">
                                        {shipmentData?.senderInfo?.address_line_1}, {shipmentData?.senderInfo?.city}, {shipmentData?.senderInfo?.country}
                                    </div>
                                </div>


                                <div className='my-4'>
                                    <div className='font-semibold text-gray-800'> Tracking ID:</div>
                                    <div className="text-gray-600 font-[400] uppercase">
                                        {shipmentData?.tracking?.tracking_id}
                                    </div>
                                </div>

                                <div className='my-4'>
                                    <div className='font-semibold text-gray-800'> Tracking Number:</div>
                                    <div className="text-gray-600 font-[400] uppercase">
                                        {shipmentData?.tracking?.tracking_number}
                                    </div>
                                </div>





                            </div>
                        </div>

                        <div className='font-light text-sm mt-7 w-full bg-[#edefee] rounded-lg px-2 py-3'>

                            <div className='text-slate-900 text-[16px] font-[500] text-start'>Insurance</div>

                            <div className="">
                                <div className='my-4'>
                                    <div className='font-semibold text-gray-800'> Type:</div>
                                    <div className="text-gray-600 font-[400]">
                                        {shipmentData?.insurance?.insurance_type}
                                    </div>
                                </div>

                                <div className='my-4'>
                                    <div className='font-semibold text-gray-800'> Policy Number</div>
                                    <div className="text-gray-600 font-[400]">
                                        {shipmentData?.insurance?.policy_number}
                                    </div>
                                </div>


                            </div>
                        </div>



                        <div className='my-6 flex justify-between md:flex-row xs:flex-col w-full'>
                            <button className="w-full flex justify-center items-center cursor rounded-md bg-primary font-medium px-4 md:py-3 xs:py-2 text-white sm:text-xs xs:text-[12px] md:text-[0.75rem]">
                                <span className="w-full whitespace-nowrap">Save & Continue</span>
                            </button>

                        </div>
                        <div className='my-6 flex justify-between md:flex-row xs:flex-col gap-5'>

                            <button className="w-full flex justify-center items-center cursor rounded-md bg-white border border-gray-400 font-medium px-4 md:py-3 xs:py-2 text-gray-700 sm:text-xs xs:text-[12px] md:text-[0.75rem]">
                                <span className="w-full whitespace-nowrap">Cancel</span>
                            </button>

                            <button className="w-full flex justify-center items-center cursor rounded-md bg-white border border-red-500 font-medium px-4 md:py-3 xs:py-2 text-red-500 sm:text-xs xs:text-[12px] md:text-[0.75rem]">
                                <span className="w-full whitespace-nowrap">Delete</span>
                            </button>

                        </div>
                    </div>

                    {/* <div className='text-slate-800 text-[16px] md:item-center flex  md:justify-start text-start'>Summary</div> */}

                </div>
            </div>


        </div>
    )
}
