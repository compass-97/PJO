import React from 'react';
import styled from 'styled-components';

const HeaderWrap = styled.div`
display: flex;
height: 7vh;
padding: 10px;
`;

const HeaderNameWrap = styled.div`
position: relative;
width: 10%;
max-width: 50px;
padding-bottom: 100%;
overflow: hidden;
`;
const HeaderName = styled.img`
width: 100%;
position: absolute;
`;

function Header({ type, handler }) {
  return (
    <>
      {type === 'create'
    && (
    <HeaderWrap>
      <HeaderNameWrap>
        <HeaderName src="/img/icons/create.png" />
      </HeaderNameWrap>
      <button type="button" onClick={handler}>submit</button>
    </HeaderWrap>
    )}
      {type === 'postlist'
    && (
    <HeaderWrap>
      <HeaderNameWrap>
        <HeaderName src="/img/icons/home.png" />
      </HeaderNameWrap>
    </HeaderWrap>
    )}
      {type === 'post'
    && (
    <HeaderWrap>
      <HeaderNameWrap>
        <HeaderName src="/img/icons/back.png" onClick={() => handler()} />
      </HeaderNameWrap>
    </HeaderWrap>
    )}
    </>
  );
}

export default Header;
