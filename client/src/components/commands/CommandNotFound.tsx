import { Command } from "../../styles/common";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2em;

  .error {
    color: #ff8b8b;
    font-weight: bold;
    line-height: 2em;
  }
`;

const CommandNotFound = (props:any) => {
  return (
    <Wrapper>
      <span className="error">Error in field {props.fieldName}!</span>
      <span>
        Error: {props.error}
      </span>
    </Wrapper>
  );
};

export default CommandNotFound;
