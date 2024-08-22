"use client"

import { useState, useEffect } from "react";
import Image from 'next/image'
import './Carousel.css'

function Carousel () {
    const slides = [
        {
            id: 1,
            imageUrl: `/images/Carousel/inventory.svg`,
            data: 'Create and send invoices directly to client, Manage invoices directly from your account.',
            title: 'Create instant Invoices',
        },
        {
            id: 2,
            imageUrl: `/images/Carousel/export.svg`,
            data: 'Create your team, assign role to employees, Track employees day-to-day activities',
            title: 'Team Creation & Assign task to employees',
        },
        {
            id: 3,
            imageUrl: `/images/Carousel/connect.svg`,
            data: 'Track your inventory, know how much inventory is currently located in your store. Outsource vendors to re-stock your store.',
            title: 'Inventory Management',
        },
        {
            id: 4,
            imageUrl: `/images/Carousel/shipping.svg`,
            data: 'Helping procure and shipping from foreign online store like ebay, Amazon etc.',
            title: 'Supply Chain Manangement',
        },
        {
            id: 5,
            imageUrl: `/images/Carousel/store-managt.svg`,
            data: 'Know your store activities, How good your store is performing, Get Insight into your store Health.',
            title: 'Store Management',
        },
        {
            id: 5,
            imageUrl: `/images/Carousel/procurement.svg`,
            data: 'Know your store activities, How good your store is performing, Get Insight into your store Health.',
            title: 'Connect to Your Supplier',
        },
    ];

    var [currentIndex, setCurrentIndex] = useState(0);
    // eslint-disable-next-line no-unused-vars
    const [direction, setDirection] = useState(true);
    const [autoPlay, setAutoPlay] = useState(true);
    let timeOut = null;

    const goToNext = () => {
        const newIndex = currentIndex === slides.length - 1 ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
        setDirection(false);
        // console.log(direction)
        // console.log("the next index..", newIndex)
        // console.log("this is the Next Index..", currentIndex, direction);
    };

    useEffect(() => {
        timeOut =
            // eslint-disable-next-line react-hooks/exhaustive-deps
            autoPlay &&
            setTimeout(() => {
                goToNext();
            }, 3000);
    });

    return (

        <div className='w-full relative min-h-screen'>
            <div
                className=""
                // onMouseEnter={() => {
                //     setAutoPlay(true);
                //     clearTimeout(timeOut);
                // }}
                // onMouseLeave={() => {
                //     setAutoPlay(true);
                // }}
            >
                <div className='flex flex-col justify-center items-center w-full bg-transparent py-3  border-white'>
                {/* mt-1 xsl:w-40 lg:w-40 xs:w-40 flex justify-evenly items-center mb-1 relative text-4xl bg-black/20 px-7 rounded-full */}
                    <div className='mt-1 lg:w-fit xs:w-full flex justify-evenly items-center mb-1 relative text-4xl'>
                        {slides.map((slide, slideIndex) => (
                            <div
                                key={slideIndex}
                                className=' md:text-lg xs:text-sm xs:ml-0 w-12 flex justify-center items-center flex-col'
                            >
                                <div
                                    className={
                                        slideIndex === currentIndex
                                            ? "pagination_dot pagination_dot-active"
                                            : "pagination_dot" 
                                    }
                                >
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="text-secondary font-semibold text-lg">
                        {slides[currentIndex].title}
                    </div>
                    <div className="text-primary font-light text-center text-sm">
                        {slides[currentIndex].data}
                    </div>
                </div>

                <div className="w-full flex justify-center items-center mt-20">

                    <Image 
                        src={slides[currentIndex]?.imageUrl}
                        // src={'/images/Carousel/inventory.svg'} 
                        alt="carousel" 
                        className='relative w-full h-auto max-w-[30rem] max-h-[30rem] object-contain duration-500 z-10'
                        width={500}
                        height={500}
                    />
                </div>
            </div>

        </div>
    );
}

export default Carousel