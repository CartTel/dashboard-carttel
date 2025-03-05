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
import React, { useEffect, useState, useMemo } from "react";
import { rescheduledPickupRequest, completedPickupRequest } from "@/config/api";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";



type CompletedPickupProps = {
    onClose: () => void; // Function to close the modal
    id: number; // ID of the request to approve
};

const TimeSlot = ({ id, value, label, selectedTime, onChange }: any) => {
    return (
        <li>
            <input
                type="radio"
                id={id}
                className="hidden peer"
                name="timetable"
                value={value}
                checked={selectedTime === value}
                onChange={onChange}
            />
            <label
                htmlFor={id}
                className="inline-flex items-center justify-center w-full p-2 text-sm font-medium text-center bg-white border rounded-lg cursor-pointer text-gray-900 border-gray-300 dark:hover:text-white dark:border-primary dark:peer-checked:border-primary peer-checked:border-primary peer-checked:bg-primary hover:text-gray-900 peer-checked:text-white hover:bg-blue-500 dark:text-blue-500 dark:bg-gray-900 dark:hover:bg-blue-600 dark:hover:border-blue-600 dark:peer-checked:bg-primary"
            >
                {label}
            </label>
        </li>
    );
};

export function CompletedPickup({ onClose, id }: CompletedPickupProps) {

    const [selectedTime, setSelectedTime] = useState('');
    const userString = localStorage.getItem("user");

    const [formData, setFormData] = useState<any>({
        pickup_id: "",
        actual_pickup_time: "",
        pickupDate: null,
    });
    const router = useRouter();
    const [userId, setUserId] = useState<any>(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleCompletedPickup = async (e: React.FormEvent<HTMLFormElement>) => {
        e?.preventDefault();
        setLoading(true);
        console.log("object food", formData);
        try {
            const data = await completedPickupRequest(formData?.actual_pickup_time, formData?.pickup_id);

            console.log("response for warehouse ..", data);

            if (data) {
                toast({
                    title: "Success",
                    description: `${data?.pickup?.message}🎉`,
                    variant: "destructive",
                });

                onClose()
                setLoading(false);
                // router.push('/dashboard/import/pickup');
                // Delay the page reload to allow the toast and onClose to complete
                setTimeout(() => {
                    window.location.reload();
                }, 5000);
            }
        } catch (error: any) {
            if (error) {
                console.error("An unexpected error occurred:", error);

                onClose()
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
        if (userId) {
            setFormData((prevForm: any) => ({
                ...prevForm,
                pickup_id: id,
            }));
        }
    }, [userId, id]);

    const arePickupItems = useMemo(() => {

        const textComplete = formData.actual_pickup_time?.trim() !== "";
        return textComplete
    }, [formData]);

    const handleInputChange = (event: any) => {
        setSelectedTime(event.target.value);

        setFormData((prevForm: any) => ({
            ...prevForm,
            actual_pickup_time: event.target.value,
        }));

    };

    const timeSlots = [
        { id: '10-am', value: '10:00 AM', label: '10:00 AM' },
        { id: '10-30-am', value: '10:30 AM', label: '10:30 AM' },
        { id: '11-am', value: '11:00 AM', label: '11:00 AM' },
        { id: '11-30-am', value: '11:30 AM', label: '11:30 AM' },
        { id: '12-am', value: '12:00 AM', label: '12:00 AM' },
        { id: '12-30-pm', value: '12:30 PM', label: '12:30 PM' },
        { id: '1-pm', value: '1:00 PM', label: '1:00 PM' },
        { id: '1-30-pm', value: '1:30 PM', label: '1:30 PM' },
        { id: '2-pm', value: '2:00 PM', label: '2:00 PM' },
        { id: '2-30-pm', value: '2:30 PM', label: '2:30 PM' },
        { id: '3-pm', value: '3:00 PM', label: '3:00 PM' },
        { id: '3-30-pm', value: '3:30 PM', label: '3:30 PM' },
        { id: '4-pm', value: '4:00 PM', label: '4:00 PM' },
        { id: '4-30-pm', value: '4:30 PM', label: '4:30 PM' },
        { id: '5-pm', value: '5:00 PM', label: '5:00 PM' },
        { id: '5-30-pm', value: '5:30 PM', label: '5:30 PM' },
        { id: '6-pm', value: '6:00 PM', label: '6:00 PM' },
        { id: '6-30-pm', value: '6:30 PM', label: '6:30 PM' }
    ];


    return (
        <form
            onSubmit={handleCompletedPickup}
            className="py-[28px] lg:px-[30px] px-4 bg-white rounded-[10px] shadow md:w-[574.18px] xs:w-full">

            <div className="w-full flex justify-center items-center">
                <Image
                    src={"/images/checkmark.svg"}
                    alt="check"
                    width={100}
                    height={100}
                />
            </div>

            <div className="text-center w-full">
                <SecondaryText className="mb-[23px] !text-[16px]">Complete Pickup</SecondaryText>
            </div>

            <div className="px-0">
                <div>
                    <div className="flex px-5 md:w-full xs:full justify-center items-center flex-col md:gap-4 xs:gap-4">
                        <div className='text-center my-2 mx-2 block w-full pb-0 text-md font-medium text-gray-800 transition-all duration-200 ease-in-out group-focus-within:text-blue-400'>
                            Select PickUp Time
                        </div>

                        <div className="border-gray-200 dark:border-gray-800 md:w-full xs:w-full mt-0 sm:mt-0">
                            <ul id="timetable" className="grid w-full md:grid-cols-3 xs:grid-cols-2 md:gap-5 xs:gap-4 mt-5">
                                {timeSlots.map((slot) => (
                                    <TimeSlot
                                        key={slot.id}
                                        id={slot.id}
                                        value={slot.value}
                                        label={slot.label}
                                        selectedTime={selectedTime}
                                        onChange={handleInputChange}
                                    />
                                ))}
                            </ul>
                        </div>


                    </div>
                </div>
            </div>

            <div className="flex items-center justify-center gap-[20px] lg:flex-row xs:flex-col w-full lg:w-auto mt-10">
                {
                    <CustomButton

                        onClick={onClose}
                        className="!text-[#292D32] border-gray !bg-white border-[1px] !py-[0px] !h-[58px] lg:!w-[175px] xs:!w-[300px] !text-[13px]"
                    >
                        Cancel
                    </CustomButton>
                }
                <CustomButton
                    disabled={loading || !arePickupItems}
                    className={`${loading || !arePickupItems ? "!bg-lime-600 opacity-40 text-white" : "!bg-lime-600 text-white"}  !py-[0px] !h-[58px] lg:!w-[175px] xs:!w-[300px] !text-md`}
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

                                <span className="ml-0">Complete Pickup</span>
                            </div>
                        )}


                    </div>
                </CustomButton>
            </div>
        </form>
    );
}
