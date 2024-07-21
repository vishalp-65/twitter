/**
 * Converts a date string into a human-readable format.
 * @param dateStr - The date string to convert.
 * @returns A string representing the human-readable format.
 */

export function formatRelativeTime(timestamp: string): string {
    const now = Date.now();
    const diff = now - Number(timestamp);

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    if (seconds < 60) {
        return `${seconds} sec ago`;
    } else if (minutes < 60) {
        return `${minutes} min ago`;
    } else if (hours < 24) {
        return `${hours} h ago`;
    } else {
        const date = new Date(timestamp);
        const day = date.getDate();
        const month = date.toLocaleString("default", { month: "long" });
        return `${day} ${month}`;
    }
}
