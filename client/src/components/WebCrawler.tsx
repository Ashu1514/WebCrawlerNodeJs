import React, {
  ReactElement,
  useEffect,
  useRef,
  useState,
} from "react";
import styled from "styled-components";
import QueryForm from "./QueryForm";
import axios from "axios";
import { LogDataType, LogType } from "../types";
import { database } from "../firebase";
import { ref, onChildAdded } from "firebase/database";
import CrawlingResult from "./CrawlingResult";
import Terminal from "./Terminal";


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


type recordTuple = [string, number];

interface TerminalProps {
  printOnTerminal: (message? : string,  type?: LogType, key?: string, component?: React.ReactNode) => void;
  // other properties and methods of the Terminal component
}

const WebCrawler = () => {
  const [terminalOutput, setTerminalOutput] = useState<ReactElement[]>([]);
  const [taskId, setTaskId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [taskCompleted, setTaskCompleted] = useState<boolean>(false);
  const [tableData, setTableData] = useState<Array<recordTuple>>([]);

  const TerminalRef = useRef<TerminalProps>(null);

  const addDataToTable = (url: string, count: number) => {
    const data = [...tableData];
    const record = data.find((el) => el[0] === url);
    if (record) {
      record[1] = count;
    } else {
      data.push([url, count]);
    }
    setTableData((prev) => {
      let newData = [...prev];
      data.forEach((el) => {
        let recordIndex = newData.findIndex((pl) => el[0] === pl[0]);
        if (recordIndex >= 0) {
          newData[recordIndex] = el;
        } else {
          newData.push(el);
        }
      });
      return newData.sort((a, b) => b[1] - a[1]);
    });
  };


  useEffect(() => {
    let span = document.getElementById("lastline")! as HTMLSpanElement;
    span.scrollIntoView({ behavior: "auto", block: "end" });
  }, [terminalOutput]);


  useEffect(() => {
    if (taskId.trim().length && !taskCompleted) {
      startCrawling(taskId);
    }
  }, [taskId]);

  const printOnTerminal = (message?: string, type?: LogType, key?: string, component?: ReactElement) => {
    if(TerminalRef.current){
      if(component){
        TerminalRef.current.printOnTerminal(undefined, undefined, undefined, component);
      } else{
        TerminalRef.current.printOnTerminal(message, type, key);
      }
    }
  } 

  const startCrawling = async (id: string) => {
    try {
      setLoading(true);
      printOnTerminal(
        `Web Crawler query registered @ ${id}`,
        LogType.CHECK,
        Math.random().toString()
      );
      getLiveLogs(id);
      await axios.post(
        "https://us-central1-webcrawlernode.cloudfunctions.net/crawler/start",
        { taskId: id }
      );
    } catch (error: any) {
      printOnTerminal(
        `Error while crawling: ${error.message}`,
        LogType.ERROR,
        Math.random().toString()
      );
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getLiveLogs = (id: string) => {
    const starCountRef = ref(database, "/crawling_query_logs/" + id + "/");
    const unsub = onChildAdded(
      starCountRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data.type !== LogDataType.CRAWLING) {
          printOnTerminal(
            snapshot.key + ": " + data.log,
            data.data.result ? LogType.CHECK : LogType.HAPPNING,
            snapshot.key!.toString()
          );
        } else {
          addDataToTable(data.data.currentURL, data.data.currentCount);
        }
        if (data.data.result) {
          console.log("unsub and res", data.data.result);
          setTableData(data.data.result);
          unsub();
          setLoading(false);
          setTaskCompleted(true);
        }
      },
      (err) => {
        printOnTerminal(
          err.message,
          LogType.ERROR
        );
      }
    );
  };

  const clearTerminal = () => {
    setTaskCompleted(false);
    setTableData([]);
    printOnTerminal();
  };

  return (
    <Container>
      <Row style={{ height:"60%" }}>
        <QueryForm
          setLoading={setLoading}
          loading={loading}
          printErrors={printOnTerminal}
          setTaskId={setTaskId}
          isTaskCompleted={taskCompleted}
          clearTerminal={clearTerminal}
        />
        <CrawlingResult data={tableData} />
      </Row>
      <Terminal
        ref={TerminalRef}
        loading={loading}
        setTaskCompleted={setTaskCompleted}
        setTableData={setTableData}
      />
    </Container>
  );
};

export default WebCrawler;
