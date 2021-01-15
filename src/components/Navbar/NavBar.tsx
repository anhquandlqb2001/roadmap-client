import React from "react";
import Link from "next/link";
import styled from "styled-components";
import { Button, Menu, MenuItem } from "@material-ui/core";
import { logout } from "../../lib/api/user";
import { useRouter } from "next/router";

interface Props {
  profile;
}

const NavBar: React.FC<Props> = ({ profile }) => {
  const [delayed, setDelayed] = React.useState(true);

  React.useEffect(() => {
    const timeout = setTimeout(() => setDelayed(false), 300);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <NavBarContainer>
        <LogoContainer>
      <Link href="/" passHref>
        <LogoText>lotrinh</LogoText>
      </Link>
        </LogoContainer>
      <AuthContainer>
        {!delayed ? <Authenticate user={profile.user} /> : null}
      </AuthContainer>
    </NavBarContainer>
  );
};

const Authenticate = ({ user }) => {
  if (user) {
    return <UserMenu user={user} />;
  }
  return (
    <>
      <Link href="/user/login" passHref>
        <StyledLink>Đăng nhập</StyledLink>
      </Link>
      <Link href="/user/register" passHref>
        <StyledLink>Đăng ký</StyledLink>
      </Link>
    </>
  );
};

const UserMenu = ({ user }) => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onClickLogout = async (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>
  ): Promise<boolean | void> => {
    const response = await logout();
    if (!response.success) {
      return alert("error");
    }
    return router.push("/user/login");
  };

  return (
    <>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        {user.email}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={(e) => onClickLogout(e)}>Đăng xuất</MenuItem>
      </Menu>
    </>
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
  cursor: pointer;
  justify-content: center;
`;

const LogoText = styled.a`
  font-style: normal;
  font-weight: normal;
  font-size: 1.6rem;
  user-select: none;
  text-decoration: none;
  color: black;
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
