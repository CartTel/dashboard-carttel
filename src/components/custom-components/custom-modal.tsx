/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { IModal } from '@/libs/interfaces'
import React, { useEffect, useRef } from 'react'

function CustomModal({ children, onClose, backdrop }: IModal) {

    const modalRef = useRef<HTMLDivElement>(null);
    const modalChildRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {

        if ((modalRef.current && !modalRef.current.contains(event.target as Node)) || (modalChildRef.current && !modalChildRef.current.contains(event.target as Node))) {
            onClose()
        }
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {

            document.addEventListener('mousedown', handleClickOutside)
        }
        return () => {
            if (typeof window !== 'undefined')
                document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    return (
        <div
            ref={modalRef}
            className={`fixed top-0 left-0 w-[100vw] h-[100vh] bg-[#00000080]  flex items-center justify-center z-[100000000000000] 
                ${backdrop ? "backdrop-blur-[10px]" : "" 
                }`}
            // className={`` ${backdrop ? backdrop-blur-[10px]: "" }}
        >
            <div
                ref={modalChildRef}
                className='max-h-[95vh] overflow-y-auto'

            >
                {children}
            </div>
        </div>
    )
}

export default CustomModal