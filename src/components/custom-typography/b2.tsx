import { IFont } from '@/libs/interfaces'
import React from 'react'


export function B2({ className, children, style }: IFont) {
    return (
        <p
            style={style}
            className={`md:text-[0.875rem] xs:text-[.65rem] font-[500] leading-[1.05rem] ${className}`}>{children}</p>
    )
}
