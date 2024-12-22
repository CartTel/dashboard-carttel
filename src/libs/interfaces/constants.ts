export interface IFont {
    className?: string;
    children?: React.ReactNode;
    style?: React.CSSProperties;
}

export interface IModal {
    children: React.ReactNode;
    onClose: () => void;
}

export interface IButton extends IFont {
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
    onClick?: (param?: any) => void;
    style?: React.CSSProperties;
}

export interface IIcon {
    className?: string;
    fillColor?: string;
    size?: number
}

interface ICustomInputOnChange {
    (index: number, fieldName: string, value: string | number): void;
}

export interface ICustomInput {
    value?: string | number; // Default to string or number
    setValue?: (value: string | number) => void; // Explicit type for setValue
    className?: string;
    wrapperClass?: string;
    id?: string;
    type?: React.HTMLInputTypeAttribute; // HTML input types
    label: string;
    showLabel?: boolean;
    disabled?: boolean;
    required?: boolean;
    isToggle?: boolean;
    showToggle?: boolean;
    changeToggle?: () => void;
    inputType?: "input" | "textarea"; // Specify input or textarea
    onChange?: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void;
    calendar?: boolean;
    showRequirement?: boolean;
    errorMessage?: string;
  }
  


