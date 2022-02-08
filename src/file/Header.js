import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Header = () => {
  return (
    <div>
      <Container>
        <Wrapper>
          <Logo to="/">Logo</Logo>
          <Navigation>
            <Nav to="/create">Create</Nav>
          </Navigation>
        </Wrapper>
      </Container>
    </div>
  );
};

export default Header;

const Nav = styled(Link)`
  color: white;
  text-decoration: none;
  padding: 15px 30px;
  transition: all 350ms;
  transform: scale(1);
  border-radius: 3px;

  :hover {
    transform: scale(0.97);
    cursor: pointer;
    background: rgba(255, 255, 255, 0.4);
  }
`;

const Navigation = styled.div``;

const Logo = styled(Link)`
  margin: 0 30px;
  font-weight: bold;
  color: white;
  text-decoration: none;
  :hover {
    cursor: pointer;
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 80px;
`;

const Container = styled.div`
  width: 100%;
  height: 80px;
  background: #004080;
  color: white;
`;
