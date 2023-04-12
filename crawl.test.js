const { normalizeURL, getURLsFromHTML } = require("./crawl");
const { test, expect } = require("@jest/globals");

test("normalizeURL strip protocol", () => {
  const input = "https://cryptozombies.io/blog";
  const actual = normalizeURL(input);
  const expected = "cryptozombies.io/blog";
  expect(actual).toEqual(expected);
});

test("normalizeURL strip trailing slash", () => {
  const input = "https://cryptozombies.io/blog/";
  const actual = normalizeURL(input);
  const expected = "cryptozombies.io/blog";
  expect(actual).toEqual(expected);
});

test("normalizeURL strip capitals", () => {
  const input = "https://cryptozombies.io/blog/";
  const actual = normalizeURL(input);
  const expected = "cryptozombies.io/blog";
  expect(actual).toEqual(expected);
});

test("normalizeURL strip http", () => {
  const input = "http://cryptozombies.io/blog/";
  const actual = normalizeURL(input);
  const expected = "cryptozombies.io/blog";
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML absolute", () => {
  const inputHtmlFile = `
        <html>
            <body>
                <a href='https://cryptozombies.io/blog/'>
                    blogs | CryptoZombie
                </a>
            </body>
        </html>
    `;
  const inputBaseUrl = "https://cryptozombies.io";
  const actual = getURLsFromHTML(inputHtmlFile, inputBaseUrl);
  const expected = ["https://cryptozombies.io/blog/"];
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML relative", () => {
  const inputHtmlFile = `
        <html>
            <body>
                <a href='/blog/'>
                    blogs | CryptoZombie
                </a>
            </body>
        </html>
    `;
  const inputBaseUrl = "https://cryptozombies.io";
  const actual = getURLsFromHTML(inputHtmlFile, inputBaseUrl);
  const expected = ["https://cryptozombies.io/blog/"];
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML both", () => {
  const inputHtmlFile = `
        <html>
            <body>
                <a href='https://cryptozombies.io/blog/'>
                    blogs | CryptoZombie
                </a>
                <a href='/mynetwork/'>
                    CryptoZombie
                </a>
            </body>
        </html>
    `;
  const inputBaseUrl = "https://cryptozombies.io";
  const actual = getURLsFromHTML(inputHtmlFile, inputBaseUrl);
  const expected = [
    "https://cryptozombies.io/blog/",
    "https://cryptozombies.io/mynetwork/",
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
  const inputBaseUrl = "https://cryptozombies.io";
  const actual = getURLsFromHTML(inputHtmlFile, inputBaseUrl);
  const expected = ['https://cryptozombies.io/invalid'];
  expect(actual).toEqual(expected);
});
