import { JSDOM } from "jsdom";
import { PagesMapping } from "../typings/crawler";
import { Crawler } from "./crawler.model";
const MAX_DEEP_LEVEL = 10;

/**
 * The page crawling function
 * @param {string} baseURL base url of site
 * @param {string} currentURL current crawling page url
 * @param {PagesMapping} pages pages mapping object
 * @param {Crawler} CrawlerQuery Crawler class
 * @param {number} level rucursion levels
 * @return {object} pages pages mapping object
 */
export async function crawlPage(
  baseURL: string,
  currentURL: string,
  pages: PagesMapping,
  CrawlerQuery: Crawler,
  level = 0,
): Promise<PagesMapping> {
  if (level >= CrawlerQuery.maxLevel) {
    return pages;
  }
  level++;
  const baseURLObj: URL = new URL(baseURL);
  const currentURLObj: URL = new URL(currentURL);
  if (baseURLObj.hostname !== currentURLObj.hostname) {
    return pages;
  }

  const normalizeCurrentURL = normalizeURL(currentURL) as string;
  if (pages[normalizeCurrentURL] && pages[normalizeCurrentURL] > 0) {
    pages[normalizeCurrentURL]++;
    return pages;
  }

  pages[normalizeCurrentURL] = 1;

  console.log(`activaly crawling at level ${level}: ${currentURL}`);

  CrawlerQuery.addCrawlingQueryLog(
    `activaly crawling at level ${level}: ${currentURL}`
  );
  try {
    const resp: Response = await fetch(currentURL);

    const contenttype = resp.headers.get("content-type")! as string;

    if (!contenttype.includes("text/html")) {
      CrawlerQuery.addCrawlingQueryLog(
        `non html response, content type: ${contenttype}`
      );
      return pages;
    }

    // if(resp.status > 399){
    //     console.log('Error in fetch status code: ' + resp.status);
    //     return pages;
    // }

    const htmlBody = await resp.text();

    const nextURLs: string[] = getURLsFromHTML(htmlBody, baseURL);

    for (const url of nextURLs) {
      pages = await crawlPage(baseURL, url, pages, CrawlerQuery, level);
    }
  } catch (error: any) {
    console.log(`Error in CrawlPage fetch: ${error.message}`);
  }

  return pages;
}

/**
 * The page crawling function
 * @param {string} htmlBody html code of current page
 * @param {string} baseURL base url of site
 * @return {Array<string>} urls on current page
 */
export function getURLsFromHTML(htmlBody: string, baseURL: string): string[] {
  if (baseURL.slice(-1) === "/") {
    baseURL = baseURL.slice(0, -1);
  }
  const urls: string[] = [];
  const dom = new JSDOM(htmlBody, { url: baseURL });
  const linkEls = dom.window.document.querySelectorAll(
    "a[href]"
  ) as NodeListOf<HTMLAnchorElement>;
  for (const el of linkEls) {
    if (el.href.slice(0, 1) === "/") {
      // relative
      try {
        const urlObj = new URL(`${baseURL}${el.href}`);
        urls.push(urlObj.href);
      } catch (error: any) {
        console.log(
          `Error with relative url ${error.message} on page ${el.href}`
        );
      }
    } else {
      // absolute
      try {
        const urlObj = new URL(el.href);
        urls.push(urlObj.href);
      } catch (error: any) {
        console.log(
          `Error with absolute url ${error.message} on page ${el.href}`
        );
      }
    }
  }
  return urls;
}

/**
 * The page crawling function
 * @param {string} urlString url to normalize
 * @return {string} normalized url
 */
export function normalizeURL(urlString: string): string {
  const urlObj: URL = new URL(urlString);
  const hostPath = `${urlObj.protocol}//${urlObj.hostname}${urlObj.pathname}`;
  if (hostPath.length > 0 && hostPath.slice(-1) === "/") {
    return hostPath.slice(0, -1);
  }
  return hostPath;
}
