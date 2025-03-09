"use client";

import {
    CustomButton,
    CustomInput,
    CustomSelect,
    CustomInputImage
} from "@/components/custom-components";
import { CustomInputDate } from "@/components/custom-components";
import {
    B1,
    B2,
    BMiddle,
    BodySmallest,
    SecondaryText,
} from "@/components/custom-typography";

import Image from "next/image";
import React, { useEffect, useRef, useState, useMemo } from "react";
import { fetchSingleShipmentRequest, createInvoiceShipment, createDropoffRequest, warehouseForDropoffRequest } from "@/config/api";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";

import apiClient from "@/config/api-clients";
import qs from 'qs';
import { SkeletonLoader } from "@/components/ui/skeletonCard";



type DropoffWarehouseProps = {
    onClose: () => void; // Function to close the modal
    id: number; // ID of the request to approve
};

export function DropoffWarehouse({ onClose, id }: DropoffWarehouseProps) {

    const [selectedTime, setSelectedTime] = useState('');
    const userString = localStorage.getItem("user");
    const [currentFormKey, setCurrentFormKey] = useState(0);


    const [userAddress, setUserAddress] = useState<any>([]);

    const [formData, setFormData] = useState<any>({
        deliveryFrom: "",
        deliveryTo: "",
        deliveryDate: null,
        warehouse_id: null,
        type: "pickup"
    });

    const router = useRouter();
    const [userId, setUserId] = useState<any>(null);
    const [userPlan, setUserPlan] = useState<any>([]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [pickupSet, setPickupSet] = useState("Lagos Nigeria Branch");
    const [selectedBusinessOption, setSelectedBusinessOption] = useState("");

    const [selectedDeliveryLocation, setSelectedDeliveryLocation] = useState("");
    var [selectedArray, setSelectedArray] = useState([]);

    const [formSteps] = useState([
        { name: "PickUp Location", index: 0 },
        { name: "PickUp Calendar", index: 1 },
        { name: "PickUp Time", index: 2 },
    ]);

    const isThisForm = (formStepIndex: any) => {
        return currentFormKey === formSteps[formStepIndex].index;
    };

    const [pickupName, setPickupName] = useState({
        nameOne: "Lagos Nigeria Branch",
        nameTwo: "Accra Ghana Branch",
        nameThree: "Abuja Nigeria Branch",
    });

    const handlePickupClick = () => {
        const address = "Suite 004, Ground Floor, Right Wing. Airport Business Hub, Along Murtala Muhammad International Airport Road, Ikeja, Lagos";
        setPickupSet(pickupName.nameOne);
        setFormData((prevFormData: any) => ({
            ...prevFormData,
            deliveryFrom: address,
        }));
    };

    const handlePickupClickThree = () => {
        const address = "Shop A24-25 Danziya Plaza Opp. NNPC Mega Filling Station, Central Business District Fct, Abuja, Nigeria";
        setPickupSet(pickupName.nameThree);
        setFormData((prevFormData: any) => ({
            ...prevFormData,
            deliveryFrom: address,
        }));
    };

    const handlePickupClickTwo = () => {
        const address = "2nd Floor, Kojo Bruce House, No. 5 Ayikai Street Adabraka, Accra, Ghana";
        setPickupSet(pickupName.nameTwo);
        setFormData((prevFormData: any) => ({
            ...prevFormData,
            deliveryFrom: address,
        }));
    };

    const businessOptions = [
        { label: "Nigeria", value: "Nigeria", index: 0 },
        { label: "Ghana", value: "Ghana", index: 1 },
    ];

    useEffect(() => {
        if (id) {
            setFormData((prevForm: any) => ({
                ...prevForm,
                warehouse_id: id,
                type: "dropoff"
            }));
        }
    }, [id]);




    const handleSetLocation = () => {
        setCurrentFormKey(currentFormKey + 1)
        // console.log("New value:", formData);
    };

    const previousCurrentFormKey = () => {
        setCurrentFormKey(currentFormKey - 1)
        // console.log("New value:", formData);
    };

    const handleSelect = (value: string) => {
        // console.log("user unit ..", value);
        setSelectedBusinessOption(value);
    };

    const handleDeliveryLocation = (value: string) => {
        // console.log("user unit ..", value, userAddress);

        const filteredLocation = userAddress.filter((location: any) => location.value === value)

        // console.log("first unit", filteredLocation)

        setFormData((prevFormData: any) => ({
            ...prevFormData,
            deliveryTo: filteredLocation[0]?.label,
        }));
        setSelectedDeliveryLocation(value);
    };


    const handleSearch = () => {
        const filteredLinks: any = Object.values(pickupName).filter((value: any) => {
            return value.toLowerCase().includes(selectedBusinessOption.toLowerCase());
        });
        setSelectedArray(filteredLinks)
        // Update the UI or perform any other actions with the filtered links
        // console.log(filteredLinks, "all the value..", selectedArray);
        return filteredLinks;
    };


    const handleCreateDropOff = async (e: React.FormEvent<HTMLFormElement>) => {
        e?.preventDefault();
        setLoading(true);
        console.log("object food", formData);
        try {
            const data = await warehouseForDropoffRequest(formData);

            // console.log("response for warehouse ..", data);

            if (data) {
                toast({
                    title: "Success",
                    description: `${data?.warehouse?.message}🎉`,
                    variant: "destructive",
                });

                setLoading(false);
                router.push("/dashboard/import/dropoff");
                // Delay the page reload to allow the toast and onClose to complete
                // setTimeout(() => {
                //     window.location.reload();
                // }, 5000);
            }
        } 
        catch (error: any) {
            if (error) {
                console.error("An unexpected error occurred:", error);
                toast({
                    title: "Error",
                    description: `${error?.response?.data?.message}`,
                    variant: "destructive",
                });
            }
        } finally {
            setLoading(false)
        }
    };

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
            setUserId(user?.user?.id)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userString]);

    useEffect(() => {
        const fetchAddressList = async () => {

            // console.log("good plan..", userId)
            setLoading(true);
            if (userId) {
                try {
                    const response = await apiClient.get(`/api/v1/get-all-address`, {
                        params: {
                            associations: ['user'], // Specify the relationships to include
                            sortOrder: 'ASC',
                            sortBy: 'created_at',
                            byUserId: parseInt(userId),
                            page: 1,
                            perPage: 100,
                        },
                        paramsSerializer: (params) => {
                            return qs.stringify(params, { arrayFormat: 'brackets' });
                        },
                    });

                    const transformedData: any = response?.data?.data.map((user: any) => ({
                        label: `${user.address}, ${user.city} ${user.state}, ${user.country}`,
                        value: user.id,
                    }));

                    // console.log("all Address..", response?.data?.data, "data ..", transformedData);

                    setLoading(false);
                    setUserAddress(transformedData)
                    return response.data.data;
                } catch (error) {
                    console.error('Error fetching user address:', error);
                    throw error; // Rethrow the error for handling in the component
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchAddressList(); // Fetch data when the component mounts
    }, [userId]);

    // LOGIC FOR THE CALENDAR FOR WAREHOUSE
    const areCountryItems = useMemo(() => {
        const textComplete = selectedBusinessOption !== "";
        return textComplete
    }, [selectedBusinessOption]);

    const areDropoffItems = useMemo(() => {

        const textComplete = formData.deliveryDate !== null && formData.deliveryTo?.trim() !== "";
        return textComplete
    }, [formData]);

    const handleInputChange = (event: any) => {
        setSelectedTime(event.target.value);

        setFormData((prevForm: any) => ({
            ...prevForm,
            pickupTime: event.target.value,
        }));

    };


    return (
        <div className="px-1">
            

            <div className="py-[30px] bg-white rounded-lg">
                <div className="">
                    <div className="relative ">
                        <div className=" relative flex flex-col w-full px-2">
                            {isThisForm(0) && (
                                <div>
                                    <div className='text-center my-2 mx-2 block w-full pb-0 text-md font-medium text-gray-800 transition-all duration-200 ease-in-out group-focus-within:text-blue-400'>
                                        Select The Office Location
                                    </div>

                                    <div className="group relative mt-2 mx-2">
                                        <div className='flex gap-2 justify-center items-center w-full '>
                                            <div className="group relative mt-0 md:!w-[500px] xs:w-full flex justify-center items-center">
                                                <CustomSelect
                                                    wrapperClass="!border-[0.5px] !border-gray !h-[58px] md:w-full xs:w-full"
                                                    labelClass="!text-[0.875rem] text-gray-500 w-full"
                                                    optionsClass="!text-[0.875rem] !h-[48px] !w-[100%]"
                                                    optionWrapperClass="border-[1px] border-gray-400 w-[100%] !w-full xl:left-[0px] !left-[0px] !h-[200px] !bottom-[-205px] overflow-y-auto"
                                                    label="Select Office Location"
                                                    setSelected={handleSelect}
                                                    selected={selectedBusinessOption}
                                                    options={businessOptions}
                                                />
                                            </div>
                                            <button onClick={handleSearch} className="!bg-[#F47F12] !h-[48px] rounded-lg text-sm font-semibold md:px-8 xs:px-4 py-2 xs:mx-0  md:ml-4 text-white">Search</button>
                                        </div>
                                    </div>

                                    {selectedArray.length > 0 ? (
                                        <div className="flex w-full justify-center items-center mb-3">
                                            {selectedArray.some((branch: any) => branch?.includes('Nigeria')) && (
                                                <div className='md:w-[700px] mb-5 md:h-[50vh] xs:w-full xs:h-full'>
                                                    <div
                                                        onClick={handlePickupClick}
                                                        className={`mx-2 cursor-pointer my-4 flex justify-between md:flex-row xs:flex-col md:gap-10 xs:gap-2 rounded-md md:py-3 xs:py-2 px-3 ${pickupSet === pickupName.nameOne ? "border-[1px] border-indigo-500" : "border-[1px] border-indigo-200"}`}
                                                    >
                                                        <div className=''>
                                                            <div className='font-[500] text-gray-800 md:text-[15px] xs:text-[16px] md:text-start xs:text-justify'>
                                                                Pickup - CartTel Lagos, Nigeria
                                                            </div>
                                                            <div className='font-[400] text-gray-600 md:text-[15px] xs:text-[13px] md:text-start xs:text-justify'>
                                                                Suite 004, Ground Floor, Right Wing. Airport Business Hub, Along Murtala Muhammad International Airport Road, Ikeja, Lagos
                                                            </div>
                                                            <div className='font-[400] text-gray-600 md:text-[15px] xs:text-[13px] md:text-start xs:text-justify'>
                                                                +234 700 080 0900
                                                            </div>

                                                        </div>
                                                        <div className='float-left flex items-center justify-center '>
                                                            <div className="text-gray-600 font-[500] uppercase md:text-end xs:text-center flex md:justify-end xs:justify-center">
                                                                <span className={`rounded-full w-5 h-5 flex items-center justify-center ${pickupSet === pickupName.nameOne ? "border-[1px] border-indigo-500" : "border-[1px] border-indigo-500"}`}>
                                                                    <span className={`rounded-full w-3 h-3 flex items-center justify-center ${pickupSet === pickupName.nameOne ? "bg-indigo-500" : "bg-white"}`} />
                                                                </span>
                                                            </div>

                                                        </div>
                                                    </div>

                                                    <div

                                                        onClick={handlePickupClickThree}
                                                        className={`mx-2 cursor-pointer my-4 flex justify-between md:flex-row xs:flex-col md:gap-10 xs:gap-2 rounded-md md:py-3 xs:py-2 px-3 ${pickupSet === pickupName.nameThree ? "border-[1px] border-indigo-500" : "border-[1px] border-indigo-200"}`}
                                                    >
                                                        <div className=''>
                                                            <div className='font-[500] text-gray-800 md:text-[15px] xs:text-[16px] md:text-start xs:text-justify'>
                                                                Pickup - CartTel Abuja, Nigeria
                                                            </div>
                                                            <div className='font-[400] text-gray-600 md:text-[15px] xs:text-[13px] md:text-start xs:text-justify'>
                                                                Shop A24-25 Danziya Plaza Opp. NNPC Mega Filling Station, Central Business District Fct, Abuja, Nigeria
                                                            </div>
                                                            <div className='font-[400] text-gray-600 md:text-[15px] xs:text-[13px] md:text-start xs:text-justify'>
                                                                +234 704 782 3981
                                                            </div>

                                                        </div>
                                                        <div className='float-left flex items-center justify-center '>
                                                            <div className="text-gray-600 font-[500] uppercase md:text-end xs:text-center flex md:justify-end xs:justify-center">
                                                                <span className={`rounded-full w-5 h-5 flex items-center justify-center ${pickupSet === pickupName.nameThree ? "border-[1px] border-indigo-500" : "border-[1px] border-indigo-500"}`}>
                                                                    <span className={`rounded-full w-3 h-3 flex items-center justify-center ${pickupSet === pickupName.nameThree ? "bg-indigo-500" : "bg-white"}`} />
                                                                </span>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            {selectedArray.some((branch: any) => branch?.includes('Ghana')) && (
                                                <div className='md:w-[700px] mb-5 md:h-[50vh] xs:w-full xs:h-full'>
                                                    <div
                                                        // onClick={() => {
                                                        //     pickupSet !== pickupName.nameTwo
                                                        //         ? setPickupSet(pickupName.nameTwo)
                                                        //         : setPickupSet(pickupName.nameTwo)
                                                        // }}
                                                        onClick={handlePickupClickTwo}
                                                        className={`mx-2 cursor-pointer my-4 flex justify-between md:flex-row xs:flex-col md:gap-10 xs:gap-2 rounded-md md:py-3 xs:py-2 px-3 ${pickupSet === pickupName.nameTwo ? "border-[1px] border-indigo-500" : "border-[1px] border-indigo-200"}`}
                                                    >
                                                        <div className=''>
                                                            <div className='font-[500] text-gray-800 md:text-[15px] xs:text-[16px] md:text-start xs:text-justify'>
                                                                Pickup - CartTel Accra, Ghana
                                                            </div>
                                                            <div className='font-[400] text-gray-600 md:text-[15px] xs:text-[13px] md:text-start xs:text-justify'>
                                                                2nd Floor, Kojo Bruce House, No. 5 Ayikai Street Adabraka, Accra, Ghana
                                                            </div>
                                                            <div className='font-[400] text-gray-600 md:text-[15px] xs:text-[13px] md:text-start xs:text-justify'>
                                                                +44 500 480 0969
                                                            </div>

                                                        </div>
                                                        <div className='float-left flex items-center justify-center '>
                                                            <div className="text-gray-600 font-[500] uppercase md:text-end xs:text-center flex md:justify-end xs:justify-center">
                                                                <span className={`rounded-full w-5 h-5 flex items-center justify-center ${pickupSet === pickupName.nameTwo ? "border-[1px] border-indigo-500" : "border-[1px] border-indigo-500"}`}>
                                                                    <span className={`rounded-full w-3 h-3 flex items-center justify-center ${pickupSet === pickupName.nameTwo ? "bg-indigo-500" : "bg-white"}`} />
                                                                </span>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <div className=' flex md:px-5 xs:px-0  justify-center items-center  md:w-full xs:w-full mt-10'>
                                            <div className='flex flex-col justify-center items-center my-1 rounded-lg xs:px-5 md:px-20'>
                                                {/* <img alt="" src={Map} className="text-[1px] w-40 h-40 flex justify-center items-center" /> */}
                                                <div className="text-[1px] w-40 h-40 flex justify-center items-center">
                                                    <Image
                                                        src={"/images/Referral/place-marker.gif"}
                                                        alt="check"
                                                        width={200}
                                                        height={200}
                                                    />
                                                </div>

                                                <div className='font-medium md:text-lg xs:text-md my-5 w-full'>
                                                    <div className='font-semibold md:text-[17px] xs:text-[14px] w-full flex justify-center items-center'>
                                                        No Location has been selected yet
                                                    </div>
                                                    <div className='text-gray-500 font-medium w-full md:text-[13px] xs:text-xs flex justify-center items-center my-5 text-center'>
                                                        There are no scheduled pickups location to show. <br />Once you click on the dropdown and select your preferred location, <br />The Pickup Locations in those area would appear.
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex w-full justify-center items-center">
                                        <CustomButton
                                            onClick={handleSetLocation}
                                            disabled={loading || !areCountryItems}
                                            // loaderState={loading}

                                            className={`${loading || !areCountryItems ? "!bg-[#F47F12] opacity-40 text-white" : "!bg-[#F47F12] text-primary"} !py-[0px] !h-[58px] lg:!w-[500px] xs:!w-full !text-md`}
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

                                                        <span className="ml-0">Next</span>
                                                    </div>
                                                )}


                                            </div>
                                        </CustomButton>
                                    </div>
                                </div>

                            )}

                            {isThisForm(1) && (
                                <div>
                                    <div className=''>

                                        <div className='text-center my-2  block w-full pb-0 text-md font-medium text-gray-800 transition-all duration-200 ease-in-out group-focus-within:text-blue-400'>
                                            Select Your Destination Location
                                        </div>
                                        <div className="group relative mt-2 mx-2">
                                            <div className='flex gap-2 justify-center items-center w-full '>
                                                <div className="group relative mt-0 md:!w-[500px] xs:w-full flex justify-center items-center">
                                                    <CustomSelect
                                                        wrapperClass="!border-[0.5px] !border-gray !h-[58px] md:w-full xs:w-full"
                                                        labelClass="!text-[0.875rem] text-gray-500 w-full"
                                                        optionsClass="!text-[0.875rem] !h-[48px] !w-[100%]"
                                                        optionWrapperClass="border-[1px] border-gray-400 w-[100%] !w-full xl:left-[0px] !left-[0px] !h-[200px] !bottom-[-205px] overflow-y-auto"
                                                        label="Select Office Location"
                                                        setSelected={handleDeliveryLocation}
                                                        selected={selectedDeliveryLocation}
                                                        options={userAddress}
                                                    />
                                                </div>
                                                {/* <button onClick={handleSearch} className="bg-[#fbc41d] !h-[48px] rounded-lg text-sm font-semibold md:px-8 xs:px-4 py-2 xs:mx-0  md:ml-4 text-primary">Search</button> */}
                                            </div>
                                        </div>

                                        <div className="group relative mt-2 md:!w-full xs:w-full flex justify-center items-center ">
                                            <div className="gap-10 md:h-[30vh] xs:h-[30vh] md:!w-[500px] xs:w-full flex justify-center items-center">
                                                <div className={`form-group text-[1rem] my-0 group relative mt-0 md:!w-[500px] xs:w-full flex justify-center items-center`}>
                                                    <CustomInputDate
                                                        id="delivery_date"
                                                        showLabel={true}
                                                        type="date"
                                                        value={formData?.deliveryDate}
                                                        setValue={(value) =>
                                                            setFormData((prev: any) => ({ ...prev, deliveryDate: value }))
                                                        }
                                                        label="Delivery Date"
                                                        required
                                                        className=""
                                                    />
                                                </div>
                                                
                                            </div>
                                        </div>
                                    </div>


                                    <div className="flex mt-20 items-center justify-center gap-[20px] lg:flex-row xs:flex-col w-full lg:w-auto">
                                        {
                                            <CustomButton

                                                onClick={previousCurrentFormKey}
                                                className="!text-[#292D32] border-gray !bg-white border-[1px] !py-[0px] !h-[58px] lg:!w-[175px] xs:!w-[300px] !text-[13px]"
                                            >
                                                Previous
                                            </CustomButton>
                                        }
                                        <CustomButton

                                            // className={`!bg-rose-500 !py-[0px] !h-[58px] lg:!w-[175px] xs:!w-[300px] !text-md`}
                                            onClick={handleCreateDropOff}
                                            disabled={loading || !areDropoffItems}
                                            // loaderState={loading}

                                            className={`${loading || !areDropoffItems ? "!bg-[#F47F12] opacity-40 text-white" : "!bg-[#F47F12] text-primary"} !py-[0px] !h-[58px] lg:!w-[175px] xs:!w-[300px] !text-md`}
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

                                                        <span className="ml-0">Create Dropoff</span>
                                                    </div>
                                                )}


                                            </div>
                                        </CustomButton>
                                    </div>
                                </div>
                            )}


                        </div>


                    </div>
                </div>

            </div>

        </div>
    );
}
