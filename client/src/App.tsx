import "./App.css";
import styled from "styled-components";
import WebCrawler from "./components/WebCrawler";
import { QueryClient, QueryClientProvider } from "react-query";

const Wrapper = styled.div`
  background: #021309;
  width: 100%;
  height: 100%;
  font-family: "Ubuntu Mono", sans-serif;
  font-size: 17px;
  line-height: 1.3rem;

  @media (max-width: 780px) {
    font-size: 15px;
  }

  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Wrapper >
        <WebCrawler />
      </Wrapper>
    </QueryClientProvider>
  );
};

export default App;
