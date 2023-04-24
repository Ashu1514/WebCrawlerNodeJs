import styled from "styled-components";

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

const CrawlerHeading = () => {
  return (
    <>
    <LabelContainer>
      <span className="head">Welcome to Web Crawler <span style={{fontSize: "12px"}}>🌐 </span></span>
      <span className="id">v1.0.0</span>
    </LabelContainer>
    </>
  );
};

export default CrawlerHeading;
