import styled from "styled-components";
// interface Props {
//   id: string;
// }

const FormContainer = styled.form`
  color: white;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: start;
  align-content: center;
  height: 100%;
  margin-bottom: 1rem;
  max-width: 40%;
  width: 100%;
  padding: 3rem 2rem;
`;

const QueryCode = (props: any) => {
  return <FormContainer></FormContainer>;
};

export default QueryCode;
