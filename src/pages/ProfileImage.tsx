/*
 * 프로필 이미지 페이지 (12)
 */

import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { BackHeader, Button, Card, ContentContainer } from '@components/common';
import Logo from '@assets/logo.svg?react';
import ProfilePhoto from '@components/ProfilePhoto';
import { useState } from 'react';

const ProfileEdit = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleImageEdit = async () => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('accessToken');

    if (!userId || !selectedFile || !token) {
      alert('로그인 정보 또는 이미지가 없습니다.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/users/${userId}/profile-image`,
        {
          method: 'POST',
          headers: {
            token: token,
          },
          body: formData,
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      alert('프로필 이미지가 성공적으로 업로드되었습니다.');
      navigate('/settings', { replace: true });
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
      alert('이미지 업로드에 실패했습니다.');
    }
  };

  return (
    <Container>
      <BackHeader title="프로필 이미지" />
      <ContentContainer>
        <Card>
          <Logo />
          <Form>
            <ProfilePhoto onFileSelect={file => setSelectedFile(file)} />
            <Button
              type="login"
              buttonText="프로필 이미지 저장"
              onClick={handleImageEdit}
              style={{ marginTop: '3rem' }}
            />
          </Form>
        </Card>
      </ContentContainer>
    </Container>
  );
};

export default ProfileEdit;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const Form = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
`;
