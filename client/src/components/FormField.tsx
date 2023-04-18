import styled from "styled-components";

const FormField = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  flex-direction: column;
`;
const Label = styled.label`
  width: fit-content;
  min-width: fit-content;
  margin-right: 1%;
  font-weight: 600;
  font-size: .875rem;
  color: #4fc1ff;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  background-color: #000000;
  border: 1px solid #1e2d3d;
  border-radius: 7px;
  padding: 0.5rem;
  font-size: 13px;
  margin: 0;
  margin-bottom: 0.75rem;
  width: 100%;
  caret-color: #50fa7b;
  color: #fff;
  font-family: inherit;
  font-size: .875rem;
  -webkit-appearance: textfield;
  
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type=number] {
    -moz-appearance: textfield;
  }
  
  &:active, &:focus-within{
    outline-style: solid;
    outline-color: transparent;
    box-shadow: inset 0 0 7px 0px #1a5a36;
  }

  &::placeholder {
    
    opacity: 0.8;
  }
`;

const Field = (props: any) => {
  return (
    <FormField onClick={!props.isVariable ? props.inputHandler : null}>
      <Label htmlFor={props.id}>
        {
          <span className="variable_name">{props.variableName + ":"}</span>
        }
      </Label>
      {props.isVariable ? (
          <Input
            autoFocus={props.autoFocus}
            onChange={props.inputHandler}
            id={props.id}
            type={props.inputType}
            placeholder={props.placeholder}
          />
      ) : null}
    </FormField>
  );
};

export default Field;
