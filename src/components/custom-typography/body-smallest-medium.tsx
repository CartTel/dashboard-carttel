import { IFont } from '@/libs/interfaces'
import React from 'react'


export function BodySmallestMedium({ className, children, style }: IFont) {
    return (
        <p
            style={style}
            className={`text-[0.75rem] font-[500] leading-[0.9rem] ${className}`}>{children}</p>
    )
}
