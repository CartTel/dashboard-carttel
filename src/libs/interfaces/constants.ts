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
    value?: string | number | undefined;
    setValue?: (e: any) => void;
    className?: string;
    id?: string;
    type?: React.HTMLInputTypeAttribute;
    label: string;
    showLabel?: boolean;
    disabled?: boolean;
    required?: boolean;
    isToggle?: boolean;
    showToggle?: boolean;
    changeToggle?: () => void;
    inputType?: "input" | "textarea";
    onChange?: (value: string) => void;
    calendar?: boolean;
    wrapperClass?: string;
    showRequirement?: boolean;
}

