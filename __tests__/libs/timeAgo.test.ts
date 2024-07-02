import timeAgo from '../../src/libs/timeAgo';
import { expect, test, vi } from 'vitest';

vi.spyOn(Date, 'now').mockImplementation(() =>
    new Date('2024-07-02').getTime()
);

test('year difference', () => {
    expect(timeAgo(new Date('2023-07-02'))).toBe('1 year ago');
});

test('years difference', () => {
    expect(timeAgo(new Date('2021-07-02'))).toBe('3 years ago');
});

test('month difference', () => {
    expect(timeAgo(new Date('2024-06-02'))).toBe('1 month ago');
});

test('months difference', () => {
    expect(timeAgo(new Date('2024-02-02'))).toBe('5 months ago');
});

test('day difference', () => {
    expect(timeAgo(new Date('2024-07-01'))).toBe('1 day ago');
});

test('days difference', () => {
    expect(timeAgo(new Date('2024-06-30'))).toBe('2 days ago');
});

test('hour difference', () => {
    expect(timeAgo(new Date('2024-07-01T23:00:00Z'))).toBe('1 hour ago');
});

test('hours difference', () => {
    expect(timeAgo(new Date('2024-07-01T21:00:00Z'))).toBe('3 hours ago');
});

test('minute difference', () => {
    expect(timeAgo(new Date('2024-07-01T23:59:00Z'))).toBe('1 minute ago');
});

test('minutes difference', () => {
    expect(timeAgo(new Date('2024-07-01T23:04:00Z'))).toBe('56 minutes ago');
});

test('now', () => {
    expect(timeAgo(new Date('2024-07-02T00:00:00Z'))).toBe('now');
});