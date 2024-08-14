import { IButton } from '@/libs/interfaces'
import React from 'react'


export function CustomButton({ type, onClick, className, children, style, disabled }: IButton) {

    return (
        <button type={type} disabled={disabled} onClick={onClick} className={`rounded-[10px] bg-primary py-3 text-[1.125rem]  text-white ${disabled ? 'opacity-50' : ''} ${className}`}
            style={style}
        >
            {children}
        </button>
    )
}
