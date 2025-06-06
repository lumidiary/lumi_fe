import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import {
  Signup,
  PasswordChange,
  Login,
  Home,
  DiaryList,
  DiaryDetail,
  DiaryImageUpload,
  DiaryCreate,
  Digest,
  Settings,
  ProfileEdit,
  DigestList,
  ProfileImage,
} from '@pages/index';

const App = () => (
  <Router>
    <Container>
      <Routes>
        {/* Init */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/password-change" element={<PasswordChange />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile-edit" element={<ProfileEdit />} />

        <Route path="/" element={<Home />} />

        {/* Diary */}
        <Route path="/diary/list" element={<DiaryList />} />
        <Route path="/detail/:diaryId" element={<DiaryDetail />} />
        <Route path="/create/image-upload" element={<DiaryImageUpload />} />
        <Route path="/create/content" element={<DiaryCreate />} />

        <Route path="/digest/list" element={<DigestList />} />
        <Route path="/digest/:month" element={<Digest />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile-image" element={<ProfileImage />} />
      </Routes>
    </Container>
  </Router>
);

export default App;

const Container = styled.div`
  width: 100%;
  min-height: 98vh;
  justify-content: center;
  align-items: center;
  display: flex;
  background-color: #f9fafb;
  overflow-y: auto;

  // 텍스트 클릭 방지
  user-select: none;
`;
