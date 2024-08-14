import { IFont } from '@/libs/interfaces'
import React from 'react'


export function B1({ className, children, style }: IFont) {
    return (
        <p
            style={style}
            className={`xl:text-[1.125rem] text-[1rem] font-[500] leading-[1.35rem] ${className}`}>{children}</p>
    )
}
