"use client"

import { ICustomInput } from '@/libs/interfaces';
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';


export function CustomInput({ showRequirement = false, value, wrapperClass, calendar, setValue, className, label, type, id, showToggle,
    isToggle, changeToggle, showLabel = true, inputType = "input", required = false, disabled = false, onChange }: ICustomInput) {
    const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | any>(null);

    

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = e.target.value;
        if (onChange) {
            onChange(newValue);
        }
        if (setValue) {
            setValue(newValue);
        }
    };

  useEffect(() => {
    const input = inputRef.current;
    if (input) {
      if (input.value) {
        input.classList.add('has-value')
      } else {
        input.classList.remove('has-value');

      }
      const handleInput = () => {
        if (input.value) {
          input.classList.add('has-value');
        } else {
          input.classList.remove('has-value');
        }
      };

      input.addEventListener('input', handleInput);

      return () => {
        input.removeEventListener('input', handleInput);
      };
    }
  }, []);

    return (
        <div className={`form-group flex w-[100%] h-[58px] text-[1rem] ${className} ${showLabel ? '' : 'unlabeled'}`}>
            {inputType === 'input' ? (
                <input
                    id={id}
                    type={type}
                    value={value}
                    placeholder={showLabel ? '' : label}
                    disabled={disabled}
                    required={required}
                    onChange={handleChange}
                    ref={inputRef}
                />
            ) : (
                <textarea
                    id={id}
                    value={value}
                    placeholder={showLabel ? '' : label}
                    disabled={disabled}
                    required={required}
                    onChange={handleChange}
                    ref={inputRef}
                />
            )}
            {showLabel && <label htmlFor={id}>{label} {showRequirement && <span className="text-red-600 text-[20px]">*</span>}</label>}
            {
                showToggle && (
                    <div
                        className="flex mt-3 flex-col h-6 "
                        onClick={changeToggle}
                        style={{
                            position: "absolute",
                            width: "30px",
                            right: "5px",
                            bottom: "3px",
                            lineHeight: "20px",
                        }}
                    >

                        {isToggle ? (
                            <div className="cursor-pointer">
                                <Image
                                    src={'/images/Auth/eye.svg'}
                                    alt="logo"
                                    width={20}
                                    height={20}
                                    priority
                                    className="text-gray-500 "

                                    style={{ filter: 'invert(50%) sepia(100%) saturate(0%) hue-rotate(180deg)' }}
                                />
                            </div>
                        ) : (
                            <div
                                className="cursor-pointer"
                                style={{
                                    position: "absolute",
                                    width: "40px",
                                    height: "40px",
                                    lineHeight: "20px",
                                }}
                            >
                                <Image
                                    src={'/images/Auth/eye-slash.svg'}
                                    alt="logo"
                                    width={20}
                                    height={20}
                                    priority
                                    className=""
                                    style={{ filter: 'invert(50%) sepia(100%) saturate(0%) hue-rotate(180deg)' }}
                                />
                            </div>
                        )}
                    </div>

                )
            }

        </div>
    )
}