import { IFont } from '@/libs/interfaces'
import React from 'react'


export function BMiddleRegular({ className, children, style }: IFont) {
    return (
        <p
            style={style}
            className={`text-[1rem] leading-[1.2rem] ${className}`}>{children}</p>
    )
}

