import { IFont } from '@/libs/interfaces'
import React from 'react'


export function B1Regular({ className, children, style }: IFont) {
    return (
        <p
            style={style}
            className={`text-[1.125rem] leading-[1.35rem]  ${className}`}>{children}</p>
    )
}
