"use client"

import {
    CustomBreadCrumb,
    CustomButton,
    CustomSelect,
    CustomInput
} from "@/components/custom-components";
import { H2, H1, BMiddleRegular, BodySmallestMedium } from "@/components/custom-typography";
import Link from 'next/link';
import { RiArrowRightSLine } from "react-icons/ri";
import { useState, useEffect, useRef, useMemo } from 'react';
import { BsCheckLg } from "react-icons/bs";
import Image from "next/image";
import { fetchSingleProcurementRequest, awaitingProcessRequest } from "@/config/api";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";


const breadCrumb = [
    {
        label: "Home",
        link: "/dashboard/import",
    },
    {
        label: "Procurement",
        link: "/dashboard/import/procurement",
    },
    {
        label: "Awaiting Process",

    },
];

interface ItemDetails {
    websiteLink: string,
    websiteChoice: string,
    quantity: any
}

interface ProcurementInfoForm {
    procurement_id: number | null;
    name: string;
    description: string;
    items: ItemDetails[];
}

interface AwaitingProcessDetailsProps {
    id: string;
  }

const AwaitingProcess = ({ id }: AwaitingProcessDetailsProps) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const router = useRouter();
    const [formData, setFormData] = useState<ProcurementInfoForm>({
        procurement_id: null,
        name: "",
        description: "",
        items: [{
            websiteLink: "",
            websiteChoice: "",
            quantity: null
        }]
    });

    const { data: procurementData, isLoading: isLoadingShipment, isError: isErrorUsers, error: shipmentsError } = useQuery({
        queryKey: ["singleProcurements", id],
        queryFn: () => fetchSingleProcurementRequest(parseInt(id)),
        refetchOnWindowFocus: false, // avoid refetching on window focus
        staleTime: 0, // data becomes stale immediately for refetching
    });

    const savedRole = localStorage.getItem("roles");

    const userString = localStorage.getItem("user");

    const [isLoadingButton, setLoadingButton] = useState(false);

    // ITEM INFO 
    const [items, setItems] = useState([
        {
            websiteLink: "",
            websiteChoice: "",
            quantity: 0
        }
    ]);

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
            const filteredItems = procurementData?.items?.map((item: any )=> ({
                websiteLink: item.websiteLink,
                websiteChoice: item.websiteChoice,
                quantity: item.quantity,
            }));
              
            console.log(filteredItems);

            setFormData((prev: any) => {
                const newData = {
                    ...prev,
                    procurement_id: procurementData?.id,
                    name: procurementData?.name,
                    description: procurementData?.description, 
                    items: filteredItems,  

                };
                return newData;
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userString, procurementData]);

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
                    websiteLink: "",
                    websiteChoice: "",
                    quantity: null
                },
            ],
        }));
    };

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

    const handleItemChange = (index: number, field: string, value: any) => {
        setFormData((prev: any) => {
            // Copy the existing items array.
            const newItems = [...prev.items];

            {
                newItems[index] = {
                    ...newItems[index],
                    [field]: value
                };
            }

            return { ...prev, items: newItems };
        });
    };

    const handleItemQuantityChange = (index: number, field: string, value: any) => {
        // console.log("first item", timeArray, field)
        setFormData((prev: any) => {
            // Copy the existing items array.
            const newItems = [...prev.items];

            {
                newItems[index] = {
                    ...newItems[index],
                    [field]: parseInt(value)
                };
            }

            return { ...prev, items: newItems };
        });
    };

    const areItemsComplete = useMemo(() => {
        // Return false if no items are present
        if (!formData?.items || formData?.items.length === 0) return false;
        return formData?.items.every((item: any) => {
            // Check that text fields are non-empty
            const textComplete =
                formData?.name?.trim() !== "" &&
                formData?.description?.trim() !== "";

            const numbersComplete =
                item?.websiteLink?.trim() !== "" &&
                item?.quantity !== null &&
                item?.websiteChoice?.trim() !== "";

            // Check nested dimension fields


            return textComplete && numbersComplete
        });
    }, [formData]);

    const handleProviderFour = () => {
        console.log("all the prevoius data...", formData);
        // setActive(active + 1);
    };

    const handleProcurementShipment = async (e: React.FormEvent<HTMLFormElement>) => {
        e?.preventDefault();
        setLoading(true);
        setError("");
        setSuccessMessage("");

        try {
            // Call the API to approve the request
            console.log("all the ID", formData)

            const result = await awaitingProcessRequest(formData);
            if (result) {
                toast({
                    title: "Success",
                    description: `Awaiting Process Successfully 🎉`,
                    variant: "destructive",
                });

                setLoading(false);
                router.push("/dashboard/import/procurement");
                // Delay the page reload to allow the toast and onClose to complete
                setTimeout(() => {
                    window.location.reload();
                }, 5000); // 1000ms = 1 second delay
            }
            // Handle success
            setSuccessMessage("Awaiting Process Successfully!");
        } catch (err: any) {
            console.log("first", err)

            toast({
                title: "Error",
                description: `${err?.response?.data?.message}`,
                variant: "destructive",
            });

            // Handle error
            setError(err.message || "An error occurred while approving the request.");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="text-lg  w-full z-0 relative">
            <CustomBreadCrumb items={breadCrumb} className="bg-gray-200 font-[500] text-primary w-fit px-5 py-1 rounded-lg" />
            <div className="my-[20px] flex lg:items-center justify-between lg:flex-row flex-col mb-[0px]">
                <H1 className="">Awaiting Process</H1>
            </div>


            <div className="flex items-center justify-center lg:w-full md:w-full">
                <div className="w-full flex flex-col p-0 max-w-5xl px-2">
                    <div className="w-full flex-1 mt-4">
                        <div className="">
                            <div className="flex md:flex-row xs:flex-col gap-10 my-10">
                                <div className={`edit-group flex w-[100%] text-[1rem] my-0`}>
                                    <CustomInput
                                        id="name"
                                        name="name"
                                        type="text"
                                        label="Name"
                                        required
                                        value={formData?.name}
                                        onChange={handleChange}
                                        showRequirement={true}
                                        className="px-0 mb-[5px] md:w-full xs:w-full text-[16px]"
                                    />
                                </div>
                                <div className={`edit-group flex w-[100%] text-[1rem] my-0`}>
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
                            </div>

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

                                                <div className=" grid items-center pb-5 lg:grid-cols-3 md:grid-cols-1 xs:gap-5 md:gap-5">
                                                    <div className={`edit-group flex w-[100%] text-[1rem] mt-2`}>

                                                        <CustomInput
                                                            id="name"
                                                            name="websiteLink"
                                                            type="text"
                                                            label="Website Link"
                                                            required
                                                            value={item.websiteLink || ""}
                                                            onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                                                                handleItemChange(index, 'websiteLink', e.target.value)
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
                                                            label="Website Choice"
                                                            setSelected={(value: string) =>
                                                                handleItemChange(index, 'websiteChoice', value)
                                                            }
                                                            selected={item?.websiteChoice}
                                                            options={[
                                                                {
                                                                    label: 'Addidas',
                                                                    value: 'Addidas'
                                                                },
                                                                {
                                                                    label: 'Amazon',
                                                                    value: 'Amazon'
                                                                },
                                                                {
                                                                    label: 'Apple',
                                                                    value: 'Apple'
                                                                },
                                                                {
                                                                    label: 'Asos',
                                                                    value: 'Asos'
                                                                },
                                                                {
                                                                    label: 'Ebay',
                                                                    value: 'Ebay'
                                                                },
                                                                {
                                                                    label: 'Farfetch',
                                                                    value: 'Farfetch'
                                                                },
                                                                {
                                                                    label: 'Fashionova',
                                                                    value: 'Fashionova'
                                                                },
                                                                {
                                                                    label: 'Nike',
                                                                    value: 'Nike'
                                                                },
                                                                {
                                                                    label: 'Zara',
                                                                    value: 'Zara'
                                                                }
                                                            ]}
                                                        />

                                                    </div>

                                                    <div className={`edit-group flex w-[100%] text-[1rem] mt-2`}>

                                                        <CustomInput
                                                            id="quantity"
                                                            name="quantity"
                                                            type="number"
                                                            label="Quantity"
                                                            required
                                                            min={1}
                                                            value={item.quantity || ""}
                                                            onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                                                                handleItemQuantityChange(index, 'quantity', e.target.value)
                                                            }
                                                            showRequirement={true}
                                                            className="px-0 mb-[0px] md:w-full xs:w-full text-[16px]"
                                                        />
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


                                <CustomButton
                                    disabled={loading || !areItemsComplete}
                                    onClick={handleProcurementShipment}
                                    // loaderState={loading}
                                    className={`${!areItemsComplete ? "bg-primary opacity-40" : "bg-primary"} flex text-center justify-center font-semibold z-10 relative md:text-[16px] rounded-lg md:py-2 md:px-16 xs:text-[15px] xs:py-4 xs:px-10 w-full !text-white`}
                                // className={`!bg-purple-400 !py-[0px] !h-[58px] lg:!w-[175px] xs:!w-[300px] !text-md`}
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
                                                <span className="ml-0">Awaiting Process</span>
                                            </div>
                                        )}
                                    </div>
                                </CustomButton>


                            </div>

                        </div>
                    </div>
                </div>
            </div>



        </div>
    )
}

export default AwaitingProcess;