export function dateFormatter(date: Date): string {
    const formattedDate = new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
    }); /* https://www.geeksforgeeks.org/javascript/javascript-date-tolocaledatestring-method/ */
    return formattedDate;
}