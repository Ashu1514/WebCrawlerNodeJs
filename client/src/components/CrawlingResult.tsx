import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { TabType } from "../types";

const Container = styled.div`
  order: 2;
  color: white;
  max-width: 60%;
  width: 99%;
  height: 100%;
`;

const ContainerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 8%;
  transition: height 0.2s linear;
  border-bottom: 1px solid #103d24;
`;

const Tab = styled.div`
  border-right: 1px solid #103d24;
  flex: 1 1 0px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: #35ad55;

  &:hover,
  &.active {
    background: #4ffa7b;
    color: #021309;
  }
`;

const Wrapper = styled.div`
  margin-bottom: 1rem;
  padding: 0rem 2rem;
  height: 92%;
  transition: height 0.2s linear;
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
  max-width: 35rem;
  margin: auto;
  font-size: 1rem;
  text-align: justify;

  .website_name {
    color: #4ffa7b;
    font-weight: bold;
    font-size: 1rem;
  }

  .variable_name {
    font-weight: bold;
    color: #4fc1ff;
  }
`;

type recordTuple = [string, number];
interface Props {
  data: Array<recordTuple>;
  crawlingStarted: boolean;
  terminalOn: boolean;
}

const Tabs = [
  {
    name: "Introduction",
    id: TabType.INTRODUCTION,
  },
  {
    name: "Instructions",
    id: TabType.INSTRUCTIONS,
  },
  {
    name: "Results",
    id: TabType.RESULTS,
  },
];

const CrawlingResult = ({ data, crawlingStarted, terminalOn }: Props) => {
  const [selectedTab, setSelectedTab] = useState<number>(TabType.INTRODUCTION);

  useEffect(() => {
    setSelectedTab((prevTab) => crawlingStarted ? TabType.RESULTS : prevTab);
  }, [crawlingStarted]);

  return (
    <Container>
      <ContainerHeader style={{height: terminalOn ? "8%" : "5%"}}>
        {Tabs.map((el) => (
          <Tab
            onClick={() => setSelectedTab(el.id)}
            key={el.id}
            className={`${selectedTab === el.id ? "active" : ""}`}
          >
            <p>{el.name}</p>
          </Tab>
        ))}
      </ContainerHeader>
      <Wrapper  style={{height: terminalOn ? "92%" : "95%"}}>
        {selectedTab === TabType.INTRODUCTION ? (
          <Instrcutions>
            <p>
              Welcome to{" "}
              {<span className="website_name">Super Web Crawler</span>}, the
              ultimate web crawling solution for developers, marketers, and
              researchers. Our cutting-edge web crawler tool allows you to
              extract data from any website quickly and easily, giving you
              valuable insights and competitive advantages.
            </p>

            <p>
              With {<span className="website_name">Super Web Crawler</span>},
              you can crawl any website and extract all the URLs that match your
              specified domain name and depth level. Our tool is capable of
              handling dynamic web pages, allowing you to extract data from
              websites that use JavaScript and AJAX technologies.
            </p>

            <p>
              In addition to our powerful web crawler tool, we also provide
              expert tips and best practices on how to optimize your web
              crawling process, troubleshoot common issues, and download and
              process the data that you've extracted.
            </p>

            <p>
              Our website is user-friendly and easy to navigate, with a simple
              interface that makes it easy for you to enter the necessary
              information and start the crawling process. Whether you're a
              seasoned web crawler or a beginner, our tool is designed to meet
              your needs and help you achieve your goals.
            </p>

            <p>
              Try {<span className="website_name">Super Web Crawler</span>}{" "}
              today and see for yourself why it's the best web crawling solution
              on the network.
            </p>
          </Instrcutions>
        ) : selectedTab === TabType.INSTRUCTIONS ? (
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
              <strong>'example.com'</strong> domain name up to three levels
              deep. Once the crawling process is complete, our tool will return
              all the URLs that were found, along with the count of how many
              times each URL occurred on the crawled pages.
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
        ) : selectedTab === TabType.RESULTS ? (
          <div>
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
          </div>
        ) : null}
      </Wrapper>
    </Container>
  );
};

export default CrawlingResult;
