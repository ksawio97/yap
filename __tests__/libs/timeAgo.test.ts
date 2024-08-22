import getTimeAgo from '../../src/libs/getTimeAgo';
import { expect, test, vi } from 'vitest';

vi.spyOn(Date, 'now').mockImplementation(() =>
    new Date('2024-07-02').getTime()
);

test('year difference', () => {
    expect(getTimeAgo(new Date('2023-07-02'))).toBe('1 year ago');
});

test('years difference', () => {
    expect(getTimeAgo(new Date('2021-07-02'))).toBe('3 years ago');
});

test('month difference', () => {
    expect(getTimeAgo(new Date('2024-06-02'))).toBe('1 month ago');
});

test('months difference', () => {
    expect(getTimeAgo(new Date('2024-02-02'))).toBe('5 months ago');
});

test('day difference', () => {
    expect(getTimeAgo(new Date('2024-07-01'))).toBe('1 day ago');
});

test('days difference', () => {
    expect(getTimeAgo(new Date('2024-06-30'))).toBe('2 days ago');
});

test('hour difference', () => {
    expect(getTimeAgo(new Date('2024-07-01T23:00:00Z'))).toBe('1 hour ago');
});

test('hours difference', () => {
    expect(getTimeAgo(new Date('2024-07-01T21:00:00Z'))).toBe('3 hours ago');
});

test('minute difference', () => {
    expect(getTimeAgo(new Date('2024-07-01T23:59:00Z'))).toBe('1 minute ago');
});

test('minutes difference', () => {
    expect(getTimeAgo(new Date('2024-07-01T23:04:00Z'))).toBe('56 minutes ago');
});

test('now', () => {
    expect(getTimeAgo(new Date('2024-07-02T00:00:00Z'))).toBe('now');
});