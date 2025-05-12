import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import {
  Signup,
  PasswordChange,
  Login,
  Home,
  DiaryList,
  DiaryDetail,
  DiaryCreate,
  Digest,
  Settings,
} from '@pages/index';

// ✅ Global Style 정의
const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    scroll-behavior: smooth;
  }

  body {
    min-height: 100vh;
    overflow-x: hidden;
    font-family: 'Noto Sans KR', sans-serif;
  }

  #root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
`;

const App = () => (
  <Router>
    <GlobalStyle /> {/* ✅ 글로벌 스타일 추가 */}
    <Container>
      <Routes>
        {/* Init */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/PasswordChange" element={<PasswordChange />} />
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<Home />} />

        {/* Diary */}
        <Route path="/list" element={<DiaryList />} />
        <Route path="/detail/:diaryId" element={<DiaryDetail />} />
        <Route path="/create" element={<DiaryCreate />} />

        <Route path="/digest/:month" element={<Digest />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Container>
  </Router>
);

export default App;

const Container = styled.div`
  width: 100%;
  min-height: 100dvh;
  justify-content: center;
  align-items: center;
  display: flex;
  background-color: #f9fafb;

  // 텍스트 클릭 방지
  user-select: none;
`;
