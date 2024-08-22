const MS_PER_MINUTE = 1000 * 60;
const MS_PER_HOUR = MS_PER_MINUTE * 60;
const MS_PER_DAY = MS_PER_HOUR * 24;
const MS_PER_MONTH = MS_PER_DAY * 30;
const MS_PER_YEAR = MS_PER_DAY * 365;

export default function getTimeAgo(time: Date): string {
    const now = Date.now();
    const then = time.getTime();
    
    const difference = now - then;

    if (difference >= MS_PER_YEAR) {
        const rounded = Math.floor(difference / MS_PER_YEAR);
        return `${rounded} ${rounded === 1 ? 'year' : 'years'} ago`;
    }

    if (difference >= MS_PER_MONTH) {
        const rounded = Math.floor(difference / MS_PER_MONTH);
        return `${rounded} ${rounded === 1 ? 'month' : 'months'} ago`;
    }

    if (difference >= MS_PER_DAY) {
        const rounded = Math.floor(difference / MS_PER_DAY);
        return `${rounded} ${rounded === 1 ? 'day' : 'days'} ago`;
    }

    if (difference >= MS_PER_HOUR) {
        const rounded = Math.floor(difference / MS_PER_HOUR);
        return `${rounded} ${rounded === 1 ? 'hour' : 'hours'} ago`;
    }

    if (difference >= MS_PER_MINUTE) {
        const rounded = Math.floor(difference / MS_PER_MINUTE);
        return `${rounded} ${rounded === 1 ? 'minute' : 'minutes'} ago`;
    }

    return 'now';
}
