import { IFont } from '@/libs/interfaces'
import React from 'react'


export function B2Regular({ className, children, style }: IFont) {
    return (
        <p
            style={style}
            className={`text-[0.875rem] leading-[1.05rem] ${className}`}>{children}</p>
    )
}
