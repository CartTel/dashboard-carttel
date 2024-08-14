import React from 'react'
import CustomModal from './custom-modal'
import { SecondaryText, BMiddle, B1 } from '../custom-typography'
import Image from 'next/image'
import { CustomButton } from './custom-button'

interface ICustomCommonModal {
    children?: React.ReactNode;
    onClose: () => void;
    icon?: string;
    title: string;
    subTitle?: string;
    buttonLabel: string;
    buttonClass?: string;
    wrapperClass?: string;
    showCancel?: boolean;
    subtitleClass?: string
}
export function CustomCommonModal({ children, onClose, icon, title, subTitle, buttonLabel, buttonClass, wrapperClass, subtitleClass, showCancel = true }: ICustomCommonModal) {
    return (
        <CustomModal onClose={onClose}>
            <div className={`py-[38px] px-[30px] bg-white rounded-[10px] shadow w-[574.18px] flex flex-col items-center ${wrapperClass}`}>
                {icon && <Image
                    src={icon}
                    alt=''
                    width={96}
                    height={96}
                    className='mb-[16px]'
                />}

                <SecondaryText className='mb-[24px]'>{title}</SecondaryText>
                {subTitle && <B1 className={`!text-gray mb-[46px] ${subtitleClass}`}>{subTitle}</B1>}

                {children}

                <div className='flex items-center justify-center gap-[20px]'>
                    {showCancel && <CustomButton
                        onClick={onClose}
                        className='!text-[#292D32] border-gray !bg-white border-[1px] !py-[0px] !h-[58px] !w-[175px]'>Cancel</CustomButton>}
                    <CustomButton
                        onClick={onClose}

                        className={`!bg-[#B7383C] !py-[0px] !h-[58px] !w-[175px] ${buttonClass}`}>{buttonLabel}</CustomButton>
                </div>
            </div>
        </CustomModal>
    )
}
