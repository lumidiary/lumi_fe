/*
 * 프로필 이미지 페이지 (12)
 */

import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { BackHeader, Button, Card, ContentContainer } from '@components/common';
import Logo from '@assets/logo.svg?react';
import ProfilePhoto from '@components/ProfilePhoto';

const ProfileEdit = () => {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate('/settings', { replace: true });
  };

  return (
    <Container>
      <BackHeader title="프로필 이미지" />
      <ContentContainer>
        <Card>
          <Logo />
          <Form>
            <ProfilePhoto />
            <Button
              type="login"
              buttonText="프로필 이미지 저장"
              onClick={handleSignUp}
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
