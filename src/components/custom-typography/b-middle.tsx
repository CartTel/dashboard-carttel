import { IFont } from '@/libs/interfaces'
import React from 'react'


export function BMiddle({ className, children, style }: IFont) {
    return (
        <p
            style={style}
            className={`text-[1rem] font-[500] leading-[1.2rem] ${className}`}>{children}</p>
    )
}
