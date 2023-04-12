const { test, expect } = require("@jest/globals");
const { sortPages } = require("./report");

test("sortPages with 0 entries", () => {
  const input = {};
  const actual = sortPages(input);
  const expected = [];
  expect(actual).toEqual(expected);
});

test("sortPages with 27 entries", () => {
  const input = {
    "cryptozombies.io": 1,
    "cryptozombies.io//blog": 4,
    "cryptozombies.io//course": 6,
    "cryptozombies.io//en": 2,
    "cryptozombies.io//fr": 2,
    "cryptozombies.io//en/course": 1,
    "cryptozombies.io/": 2,
    "cryptozombies.io//blog/tags/alchemy": 1,
    "cryptozombies.io//blog/tags/nft": 1,
    "cryptozombies.io//blog/tags/live-event": 4,
    "cryptozombies.io//blog/en/2022-10-24-alchemy-live-event-highlights": 2,
    "cryptozombies.io//blog/tags/radix": 1,
    "cryptozombies.io//blog/tags/scrypto": 1,
    "cryptozombies.io//blog/en/2022-10-13-radix-live-event-highlights": 2,
    "cryptozombies.io//blog/tags/solidity": 2,
    "cryptozombies.io//blog/tags/metaverse": 2,
    "cryptozombies.io//blog/en/2022-09-14-interactive-solidity-workshop": 2,
    "cryptozombies.io//blog/tags/blockchain": 1,
    "cryptozombies.io//blog/tags/games": 1,
    "cryptozombies.io//blog/en/2022-09-09-teach-blockchain-to-non-nerd": 2,
    "cryptozombies.io//blog/tags/announcement": 1,
    "cryptozombies.io//blog/en/2022-08-31-cryptozombies-to-join-forces-with-happen-space": 2,
    "cryptozombies.io//blog/en/2022-08-29-sept-solidity-workshop-ed-zynda": 2,
    "cryptozombies.io//what-is-blockchain-lander": 1,
    "cryptozombies.io//privacy-policy": 1,
    "cryptozombies.io//cookies": 1,
    "cryptozombies.io//terms": 1,
  };
  const actual = sortPages(input);
  const expected = [
    ["cryptozombies.io//course", 6],
    ["cryptozombies.io//blog", 4],
    ["cryptozombies.io//blog/tags/live-event", 4],
    ["cryptozombies.io//en", 2],
    ["cryptozombies.io//fr", 2],
    ["cryptozombies.io/", 2],
    ["cryptozombies.io//blog/en/2022-10-24-alchemy-live-event-highlights", 2],
    ["cryptozombies.io//blog/en/2022-10-13-radix-live-event-highlights", 2],
    ["cryptozombies.io//blog/tags/solidity", 2],
    ["cryptozombies.io//blog/tags/metaverse", 2],
    ["cryptozombies.io//blog/en/2022-09-14-interactive-solidity-workshop", 2],
    ["cryptozombies.io//blog/en/2022-09-09-teach-blockchain-to-non-nerd", 2],
    [
      "cryptozombies.io//blog/en/2022-08-31-cryptozombies-to-join-forces-with-happen-space",
      2,
    ],
    ["cryptozombies.io//blog/en/2022-08-29-sept-solidity-workshop-ed-zynda", 2],
    ["cryptozombies.io", 1],
    ["cryptozombies.io//en/course", 1],
    ["cryptozombies.io//blog/tags/alchemy", 1],
    ["cryptozombies.io//blog/tags/nft", 1],
    ["cryptozombies.io//blog/tags/radix", 1],
    ["cryptozombies.io//blog/tags/scrypto", 1],
    ["cryptozombies.io//blog/tags/blockchain", 1],
    ["cryptozombies.io//blog/tags/games", 1],
    ["cryptozombies.io//blog/tags/announcement", 1],
    ["cryptozombies.io//what-is-blockchain-lander", 1],
    ["cryptozombies.io//privacy-policy", 1],
    ["cryptozombies.io//cookies", 1],
    ["cryptozombies.io//terms", 1],
  ];
  expect(actual).toEqual(expected);
});

