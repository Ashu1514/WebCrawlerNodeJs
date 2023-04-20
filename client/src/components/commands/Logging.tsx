import { Command } from "../../styles/common";
import { TbChevronRight } from "react-icons/tb";
import { BsCheck } from "react-icons/bs";
import { VscWarning, VscError } from "react-icons/vsc";
import styled from "styled-components";
import { LogType } from "../../types";

const CommandLine = styled.div`
  display: flex;
  align-items: center;

  svg{
    margin-right: 0.3rem;
  }
`;
const Line = styled.p`
  margin: 0;
`;

interface Props {
  message: string, 
  type: LogType
}

const Logging = ({message, type}: Props) => {
  return (
    <CommandLine key={Math.random()}>
        {type === LogType.NORMAL ? (
          <TbChevronRight size={16} fontWeight={1000} color="#50fa7b" />
        ): type === LogType.WARNING ? (
          <VscWarning size={16} color="#f1fa8c"/>
        ): type === LogType.ERROR ? (
          <VscError size={16} color="#ff8b8b"/>
        ): type === LogType.CHECK ? (
          <BsCheck size={16} color="#50fa7b"/>
        ): null}
      <Line>
        {message}
      </Line>
    </CommandLine>
  );
};

export default Logging;
