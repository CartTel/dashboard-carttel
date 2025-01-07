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


export interface IStatCard {
    title: string;
    value: string;
    growth: string;
    icon: string;
    color: string;
    duration?: string;
    wrapperClassName?: string;
    titleClassName?: string;
    iconClassName?: string;
    iconWrapperClassName?: string;
    valueClassName?: string;
    actionComponent?: React.ReactNode;
    onClick?: () => void;
}

export interface AdminstatCard {
    title: string;
    value: string;
    icon: string;
    color: string;
    duration?: string;
    textColor?: string;
    percentage?: string;
    count?: string;
    status?: boolean;
    wrapperClassName?: string;
    titleClassName?: string;
    iconClassName?: string;
    iconWrapperClassName?: string;
    valueClassName?: string;
    actionComponent?: React.ReactNode;
    onClick?: () => void;
}

export interface IToggleNotification {
    type: string;
    action: "email" | "browser" | "whatsapp" | "frequency";
    frequency?: string;
}

export interface IIncidentReportChart {
    value?: string;
    growth?: string;
}

export interface ISemiDonutChart {
    label: string;
    color: string;
    value: number;
}

export interface IGroupBarChart {
    colors?: string[];
    graphSuffix?: string;
    data: {
        name: string;
        data: number[];
    }[];
    xAxis?: string[];
    height?: number;
    isStacked?: boolean;
}

export interface IPieChart {
    labels: string[];
    data: number[];
    colors?: string[];
}

export interface IDonutChart {
    labels: string[];
    data: number[];
    colors?: string[];
    value?: number;
}

export interface IRadialBarChart {
    labels: string[];
    data: number[];
    colors?: string[];
}

export interface ITotalRevenueChart {
    value?: string;
    growth?: string;
}



export interface StackedChartData {
    label: string;
    value: {
        name: string;
        data: number;
        bg_color: string;
    }[];
}

export interface IBarChartData {
    label: string;
    color: string;
    value: number;
}

export interface IAreaChartData {
    label: string;

    value: number;
}

type Item = {
    name: string;
    stock: number;
    price: number;
};

type StockStatus = {
    bg_color: string;
    items: Item[];
};

export interface HorizontalStackedBarChartData {
    available: StockStatus;
    lowStock: StockStatus;
    outOfStock: StockStatus;
}

export interface SpendingCategory {
    name: string;
    value: number;
    color: string;
}

export interface DashboardStat {
    title: string;
    ref: string;
    value: string;
    growth: string;
    icon: string;
    color: string;
    allowedRoles: string[];
    selected: boolean;
    duration?: string;
}

export interface AdminDashboardStat {
    title: string;
    ref: string;
    value: string;
    icon: string;
    color: string;
    allowedRoles?: string[];
    selected: boolean;
    duration?: string;
}

export interface DashboardChart {
    title: string;
    ref: string;
    graph: string;
    allowedRoles: string[];
    selected: boolean;
    type: string;
    position?: string;
}



export interface ILog {
    title: string;
    details: string;
    date: string;
    time: string;
}

export interface IPeopleTrail {
    name: string;
    email: string;
    image: string;
    role: string;
}







