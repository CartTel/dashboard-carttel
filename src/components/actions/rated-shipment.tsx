"use client";

import {
    CustomButton,
    CustomInput,
    CustomSelect,
} from "@/components/custom-components";
import {
    B1,
    B2,
    BMiddle,
    BodySmallest,
    H2,
    SecondaryText,
} from "@/components/custom-typography";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
// import { rateJob } from "@/config/api";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import StarRating from "../ui/star-rating";


type RateJobProps = {
    onClose: () => void; // Function to close the modal
    id: number; // ID of the request to approve
};

export function RateRequest({ onClose, id }: RateJobProps) {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const router = useRouter();
    const [userText, setText] = useState<string>("");
    const [showRating, setShowRating] = useState(false);
    const [rating, setRating] = useState(0);
    const [remark, setRemark] = useState("");

    const handleRatingChange = (newRating: number) => {
        setRating(newRating);
    };

    const handleRateJob = async (e: React.FormEvent<HTMLFormElement>) => {
        e?.preventDefault();
        setLoading(true);
        setError("");
        setSuccessMessage("");

        try {
            // Call the API to approve the request
            // console.log("all the ID", id, remark, rating)

            // const result = await rateJob(id, remark, rating);
            // if (result) {
            //     toast({
            //         title: "Success",
            //         description: `Shipment Rated successfully! 🎉`,
            //         variant: "destructive",
            //     });

            //     onClose()
            //     setLoading(false);
            //     // Delay the page reload to allow the toast and onClose to complete
            //     setTimeout(() => {
            //         window.location.reload();
            //     }, 5000); // 1000ms = 1 second delay
            // }
            // // Handle success
            // setSuccessMessage("Request Rated successfully!");
        } catch (err: any) {
            // Handle error
            setError(err.message || "An error occurred while stop the request.");
        } finally {
            setLoading(false);
        }
    };


    return (
        <form
            onSubmit={handleRateJob}
            className="py-[38px] lg:px-[30px] px-4 bg-white rounded-[10px] shadow w-[574.18px] xs:w-full">



            {/* <div className="w-full flex justify-center items-center">
        <Image
          src={"/images/terminate.svg"}
          alt="check"
          width={96}
          height={96}
        />
      </div>

      

      <CustomInput
        id="additional-info"
        inputType="textarea"
        label="Type Here.."
        className="!h-[170px] mb-[38px]"
        setValue={setText}
      /> */}
            <div className="py-[18px] w-full flex flex-col items-center">


                {/* <Image
          src={"/images/star-dynamic-color.svg"}
          alt="Rating star"
          width={144}
          height={144}
          className="w-[144px] h-[144px] mb-5"
        /> */}

            </div>
            <div className="text-center w-full">
                <SecondaryText className="mb-[23px]">Rate Shipment</SecondaryText>
            </div>
            <div className="flex flex-col items-center mt-4 mb-6">
                <StarRating
                    totalStars={5}
                    onRatingChange={handleRatingChange}
                />
            </div>
            <div className="px-4 w-[100%] self-start">
                <CustomInput
                    inputType="textarea"
                    value={remark}
                    setValue={(value: any) => setRemark(value)}
                    label="Remark Here"
                    required
                    className="!h-[170px] mb-[38px] "
                />
            </div>

            <div className="flex items-center justify-center gap-[20px] lg:flex-row xs:flex-col w-full lg:w-auto">
                {
                    <CustomButton

                        onClick={onClose}
                        className="!text-[#292D32] border-gray !bg-white border-[1px] !py-[0px] !h-[58px] lg:!w-[175px] xs:!w-[300px] !text-[13px]"
                    >
                        Cancel
                    </CustomButton>
                }
                <CustomButton
                    disabled={loading}
                    // loaderState={loading}
                    className={`!bg-indigo-500 !py-[0px] !h-[58px] lg:!w-[175px] xs:!w-[300px] !text-md`}
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

                                <span className="ml-0">Rate Shipment</span>
                            </div>
                        )}


                    </div>
                </CustomButton>
            </div>
        </form>
    );
}
