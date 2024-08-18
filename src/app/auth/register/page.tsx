"use client";

import Image from 'next/image'
import { CustomButton, CustomSelect } from '@/components/custom-components';
import { CustomInput } from '@/components/custom-components';
import React from 'react'
import { B1, B2, H2, H1, BMiddle, B2Regular } from '@/components/custom-typography';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Spinner from '@/components/ui/Spinner/Spinner';
import Link from 'next/link';
import * as RPNInput from "react-phone-number-input";

import { PhoneInput, defaultCountry } from '@/components/custom-components/phone-input';
import {
    Country,
    formatPhoneNumber,
    formatPhoneNumberIntl,
    getCountryCallingCode,
} from "react-phone-number-input";
import tr from "react-phone-number-input/locale/tr";

import CountrySelector from '@/components/custom-components/country-selector';




function Register() {
    const [phone, setPhone] = useState<string | undefined>(undefined);


    const [isToggle, setIsToggle] = useState<boolean>(true);
    const [signInState, setSignInState] = useState<number>(1);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter()
    const changeToggle = () => setIsToggle(!isToggle);

    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [text, setText] = useState<string>('');
    const [textValue, setTextValue] = useState<string>('');
    const [testOne, setTestOne] = useState<boolean>(false);
    const [testTwo, setTestTwo] = useState<boolean>(false);
    const [testThree, setTestThree] = useState<boolean>(false);
    const [testFour, setTestFour] = useState<boolean>(false);
    const [discovery, setDiscovery] = useState<string>("");
    const [businessType, setBusinessType] = useState<string>("");

    const [terms, setTerms] = useState<boolean>(false);

    const handleTermChange = (value: boolean) => {
        console.log("call", value);
        setTerms(!value)
    };



    const [confirmPasswordToggle, setConfirmPasswordToggle] = useState<boolean>(true);
    const changeConfirmPasswordToggle = () => setConfirmPasswordToggle(!confirmPasswordToggle);

    const handlePasswordChange = (value: any) => {
        const userValue = value;
        setPassword(userValue);
        checkForTextOne(userValue);
        checkForTextTwo(userValue);
        checkForTextThree(userValue);
        checkForTextFour(userValue);
    };


    const checkForTextOne = (userValue: string) => {
        // CHARACTER MUST BE MORE THAN 8 CHARACTER
        if (userValue.length > 5) {
            setText("Too Weak");
            setTextValue("At least 6 characters long, with one uppercase letter or one number");
            setTestOne(true);
        } else {
            setText("");
            setTextValue("");
            setTestOne(false);
        }
    };

    const checkForTextTwo = (userValue: string) => {
        // UPPERCASE
        if (userValue.length > 5 && /[A-Z]/.test(userValue)) {
            setText("Could be Stronger");
            setTextValue("");
            setTestTwo(true);
        } else {
            setTestTwo(false);
        }
    };

    const checkForTextThree = (userValue: string) => {
        // DIGIT
        if (userValue.length > 5 && /[A-Z]/.test(userValue) && /\d/.test(userValue)) {
            setText("Strong Password");
            setTestThree(true);
        } else {
            setTestThree(false);
        }
    };

    const checkForTextFour = (userValue: string) => {
        // SPECIAL CHARACTER
        if (userValue.length > 5 && /[A-Z]/.test(userValue) && /\d/.test(userValue) && /[!@#$%^&*]/.test(userValue)) {
            setText("Very Strong Password");
            setTestFour(true);
        } else {
            setTestFour(false);
        }
    };

    const handleReferenceChange = (value: string) => {
        setDiscovery(value)
    };

    const handleOptionChange = (value: string) => {

        setBusinessType(value)
    };

    return (
        <div className="py-0 h-screen bg-white grid md:grid-cols-5 xs:grid-cols-1">
            <div className="md:col-span-2 xs:col bg-[#FCD3CD] md:flex xs:hidden flex-col ">

                <div className="my-20 px-5">
                    <div className="text-[#0E0C3D] font-semibold text-[24px] mb-5">Create your tenant account and start contacting Medirent landlords</div>
                    <div className="text-black font-normal text-[16px]">Sign up to discover a variety of verified properties tailored for healthcare professionals. Provide your details below to start your journey towards finding a comfortable and convenient home that meets your unique needs.</div>
                </div>

                <div className="px-10">
                    <div>
                        {/* <img alt="" src={PhotoTenants} className="text-[1px] text-white w-full h-full" /> */}
                    </div>
                </div>

            </div>

            <div className="md:col-span-3 xs:col bg-white md:mt-20 xs:mt-10 flex-col w-full items-center relative z-10 flex font-medium md:justify-between xs:justify-center max-w-screen-xl mx-auto md:px-10 xs:px-0">
                <div className="flex items-center justify-center lg:w-full md:w-full">
                    <div className="w-full flex flex-col p-0 max-w-4xl md:px-10 xs:px-4 justify-center items-center h-full">

                        <div className="w-full flex-1 mt-0">
                            <div className="">
                                <div className="">
                                    <div className=" w-full  flex flex-row justify-center">

                                        <div className=" text-start justify-start mx-auto text-primary cursor-pointer w-full flex">
                                            <div className="w-[200px]">
                                                <Image
                                                    src={'/images/Logo/CARTEL.png'}
                                                    alt="logo"
                                                    width={136}
                                                    height={60}
                                                    priority
                                                    className="text-[1px] md:w-full md:h-full xs:w-full xs:h-full"
                                                />

                                            </div>
                                        </div>
                                    </div>

                                    {/* <div className="grid md:grid-cols-1 xs:grid-cols-1 justify-between">
                                        <H1 className=" font-semibold text-start text-primary">
                                        Let’s get you started with creating your account
                                        </H1>

                                        <H2 className=" text-start text-gray-500 my-3">
                                            Please select the business type and fill the details below along with your contact details
                                        </H2>
                                    </div> */}
                                    <div className="grid md:grid-cols-1 xs:grid-cols-1 justify-between mt-4">
                                        <H1 className="md:text-[24px] xs:text-[20px] text-start text-primary font-semibold">
                                            Let’s get you started with creating your account
                                        </H1>

                                        <div className="mt-1 font-normal">
                                            <BMiddle className="text-[#717171] text-start text-[10px] font-normal">
                                                Please select the business type and fill the details below along with your contact details
                                            </BMiddle>
                                        </div>
                                        {/* <H2 className="text-start my-6 font-semibold md:text-[16px] xs:text-[13px]">Let’s start with your buiness type and details</H2> */}
                                    </div>



                                    {
                                        signInState == 1 && (
                                            <div className="mb-10 ">

                                                {/* <GoogleOAuthProvider clientId="1061797876618-qshcq6n3nd057kv6586f859g8mj5cp6a.apps.googleusercontent.com">
                                                    
                                                    <button className="px-0 mt-10 cursor-pointer w-full " >
                                                        <div className=" px-2 py-2 w-full bg-gray-100 flex justify-center items-center">
                                                            
                                                            <GoogleLogin
                                                                className="border-none hidden"
                                                                onSuccess={handleGoogleSignup}
                                                                onError={(err) => console.error('Google sign-up error:', err)}
                                                            />
                                                        </div>
                                                    </button>
                                                </GoogleOAuthProvider> */}

                                                <div className='flex justify-center items-center h-[1px] my-10 w-full bg-[#d5d1d1] text-center font-[500] '>
                                                    <span className='bg-white px-5 py-5 text-black'>Or</span>
                                                </div>

                                                <button className="px-0 mt-0 cursor-pointer w-full" onClick={() => setSignInState(3)}>
                                                    <div className=" px-2 py-4 w-full bg-gray-100 flex justify-center items-center">

                                                        <div className="mr-3">
                                                            <Image
                                                                src={'/images/Auth/Mail.svg'}
                                                                alt="logo"
                                                                width={136}
                                                                height={60}
                                                                priority
                                                                className="text-[1px] md:w-full md:h-full xs:w-full xs:h-full"
                                                            />
                                                        </div>
                                                        <div className="text-[15px]">Sign up with Mail</div>
                                                    </div>
                                                </button>

                                            </div>
                                        )
                                    }

                                    {
                                        (signInState == 3) && (

                                            <div>
                                                <div className="flex md:flex-row xs:flex-col gap-10 my-10">
                                                    <div className={`form-group flex w-[100%] text-[1rem] my-0`}>
                                                        <CustomInput
                                                            id="firstname"
                                                            type='text'
                                                            required
                                                            // setValue={setFormData}
                                                            // value={firstName}
                                                            showRequirement={true}
                                                            // onChange={(value) => setFormData(prevFormData => ({
                                                            //     ...prevFormData,
                                                            //     firstName: value
                                                            // }))}
                                                            label={'First Name'}
                                                            className='px-0 mb-[5px] md:w-full xs:w-full text-[16px]'
                                                        />
                                                    </div>
                                                    <div className={`form-group flex w-[100%] text-[1rem] my-0`}>
                                                        <CustomInput
                                                            id="lastname"
                                                            type='text'
                                                            required
                                                            // setValue={setFormData}
                                                            // value={lastName}
                                                            showRequirement={true}
                                                            // onChange={(value) => setFormData(prevFormData => ({
                                                            //     ...prevFormData,
                                                            //     lastName: value
                                                            // }))}
                                                            label={'Last Name'}
                                                            className='px-0 mb-[5px] md:w-full xs:w-full text-[16px]'
                                                        />
                                                    </div>
                                                </div>

                                                <div className="flex md:flex-row xs:flex-col gap-10 my-10">
                                                    <div className={`form-group flex w-[100%] text-[1rem] my-0`}>
                                                        <CustomInput
                                                            id="email"
                                                            type='email'
                                                            required
                                                            // setValue={setFormData}
                                                            // value={email}
                                                            showRequirement={true}
                                                            // onChange={(value) => setFormData(prevFormData => ({
                                                            //     ...prevFormData,
                                                            //     email: value
                                                            // }))}
                                                            label={'Email'}
                                                            className='px-0 mb-[5px] md:w-full xs:w-full text-[16px]'
                                                        />
                                                    </div>
                                                    <div className={` w-[100%] text-[1rem] my-0`}>
                                                        {/* <PhoneInput/> */}

                                                        <PhoneInput
                                                            value={phone}
                                                            onChange={setPhone}
                                                            defaultCountry={defaultCountry} // Set the default country to Nigeria
                                                            international
                                                        />

                                                    </div>
                                                </div>
                                            </div>

                                        )
                                    }

                                    {
                                        (signInState == 2 || signInState == 3) && (
                                            <div>
                                                <div>
                                                    <div className="flex md:flex-row xs:flex-col gap-10 my-10">
                                                        <div className={` w-[100%] text-[1rem] my-0`}>
                                                            <CountrySelector />
                                                        </div>
                                                        <div className={`form-group flex w-[100%] text-[1rem] my-0`}>
                                                            <CustomSelect
                                                                wrapperClass='!border-[0.5px] !border-gray !h-[58px] md:w-full xs:w-full'
                                                                labelClass='!text-[0.875rem] text-gray-500 w-full'
                                                                optionsClass='!text-[0.875rem] !h-[48px] !w-[100%]'
                                                                optionWrapperClass=' border-[1px] border-gray-400 w-[100%] !w-full xl:left-[0px] !left-[0px] !h-[200px] !bottom-[-205px] overflow-y-auto'
                                                                label='How did you hear about us?'
                                                                setSelected={handleReferenceChange}
                                                                selected={discovery}
                                                                options={[
                                                                    {
                                                                        label: 'Family/Friend',
                                                                        value: 'Family/Friend'
                                                                    },
                                                                    {
                                                                        label: 'Email',
                                                                        value: 'Email'
                                                                    },
                                                                    {
                                                                        label: 'Webinar',
                                                                        value: 'Webinar'
                                                                    },
                                                                    {
                                                                        label: 'Billboard',
                                                                        value: 'Billboard'
                                                                    },
                                                                    {
                                                                        label: 'Instagram',
                                                                        value: 'Instagram'
                                                                    },
                                                                    {
                                                                        label: 'Twitter',
                                                                        value: 'Twitter'
                                                                    },
                                                                    {
                                                                        label: 'Quora',
                                                                        value: 'Quora'
                                                                    },
                                                                    {
                                                                        label: 'Whatsapp',
                                                                        value: 'Whatsapp'
                                                                    },
                                                                    {
                                                                        label: 'Facebook',
                                                                        value: 'Facebook'
                                                                    },
                                                                    {
                                                                        label: 'YouTube',
                                                                        value: 'YouTube'
                                                                    },
                                                                    {
                                                                        label: 'Online Ad',
                                                                        value: 'Online Ad'
                                                                    },
                                                                    {
                                                                        label: 'Radio',
                                                                        value: 'Radio'
                                                                    },
                                                                    {
                                                                        label: 'Reddit',
                                                                        value: 'Reddit'
                                                                    },
                                                                    {
                                                                        label: 'Others',
                                                                        value: 'Others'
                                                                    }
                                                                ]}
                                                            />


                                                        </div>
                                                    </div>

                                                    <div>
                                                        <B2Regular className='text-[1rem]'>Business Type</B2Regular>

                                                        <div className="grid md:grid-cols-3 xs:grid-cols-3 md:gap-0 xs:gap-5 md:w-full xs:full my-5">


                                                            <div className="mr-3 relative my-3 w-full ">
                                                                <label
                                                                    htmlFor={`import`}
                                                                    className="flex items-center cursor-pointer"
                                                                >
                                                                    <input
                                                                        type="checkbox"
                                                                        id={`import`}
                                                                        checked={businessType === 'Import'}
                                                                        onChange={() => handleOptionChange('Import')}
                                                                        className="hidden" // Hide the default checkbox
                                                                    />
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => handleOptionChange('Import')}
                                                                        className={`w-4 h-4 border-[1px] ${businessType === 'Import' ? 'border-primary bg-primary' : 'border-primary bg-white'} rounded-[3px] flex justify-center items-center mr-2`}
                                                                    >
                                                                        {businessType === 'Import' && (
                                                                            <svg
                                                                                className="fill-white w-5 h-5 p-0 pointer-events-none flex justify-center items-center mb-[0px]"
                                                                                viewBox="0 0 20 20"
                                                                            >
                                                                                <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                                                                            </svg>
                                                                        )}
                                                                    </button>
                                                                    <span className="select-none border-gray-500 whitespace-nowrap md:text-[15px] text-gray-700 xs:text-[12px]">Import</span>
                                                                </label>

                                                            </div>

                                                            <div className="mr-3 relative my-3 w-full ">
                                                                <label
                                                                    htmlFor={`export`}
                                                                    className="flex items-center cursor-pointer"
                                                                >
                                                                    <input
                                                                        type="checkbox"
                                                                        id={`export`}
                                                                        checked={businessType === 'Export'}
                                                                        onChange={() => handleOptionChange('Export')}
                                                                        className="hidden" // Hide the default checkbox
                                                                    />
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => handleOptionChange('Export')}
                                                                        className={`w-4 h-4 border-[1px] ${businessType === 'Export' ? 'border-primary bg-primary' : 'border-primary bg-white'} rounded-[3px] flex justify-center items-center mr-2`}
                                                                    >
                                                                        {businessType === 'Export' && (
                                                                            <svg
                                                                                className="fill-white w-5 h-5 p-0 pointer-events-none flex justify-center items-center mb-[0px]"
                                                                                viewBox="0 0 20 20"
                                                                            >
                                                                                <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                                                                            </svg>
                                                                        )}
                                                                    </button>
                                                                    <span className="select-none border-gray-500 whitespace-nowrap md:text-[15px] text-gray-700 xs:text-[12px]">Export</span>
                                                                </label>

                                                            </div>

                                                            <div className="mr-3 relative my-3 w-full ">
                                                                <label
                                                                    htmlFor={`supplier`}
                                                                    className="flex items-center cursor-pointer"
                                                                >
                                                                    <input
                                                                        type="checkbox"
                                                                        id={`supplier`}
                                                                        checked={businessType === 'Supplier'}
                                                                        onChange={() => handleOptionChange('Supplier')}
                                                                        className="hidden" // Hide the default checkbox
                                                                    />
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => handleOptionChange('Supplier')}
                                                                        className={`w-4 h-4 border-[1px] ${businessType === 'Supplier' ? 'border-primary bg-primary' : 'border-primary bg-white'} rounded-[3px] flex justify-center items-center mr-2`}
                                                                    >
                                                                        {businessType === 'Supplier' && (
                                                                            <svg
                                                                                className="fill-white w-5 h-5 p-0 pointer-events-none flex justify-center items-center mb-[0px]"
                                                                                viewBox="0 0 20 20"
                                                                            >
                                                                                <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                                                                            </svg>
                                                                        )}
                                                                    </button>
                                                                    <span className="select-none border-gray-500 whitespace-nowrap md:text-[15px] text-gray-700 xs:text-[12px]">Supplier</span>
                                                                </label>

                                                            </div>
                                                        </div>
                                                    </div>



                                                    {/* PASSWORD  */}
                                                    <div className="flex md:flex-row xs:flex-col gap-10 my-10">
                                                        <div className={`form-group flex w-[100%] text-[1rem] my-0 flex-col`}>
                                                            <CustomInput
                                                                changeToggle={changeToggle}
                                                                showToggle={true}
                                                                isToggle={isToggle}
                                                                id='password'
                                                                type={`${isToggle ? 'text' : 'password'}`}
                                                                label='Password'
                                                                className='mb-[0px]'
                                                                onChange={handlePasswordChange}
                                                            />
                                                            <div className="flex justify-between flex-wrap mt-2">
                                                                <div className="ml-auto mt-2 w-min">
                                                                    <div className="password-strength">
                                                                        <div className="strength-bars flex items-center justify-center gap-1">
                                                                            <div className={`${testOne ? "bg-[#dc6969]" : "bg-[#b6a7a7]"} bar bar--weak filled h-[4px] w-6 rounded-l block`}>
                                                                            </div>

                                                                            <div className={`${testTwo ? "bg-[#ffe48c]" : "bg-[#b6a7a7]"} bar bar--normal filled h-[4px] w-6 rounded-l block`}>
                                                                            </div>

                                                                            <div className={`${testThree ? "bg-[#46c28e]" : "bg-[#b6a7a7]"} bar bar--strong filled h-[4px] w-6 rounded-l block`}>
                                                                            </div>

                                                                            <div className={`${testFour ? "bg-[#208058]" : "bg-[#b6a7a7]"} bar bar--stronger filled h-[4px] w-6 rounded-l block`}>
                                                                            </div>
                                                                            {/* <div className="bar bar--stronger bg-[#e0e0e0] h-[4px] w-6 rounded-l block"></div> */}

                                                                        </div>
                                                                        <p className="strength-text text-gray-600 text-xs whitespace-nowrap">
                                                                            {text}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className={`form-group flex w-[100%] text-[1rem] my-0`}>
                                                            <CustomInput
                                                                changeToggle={changeConfirmPasswordToggle}
                                                                showToggle={true}
                                                                isToggle={confirmPasswordToggle}
                                                                id='password'
                                                                type={`${confirmPasswordToggle ? 'text' : 'password'}`}
                                                                label='Confirm Password'
                                                                // onChange={(value) => setFormData(prevFormData => ({
                                                                //     ...prevFormData,
                                                                //     confirmPassword: value
                                                                // }))}
                                                                className='mb-[32px]'
                                                            />
                                                        </div>
                                                    </div>


                                                    <div className="md:text-base xs:text-xs w-fit mt-2 text-rose-600">
                                                        {textValue}
                                                    </div>

                                                    {/* <div className="flex justify-between  pb-10">
                                                        <div className="flex justify-end z-10 relative mt-4 ">

                                                            <button
                                                                // onClick={handleCreateTenantUser}
                                                                className="flex justify-end items-center z-10 relative bg-[#F97262] text-white md:text-sm rounded-full md:py-3 md:px-12 xs:text-[15px] xs:py-1 xs:px-8"
                                                            // disabled={userLoading} // Disable the button when userLoading is true
                                                            >
                                                                {isLoading ? ( // Display spinner if userLoading is true
                                                                    <div className="flex items-center px-6">
                                                                        <div>
                                                                            <Image
                                                                                src={'/images/Auth/loading.svg'}
                                                                                alt="logo"
                                                                                width={136}
                                                                                height={60}
                                                                                priority
                                                                                className="text-[1px] md:w-full md:h-full xs:w-full xs:h-full"
                                                                            />
                                                                        </div>

                                                                    </div>
                                                                ) : (
                                                                    <span className="">Go</span> // Show the "Submit" text when isLoading is false
                                                                )}
                                                            </button>
                                                        </div>

                                                    </div> */}

                                                    <CustomButton
                                                        // onClick={handleLoginUser}
                                                        className="text-sm z-50 relative mt-5 tracking-wide font-semibold bg-primary text-gray-100 w-full  rounded-lg hover:bg-secondary transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                                                    >
                                                        <div className="text-xl">


                                                        </div>
                                                        <H2 className="ml-3">Create Account</H2>
                                                    </CustomButton>

                                                    <H2 className="text-sm flex justify-center z-50 relative mt-4 text-gray-500 mb-10">
                                                        Have an account?
                                                        <Link href="/auth/login" className="ml-1 cursor-pointer">
                                                            <H2 className="text-primary cursor-pointer">
                                                                Sign In
                                                            </H2>
                                                        </Link>
                                                    </H2>
                                                    <div className='mb-20 md:text-lg xs:text-[5px] w-fit '>
                                                        <label
                                                            htmlFor={`terms`}
                                                            className="flex items-center cursor-pointer"
                                                        >
                                                            <input
                                                                type="checkbox"
                                                                id={`terms`}
                                                                checked={terms}
                                                                onChange={() => setTerms(!terms)} // Toggle functionality
                                                                className="hidden" // Hide the default checkbox
                                                            />
                                                            <button
                                                                className={`w-4 h-4 border-[1px] border-primary bg-white rounded-[3px] flex justify-center items-center mr-1`}
                                                                // onClick={() => setTerms(!terms)} // Handle click on the custom checkbox
                                                                onClick={() => {
                                                                    setTerms(!terms);
                                                                    console.log('Terms:', terms); // Log the new state
                                                                }}
                                                            >
                                                                {terms ? (
                                                                    <svg width="8" height="8" xmlns="http://www.w3.org/2000/svg">
                                                                        <rect width="8" height="8" fill="#103f69" />
                                                                    </svg>
                                                                ) : (
                                                                    <svg width="8" height="8" xmlns="http://www.w3.org/2000/svg">
                                                                        <rect width="8" height="8" fill="none" stroke="#ffff" />
                                                                    </svg>
                                                                    // <div className='bg-white w-4 h-4'></div>

                                                                )}
                                                            </button>
                                                            <H2 className="select-none border-white md:text-[15px] text-black xs:text-[.775rem] font-normal ">
                                                                I agree to CarTtel’s
                                                                <Link href={"/auth/login"} className='text-purple-600 font-semibold md:mx-1 xs:mx-[1px]'>Terms</Link> and
                                                                <Link href={"/auth/login"} className='text-purple-600 font-semibold md:mx-1 xs:mx-[1px]'>Privacy Policy</Link>
                                                            </H2>
                                                        </label>
                                                    </div>


                                                </div>



                                            </div>

                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}


export default Register