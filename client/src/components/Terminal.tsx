import React, { Suspense } from "react";
import styled, { keyframes, css } from "styled-components";
import { HiGlobeAlt } from "react-icons/hi";
import CrawlerHeading from "./CrawlerHeading";

const Logging = React.lazy(() => import("./commands/Logging"));
const CommandNotFound = React.lazy(() => import("./commands/CommandNotFound"));

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
  width: 70%;

  ${(props) =>
    props.theme === "drunk" &&
    css`
      animation: ${drunk} 10s linear infinite;
    `}
`;

const Header = styled.div`
  display: flex;
  width: 100%;
  height: 2rem;
  background-color: #f0e9e5;
  box-sizing: border-box;
  position: sticky;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
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

const TerminalTitle = styled.h1`
  font-size: 15px;
  justify-self: center;
  margin-left: 3rem;
  color: #3f3c3c;
  position: absolute;
  top: 0;
  left: 40%;
  width: 6.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Body = styled.div`
  height: 60vh;
  background-color: #041b0ed6;
  border: 1px solid #f0e9e5;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  padding: 0 1rem 1rem 0;
  box-sizing: border-box;
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-color: #474e68;

  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px grey;
    border-radius: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background: #6b728e;
    border-radius: 15px;
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

const Terminal = () => {
  const renderTerminalResponse = () => {
    return <Logging />;
    // return <CommandNotFound />;
  };

  return (
    <Column>
      <Header>
        <MacOsButtons>
          <RoundedButton color="#FF5D5B" shadow="#CF544D" />
          <RoundedButton color="#FFBB39" shadow="#CFA64E" />
          <RoundedButton color="#00CD4E" shadow="#0EA642" />
        </MacOsButtons>
        <TerminalTitle>
          Web Crawler
          <HiGlobeAlt style={{ marginBottom: "0.05rem" }} size={16} />
        </TerminalTitle>
      </Header>
      <Body>
        <div>
          <CrawlerHeading id={"PHOPrIv1prqZsgJbwHn"} />
          <Suspense fallback={<></>}>
            <OutputWrapper>{renderTerminalResponse()}</OutputWrapper>
          </Suspense>
        </div>
      </Body>
    </Column>
  );
};

export default Terminal;
