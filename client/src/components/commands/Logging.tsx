import { Command } from "../../styles/common";
import { HiChevronRight } from "react-icons/hi";
import styled from "styled-components";

const CommandLine = styled.div`
  display: flex;
`;
const CommandLineArrow = styled.div`
  margin-right: 0.3em;
`;
const Line = styled.p`
  margin: 0;
`;

const Logging = () => {
  return (
    <>
      <CommandLine>
        <CommandLineArrow><HiChevronRight size={20} color="#50fa7b" /></CommandLineArrow>
        <Line>
          Hi, I'm Ashutosh Londhe!
        </Line>
      </CommandLine>
      <CommandLine>
        <CommandLineArrow><HiChevronRight size={20} color="#50fa7b" /></CommandLineArrow>
        <Line>
          I'm taking my major in <Command>Software Engeneering</Command> and
          studying/working very hard on my software development skills in order to
          become a better developer.
        </Line>
      </CommandLine>
    </>
  );
};

export default Logging;
