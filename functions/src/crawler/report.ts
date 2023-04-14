import { PagesMapping } from "../typings/crawler";

/**
 * Adds two numbers together.
 * @param {PagesMapping} pages the pages mapping object.
 * @return {Array} the sorted frequency of page hits.
 */
export function sortPages(pages: PagesMapping): [string, number][] {
  let result = Object.entries(pages);
  result = result.sort((a, b) => b[1] - a[1]);
  return result;
}
