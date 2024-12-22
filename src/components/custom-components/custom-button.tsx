import { IButton } from '@/libs/interfaces';
import React from 'react';

export function CustomButton({
  type = "submit", // Default type to "submit"
  onClick,
  className,
  children,
  style,
  disabled,
}: IButton) {
  return (
    <button
      type={type} // Ensure "type" is passed correctly
      disabled={disabled}
      onClick={onClick} // This should be handled only for custom actions, not form submissions
      className={`rounded-[10px] bg-primary py-3 text-[1.125rem] text-white ${
        disabled ? 'opacity-50' : ''
      } ${className}`}
      style={style}
    >
      {children}
    </button>
  );
}
