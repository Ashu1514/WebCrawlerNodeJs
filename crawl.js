const { JSDOM } = require("jsdom");

async function crawlPage(baseURL, currentURL, pages){
    const baseURLObj = new URL(baseURL);
    const currentURLObj = new URL(currentURL);
    if(baseURLObj.hostname !== currentURLObj.hostname){
        return pages;
    }
    
    const normalizeCurrentURL = normalizeURL(currentURL);
    if(pages[normalizeCurrentURL] && pages[normalizeCurrentURL] > 0){
        pages[normalizeCurrentURL]++;
        return pages;
    }
    
    pages[normalizeCurrentURL] = 1;
    
    console.log('activaly crawling: ' + currentURL);
    try {
        const resp = await fetch(currentURL);

        if(resp.status > 399){
            console.log('Error in fetch status code: ' + resp.status);
            return pages;
        }

        const contenttype = resp.headers.get('content-type');
        if(!contenttype.includes('text/html')){
            console.log(`non html response, content type: ${contenttype}`);
            return pages;
        }

        const htmlBody = await resp.text();

        const nextURLs = getURLsFromHTML(htmlBody, baseURL);
       
        for(const url of nextURLs){ 
            pages = await crawlPage(baseURL, url, pages);
        }
    } catch (error) {
        console.log(`Error in CrawlPage fetch: ${error.message}`);
    }
    
    return pages;
}

function getURLsFromHTML(htmlBody, baseURL) {

  const urls = [];
  const dom = new JSDOM(htmlBody);
  const linkEls = dom.window.document.querySelectorAll('a');
  for(const el of linkEls){
    if(el.href.slice(0, 1) === '/'){
        // relative
        try {
            const urlObj = new URL(`${baseURL}${el.href}`);
            urls.push(urlObj.href);
        } catch (error) {
            console.log(`Error with relative url ${error.message} on page ${el.href}`);
        }
    } else {
        // absolute
        try {
            const urlObj = new URL(el.href);
            urls.push(urlObj.href);
        } catch (error) {
            console.log(`Error with absolute url ${error.message} on page ${el.href}`);
        }
    }
  }
  return urls;
}

function normalizeURL(urlString) {
  const urlObj = new URL(urlString);
  const hostPath = `${urlObj.hostname}${urlObj.pathname}`;
  if (hostPath.length > 0 && hostPath.slice(-1) === "/") {
    return hostPath.slice(0, -1);
  }
  return hostPath;
}

module.exports = {
  normalizeURL,
  getURLsFromHTML,
  crawlPage
};
