import { IFont } from '@/libs/interfaces'
import React from 'react'


export function H2({ className, children, style }: IFont) {
    return (
        <h2
            style={style}
            className={`xs:text-xs lg:text-sm font-medium leading-[2.7rem] ${className}`}>{children}</h2>
    )
}
