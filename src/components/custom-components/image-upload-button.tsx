"use client"

import React, { useRef, useState } from 'react'
import { CustomButton } from '.'
import { B2 } from '../custom-typography';

interface IImageUpload {
    className?: string;
    accept?: string;
    onImagePicked: ({ file, preview }: { file: File | null; preview: any }) => void
}
export function ImageUploadButton({ className, accept = 'image/*', onImagePicked }: IImageUpload) {
    const [file, setFile] = useState<File | null>(null)
    const [fileTempUrl, setFileTempUrl] = useState<any>('')
    const imagePickerRef = useRef<HTMLInputElement>(null)

    const previewImage = (image: any) => {
        if (image) {
            const reader = new FileReader()
            reader.onload = (e) => {
                setFileTempUrl(e.target?.result)
                onImagePicked({ file, preview: e.target?.result })

            }
            reader.readAsDataURL(image)

        }

    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null

        if (file && file.size > 2 * 1024 * 1024) {
            alert("File size must not exceed 2MB");
            e.target.value = '';
            return;
        }

        setFile(e.target.files ? e.target.files[0] : null)


        previewImage(e.target.files![0])
    }

    return (
        <div>
            <CustomButton
                onClick={() => imagePickerRef.current?.click()}
                className={`h-[37px] !py-[0px] !text-[0.875rem] !bg-white border-[1px] border-[#9E9E9E66] !text-black !w-[112px] ${className}`}>
                Upload Image

                <input type="file" accept={accept} ref={imagePickerRef}
                    onChange={handleInputChange}
                    className='hidden'

                />
            </CustomButton>

            <B2 className='mt-[12px] !text-gray'>.png, .jpeg, .gif files up to 2MB. Recommended size is 256 by 256px. </B2>
        </div>
    )
}
