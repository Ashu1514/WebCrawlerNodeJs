import { Command } from "../../styles/common";
import { AiOutlineLink } from "react-icons/ai";
import { TbChevronRight } from "react-icons/tb";
import { FaAngleRight } from "react-icons/fa";
import { SiAngellist } from "react-icons/si";
import { VscWarning, VscError } from "react-icons/vsc";
import styled, { keyframes } from "styled-components";
import { LogType } from "../../types";

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }

`;

const CommandLine = styled.div`
  display: flex;
  align-items: center;

  svg {
    margin-right: 0.3rem;
  }

  .rotateAnime {
    animation: ${rotate} 0.7s ease-in 1;
  }
`;
const Line = styled.p`
  margin: 0;
`;

interface Props {
  message: any;
  type: LogType;
  dataKey?: string;
}

const Logging = ({ message, type, dataKey }: Props) => {
  return (
    <CommandLine className="terminalLogs" data-key={dataKey}>
      {type === LogType.NORMAL ? (
        <TbChevronRight
          size={16}
          fontWeight={1000}
          color="#50fa7b"
        />
      ) : type === LogType.WARNING ? (
        <VscWarning size={16} color="#f1fa8c" />
      ) : type === LogType.ERROR ? (
        <VscError size={16} color="#ff8b8b" />
      ) : type === LogType.CHECK ? (
        <SiAngellist size={16} color="#50fa7b" />
      ) : type === LogType.CONNECTION ? (
        <AiOutlineLink size={16} color="#50fa7b" />
      ) : type === LogType.HAPPNING ? (
        <FaAngleRight
          size={16}
          color="#50fa7b"
        />  
      ):  null}
      <Line>{message}</Line>
    </CommandLine>
  );
};

export default Logging;
