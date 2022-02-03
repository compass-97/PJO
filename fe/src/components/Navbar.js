import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const NavbarWrap = styled.div`
display: flex;
justify-content: space-around;
margin: 0 auto;
width: 100%;
max-width: 960px;
height: 7vh;
`;
const NavIconWrap = styled.div`
position: relative;
width: 10%;
max-width: 50px;
padding-bottom: 100%;
overflow: hidden
`;
const NavIcon = styled.img`
width: 100%;
position: absolute;
`;

function Navbar() {
  const navigate = useNavigate();

  return (
    <NavbarWrap>
      <NavIconWrap>
        <NavIcon src="/img/icons/home.png" onClick={() => navigate('/')} />
      </NavIconWrap>
      <NavIconWrap>
        <NavIcon src="/img/icons/create.png" onClick={() => navigate('/c')} />
      </NavIconWrap>
    </NavbarWrap>
  );
}

export default Navbar;
