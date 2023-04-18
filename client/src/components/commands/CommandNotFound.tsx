import { Command } from "../../styles/common";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

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
      {props.error}
    </Wrapper>
  );
};

export default CommandNotFound;
