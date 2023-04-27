import React, {
  ReactElement,
  Suspense,
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import styled, { keyframes } from "styled-components";
import { HiGlobeAlt, HiChevronDown, HiChevronUp } from "react-icons/hi";
import { RiScan2Line } from "react-icons/ri";
import { MdDeleteOutline } from "react-icons/md";
import CrawlerHeading from "./CrawlerHeading";
import { LogType } from "../types";
// import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

const Logging = React.lazy(() => import("./commands/Logging"));

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }

`;

const Console = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const TerminalBox = styled.div`
  display: block;
  border-bottom: 1px solid #0f3d24;
  border-top: 1px solid #0f3d24;
  width: 100%;
  height: 33%;
  transition: height 0.2s ease-out;
`;

const Header = styled.div`
  display: flex;
  width: 100%;
  height: 2rem;
  background-color: #041b0ed6;
  box-sizing: border-box;
  position: sticky;
  border-bottom: 1px solid #0f3d24;
`;
const RightHeaderIcons = styled.div`
  display: flex;
  align-items: center;
  margin-right: 0.5rem;
  justify-content: center;

  svg {
    margin-right: 0.5rem;
    padding: 0 0.1rem;
    border-radius: 5px;
    background: #0a2616;
    &:hover {
      background: #0f3821;
    }
  }
`;

const TerminalTitleBar = styled.div`
  font-size: 15px;
  justify-self: center;
  color: #3f3c3c;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: start;
`;
const TerminalTitle = styled.h1`
  font-size: 15px;
  justify-self: center;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #0f3d24;
  border-bottom: 1px solid #fff;
  height: 100%;
  background-color: #1a5a36;
  padding: 0.5rem;
`;

const Body = styled.div`
  height: 100%;
  background-color: #041b0ed6;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  box-sizing: border-box;
  position: relative;
  overflow-y: hidden;
  overflow-x: hidden;

  &:hover {
    overflow-y: scroll;
  }

  &::-webkit-scrollbar {
    width: 7px;
  }
  &::-webkit-scrollbar-track {
    border-radius: 0px;
  }

  &::-webkit-scrollbar-thumb {
    background: #18422a;
    border-radius: 0px;
    height: 2px;
  }

  .rotate {
    animation: ${rotate} 0.5s linear infinite;
  }
`;

const OutputWrapper = styled.div`
  color: #fff;
  padding-left: 0em;

  @media (max-width: 800px) {
    padding-left: 0;
  }
`;

const Loader = styled.div`
    display: flex;
    color: #50fa7b;
    font-size=16px;
    align-items: center;

    span{
    margin-left: 0.2rem;
    }
`;

interface Props {
  loading: boolean;
  terminalOn: boolean;
  setTaskCompleted: Function;
  toggleTerminal:Function;
}

const Terminal = forwardRef(
  ({ loading, setTaskCompleted, terminalOn, toggleTerminal }: Props, ref) => {
    const [terminalOutput, setTerminalOutput] = useState<ReactElement[]>([]);

    const renderTerminalResponse = (component: ReactElement | undefined) => {
      if (component) {
        setTerminalOutput((prevHistory) => [...prevHistory, component]);
      } else {
        setTerminalOutput([]);
      }
    };

    useImperativeHandle(ref, () => ({
      printOnTerminal: (
        message?: string,
        type?: LogType,
        key?: string,
        component?: ReactElement
      ) => {
        if (!message && !type && !component) {
          renderTerminalResponse(undefined);
        } else if (component) {
          renderTerminalResponse(component);
        } else {
          renderTerminalResponse(
            <Logging dataKey={key} key={key} type={type!} message={message} />
          );
        }
      }
    }));

    useEffect(() => {
      let span = document.getElementById("lastline")! as HTMLSpanElement;
      span.scrollIntoView({ behavior: "auto", block: "end" });
    }, [terminalOutput]);

    const clearTerminal = () => {
      setTaskCompleted(false);
      renderTerminalResponse(undefined);
    };

    return (
      <TerminalBox style={{ height: terminalOn ? "34%" : "4%" }}>
        <Console>
          <Header>
            <TerminalTitleBar>
              <TerminalTitle>
                {`Terminal (WebCrawler`}
                <HiGlobeAlt
                  style={{ marginBottom: "0.05rem", marginLeft: "0.3rem" }}
                  size={16}
                />
                {")"}
              </TerminalTitle>
            </TerminalTitleBar>
            <RightHeaderIcons>
              <MdDeleteOutline
                color="#4d9f72"
                size={"19px"}
                onClick={clearTerminal}
              />
              {terminalOn ? (
                <HiChevronDown
                  color="#4d9f72"
                  size={"19px"}
                  onClick={() => toggleTerminal()}
                />
              ) : (
                <HiChevronUp
                  color="#4d9f72"
                  size={"19px"}
                  onClick={() => toggleTerminal()}
                />
              )}
            </RightHeaderIcons>
          </Header>
          <Body>
            <CrawlerHeading />
            <Suspense fallback={<></>}>
              <OutputWrapper id="terminalOutputWrapper">
                {terminalOutput.map((output) => output)}
              </OutputWrapper>
            </Suspense>
            <span id="lastline">
              {loading ? (
                <Loader>
                  <RiScan2Line
                    size={18}
                    fontWeight={1000}
                    color="#50fa7b"
                    className="rotate"
                  />
                  <span>{"loading..."}</span>
                </Loader>
              ) : null}
            </span>
          </Body>
        </Console>
      </TerminalBox>
    );
  }
);

export default Terminal;
