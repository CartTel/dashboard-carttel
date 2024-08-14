import { IFont } from '@/libs/interfaces'
import React from 'react'


export function SecondaryText({ className, children, style }: IFont) {
    return (
        <p
            style={style}
            className={`text-[1.5rem] font-[500] leading-[1.8rem] ${className}`}>{children}</p>
    )
}
