import { IFont } from '@/libs/interfaces'
import React from 'react'


export function H1({ className, children, style }: IFont) {
    return (
        <h1
            style={style}
            className={` text-lg lg:text-lg xs:text-md font-[500] ${className}`}>{children}</h1>
    )
}
