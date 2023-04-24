import { useState } from "react";
import styled, { keyframes } from "styled-components";

const Container = styled.div`
  color: white;
  margin-bottom: 1rem;
  max-width: 60%;
  width: 100%;
  padding: 3rem 2rem;
  padding-top: 0rem;
  margin-top: 3rem;
  overflow-y: scroll;
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
`;

const TableData = styled.td`
  height: fit-content;
  width: fit-content;
  padding: 0 0.5rem;
`;

const TableBody = styled.tbody`
  background: #052c165c;
  line-height: 1rem;

  .text-center {
    text-align: center;
  }
`;

type recordTuple = [string, number];

const CrawlingResult = ({ data }: { data: Array<recordTuple> }) => {
  return (
    <Container>
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
        {/* <TableRow>
          <TableData>1</TableData>
          <TableData>URLs</TableData>
          <TableData>Occurrence</TableData>
        </TableRow> */}
      </Table>
    </Container>
  );
};

export default CrawlingResult;
