
export const buttonColors = [
    '#103f69', // Primary
    '#1d428a', // Secondary
    '#33BD83', // Green
    '#080934', // black
    '#F47F12', // Orange
];

export const userRoleOptions = [
    {
        code: 'IMP',
        name: 'Import',
        value: "import"
    },
    {
        code: 'EXP',
        name: 'Export',
        value: "export"
    },
    {
        code: 'SUP',
        name: 'Supplier',
        value: "supplier"
    },
    {
        code: 'SYS',
        name: 'System Administrator',
        value: "admin"
    },
    {
        code: 'SA',
        name: 'Super Administrator',
        value: "admin"
    },
    {
        code: 'VND',
        name: 'Vendor',
        value: "vendor"
    },
    {
        code: 'MANGR',
        name: 'Manager',
        value: "manager"
    },
]

export const primaryColor = {
    name: "CartTel Color",
    theme: "#1d4188",
};

export const secondaryColor = {
    name: "CartTel Color",
    theme: "#1d428a",
};

export const statistics = [
  {
    title: "Total Shipment Made",
    ref: "total-shipment-made",
    value: "23,400",
    icon: "/images/Home/package.svg",
    color: "#ffe3cf",
    textColor: "#f9812d",
    status: true
  },
]


export const adminDashboardStatisitcs = [
    // {
    //   title: "Total Shipment Made",
    //   ref: "total-shipment-made",
    //   value: "23,400",
    //   icon: "/images/Home/package.svg",
    //   color: "#ffe3cf",
    //   textColor: "#f9812d",
    //   status: true
    // },
    // {
    //   title: "Total Number of Importers",
    //   ref: "total-importers",
    //   value: "180",
    //   icon: "/images/Home/users.svg",
    //   color: "#EDE3FA",
    //   textColor: "#a967fe",
    //   status: false,
    //   percentage: "-5.47"
    // },
    // {
    //   title: "Shipment Conversion Rate",
    //   ref: "shipment-conversion-rate",
    //   value: "14 days",
    //   icon: "/images/Home/percentage.svg",
    //   color: "#E2FAF0",
    //   textColor: "#ea3a3f",
    //   status: false,
    //   percentage: "-1.07"
    // },
    {
      title: "Customer Satification Rating",
      ref: "customer-satification-rating",
      value: "93%",
      icon: "/images/Home/like.svg",
      color: "#bfccf8",
      textColor: "#0235dd",
      status: false,
      percentage: "-4.07"
    },
  ];

  export const AdminDashboardCharts = [
    {
      title: "Spend Analysis",
      ref: "spend-analysis",
      graph: "SpendAnalysis",
  
      selected: false,
      type: "chart",
      position: "left",
    },
    {
      title: "Request Trend",
      ref: "request-trend",
      graph: "RequestTrend",
      selected: false,
      type: "chart",
      position: "right",
    },
  
    {
      title: "Transaction History",
      ref: "transaction-history",
      graph: "TransactionHistory",
      selected: false,
      type: "chart",
      position: "left",
    },
    {
      title: "Invoice Management",
      ref: "invoice-management",
      graph: "InvoiceManagement",
      selected: false,
      type: "chart",
      position: "right",
    },
  ];


