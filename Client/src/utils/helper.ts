/**
 * Converts a date string into a human-readable format.
 * @param dateStr - The date string to convert.
 * @returns A string representing the human-readable format.
 */

export function isNumericString(str: string): boolean {
    return /^\d+$/.test(str);
}

export function timestampToISO(timestamp: number): string {
    const date = new Date(timestamp);
    return date.toISOString();
}

export function timeAgo(input: string | number): string {
    const date = new Date(typeof input === "string" ? input : input);

    if (isNaN(date.getTime())) {
        return "Invalid Date";
    }

    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    const intervals: { [key: string]: number } = {
        year: 31536000,
        month: 2592000,
        week: 604800,
        day: 86400,
        hour: 3600,
        minute: 60,
        second: 1,
    };

    for (const key in intervals) {
        const interval = intervals[key];
        if (seconds >= interval) {
            const count = Math.floor(seconds / interval);
            return count === 1 ? `${count} ${key} ago` : `${count} ${key}s ago`;
        }
    }

    const options: Intl.DateTimeFormatOptions = {
        day: "numeric",
        month: "long",
    };
    return date.toLocaleDateString(undefined, options);
}
