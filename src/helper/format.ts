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


