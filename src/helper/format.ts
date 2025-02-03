export function formatDate(dateString: string | Date): string {
    const date = new Date(dateString);

    // Get day, month, and year
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" }); // Full month name
    const year = date.getFullYear();

    // Add ordinal suffix to the day
    const ordinalSuffix = (n: number) => {
        if (n > 3 && n < 21) return "th"; // Covers 11th to 19th
        switch (n % 10) {
            case 1:
                return "st";
            case 2:
                return "nd";
            case 3:
                return "rd";
            default:
                return "th";
        }
    };

    const formattedDay = `${day}${ordinalSuffix(day)}`;

    return `${formattedDay} ${month} ${year}`;
}

export function formatDateTime(dateString: string | Date): string {
    const date = new Date(dateString);

    // Get day, month, and year
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" }); // Full month name
    const year = date.getFullYear();

    // Add ordinal suffix to the day
    const ordinalSuffix = (n: number) => {
        if (n > 3 && n < 21) return "th"; // Covers 11th to 19th
        switch (n % 10) {
            case 1:
                return "st";
            case 2:
                return "nd";
            case 3:
                return "rd";
            default:
                return "th";
        }
    };

    const formattedDay = `${day}${ordinalSuffix(day)}`;

    // Format the time (12-hour format with AM/PM)
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";

    const formattedTime = `${hours % 12 || 12}:${minutes
        .toString()
        .padStart(2, "0")} ${ampm}`;

    // Combine date and time
    return `${formattedDay} ${month} ${year}, ${formattedTime}`;
}

export function formatTime(dateString: string | Date): string {
    const date = new Date(dateString);

    // Format the time (12-hour format with AM/PM)
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";

    const formattedTime = `${hours % 12 || 12}:${minutes
        .toString()
        .padStart(2, "0")} ${ampm}`;

    // Combine date and time
    return `${formattedTime}`;
}

