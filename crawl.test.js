const { normalizeURL } = require("./crawl");
const { test, expect } = require("@jest/globals");

test('normalizeURL strip protocol', () => {
    const input = 'https://www.linkedin.com/feed';
    const actual = normalizeURL(input);
    const expected = 'www.linkedin.com/feed';
    expect(actual).toEqual(expected);
});


test('normalizeURL strip trailing slash', () => {
    const input = 'https://www.linkedin.com/feed/';
    const actual = normalizeURL(input);
    const expected = 'www.linkedin.com/feed';
    expect(actual).toEqual(expected);
});

test('normalizeURL strip capitals', () => {
    const input = 'https://www.LINKEDIN.com/feed/';
    const actual = normalizeURL(input);
    const expected = 'www.linkedin.com/feed';
    expect(actual).toEqual(expected);
});

test('normalizeURL strip http', () => {
    const input = 'http://www.linkedin.com/feed/';
    const actual = normalizeURL(input);
    const expected = 'www.linkedin.com/feed';
    expect(actual).toEqual(expected);
});
