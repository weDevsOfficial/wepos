export const DATE_TIME_FORMAT = "DD/MM/YYYY HH:mm:ss";
export const DEFAULT_PAGE_SIZE = 30;
export const STOCK_MAPPERS = {
    instock: "In Stock",
    outofoutofstock: "Stock Out",
};

export const ALLOW_BACKORDERS = [
    { value: "no", name: "Do not allow" },
    { value: "notify", name: "Allow, but notify customer" },
    { value: "yes", name: "Allow" },
];

export const ORDER_STATUS = {
    pending: "Pending",
    processing: "Processing",
    "on-hold": "On hold",
    completed: "Completed",
    cancelled: "Cancelled",
    refunded: "Refunded",
    failed: "Failed",
};
