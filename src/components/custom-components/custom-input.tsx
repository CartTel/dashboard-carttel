"use client";

import { ICustomInput } from "@/libs/interfaces";
import React, { useEffect, useRef } from "react";
import Image from "next/image";

export function CustomInput({
  errorMessage,
  showRequirement = false,
  value = "",
  wrapperClass = "",
  calendar,
  setValue,
  className = "",
  label,
  type = "text",
  id,
  name, // Add name prop
  showToggle = false,
  isToggle,
  min = 1,
  changeToggle,
  showLabel = true,
  inputType = "input",
  required = false,
  disabled = false,
  onChange,
  ...props
}: ICustomInput & { name?: string }) { // Include name in props
  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const newValue = e.target.value || "";
    if (onChange) {
      onChange(e); // Pass the entire event
    }
    if (setValue) {
      setValue(newValue); // Call the setValue function
    }
  };

  useEffect(() => {
    const input = inputType === "input" ? inputRef.current : textareaRef.current;
    if (input) {
      const handleInput = () => {
        if (input.value) {
          input.classList.add("has-value");
        } else {
          input.classList.remove("has-value");
        }
      };

      input.addEventListener("input", handleInput);
      handleInput(); // Initialize state on mount

      return () => {
        input.removeEventListener("input", handleInput);
      };
    }
  }, [inputType]);

  return (
    <div
      className={`form-group flex w-full h-[58px] text-[1rem] ${className} ${showLabel ? "" : "unlabeled"} ${wrapperClass}`}
    >
      {inputType === "input" ? (
        <input
          id={id}
          name={name} // Pass the name attribute
          type={type}
          value={value}
          placeholder={showLabel ? "" : label}
          disabled={disabled}
          required={required}
          onChange={handleChange}
          ref={inputRef}
          min={min}
          className="input-element"
          {...props}
        />
      ) : (
        <textarea
          id={id}
          name={name} // Pass the name attribute
          value={value}
          placeholder={showLabel ? "" : label}
          disabled={disabled}
          required={required}
          onChange={handleChange}
          ref={textareaRef}
          className="textarea-element"
          {...props}
        />
      )}

      {showLabel && (
        <label htmlFor={id} className="label-element">
          {label}
          {showRequirement && <span className="text-red-600 text-[20px]">*</span>}
        </label>
      )}

      {showToggle && (
        <div
          className="flex mt-3 flex-col h-6 cursor-pointer toggle-visibility"
          onClick={changeToggle}
          style={{
            position: "absolute",
            width: "30px",
            right: "5px",
            bottom: "3px",
            lineHeight: "20px",
          }}
        >
          <Image
            src={isToggle ? "/images/Auth/eye.svg" : "/images/Auth/eye-slash.svg"}
            alt="toggle visibility"
            width={20}
            height={20}
            priority
            style={{ filter: "invert(50%) sepia(100%) saturate(0%) hue-rotate(180deg)" }}
          />
        </div>
      )}

      {/* {errorMessage && (
        <p className="mt-1 text-sm text-red-600 error-message">{errorMessage}</p>
      )} */}
    </div>
  );
}
