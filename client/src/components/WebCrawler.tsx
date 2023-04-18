import React, {
  ReactElement,
  Suspense,
  useEffect,
  useState,
} from "react";
import styled, { keyframes, css } from "styled-components";
import { HiGlobeAlt, HiChevronDown } from "react-icons/hi";
import CrawlerHeading from "./CrawlerHeading";
import QueryForm from "./QueryForm";
import QueryCode from "./QueryCode";

const Logging = React.lazy(() => import("./commands/Logging"));

const drunk = keyframes`

0%{
  filter: blur(0.5px);
}
25%{
  filter: blur(1.5px);
  transform: scale(1.01) rotate(2deg) translate(10px, 15px);
}
50%{
  filter: blur(0.75px);
  transform: scale(1.003) translate(5px, 20px) ; 
  }
75%{
  filter: blur(1.5px);
  transform: rotate(-3deg) translate(-18px, -10px) scale(0.99);
    }
100%{
  filter: blur(0.5px);
}
`;

const Column = styled.span`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  ${(props) =>
    props.theme === "drunk" &&
    css`
      animation: ${drunk} 10s linear infinite;
    `}
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  display: block;
  height: 100%;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 60%;
`;

const TerminalBox = styled.div`
  display: block;
  border-bottom: 1px solid #1e2d3d;
  border-top: 1px solid #1e2d3d;
  width: 100%;
  height: 40%;
`;

const Header = styled.div`
  display: flex;
  width: 100%;
  height: 2rem;
  background-color: #041b0ed6;
  // background-color: #f0e9e5;
  box-sizing: border-box;
  position: sticky;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom: 1px solid #1e2d3d;
`;
const RightHeaderIcons = styled.div`
display: flex;
    align-items: center;
    margin-right: 0.5rem;
    justify-content: center;

    svg{
      padding: 0 0.1rem;
      border-radius: 5px;
      background: #0a2616;
      &:hover{
        background: #0f3821;
      }
    }
`;

const MacOsButtons = styled.div`
  display: flex;
  width: 3rem;
  justify-content: space-between;
  align-items: center;
  margin-left: 0.5rem;
`;

const RoundedButton = styled.div<ButtonProps>`
  width: 12px;
  height: 12px;
  box-shadow: inset 1px 1px 15px 15px ${(props) => props.shadow};
  background-color: ${(props) => props.color};
  border-radius: 50%;
`;

const TerminalTitleBar = styled.div`
  font-size: 15px;
  justify-self: center;
  color: #3f3c3c;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: start;
  
  padding: 0 0.5rem;
`;
const TerminalTitle = styled.h1`
  font-size: 15px;
  justify-self: center;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #1e2d3d;
  border-bottom: 1px solid #fff;
  height: 100%;
  background-color: #1a5a36;
  padding: 0.5rem;
`;

const Body = styled.div`
  height: 100%;
  background-color: #041b0ed6;
  // border: 1px solid #f0e9e5;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  padding: 0 0.3rem 0.3rem;
  box-sizing: border-box;
  position: relative;
  overflow-y: hidden;
  overflow-x: hidden;
  transition: color 0.3s;

  &:hover {
    overflow-y: scroll;
  }

  &::-webkit-scrollbar {
    width: 10px;
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

const OutputWrapper = styled.div`
  color: aliceblue;
  padding-left: 0em;

  @media (max-width: 800px) {
    padding-left: 0;
  }
`;

interface ButtonProps {
  color: string;
  shadow: string;
}

const WebCrawler = () => {
  const [terminalOutput, setTerminalOutput] = useState<ReactElement>();
  const renderTerminalResponse = (component?: ReactElement) => {
    setTerminalOutput(component ?? <Logging />);
  };

  useEffect(() => {
    let span = document.getElementById("lastline")! as HTMLSpanElement;
    span.scrollIntoView({behavior: "smooth", block:"end"});
  }, [terminalOutput]);

  return (
    <Container>
      <Row>
        <QueryForm printErrors={renderTerminalResponse} />
        <QueryCode printErrors={renderTerminalResponse} />
      </Row>
      <TerminalBox>
        <Column>
          <Header>
            {/* <MacOsButtons>
              <RoundedButton color="#FF5D5B" shadow="#CF544D" />
              <RoundedButton color="#FFBB39" shadow="#CFA64E" />
              <RoundedButton color="#00CD4E" shadow="#0EA642" />
            </MacOsButtons> */}
            <TerminalTitleBar>
              <TerminalTitle>
                {`Terminal (WebCrawler`}
                <HiGlobeAlt style={{ marginBottom: "0.05rem", marginLeft: "0.3rem" }} size={16} />
                {")"}
              </TerminalTitle>
            </TerminalTitleBar>
            <RightHeaderIcons>
              <HiChevronDown color="#4d9f72" size={"19px"}/>
            </RightHeaderIcons>
          </Header>
          <Body>
            <div>
              <CrawlerHeading id={"PHOPrIv1prqZsgJbwHn"} />
              <Suspense fallback={<></>}>
                <OutputWrapper>{terminalOutput}</OutputWrapper>
              </Suspense>
              <span id="lastline"></span>
            </div>
          </Body>
        </Column>
      </TerminalBox>
    </Container>
  );
};

export default WebCrawler;
