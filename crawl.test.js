const { normalizeURL, getURLsFromHTML } = require("./crawl");
const { test, expect } = require("@jest/globals");

test("normalizeURL strip protocol", () => {
  const input = "https://www.linkedin.com/feed";
  const actual = normalizeURL(input);
  const expected = "www.linkedin.com/feed";
  expect(actual).toEqual(expected);
});

test("normalizeURL strip trailing slash", () => {
  const input = "https://www.linkedin.com/feed/";
  const actual = normalizeURL(input);
  const expected = "www.linkedin.com/feed";
  expect(actual).toEqual(expected);
});

test("normalizeURL strip capitals", () => {
  const input = "https://www.LINKEDIN.com/feed/";
  const actual = normalizeURL(input);
  const expected = "www.linkedin.com/feed";
  expect(actual).toEqual(expected);
});

test("normalizeURL strip http", () => {
  const input = "http://www.linkedin.com/feed/";
  const actual = normalizeURL(input);
  const expected = "www.linkedin.com/feed";
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML absolute", () => {
  const inputHtmlFile = `
        <html>
            <body>
                <a href='https://www.linkedin.com/feed/'>
                    Feeds | LinkedIn
                </a>
            </body>
        </html>
    `;
  const inputBaseUrl = "https://www.linkedin.com";
  const actual = getURLsFromHTML(inputHtmlFile, inputBaseUrl);
  const expected = ["https://www.linkedin.com/feed/"];
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML relative", () => {
  const inputHtmlFile = `
        <html>
            <body>
                <a href='/feed/'>
                    Feeds | LinkedIn
                </a>
            </body>
        </html>
    `;
  const inputBaseUrl = "https://www.linkedin.com";
  const actual = getURLsFromHTML(inputHtmlFile, inputBaseUrl);
  const expected = ["https://www.linkedin.com/feed/"];
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML both", () => {
  const inputHtmlFile = `
        <html>
            <body>
                <a href='https://www.linkedin.com/feed/'>
                    Feeds | LinkedIn
                </a>
                <a href='/mynetwork/'>
                    LinkedIn
                </a>
            </body>
        </html>
    `;
  const inputBaseUrl = "https://www.linkedin.com";
  const actual = getURLsFromHTML(inputHtmlFile, inputBaseUrl);
  const expected = [
    "https://www.linkedin.com/feed/",
    "https://www.linkedin.com/mynetwork/",
  ];
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML invalid url", () => {
  const inputHtmlFile = `
        <html>
            <body>
                <a href='invalid'>
                    Invalid URL
                </a>
            </body>
        </html>
    `;
  const inputBaseUrl = "https://www.linkedin.com";
  const actual = getURLsFromHTML(inputHtmlFile, inputBaseUrl);
  const expected = [];
  expect(actual).toEqual(expected);
});
