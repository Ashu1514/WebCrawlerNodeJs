import React from "react";
import styled from "styled-components";
import {BsFillBugFill} from "react-icons/bs"

const Navbar = styled.nav`
  width: 100%;
  height: 6%;
  border-bottom: 1px solid #0f3d24;

  .border-right {
    border-right: 1px solid #0f3d24;
  }
`;

const NavLogo = styled.div`
  height: 100%;
  width: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1rem;
  color: #4ffa7b;
  padding: 1rem 1.5rem;

  a {
    text-decoration: none;
    color: #4ffa7b;
  }
`;

const Header = () => {
  return (
    <Navbar>
      <NavLogo className="border-right">
        <a href="/">_super_crawler</a> {" {"} <BsFillBugFill color="#4ffa7b" fontSize={"14px"}/>{"}"}
      </NavLogo>
    </Navbar>
  );
};

export default Header;
