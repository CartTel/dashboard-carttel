"use client";

import Image from 'next/image'
import { CustomButton, CustomSelect } from '@/components/custom-components';
import { CustomInput } from '@/components/custom-components';
import React from 'react'
import { B1, B2, H2, H1, BMiddle } from '@/components/custom-typography';
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




function Register() {
    const [phone, setPhone] = useState('');


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


            <div className="md:col-span-3 xs:col bg-white  md:mt-20 xs:mt-10 flex-col w-full items-center relative z-10 flex font-medium justify-between max-w-screen-xl mx-auto md:px-10 xs:px-0">
                <div className="flex items-center justify-center lg:w-full md:w-full">
                    <div className="w-full flex flex-col p-0 max-w-4xl px-10">

                        <div className="w-full flex-1 mt-0">
                            <div className="">
                                <div className="">
                                    <div className="mt-0 text-start">
                                        <h1 className="md:text-[24px] xs:text-[20px] text-start text-black font-semibold">
                                            Let’s start with your plan and details
                                        </h1>

                                        <div className="mt-1 font-normal">
                                            <p className="text-[#717171] text-start text-[12px]">
                                                Please select the plan and fill the details below along with your contact details
                                            </p>
                                        </div>
                                        <div className="text-start my-6 font-semibold md:text-[16px] xs:text-[13px]">Let’s start with your plan and details</div>
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
                                                            {/* <img alt="" src={Mail} className="text-[1px] text-white w-full h-full" /> */}
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
                                                            // defaultCountry="TR"
                                                        />

                                                    </div>
                                                </div>
                                            </div>

                                        )
                                    }

                                    {
                                        (signInState == 2 || signInState == 3) && (
                                            <div>
                                                <div className="flex md:flex-row xs:flex-col gap-10 my-10">
                                                    <div className={`form-group flex w-[100%] text-[1rem] my-0`}>
                                                        <CustomInput
                                                            id="phone"
                                                            type='text'
                                                            required
                                                            // setValue={setFormData}
                                                            // value={phone}
                                                            label={'Phone Number'}
                                                            // onChange={(value) => setFormData(prevFormData => ({
                                                            //     ...prevFormData,
                                                            //     phone: value
                                                            // }))}
                                                            className='px-0 mb-[5px] md:w-full xs:w-full text-[16px]'
                                                        />
                                                    </div>
                                                    <div className={`form-group flex w-[100%] text-[1rem] my-0`}>
                                                        <CustomInput
                                                            id="address"
                                                            type='text'
                                                            required
                                                            // setValue={setFormData}
                                                            // value={address}
                                                            showRequirement={true}
                                                            // onChange={(value) => setFormData(prevFormData => ({
                                                            //     ...prevFormData,
                                                            //     address: value,
                                                            //     country: "Canada"
                                                            // }))}
                                                            label={'Address'}
                                                            className='px-0 mb-[5px] md:w-full xs:w-full text-[16px]'
                                                        />
                                                    </div>
                                                </div>

                                                <div className="flex md:flex-row xs:flex-col gap-10 my-10">
                                                    <div className={`form-group flex w-[100%] text-[1rem] my-0`}>

                                                        {/* <CustomSelect
                                                            wrapperClass=' !h-[58px] !w-full !px-[12px]'
                                                            labelClass=' text-black w-full text-gray-500'
                                                            optionsClass='!text-[0.875rem] !h-[48px] !w-[100%] !text-black'
                                                            optionWrapperClass=' w-[100%] !w-full border-[1px] shadow-lg border-gray-200 xl:left-[0px] !left-[0px] !h-[400px] !bottom-[-410px] overflow-y-auto '
                                                            required={false}
                                                            label='Select a Country'
                                                            setSelected={handleCountryChange}
                                                            selected={country}
                                                            options={selectedCity}
                                                            otherOptions={true}
                                                        /> */}
                                                        <CustomInput
                                                            id="country"
                                                            type='text'
                                                            required
                                                            disabled={true}
                                                            showRequirement={true}
                                                            // setValue={setFormData}
                                                            // value={'Canada'}
                                                            // onChange={(value) => setFormData(prevFormData => ({
                                                            //     ...prevFormData,
                                                            //     yearsActive: value

                                                            // }))}
                                                            label={'Country'}
                                                            className='px-0 mb-[5px] md:w-full xs:w-full text-[16px]'
                                                        />
                                                    </div>
                                                    {/* <div className={`form-group flex w-[100%] text-[1rem] my-0`}>
                                                        <CustomSelect
                                                            wrapperClass=' !h-[58px] !w-full !px-[12px]'
                                                            labelClass=' text-black w-full text-gray-500'
                                                            optionsClass='!text-[0.875rem] !h-[48px] !w-[100%] !text-black'
                                                            optionWrapperClass=' w-[100%] !w-full border-[1px] shadow-lg border-gray-200 xl:left-[0px] !left-[0px] !h-[400px] !bottom-[-410px] overflow-y-auto '
                                                            required={false}
                                                            label='Select a state'
                                                            setSelected={handleCityChange}
                                                            selected={province}
                                                            options={states}
                                                            otherOptions={true}
                                                        />
                                                    </div> */}
                                                </div>

                                                <div className="flex md:flex-row xs:flex-col gap-10 my-10">
                                                    <div className={`form-group flex w-[100%] text-[1rem] my-0`}>
                                                        <CustomInput
                                                            id="postalCode"
                                                            type='text'
                                                            required
                                                            // setValue={setFormData}
                                                            // value={postalCode}
                                                            // onChange={(value) => setFormData(prevFormData => ({
                                                            //     ...prevFormData,
                                                            //     postalCode: value
                                                            // }))}
                                                            label={'Postal Code'}
                                                            className='px-0 mb-[5px] md:w-full xs:w-full text-[16px]'
                                                        />
                                                    </div>
                                                    <div className={`form-group flex w-[100%] text-[1rem] my-0`}>
                                                        <CustomInput
                                                            id="city"
                                                            type='text'
                                                            required
                                                            // setValue={setFormData}
                                                            // value={city}
                                                            // onChange={(value) => setFormData(prevFormData => ({
                                                            //     ...prevFormData,
                                                            //     city: value
                                                            // }))}
                                                            label={'City'}
                                                            className='px-0 mb-[5px] md:w-full xs:w-full text-[16px]'
                                                        />
                                                    </div>
                                                </div>

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

                                                <div className="text-left text-gray-700">
                                                    <h1 className="mb-0 p-0 text-2xl text-black">Functions</h1>

                                                    <div className="flex md:flex-row xs:flex-col md:gap-10 xs:gap-0 md:my-10 xs:my-0">
                                                        <div>
                                                            <div className="flex items-center my-7">
                                                                <input
                                                                    type="radio"
                                                                    id="radioButton"
                                                                    name="radioButton"
                                                                    className="h-6 w-6  text-third border-gray-500 focus:ring-sky-600"
                                                                // onClick={handleRadioChange}
                                                                />
                                                                <label htmlFor="radioButton" className="ml-4 md:text-base xs:text-xs w-full text-[#717171]">
                                                                    Medical Doctor with property/room for rent
                                                                </label>
                                                            </div>
                                                            <div className="flex items-center my-7">
                                                                <input
                                                                    type="radio"
                                                                    id="radioButton"
                                                                    name="radioButton"
                                                                    className="h-6 w-6 text-third border-gray-500 focus:ring-sky-600"
                                                                // onClick={handleRadioChange}
                                                                />
                                                                <label htmlFor="radioButton" className="text-[#717171] ml-4 md:text-base xs:text-xs w-full">
                                                                    Nurse, Physician Assistant or Nurse Practitioner
                                                                </label>
                                                            </div>
                                                            <div className="flex items-center my-7">
                                                                <input
                                                                    type="radio"
                                                                    id="radioButton"
                                                                    name="radioButton"
                                                                    className="h-6 w-6 text-third border-gray-500 focus:ring-sky-600"
                                                                // onClick={handleRadioChange}
                                                                />
                                                                <label htmlFor="radioButton" className="text-[#717171] ml-4 md:text-base xs:text-xs w-full">
                                                                    Allied Healthcare Professional
                                                                </label>
                                                            </div>

                                                            <div className="flex items-center my-7">
                                                                <input
                                                                    type="radio"
                                                                    id="radioButton"
                                                                    name="radioButton"
                                                                    className="h-6 w-6 text-third border-gray-500 focus:ring-sky-600"
                                                                // onClick={handleRadioChange}
                                                                />
                                                                <label htmlFor="radioButton" className="text-[#717171] ml-4 md:text-base xs:text-xs w-full">
                                                                    Medical Community landlord
                                                                </label>
                                                            </div>

                                                        </div>

                                                        <div>
                                                            <div className="flex items-center md:my-7 xs:my-0">
                                                                <input
                                                                    type="radio"
                                                                    id="radioButton"
                                                                    name="radioButton"
                                                                    className="h-6 w-6 text-third border-gray-500 focus:ring-sky-600"
                                                                // onClick={handleRadioChange}
                                                                />
                                                                <label htmlFor="radioButton" className="text-[#717171] ml-4 md:text-base xs:text-xs w-full">
                                                                    Traveling Nurse
                                                                </label>
                                                            </div>

                                                            <div className="flex items-center my-7">
                                                                <input
                                                                    type="radio"
                                                                    id="radioButton"
                                                                    name="radioButton"
                                                                    className="h-6 w-6 text-third border-gray-500 focus:ring-sky-600"
                                                                // onClick={handleRadioChange}
                                                                />
                                                                <label htmlFor="radioButton" className="text-[#717171] ml-4 md:text-base xs:text-xs w-full">
                                                                    Housing for Healthcare program
                                                                </label>
                                                            </div>
                                                            <div className="flex items-center my-7">
                                                                <input
                                                                    type="radio"
                                                                    id="radioButton"
                                                                    name="radioButton"
                                                                    className="h-6 w-6 text-third border-gray-500 focus:ring-sky-600"
                                                                // onClick={handleRadioChange}
                                                                />
                                                                <label htmlFor="radioButton" className="text-[#717171] ml-4 md:text-base xs:text-xs w-full">
                                                                    Others
                                                                </label>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="mb-8 text-left">
                                                    <h1 className="mb-3 text-sm">How did you discover Medirent?</h1>

                                                    <CustomSelect
                                                        wrapperClass='!border-[0.5px] !border-gray !h-[58px] md:w-[400px] xs:w-full'
                                                        labelClass='!text-[0.875rem] text-black'
                                                        optionsClass='!text-[0.875rem] !h-[48px] !w-[100%]'
                                                        optionWrapperClass=' border-[1px] border-gray-400 w-[100%] !w-[300px] xl:left-[0px] !left-[0px] !h-[400px] !bottom-[-410px] overflow-y-auto'
                                                        label='Set Discovery Method'
                                                        setSelected={handlePasswordChange}
                                                        selected={confirmPassword}
                                                        options={[
                                                            {
                                                                label: 'Facebook/socialmedia',
                                                                value: 'Facebook/socialmedia'
                                                            },
                                                            {
                                                                label: 'Medical school admin recommended',
                                                                value: 'Medical school admin recommended'
                                                            },
                                                            {
                                                                label: 'Friend/colleague',
                                                                value: 'Friend/colleague'
                                                            },
                                                            {
                                                                label: 'Real Estate Agent',
                                                                value: 'Real Estate Agent'
                                                            },
                                                            {
                                                                label: 'Internet browsing',
                                                                value: 'Internet browsing'
                                                            },
                                                            {
                                                                label: 'Journal/medical affiliated website',
                                                                value: 'Journal/medical affiliated website'
                                                            },
                                                            {
                                                                label: 'Others',
                                                                value: 'Others'
                                                            }
                                                        ]}
                                                    />
                                                </div>



                                                <div className="md:text-base xs:text-xs w-fit mt-2 text-rose-600">
                                                    {textValue}
                                                </div>

                                                <div className="flex justify-between  pb-10">
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