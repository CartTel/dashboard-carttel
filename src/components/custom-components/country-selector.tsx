// components/CountrySelector.tsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';

interface Country {
    name: string;
    emoji: string;
    unicode: string;
    image: string;
}

export interface IFont {
    className?: string;
    children?: React.ReactNode;
    style?: React.CSSProperties;
}

export interface IModal {
    children: React.ReactNode;
    onClose: () => void;
}

export interface IButton extends IFont {
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
    onClick?: (param?: any) => void;
    style?: React.CSSProperties;
}

export interface IIcon {
    className?: string;
    fillColor?: string;
    size?: number
}



export interface ICountryInterface {
    value?: string | number;
    setValue?: (value: string | number) => void;
    className?: string;
    wrapperClass?: string;
    id?: string;
    type?: React.HTMLInputTypeAttribute;
    changeToggle?: () => void;
    onChange?: (value: string) => void; // Adjusted type to just accept the value
}

const CountrySelector: React.FC<ICountryInterface> = ({ onChange, setValue, value = "" }) => {
    const [countries, setCountries] = useState<Record<string, Country>>({});
    const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const fetchCountries = async () => {
            const response = await fetch('/countries-flag.json');
            const data: Record<string, Country> = await response.json();
            setCountries(data);
            setFilteredCountries(Object.values(data));
        };

        fetchCountries();
    }, []);

    useEffect(() => {
        if (searchTerm) {
            setFilteredCountries(
                Object.values(countries).filter(country =>
                    country.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        } else {
            setFilteredCountries(Object.values(countries));
        }
    }, [searchTerm, countries]);

    const handleSelectCountry = (country: Country) => {
        setSelectedCountry(country);
        setSearchTerm('');
        setIsOpen(false);
        if (setValue) {
            setValue(country.name); // Set the selected country name
        }
        if (onChange) {
            onChange(country.name); // Call the onChange with the selected country name
        }
    };

    return (
        <div className="relative">
            <div
                onClick={() => setIsOpen(!isOpen)}
                className={`${selectedCountry ? 'border-primary' : 'border-white'} flex w-[100%] bg-[#f6f6f6] h-[58px] text-[1rem] outline-none border-[1px] rounded-[10px] px-2 justify-start items-center`}
            >
                {selectedCountry ? (
                    <>
                        <Image
                            src={selectedCountry.image}
                            alt={selectedCountry.image}
                            className="w-5 h-5 mr-2"
                            width={20}
                            height={20}
                        />
                        <span>{selectedCountry.name}</span>
                    </>
                ) : (
                    <span className='text-gray-400'>Select a country...</span>
                )}
            </div>

            {isOpen && (
                <div className="absolute z-10 w-full bg-white border mt-1 max-h-60 overflow-y-auto rounded-lg">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search country..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="border p-2 w-full outline-none pl-10 font-[400]"
                        />
                        <Image
                            src={'/images/Auth/search.svg'}
                            alt="search"
                            className="w-5 h-5 top-[10px] left-[10px] absolute"
                            width={20}
                            height={20}
                        />
                    </div>

                    <ul className="max-h-72 overflow-y-auto">
                        {filteredCountries.map((country, index) => (
                            <li
                                key={index}
                                onClick={() => handleSelectCountry(country)} // Correctly using onClick
                                className="p-2 hover:bg-gray-200 cursor-pointer flex items-center"
                            >
                                <Image
                                    src={country.image}
                                    alt={country.name}
                                    className="w-5 h-5 mr-2"
                                    width={20}
                                    height={20}
                                />
                                <span>{country.name}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default CountrySelector;
