import styled from "styled-components";

const FormField = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 1.5rem;
`;
const Label = styled.label`
  width: fit-content;
  min-width: fit-content;
  margin-right: 1%;

  .variable_type {
    color: #569cd6;
  }
  .variable_name {
    font-weight: 600;
    color: #4fc1ff;
  }
  .type {
    color: #4ec9b0;
  }
  .function {
    color: #f1fa8c;
    cursor: pointer;
  }
`;
const Value = styled.div`
  width: 90%;
  display: flex;
  margin-left: 0.4rem;
`;

const Input = styled.input`
  width: 100%;
  background: transparent;
  outline-style: none;
  border: 0px solid #ce9177;
  border-bottom-width: 1px;
  color: #ce9178;
  font-size: 16px;
  font-family: "Ubuntu Mono";
  height: 1rem;
  caret-color: #50fa7b;

  &::placeholder {
    opacity: 0.8;
  }
`;

const Field = (props: any) => {
  return (
    <FormField onClick={!props.isVariable ? props.inputHandler : null}>
      <Label htmlFor={props.id}>
        {props.isVariable ? (
          <>
            <span className="variable_type">{props.variableType}</span>{" "}
            <span className="variable_name">
              {props.variableName}: <span className="type">{props.type}</span>
            </span>
          </>
        ) : (
          <>
            <span
              className={`variable_name ${!props.isVariable ? "function" : ""}`}
            >
              {props.variableName}
              {"()"}
              <span style={{ color: "#fff" }}>;</span>
            </span>
          </>
        )}
      </Label>
      {props.isVariable ? "=" : ""}
      {props.isVariable ? (
        <Value>
          <Input
            autoFocus={props.autoFocus}
            onChange={props.inputHandler}
            id={props.id}
            type={props.inputType}
            placeholder={props.placeholder}
          />
        </Value>
      ) : null}
    </FormField>
  );
};

export default Field;
