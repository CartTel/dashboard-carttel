
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
    title: "Shipment Paid Create",
    ref: "shipment-create-paid",
    graph: "ShipmentCreated",

    // selected: false,
    // type: "chart",
    // position: "left",
  },
  {
    title: "Created Paid",
    ref: "created-paid",
    graph: "CreatedPaid",
    // selected: false,
    // type: "chart",
    // position: "right",
  },

  // {
  //   title: "Transaction History",
  //   ref: "transaction-history",
  //   graph: "TransactionHistory",
  //   selected: false,
  //   type: "chart",
  //   position: "left",
  // },
  // {
  //   title: "Invoice Management",
  //   ref: "invoice-management",
  //   graph: "InvoiceManagement",
  //   selected: false,
  //   type: "chart",
  //   position: "right",
  // },
];

export const graphFilters = [
  {
    value: "weekly",
    label: "Weekly",
  },
  {
    value: "monthly",
    label: "Monthly",
  },
  {
    value: "yearly",
    label: "Yearly",
  },
  {
    value: "3-yearly",
    label: "3-Yearly",
  },
];

export const spendAnalysisData = [
  { label: "Jan", value: 5.5 },
  { label: "Feb", value: 9 },
  { label: "Mar", value: 8.6 },
  { label: "Apr", value: 5.8 },
  { label: "May", value: 6 },
  { label: "Jun", value: 8 },
  { label: "Jul", value: 10 },
  { label: "Aug", value: 6 },
  { label: "Sep", value: 5 },
  { label: "Oct", value: 5 },
  { label: "Nov", value: 6 },
  { label: "Dec", value: 4 },
];


