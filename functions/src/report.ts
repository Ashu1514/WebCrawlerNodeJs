
/**
 * Adds two numbers together.
 * @param {object} pages the pages mapping object.
 * @return {Array<Array>} the sorted frequency of page hits.
 */
export function sortPages(pages: { [props: string]: number }) {
  let result = Object.entries(pages);
  result = result.sort((a, b) => b[1] - a[1]);
  return result;
}
