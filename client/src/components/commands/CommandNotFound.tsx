import styled from "styled-components";
import {VscError} from "react-icons/vsc"

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  .error {
    color: #ff8b8b;
    font-weight: bold;
    line-height: 1em;
    display:flex;
    align-items:center;
    margin-left: 0.2rem;

    svg{
      margin-right: 0.3rem;
    }
  }
  ol {
    margin: 0;
  }
`;

const CommandNotFound = (props:any) => {
  return (
    <Wrapper key={Math.random()}>
      <span className="error"><VscError/> Error in field {props.fieldName}!</span>
      {props.error}
    </Wrapper>
  );
};

export default CommandNotFound;
