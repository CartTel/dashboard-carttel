"use client";

import Image from 'next/image'
import { CustomButton, CustomSelect } from '@/components/custom-components';
import { CustomInput } from '@/components/custom-components';
import React from 'react'
import { B1, B2, H2, H1, BMiddle, B2Regular } from '@/components/custom-typography';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Spinner from '@/components/ui/Spinner/Spinner';
import Link from 'next/link';
import * as RPNInput from "react-phone-number-input";
import axios from "axios";

import { PhoneInput, defaultCountry } from '@/components/custom-components/phone-input';
import {
    Country,
    formatPhoneNumber,
    formatPhoneNumberIntl,
    getCountryCallingCode,
} from "react-phone-number-input";
import tr from "react-phone-number-input/locale/tr";

import CountrySelector from '@/components/custom-components/country-selector';
import Carousel from '@/components/ui/Carousel/Carousel';

import { z } from "zod";
import { useRegisterMutation } from '@/store/onboarding';
import { toast } from "@/hooks/use-toast";
import { createUserSchema } from '@/Interface';





// Define types for the form data
type FormSchema = z.infer<typeof createUserSchema>;


const validateEmail = (email: string) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};


function Register() {
    const [phoneNumber, setPhoneNumber] = useState<string | undefined>(undefined);
    const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

    const [isToggle, setIsToggle] = useState<boolean>(true);
    const [signInState, setSignInState] = useState<number>(3);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter()
    const changeToggle = () => setIsToggle(!isToggle);

    const [passwordData, setPasswordData] = useState<string>('');
    const [confirmPasswordData, setConfirmPasswordData] = useState<string>('');
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

    const [formData, setFormData] = useState<FormSchema>({
        firstname: "",
        lastname: "",
        password: "",
        confirmPassword: "",
        email: "",
        phone: "",
        // phone: "+2349046107959",
        // roles: ["Import"],
        roles: [],
        country: "",
        hearAboutUs: "",
    });

    var {
        firstname,
        lastname,
        password,
        confirmPassword,
        country,
        phone,
        email,
        roles,
        hearAboutUs,
    } = formData;

    const [confirmPasswordToggle, setConfirmPasswordToggle] = useState<boolean>(true);
    const changeConfirmPasswordToggle = () => setConfirmPasswordToggle(!confirmPasswordToggle);

    const handlePhoneChange = (value: string) => {
        setPhoneNumber(value);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        
        if (name) {
            setFormData((prev) => ({ ...prev, [name]: value }));
        } else {
            console.error("Input element is missing the 'name' attribute.");
        }
    };

    const handleCountryChange = (value: string) => {
        setFormData((prev) => ({ ...prev, country: value })); // Update the country in formData
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { value } = e.target;
        // Update the password state
        setPasswordData(value);
        setFormData((prevData) => ({
            ...prevData,
            password: value,
        }));
        // Call validation functions with the new password value
        checkForTextOne(value);
        checkForTextTwo(value);
        checkForTextThree(value);
        checkForTextFour(value);
    };

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { value } = e.target;
        setConfirmPasswordData(value);
        setFormData((prevData) => ({
            ...prevData,
            confirmPassword: value,
        }));
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
        setFormData(prevState => ({
            ...prevState,
            hearAboutUs: value,
        }));
    };

    const handleOptionChange = (role: string) => {
        setFormData((prev) => {
            const roles = prev.roles.includes(role)
                ? prev.roles.filter(r => r !== role) // Remove role if already included
                : [...prev.roles, role]; // Add role if not included

            return { ...prev, roles };
        });
    };

    const { mutate: register } = useRegisterMutation(
        (data) => {
            // console.log('User logged in:', data);
            router.push("/auth/login");
        },
        (error) => {
            console.error('Login error:', error);
        }
    );

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrors({});
        // Validate using Zod
        const validation = createUserSchema.safeParse(formData);

        // console.log("validation ..", validation);
        if (!validation.success) {
            
            // Map Zod errors to display on the form
            const fieldErrors: Partial<Record<keyof FormData, string>> = {};

            // console.log("error..", fieldErrors);
            validation.error.errors.forEach((error) => {
                const field = error.path[0] as keyof FormData;

                // console.log("form", field);
                fieldErrors[field] = error.message;
                // console.log("all the code..", fieldErrors[field], fieldErrors);
            });
            setErrors(fieldErrors); // Ensure this matches the expected type

            Object.values(errors).forEach((errorMessage) => {
                
                // console.log("sorry..", errorMessage);
                toast({
                    title: "Error",
                    description: errorMessage,
                    variant: "destructive",
                });
            });

            return;
        }

        // Clear errors if validation is successful
        setErrors({});

        if (!terms) {
            toast({
                title: "Error",
                description: 'You have not agreed to the terms&service and privacy policy',
                variant: "destructive",
            });
            return;
        }


        // If validation succeeds, proceed with API call
        setIsLoading(true);

        try {
            // TESTING FOR PASSWORD MATCHING WITH CONFIRMPASSWORD
            if (password !== confirmPassword) {
                toast({
                    title: "Error",
                    description: 'password does not match with confirmPassword',
                    variant: "destructive",
                });
                return
            }

            // TESTING STRENGTH OF PASSWORD
            if (!testOne) {
                toast({
                    title: "Error",
                    description: 'Password must be at least 8 characters',
                    variant: "destructive",
                });
                return;
            }

            if (!testTwo) {
                toast({
                    title: "Error",
                    description: 'Password must include at least one uppercase letter',
                    variant: "destructive",
                });
                return;
            }

            if (!testThree) {
                toast({
                    title: "Error",
                    description: 'Password must include at least one number',
                    variant: "destructive",
                });
                return;
            }

            if (!testFour) {
                toast({
                    title: "Error",
                    description: 'Password must include at least one special character',
                    variant: "destructive",
                });
                return;
            }

            

            console.log("final", formData)

            // If validation succeeds, proceed with API call
            setIsLoading(true);
            try {
                register(formData)

                // Redirect to the dashboard or another page
            } catch (error) {
                console.log("error in the code ..", error)
            } finally {
                setIsLoading(false);
            }

        } catch (error) {
            // toast.error("User creation Failed");
            console.log("Apparently the Message..", error);
            // errRef.current.focus();
        }

    }

    useEffect(() => {
        // Render all toast messages based on the errors object
        Object.values(errors).forEach((errorMessage) => {
                
            console.log("sorry..", errorMessage);
            toast({
                title: "Error",
                description: errorMessage,
                variant: "destructive",
            });
        });
    }, [errors]);

    return (
        <div className="py-0 h-screen bg-white grid md:grid-cols-5 xs:grid-cols-1">
            <div className="md:col-span-2 xs:col bg-slate-300 bg-opacity-40 md:flex xs:hidden flex-col ">

                <div className="my-0 px-0">
                    <Carousel />
                    {/* <div className="text-[#0E0C3D] font-semibold text-[24px] mb-5 text-center">Create your tenant account and start contacting Medirent landlords</div> */}
                    {/* <div className="text-black font-normal text-[16px]">Sign up to discover a variety of verified properties tailored for healthcare professionals. Provide your details below to start your journey towards finding a comfortable and convenient home that meets your unique needs.</div> */}
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
                                                    // src={'/images/Carousel/inventory.svg'}
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
                                                            name="firstname"
                                                            type="text"
                                                            label="First Name"
                                                            required
                                                            value={formData.firstname}
                                                            onChange={handleChange}
                                                            // errorMessage={errors.firstname}
                                                            showRequirement={true}
                                                            className="px-0 mb-[5px] md:w-full xs:w-full text-[16px]"
                                                        />
                                                    </div>
                                                    <div className={`form-group flex w-[100%] text-[1rem] my-0`}>
                                                        <CustomInput
                                                            id="lastname"
                                                            name="lastname"
                                                            type="text"
                                                            label="Last Name"
                                                            required
                                                            value={formData.lastname}
                                                            onChange={handleChange}
                                                            // errorMessage={errors.firstname}
                                                            showRequirement={true}
                                                            className="px-0 mb-[5px] md:w-full xs:w-full text-[16px]"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="flex md:flex-row xs:flex-col gap-10 my-10">
                                                    <div className={`form-group flex w-[100%] text-[1rem] my-0`}>
                                                        <CustomInput
                                                            id="email"
                                                            name="email"
                                                            type="email"
                                                            label="Email Address"
                                                            required
                                                            value={formData.email}
                                                            onChange={handleChange}
                                                            // errorMessage={errors.email}
                                                            showRequirement={true}
                                                            className="px-0 mb-[5px] md:w-full xs:w-full text-[16px]"
                                                        />

                                                    </div>
                                                    <div className={` w-[100%] text-[1rem] my-0`}>
                                                        {/* <PhoneInput/> */}

                                                        <PhoneInput
                                                            value={phoneNumber}
                                                            // onChange={() => { setPhoneNumber(phoneNumber) }}
                                                            onChange={(value: string | undefined) => {
                                                                setPhoneNumber(value); // Update the state with the new phone number
                                                                setFormData((prev) => ({ ...prev, phone: value || "" })); // Update formData, default to empty string if value is undefined
                                                            }}
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
                                                            
                                                            
                                                        <CountrySelector
                                                            onChange={handleCountryChange} // Pass the handleChange function
                                                            value={formData.country} // Control the value if needed
                                                        />
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

                                                    {/* BUSINESS TYPE  */}
                                                    <div>
                                                        <B2Regular className='text-[1rem] text-gray-600'>Business Type</B2Regular>

                                                        <div className="grid md:grid-cols-3 xs:grid-cols-3 md:gap-0 xs:gap-5 md:w-full xs:full my-5">
                                                            <div className="mr-3 relative my-3 w-fit">
                                                                <label htmlFor={`import`} className="flex items-center cursor-pointer">
                                                                    <input
                                                                        type="checkbox"
                                                                        id={`import`}
                                                                        checked={formData.roles.includes('Import')}
                                                                        onChange={() => handleOptionChange('Import')}
                                                                        className="hidden" // Hide the default checkbox
                                                                    />
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => handleOptionChange('Import')}
                                                                        className={`w-4 h-4 border-[1px] ${formData.roles.includes('Import') ? 'border-primary bg-primary' : 'border-primary bg-white'} rounded-[3px] flex justify-center items-center mr-2`}
                                                                    >
                                                                        {formData.roles.includes('Import') && (
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

                                                            <div className="mr-3 relative my-3 w-fit">
                                                                <label htmlFor={`export`} className="flex items-center cursor-pointer">
                                                                    <input
                                                                        type="checkbox"
                                                                        id={`export`}
                                                                        checked={formData.roles.includes('Export')}
                                                                        onChange={() => handleOptionChange('Export')}
                                                                        className="hidden" // Hide the default checkbox
                                                                    />
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => handleOptionChange('Export')}
                                                                        className={`w-4 h-4 border-[1px] ${formData.roles.includes('Export') ? 'border-primary bg-primary' : 'border-primary bg-white'} rounded-[3px] flex justify-center items-center mr-2`}
                                                                    >
                                                                        {formData.roles.includes('Export') && (
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

                                                            


                                                            <div className="mr-3 relative my-3 w-fit">
                                                                <label htmlFor={`supplier`} className="flex items-center cursor-pointer">
                                                                    <input
                                                                        type="checkbox"
                                                                        id={`supplier`}
                                                                        checked={formData.roles.includes('Supplier')}
                                                                        onChange={() => handleOptionChange('Supplier')}
                                                                        className="hidden" // Hide the default checkbox
                                                                    />
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => handleOptionChange('Supplier')}
                                                                        className={`w-4 h-4 border-[1px] ${formData.roles.includes('Supplier') ? 'border-primary bg-primary' : 'border-primary bg-white'} rounded-[3px] flex justify-center items-center mr-2`}
                                                                    >
                                                                        {formData.roles.includes('Supplier') && (
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
                                                    <div className="flex md:flex-row xs:flex-col gap-5 ">
                                                        <div className={`form-group flex w-[100%] text-[1rem] my-0 flex-col`}>
                                                            <CustomInput
                                                                id="password"
                                                                name="password"
                                                                type={isToggle ? "text" : "password"}
                                                                label="Password"
                                                                required
                                                                value={password}
                                                                onChange={handlePasswordChange}
                                                                // errorMessage={errors.password}
                                                                showToggle={true}
                                                                isToggle={isToggle}
                                                                changeToggle={changeToggle}
                                                                showRequirement={true}
                                                                className="mb-[0px]"
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
                                                                id="confirmpassword"
                                                                name="confirmpassword"
                                                                type={confirmPasswordToggle ? "text" : "password"}
                                                                label="Confirm Password"
                                                                required
                                                                value={confirmPassword}
                                                                onChange={handleConfirmPasswordChange}
                                                                // errorMessage={errors.password}
                                                                showToggle={true}
                                                                isToggle={confirmPasswordToggle}
                                                                changeToggle={changeConfirmPasswordToggle}
                                                                showRequirement={true}
                                                                className="mb-[0px]"
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
                                                        disabled={isLoading}
                                                        onClick={handleSubmit}
                                                        type="submit" // Explicitly set as "submit"
                                                        className="text-sm z-50 relative mt-5 tracking-wide font-semibold bg-primary text-gray-100 w-full rounded-lg hover:bg-secondary transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                                                    >
                                                        {/* {isLoading ? 'Logging in...' : 'Login'} */}
                                                        <div>
                                                            {isLoading ? ( // Display spinner if userLoading is true
                                                                <div className="flex items-center px-6">
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
                                                                <div className='flex'>

                                                                    <H2 className="ml-3">Create Account</H2>
                                                                </div>
                                                            )}


                                                        </div>
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
                                                                className={`${terms ? "border-primary" : "border-gray-500"} w-4 h-4 border-[1px] bg-white rounded-[3px] flex justify-center items-center mr-1`}
                                                                // onClick={() => setTerms(!terms)} // Handle click on the custom checkbox
                                                                onClick={() => {
                                                                    setTerms(!terms);
                                                                    
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
                                                                )}
                                                            </button>
                                                            {/* <B2 className="select-none border-white md:text-[15px] text-gray-500 xs:text-[.775rem] font-normal ">
                                                                I agree to CarTtel’s
                                                                <Link href={"/auth/login"} className='text-primary font-semibold md:mx-1 xs:mx-[1px]'>Terms of Service</Link> and
                                                                <Link href={"/auth/login"} className='text-primary font-semibold md:mx-1 xs:mx-[1px]'>Privacy Policy</Link>
                                                            </B2> */}
                                                            <B2 className="select-none border-white md:text-[15px] text-gray-500 xs:text-[.775rem] font-normal">
                                                                I agree to CarTtel’s{" "}
                                                                <a className="text-primary hover:underline" href="/auth/login">
                                                                    Terms of Service
                                                                </a>{" "}
                                                                and{" "}
                                                                <a className="text-primary hover:underline" href="/auth/login">
                                                                    Privacy Policy
                                                                </a>
                                                                .
                                                            </B2>
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