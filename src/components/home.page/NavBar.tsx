import React from "react";
import Link from "next/link";
import styled from "styled-components";

const NavBar = () => {
  return (
    <NavBarContainer>
      <LogoContainer>
        <LogoText>ROADMAP</LogoText>
      </LogoContainer>
      <AuthContainer>
        <Link href="/user/login" passHref>
          <StyledLink>Đăng nhập</StyledLink>
        </Link>
        <Link href="/user/register" passHref>
          <StyledLink>Đăng ký</StyledLink>
        </Link>
      </AuthContainer>
    </NavBarContainer>
  );
};

const NavBarContainer = styled.div`
  height: 100px;
  background-color: #f5f4f4;
  position: relative;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const LogoContainer = styled.div`
  width: 200px;
  height: 50px;
  background-color: #e2e2e2;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LogoText = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 1.6rem;
  cursor: default;
  user-select: none;
`;

const AuthContainer = styled.div`
  display: flex;
  width: 250px;
  /* padding: 0 30px; */
  justify-content: space-between;
`;

const StyledLink = styled.a`
  font-style: normal;
  font-weight: normal;
  font-size: 1.6rem;
  line-height: 30px;
  text-align: center;
  color: #000000;
  text-decoration: none;
  cursor: pointer;
`;
export default NavBar;
