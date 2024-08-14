import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

interface ICustomBreadCrumb {
    items: {
        label: string;
        link?: string;
    }[]
}
export function CustomBreadCrumb({ items }: ICustomBreadCrumb) {
    return (
        <ul className='flex items-center gap-[4px]'>
            {
                items.map(({ label, link }, index) => (
                    <li key={index} className={`flex items-center gap-[1.5px] text-[0.875rem] ${index < items.length - 1 ? 'text-gray' : ''}`}>
                        <Link href={link ? link : '#'}>{label}</Link>
                        {index < items.length - 1 && <Image
                            src={'/images/arrow-down.svg'}
                            alt="arrow-down"
                            width={14}
                            height={14}
                            className='rotate-[-90deg] object-contain'
                        />}
                    </li>
                ))
            }
        </ul>
    )
}
