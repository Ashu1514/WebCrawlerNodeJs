import styled, { keyframes } from "styled-components";

const Container = styled.div`
  color: white;
  margin-bottom: 1rem;
  max-width: 60%;
  width: 99%;
  padding: 0rem 2rem;
  margin-top: 2rem;
  overflow-y: hidden;
  overflow-x: hidden;

  &:hover {
    overflow-y: scroll;
  }

  &::-webkit-scrollbar {
    width: 1%;
  }
  &::-webkit-scrollbar-track {
    border-radius: 0px;
  }

  &::-webkit-scrollbar-thumb {
    background: #18422a;
    border-radius: 0px;
    height: 2px;
  }
`;

const flash = keyframes`
  0% {
    background-color: #4ffa7b;
    color: #000;
  }
  100% {
    background-color: #052c165c;
    color: #fff;
  }

`;

const Table = styled.table`
  width: 100%;
`;

const TableRow = styled.tr`
  animation: ${flash} 0.5s ease-out;
`;

const TableHead = styled.thead`
  height: 1rem;
  width: fit-content;
  background: #1a5a36b0;
  line-height: 0rem;
`;

const TableHeader = styled.th`
  padding: 0.2rem 0.5rem;
  position: sticky;
  top: 0;
  background: #124427;

  p {
    margin: 0.8rem;
  }
`;

const TableData = styled.td`
  height: fit-content;
  width: fit-content;
  padding: 0 0.5rem;
  p {
    margin: 0.3rem 0;
  }
`;

const TableBody = styled.tbody`
  background: #052c165c;
  line-height: 1rem;

  .text-center {
    text-align: center;
  }
`;

const Instrcutions = styled.div`
  font-size: 0.9rem;

  p {
    margin: 0.4rem 0;
  }

  .website_name {
    color: #4ffa7b;
    font-weight: bold;
    font-size: 1rem;
  }

  .variable_name {
    font-weight: 600;
    font-size: 0.875rem;
    color: #4fc1ff;
  }
`;

type recordTuple = [string, number];

const CrawlingResult = ({
  data,
  crawlingStarted,
}: {
  data: Array<recordTuple>;
  crawlingStarted: boolean;
}) => {
  return (
    <Container>
      {crawlingStarted ? (
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>
                <p>No.</p>
              </TableHeader>
              <TableHeader>
                <p>URLs</p>
              </TableHeader>
              <TableHeader>
                <p>Occurrence</p>
              </TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.map(([url, occur], i) => {
                return (
                  <TableRow key={url + i}>
                    <TableData>
                      <p className="text-center">{i + 1}.</p>
                    </TableData>
                    <TableData>
                      <p>{url}</p>
                    </TableData>
                    <TableData>
                      <p className="text-center">{occur}</p>
                    </TableData>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      ) : (
        <Instrcutions>
          <p>
            Our {<span className="website_name">Super Web Crawler</span>} tool
            allows you to extract data from any website by crawling its pages
            and collecting all the URLs that match your specified domain name
            and depth level. Simply enter the URL of the website (
            <span className="variable_name">_start_page_URL</span>
            {`) you
            want to crawl, along with the domain name (`}
            <span className="variable_name">_domain_URL</span>
            {`) and depth level (`}
            <span className="variable_name">_depth_level</span>
            {`), and our tool
            will start to crawl the website page by page, collecting all URLs that
            match the domain name and level.`}
          </p>
          <p>
            For example, if you set the domain name to{" "}
            <strong>'example.com'</strong> and the depth level to 3, our tool
            will crawl the first page of <strong>'example.com'</strong>, and
            then recursively crawl all the pages that match the{" "}
            <strong>'example.com'</strong>{" "}
            domain name up to three levels deep. Once the crawling process is
            complete, our tool will return all the URLs that were found, along
            with the count of how many times each URL occurred on the crawled
            pages.
          </p>
          <p>
            This data can then be downloaded in different formats, such as CSV
            or JSON, for further analysis and processing. With our web crawler
            tool, you can extract valuable insights from any website, whether
            it's for competitive analysis, SEO research, or content scraping.
            Try our tool today and see for yourself how easy it is to extract
            data from any website!
          </p>
        </Instrcutions>
      )}
    </Container>
  );
};

export default CrawlingResult;
