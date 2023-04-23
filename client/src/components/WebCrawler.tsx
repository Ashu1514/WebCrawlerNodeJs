import React, { ReactElement, Suspense, useEffect, useState } from "react";
import styled, { keyframes, css } from "styled-components";
import { HiGlobeAlt, HiChevronDown, HiChevronUp } from "react-icons/hi";
import { RiScan2Line } from "react-icons/ri";
import { MdDeleteOutline } from "react-icons/md";
import CrawlerHeading from "./CrawlerHeading";
import QueryForm from "./QueryForm";
import QueryCode from "./QueryCode";
import axios from "axios";
import { LogDataType, LogType } from "../types";
import { firestore } from "../firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

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
  width: 100%;
  font-size: 0.875rem;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 60%;
  transition: height 0.2s ease-out;
`;

const TerminalBox = styled.div`
  display: block;
  border-bottom: 1px solid #0f3d24;
  border-top: 1px solid #0f3d24;
  width: 100%;
  height: 40%;
  transition: height 0.2s ease-out;
`;

const Header = styled.div`
  display: flex;
  width: 100%;
  height: 2rem;
  background-color: #041b0ed6;
  // background-color: #f0e9e5;
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

  padding: 0 0.5rem;
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
  // border: 1px solid #f0e9e5;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  padding: 0 0.3rem 0.3rem;
  box-sizing: border-box;
  position: relative;
  overflow-y: hidden;
  overflow-x: hidden;

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

  .rotate {
    animation: ${rotate} 0.5s linear infinite;
  }
`;

const OutputWrapper = styled.div`
  color: aliceblue;
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

const WebCrawler = () => {
  const [terminalOutput, setTerminalOutput] = useState<ReactElement[]>([]);
  const [terminalOn, setTerminalOn] = useState<boolean>(true);
  const [taskId, setTaskId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [taskCompleted, setTaskCompleted] = useState<boolean>(false);
  const renderTerminalResponse = (component: ReactElement) => {
    setTerminalOutput((prevHistory) => [...prevHistory, component]);
  };

  useEffect(() => {
    let span = document.getElementById("lastline")! as HTMLSpanElement;
    span.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [terminalOutput]);

  const toggleTerminal = () => {
    setTerminalOn(!terminalOn);
  };

  useEffect(() => {
    if (taskId.trim().length) {
      startCrawling(taskId);
    }
  }, [taskId]);

  const startCrawling = async (id: string) => {
    try {
      setLoading(true);
      renderTerminalResponse(
        <Logging
          key={Math.random()}
          type={LogType.CHECK}
          message={`Web Crawler query registered @ ${id}`}
        />
      );
      getLiveLogs(id);
      await axios.post(
        "https://us-central1-webcrawlernode.cloudfunctions.net/crawler/start",
        { taskId: id }
      );
    } catch (error: any) {
      renderTerminalResponse(
        <Logging
          key={Math.random()}
          type={LogType.ERROR}
          message={`Error while crawling: ${error.message}`}
        />
      );
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getLiveLogs = (id: string) => {
    const col = collection(firestore, "crawling_queries/" + id + "/logs/");
    const queryLogsRef = query(col, orderBy("createdAt", "asc"));
    const unsub = onSnapshot(queryLogsRef, (docs) => {
      let terminalLogs = document.querySelectorAll(
        ".terminalLogs"
      )! as NodeListOf<HTMLDivElement>;
      let logIds: any[] = [];
      terminalLogs.forEach((el) => {
        logIds.push(el?.dataset?.key);
      });
      docs.forEach((doc) => {
        const data = doc.data();
        if (data.type !== LogDataType.CRAWLING && !logIds.includes(doc.id)) {
          renderTerminalResponse(
            <Logging
              dataKey={doc.id}
              key={doc.id}
              type={data.data.result ? LogType.CHECK : LogType.HAPPNING}
              message={data.log}
            />
          );
        }
        if (data.data.result) {
          console.log("unsub and res", data.data.result);
          setLoading(false);
          unsub();
          setTaskCompleted(true);
        }
      });
    });
  };

  const clearTerminal = () => {
    setTaskCompleted(false);
    setTerminalOutput([]);
    renderTerminalResponse(<span></span>);
  }

  return (
    <Container>
      <Row style={{ height: terminalOn ? "60%" : "95.5%" }}>
        <QueryForm
          setLoading={setLoading}
          loading={loading}
          printErrors={renderTerminalResponse}
          setTaskId={setTaskId}
          isTaskCompleted={taskCompleted}
          clearTerminal={clearTerminal}
        />
        <QueryCode printErrors={renderTerminalResponse} />
      </Row>
      <TerminalBox style={{ height: terminalOn ? "40%" : "4.5%" }}>
        <Column>
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
                  onClick={toggleTerminal}
                />
              ) : (
                <HiChevronUp
                  color="#4d9f72"
                  size={"19px"}
                  onClick={toggleTerminal}
                />
              )}
            </RightHeaderIcons>
          </Header>
          <Body>
            <div>
              <CrawlerHeading id={"PHOPrIv1prqZsgJbwHn"} />
              <Suspense fallback={<></>}>
                <OutputWrapper>
                  {terminalOutput.map((output) => output)}
                </OutputWrapper>
              </Suspense>
              <span
                id="lastline"
              >
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
                ) :
                null}
              </span>
            </div>
          </Body>
        </Column>
      </TerminalBox>
    </Container>
  );
};

export default WebCrawler;
