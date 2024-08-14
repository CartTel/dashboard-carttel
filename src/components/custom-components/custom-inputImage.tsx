import React, { useState } from 'react';
import Image from 'next/image';

import { BMiddle, B2 } from '@/components/custom-typography'






interface AvatarUploadProps {
    avatar: string | null;
    onAvatarUpload: (file: File) => void | any;
    setAvatar: (e: any) => void;
}

export const CustomInputImage: React.FC<AvatarUploadProps> = ({ avatar, setAvatar, onAvatarUpload }) => {
    const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
      const files = event.target.files;
      if (files && files.length > 0) {
        const selectedFile = files[0];
        onAvatarUpload(selectedFile);
        setAvatar(URL.createObjectURL(selectedFile));
      }
    };
  
    return (
      <div className="w-full flex mt-2">
        <div className="flex flex-col">
          <span className="inline-block h-full w-full rounded overflow-hidden ">
            {avatar ? (
              <div className="w-20 h-fit">
                <Image
                  src={avatar}
                  alt="avatar"
                  width={136}
                  height={136}
                  className="w-full h-full object-contain rounded-lg"
                  layout="responsive"
                />
              </div>
            ) : (
              <div className="flex bg-[#F7F7F7] justify-center items-center rounded-lg md:p-4 xs:p-0">
                <Image
                  src="/images/camera.svg"
                  alt="logo"
                  width={136}
                  height={136}
                  priority
                  className="w-full h-full object-contain"
                />
              </div>
            )}
          </span>
        </div>
  
        <div className="ml-3 flex flex-col justify-between">
          <div className="flex">
            <label htmlFor="avatar" className="block text-sm font-medium text-gray-700"></label>
            <label
              htmlFor="file-input"
              className="flex w-fit flex-col items-center justify-center px-[10px] py-[10px] border border-[#9E9E9E66] rounded-md text-sm font-medium bg-white"
            >
              <B2 className="text-[#000000] whitespace-nowrap">Upload Image</B2>
  
              <span className="">
                <input
                  type="file"
                  name="avatar"
                  id="file-input"
                  accept=".jpg,.jpeg,.png"
                  onChange={handleFileInputChange}
                  className="sr-only"
                />
              </span>
            </label>
          </div>
          <B2 className="text-[#9E9E9E] w-full flex justify-start">.png, .jpeg, .gif files up to 8MB. Recommended size is 256 by 256px.</B2>
        </div>
      </div>
    );
  };
  

// export default CustomInputImage;
