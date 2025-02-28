"use client"


import {
    CustomBreadCrumb,
    CustomButton,
    CustomSelect,
    CustomInput
} from "@/components/custom-components";

import CustomModal from "@/components/custom-components/custom-modal";
import { H2, H1, BMiddleRegular, BodySmallestMedium } from "@/components/custom-typography";
import { AiOutlineSchedule, AiOutlineContacts, AiOutlineCheck } from "react-icons/ai";
import ModalPlan from "@/components/ui/modal-plan";
import { RiArrowRightSLine } from "react-icons/ri";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { fetchAllPlans } from "@/config/api";
import { useQuery } from "@tanstack/react-query";

import { SkeletonLoader } from '@/components/ui/skeletonCard';
import apiClient from "@/config/api-clients";
import qs from 'qs';



const breadCrumb = [
    {
        label: "Home",
        link: "/dashboard/settings",
    },
    {
        label: "Plans & Pricing",
        link: "/dashboard/import/settings",
    }
];

interface Currency {
    id: number;
    name: string;
    code: string;
    currency_number: number;
    unicode: string;
}

interface Measurement {
    id: number;
    name: string;
    code: string;
    created_at: string;
    updated_at: string;
}

interface Plan {
    id: number;
    code: string;
    created_at: string;
    updated_at: string;
    currency: Currency;
    duration: number;
    measurement: Measurement;
    name: string;
    price: string;
    type: string; // "Monthly" or "Annually"
}



const PlanPage = () => {
    const userString = localStorage.getItem("user");
    const [currentPlan, setCurrentPlan] = useState("Monthly");
    const [selectedOption, setSelectedOption] = useState('option1');
    const [showModal, setShowModal] = useState(false);
    const [selectDate, setSelectDate] = useState('Monthly');
    const [selectPriceOne, setSelectPriceOne] = useState<any>(null);
    const [selectPriceTwo, setSelectPriceTwo] = useState<any>(null);
    const [selectPlan, setSelectPlan] = useState<any>(null);

    const [userPlan, setUserPlan] = useState<any>([]);

    const [planId, setPlanId] = useState<any>(null);

    const { data: planData, isLoading: isLoadingPlan, isError: isErrorPlans, error: plansError } = useQuery({
        queryKey: ["allPlans"],
        queryFn: fetchAllPlans,
        refetchOnWindowFocus: false, // avoid refetching on window focus
        staleTime: 0, // data becomes stale immediately for refetching
    });

    const [userId, setUserId] = useState<any>(null);

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

    const togglePlanModal = () => {
        setShowModal((prev) => !prev);
    };

    // State for plan prices (by type and by plan name)
    const [planPrice, setPlanPrice] = useState<any>({
        monthly: {},
        annually: {},
    });

    useEffect(() => {
        if (planData) {
            // Filter the plans by type
            const monthlyPlans = planData?.data.filter(
                (plan: Plan) => plan.type.toLowerCase() == "monthly"
            );
            const annuallyPlans = planData?.data.filter(
                (plan: Plan) => plan.type.toLowerCase() == "annually"
            );

            const monthlyPrices = monthlyPlans.map((plan: any) => ({
                id: plan.id,
                [plan.name]: parseInt(plan.price as string),
              }));

            const annuallyPrices = annuallyPlans.map((plan: any) => ({
                id: plan.id,
                [plan.name]: parseInt(plan.price as string),
            }));

            // console.log("plan ", monthlyPlans)

            // Set the plan prices state
            setPlanPrice({
                monthly: monthlyPrices,
                annually: annuallyPrices,
            });
        }
    }, [planData]);

    // eslint-disable-next-line no-unused-vars
    const [planName, setPlanName] = useState({
        nameOne: "Monthly",
        nameTwo: "Annually",
    });

    const handleplanName = () => {
        if (currentPlan !== planName.nameOne) {
            setCurrentPlan(planName.nameOne)
            setSelectDate('Monthly')
        }
    }

    const handleLinkOtherName = () => {
        if (currentPlan !== planName.nameTwo) {
            setCurrentPlan(planName.nameTwo)
            setSelectDate('Annually')
        }
    }

    const handleOptionChange = (e: any) => {
        setSelectedOption(e.target.value);
    };

    const handleProPlan = () => {
        setShowModal(true)
        setSelectPlan("PRO")

        if (selectDate === 'Monthly') {
            setSelectPriceOne(planPrice.monthly[0]?.Pro)
            setPlanId(planPrice.monthly[0]?.id)
        }
        if (selectDate === 'Annually') {
            setSelectPriceOne(planPrice.annually[0]?.Pro)
            setPlanId(planPrice.annually[0]?.id)
        }
    };

    const handlePremiumPlan = () => {
        setShowModal(true)
        setSelectPlan("PREMIUM")

        if (selectDate === 'Monthly') {
            setSelectPriceOne(planPrice.monthly[1]?.Premium)
            setPlanId(planPrice.monthly[1]?.id)
        }
        if (selectDate === 'Annually') {
            setSelectPriceOne(planPrice.annually[1]?.Premium)
            setPlanId(planPrice.annually[1]?.id)
        }

    };

    // useEffect(() => {
    //     console.log("first", planPrice)
    // }, [planPrice]);
    useEffect(() => {
        const fetchUserPlan = async () => {

            console.log("good plan..", userId)

            try {
                const response = await apiClient.get(`/api/v1/user-plan/get-all-user-plans`, {
                    params: {
                        associations: ['plan', 'user'], // Specify the relationships to include
                        sortOrder: 'ASC',
                        sortBy: 'created_at',
                        // byUserId: parseInt(userId),
                        page: 1,
                        perPage: 100,
                    },
                    paramsSerializer: (params) => {
                        return qs.stringify(params, { arrayFormat: 'brackets' });
                    },
                });

                setUserPlan(response?.data?.data)

                const lastItem = response?.data?.data[response?.data?.data.length - 1];

                console.log("data item ..", lastItem);
                console.log("all Request..", response?.data?.data);

                setUserPlan(lastItem)
                return response.data;
            } catch (error) {
                console.error('Error fetching user plan:', error);
                throw error; // Rethrow the error for handling in the component
            }
        };
        fetchUserPlan(); // Fetch data when the component mounts
    }, [userId]);


    if (isLoadingPlan && planPrice) {
        return <SkeletonLoader number={5} />
    }

    return (
        <div>
            <div className='text-lg w-full z-0 relative'>
                <CustomBreadCrumb items={breadCrumb} className="bg-gray-200 font-[500] text-primary w-fit px-5 py-1 rounded-lg" />
                <div className="my-[20px] flex lg:items-center justify-between lg:flex-row flex-col mb-[0px]">
                    <H1 className="">Plans & Pricing</H1>
                </div>
                <div className='font-light md:text-md xs:text-sm text-start w-full my-4'>
                    Simple pricing, No hidden fees, Advanced features for your business. Subscriptions are set to auto-renew at the end of your selected billing period.
                </div>

                <div>
                    <div className="mt-8 flex mx-auto md:w-[80%] sm:w-full">
                        <div className="overflow-hidden w-full border-none ">
                            <div
                                className={`${currentPlan === planName.nameOne ||
                                    planName.nameTwo
                                    ? ""
                                    : ""
                                    } w-full px-0 md:cursor-pointer group py-0  border-none`}
                            >
                                <div className="w-full flex justify-center items-center ">
                                    <div className="text-center grid grid-cols-2 justify-between md:w-[100%] xs:w-full text-sm border-none outline-none">
                                        <h1
                                            className={`${currentPlan === planName.nameOne ? "rounded-lg border-[1px] border-[#fbc421] bg-gray-100" : ""
                                                } py-4 flex items-center md:pr-0 pr-5 group w-full `}
                                            onClick={handleplanName}
                                        >
                                            <div className="flex justify-center items-center w-full text-xs">
                                                {/* <div className="flex md:mr-1 xs:mr-0 h-5 w-5 justify-center">
                                                    <div className=" text-lg flex mr-1 w-10 h-10 justify-center text-gray-600"><AiOutlineContacts /></div>
                                                </div> */}
                                                <label htmlFor="" className='flex items-center'>
                                                    <input
                                                        type="radio"
                                                        value="option1"
                                                        checked={currentPlan === planName.nameOne}
                                                        onChange={handleOptionChange}
                                                        className=' w-3 h-3 border rounded-full checked:bg-slate-600 checked:border-transparent  border-pink-600  mr-1'
                                                    />
                                                    <span className="md:flex xs:hidden justify-center items-center text-center text-gray-600">
                                                        {planName.nameOne}
                                                    </span>

                                                </label>

                                            </div>
                                        </h1>

                                        <h1
                                            className={`${currentPlan === planName.nameTwo ? "rounded-lg border-[1px] border-[#fbc421] bg-gray-100" : ""
                                                } py-4 flex items-center md:pr-0 pr-5 group w-full `}
                                            onClick={handleLinkOtherName}
                                        >
                                            <div className="flex justify-center items-center w-full text-xs">
                                                {/* <div className="flex md:mr-1 xs:mr-0 h-5 w-5 justify-center">
                                                    <div className=" text-lg flex mr-1 w-10 h-10 justify-center text-gray-600"><AiOutlineSchedule /></div>
                                                </div> */}
                                                <label htmlFor="" className='flex items-center'>
                                                    <input
                                                        type="radio"
                                                        value="option2"
                                                        checked={currentPlan === planName.nameTwo}
                                                        onChange={handleOptionChange}
                                                        className=" w-3 h-3 border border-slate-800 rounded-full checked:bg-slate-600 checked:border-transparent focus:outline-none mr-1 p-1"
                                                    />
                                                    <span className='flex'>
                                                        <span className="md:flex xs:hidden justify-center items-center text-center text-gray-600 ">
                                                            {planName.nameTwo}
                                                        </span>
                                                        <span className='py-2 px-3 bg-[#fbc421] text-slate-900 rounded-lg font-bold ml-2'>
                                                            7% OFF
                                                        </span>


                                                    </span>

                                                </label>

                                            </div>
                                        </h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='w-full grid lg:grid-cols-3 md:grid-cols-2 xs:grid-cols-1 gap-4 mt-10'>

                        <div className='rounded-lg border-[1px] border-gray-400 py-2 px-4'>

                            <div className='font-semibold text-lg'>BASIC</div>

                            <div className='font-light text-sm my-5'>All great things begin somewhere.</div>

                            <div className='font-light text-sm my-5 flex items-center'>
                                <span className='text-3xl font-semibold'>$0 </span>
                                / {currentPlan === planName.nameOne ? "Month" : "Year"}
                            </div>

                            {/* <button className='text-center text-slate-500 font-medium my-2 border-gray-200 border-[2px] w-full rounded-lg px-2 py-3'>
                                Current Plan
                            </button> */}
                            <button
                                // onClick={handlePremiumPlan}
                                disabled={userPlan?.isExpired === true}
                                className={`${userPlan?.isExpired === true ? "bg-white" : "bg-[#fbc421]"} text-center text-slate-800 font-medium my-2 border-gray-200 border-[2px] w-full rounded-lg px-2 py-3`}
                            >
                                {userPlan?.isExpired === true ? "Current Plan" : "Get Started"}
                            </button>

                            <div className='text-sm my-2'>
                                This Plan Includes:
                            </div>

                            <div className='my-7'>
                                <div className='flex  my-3'>
                                    <div className='text-[#fbc421] font-bold text-xl'>
                                        <AiOutlineCheck />
                                    </div>
                                    <div className='text-light text-sm ml-4'>
                                        Shipping from USA to Nigeria at $8 per pound (lb)

                                    </div>
                                </div>

                                <div className='flex my-3'>
                                    <div className='text-[#fbc421] font-bold text-xl'>
                                        <AiOutlineCheck />
                                    </div>
                                    <div className='text-light text-sm ml-4'>
                                        Shipping from USA to Ghana at $8 per pound (lb)

                                    </div>
                                </div>

                                <div className='flex my-3'>
                                    <div className='text-[#fbc421] font-bold text-xl'>
                                        <AiOutlineCheck />
                                    </div>
                                    <div className='text-light text-sm ml-4'>
                                        Shipping from UK to Nigeria at $7 per pound (lb)

                                    </div>
                                </div>

                                <div className='flex my-3'>
                                    <div className='text-[#fbc421] font-bold text-xl'>
                                        <AiOutlineCheck />
                                    </div>
                                    <div className='text-light text-sm ml-4'>
                                        Shipping from UK to Ghana at $7 per pound (lb)

                                    </div>
                                </div>

                                <div className='flex my-3'>
                                    <div className='text-[#fbc421] font-bold text-xl'>
                                        <AiOutlineCheck />
                                    </div>
                                    <div className='text-light text-sm ml-4'>
                                        Maximum of 3 delivery addresses

                                    </div>
                                </div>

                                <div className='flex my-3'>
                                    <div className='text-[#fbc421] font-bold text-xl'>
                                        <AiOutlineCheck />
                                    </div>
                                    <div className='text-light text-sm ml-4'>
                                        Split payments with up to 2 contacts

                                    </div>
                                </div>

                                <div className='flex my-3'>
                                    <div className='text-[#fbc421] font-bold text-xl'>
                                        <AiOutlineCheck />
                                    </div>
                                    <div className='text-light text-sm ml-4'>
                                        Pay $20 more to enjoy faster shipping from select warehouses to Nigeria

                                    </div>
                                </div>

                                <div className='flex my-3'>
                                    <div className='text-[#fbc421] font-bold text-xl'>
                                        <AiOutlineCheck />
                                    </div>
                                    <div className='text-light text-sm ml-4'>
                                        Pay $20 more to enjoy faster shipping from select warehouses to Ghana

                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className='rounded-lg border-[1px] border-gray-400 py-2 bg-[#1d428a]'>
                            <div className='w-fit ml-auto bg-[#fbc421] px-3'>Recommended</div>

                            <div className='px-4'>
                                <div className='font-semibold text-lg text-white'>PRO</div>

                                <div className='font-light text-sm my-5 text-white'>More value for your money</div>

                                <div className='font-light text-sm my-5 flex items-center text-white'>
                                    <span className='text-3xl font-semibold'>{currentPlan === planName.nameOne ? `$${planPrice.monthly[0]?.Pro}` : `$${planPrice.annually[0].Pro}`}</span>
                                    / {currentPlan === planName.nameOne ? "Month" : "Year"}
                                </div>
                                {/* <div>{userPlan?.plan?.name}</div> */}

                                
                                <button
                                    onClick={handleProPlan}
                                    disabled={userPlan?.isExpired === false && userPlan?.plan?.name == "Pro"}
                                    className={`${userPlan?.isExpired === false && userPlan?.plan?.name == "Pro" ? "bg-white" : "bg-[#fbc421]"} text-center text-slate-800 font-medium my-2 border-transparent border-[2px] w-full rounded-lg px-2 py-3`}
                                >
                                    {userPlan?.isExpired === false && userPlan?.plan?.name == "Pro" ? "Current Plan" : "Get Started"}
                                </button>

                                <div className='text-sm my-2 text-white'>
                                    This Plan Includes:
                                </div>

                                <div className='my-7'>
                                    <div className='flex  my-3'>
                                        <div className='text-[#fbc421] font-bold text-xl'>
                                            <AiOutlineCheck />
                                        </div>
                                        <div className='text-light text-sm ml-4 text-white'>
                                            Shipping from USA to Nigeria at $6 per pound (lb)

                                        </div>
                                    </div>

                                    <div className='flex my-3'>
                                        <div className='text-[#fbc421] font-bold text-xl'>
                                            <AiOutlineCheck />
                                        </div>
                                        <div className='text-light text-sm ml-4 text-white'>
                                            Shipping from USA to Ghana at $6 per pound (lb)

                                        </div>
                                    </div>

                                    <div className='flex my-3'>
                                        <div className='text-[#fbc421] font-bold text-xl'>
                                            <AiOutlineCheck />
                                        </div>
                                        <div className='text-light text-sm ml-4 text-white'>
                                            Shipping from UK to Nigeria at $5 per pound (lb)

                                        </div>
                                    </div>

                                    <div className='flex my-3'>
                                        <div className='text-[#fbc421] font-bold text-xl'>
                                            <AiOutlineCheck />
                                        </div>
                                        <div className='text-light text-sm ml-4 text-white'>
                                            Shipping from UK to Ghana at $5 per pound (lb)

                                        </div>
                                    </div>

                                    <div className='flex my-3'>
                                        <div className='text-[#fbc421] font-bold text-xl'>
                                            <AiOutlineCheck />
                                        </div>
                                        <div className='text-light text-sm ml-4 text-white'>
                                            Select multiple addresses during checkout
                                        </div>
                                    </div>

                                    <div className='flex my-3'>
                                        <div className='text-[#fbc421] font-bold text-xl'>
                                            <AiOutlineCheck />
                                        </div>
                                        <div className='text-light text-sm ml-4 text-white'>
                                            Up to 10k delivery addresses

                                        </div>
                                    </div>

                                    <div className='flex my-3'>
                                        <div className='text-[#fbc421] font-bold text-xl'>
                                            <AiOutlineCheck />
                                        </div>
                                        <div className='text-light text-sm ml-4 text-white'>
                                            45 Minutes Support Response Time

                                        </div>
                                    </div>

                                    <div className='flex my-3'>
                                        <div className='text-[#fbc421] font-bold text-xl'>
                                            <AiOutlineCheck />
                                        </div>
                                        <div className='text-light text-sm ml-4 text-white'>
                                            Split payments with up to 10 contacts

                                        </div>
                                    </div>

                                    <div className='flex my-3'>
                                        <div className='text-[#fbc421] font-bold text-xl'>
                                            <AiOutlineCheck />
                                        </div>
                                        <div className='text-light text-sm ml-4 text-white'>
                                            Customize the shipping labels with your business name

                                        </div>
                                    </div>

                                    <div className='flex my-3'>
                                        <div className='text-[#fbc421] font-bold text-xl'>
                                            <AiOutlineCheck />
                                        </div>
                                        <div className='text-light text-sm ml-4 text-white'>
                                            Same day and reserved priority pickup time slots

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='rounded-lg border-[1px] border-gray-400 py-2 px-4'>
                            <div className='font-semibold text-lg'>PREMIUM</div>
                            <div className='font-light text-sm my-5'>For Business and Enterprise.</div>
                            <div className='font-light text-sm my-5 flex items-center'>
                                <span className='text-3xl font-semibold'>{currentPlan === planName.nameOne ? `$${planPrice.monthly[1]?.Premium}` : `$${planPrice.annually[1]?.Premium}`} </span>
                                / {currentPlan === planName.nameOne ? "Month" : "Year"}
                            </div>

                            <button
                                onClick={handlePremiumPlan}
                                disabled={userPlan?.isExpired === false && userPlan?.plan?.name == "Premium"}
                                className={`${userPlan?.isExpired === false && userPlan?.plan?.name == "Premium" ? "bg-white" : "bg-[#fbc421]"} text-center text-slate-800 font-medium my-2 border-gray-200 border-[2px] w-full rounded-lg px-2 py-3`}
                            >
                                {userPlan?.isExpired === false && userPlan?.plan?.name == "Premium" ? "Current Plan" : "Get Started"}
                            </button>

                            <div className='text-sm my-2'>
                                This Plan Includes:
                            </div>

                            <div className='my-7'>
                                <div className='flex  my-3'>
                                    <div className='text-[#fbc421] font-bold text-xl'>
                                        <AiOutlineCheck />
                                    </div>
                                    <div className='text-light text-sm ml-4'>
                                        Shipping from USA to Nigeria at $5 per pound (lb)

                                    </div>
                                </div>

                                <div className='flex my-3'>
                                    <div className='text-[#fbc421] font-bold text-xl'>
                                        <AiOutlineCheck />
                                    </div>
                                    <div className='text-light text-sm ml-4'>
                                        Shipping from USA to Ghana at $5 per pound (lb)

                                    </div>
                                </div>

                                <div className='flex my-3'>
                                    <div className='text-[#fbc421] font-bold text-xl'>
                                        <AiOutlineCheck />
                                    </div>
                                    <div className='text-light text-sm ml-4'>
                                        Shipping from UK to Nigeria at $4 per pound (lb)

                                    </div>
                                </div>

                                <div className='flex my-3'>
                                    <div className='text-[#fbc421] font-bold text-xl'>
                                        <AiOutlineCheck />
                                    </div>
                                    <div className='text-light text-sm ml-4'>
                                        Shipping from UK to Ghana at $4 per pound (lb)

                                    </div>
                                </div>

                                <div className='flex my-3'>
                                    <div className='text-[#fbc421] font-bold text-xl'>
                                        <AiOutlineCheck />
                                    </div>
                                    <div className='text-light text-sm ml-4'>
                                        Select multiple addresses during checkout
                                    </div>
                                </div>

                                <div className='flex my-3'>
                                    <div className='text-[#fbc421] font-bold text-xl'>
                                        <AiOutlineCheck />
                                    </div>
                                    <div className='text-light text-sm ml-4'>
                                        Unlimited delivery addresses

                                    </div>
                                </div>

                                <div className='flex my-3'>
                                    <div className='text-[#fbc421] font-bold text-xl'>
                                        <AiOutlineCheck />
                                    </div>
                                    <div className='text-light text-sm ml-4'>
                                        30 Minutes Support Response Time

                                    </div>
                                </div>

                                <div className='flex my-3'>
                                    <div className='text-[#fbc421] font-bold text-xl'>
                                        <AiOutlineCheck />
                                    </div>
                                    <div className='text-light text-sm ml-4'>
                                        Split payments with up to 100 contacts

                                    </div>
                                </div>

                                <div className='flex my-3'>
                                    <div className='text-[#fbc421] font-bold text-xl'>
                                        <AiOutlineCheck />
                                    </div>
                                    <div className='text-light text-sm ml-4'>
                                        Customize the shipping labels with your business name

                                    </div>
                                </div>

                                <div className='flex my-3'>
                                    <div className='text-[#fbc421] font-bold text-xl'>
                                        <AiOutlineCheck />
                                    </div>
                                    <div className='text-light text-sm ml-4'>
                                        Same day and reserved priority pickup time slots

                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
            {showModal && (
                <CustomModal onClose={togglePlanModal} backdrop={true}>
                    {/* <StartShipmentRequest onClose={togglePlanModal} id={parseInt(id)} slaId={procurementData?.sla?.id} /> */}
                    <ModalPlan
                        planId={planId}
                        onClose={togglePlanModal}
                        selectDate={selectDate}
                        selectPriceOne={selectPriceOne}
                        selectPlan={selectPlan}
                    />
                </CustomModal>
            )}
        </div>
    )
}

export default PlanPage
