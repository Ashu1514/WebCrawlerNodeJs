function sortPages(pages) {
  let result = Object.entries(pages);
  result = result.sort((a, b) => b[1] - a[1]);
  return result;
}

module.exports = {
  sortPages,
};
