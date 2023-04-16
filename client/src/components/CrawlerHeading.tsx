import styled from "styled-components";

interface Props {
  id: string;
}

const LabelContainer = styled.div`
  display: flex;
  color: aliceblue;
  margin-left: 0.2rem;
  .head {
    margin-right: 0.3em;
    color: #50fa7b;
  }

  .in {
    margin-right: 0.3em;
  }

  .id {
    font-weight: bold;
    color: #f1fa8c;
    text-decoration: underline;
  }
`;

const CrawlerHeading = ({ id }: Props) => {
  return (
    <>
    <LabelContainer>
      <span className="head">Welcome to Web Crawler <span style={{fontSize: "12px"}}>🌐 </span></span>
      <span className="id">v1.0.0</span>
    </LabelContainer>
    <LabelContainer>
      <span className="head">web crawler</span>
      <span className="in">query registered @</span>
      <span className="id">{id}</span>
    </LabelContainer>
    </>
  );
};

export default CrawlerHeading;
