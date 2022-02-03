import React from 'react';
import { Routes, Route } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import Home from './components/PostList';
import Create from './components/Create';
import Post from './components/Post';
import Navbar from './components/Navbar';

const GlobalStyle = createGlobalStyle`
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

ol, ul, li {
  list-style: none;
}
`;

const MainSection = styled.div`
width: 100vw;
max-width: 600px;
margin: 0 auto;
`;

const NavbarSection = styled.div`
position: fixed;
bottom: 0;
left: 50%;
transform: translate(-50%,0);
width: 100vw;
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <MainSection>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/p/:id" element={<Post />} />
          <Route path="/c" element={<Create />} />
        </Routes>
      </MainSection>

      <NavbarSection>
        <Navbar />
      </NavbarSection>
    </>
  );
}

export default App;
